import type { VercelRequest, VercelResponse } from "@vercel/node"

const AUTH_QUERY = `query { authenticatedItem { ... on User { id isAdmin } } }`

/**
 * Vérifie que la requête provient d'un admin authentifié Keystone.
 * On relaie le Bearer token du client vers l'API GraphQL du back et on
 * exige `authenticatedItem.isAdmin`. Sans ça l'endpoint d'envoi d'email
 * serait ouvert à n'importe qui (spam/abus via Resend).
 */
async function isAuthenticatedAdmin(
  authHeader: string | undefined,
  apiUrl: string
) {
  if (!authHeader?.startsWith("Bearer ")) return false

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({ query: AUTH_QUERY }),
    })
    if (!response.ok) return false
    const json = (await response.json()) as {
      data?: { authenticatedItem?: { id?: string; isAdmin?: boolean } | null }
    }
    return json.data?.authenticatedItem?.isAdmin === true
  } catch {
    return false
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  // Gardes de configuration : on renvoie des erreurs EXPLICITES (500) plutôt
  // qu'un 401/400 opaque. Avant, une env manquante (VITE_API_URL absente du
  // runtime des fonctions Vercel, ou RESEND_API_KEY vide) se traduisait par
  // un simple "erreur d'envoi" côté admin, impossible à diagnostiquer.
  const apiUrl = process.env.VITE_API_URL
  if (!apiUrl) {
    return res
      .status(500)
      .json({ error: "Configuration serveur manquante : VITE_API_URL" })
  }
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return res
      .status(500)
      .json({ error: "Configuration serveur manquante : RESEND_API_KEY" })
  }

  const authorized = await isAuthenticatedAdmin(
    req.headers.authorization,
    apiUrl
  )
  if (!authorized) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  try {
    const { to, subject, html } = req.body ?? {}

    if (!to || !subject || !html) {
      return res
        .status(400)
        .json({ error: "Missing required fields: to, subject, html" })
    }

    const fromName = process.env.EMAIL_FROM_NAME ?? "BeepBeepCity"
    const fromEmail =
      process.env.EMAIL_FROM_ADDRESS ?? "contact@beepbeepcity.com"
    const replyTo = process.env.EMAIL_REPLY_TO ?? fromEmail

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `${fromName} <${fromEmail}>`,
        reply_to: replyTo,
        to,
        subject,
        html,
      }),
    })

    const data = await response.json()
    if (!response.ok) {
      // Resend renvoie { name, message } en cas d'erreur (ex. domaine
      // expéditeur non vérifié, clé invalide) → on remonte un message lisible.
      return res.status(response.status || 400).json({
        ...data,
        error: data?.message || data?.error || "Envoi refusé par Resend",
      })
    }
    return res.status(200).json(data)
  } catch (e) {
    return res
      .status(500)
      .json({ error: e instanceof Error ? e.message : "Internal server error" })
  }
}
