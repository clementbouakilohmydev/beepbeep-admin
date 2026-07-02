import type { VercelRequest, VercelResponse } from "@vercel/node"

const AUTH_QUERY = `query { authenticatedItem { ... on User { id isAdmin } } }`

/**
 * Vérifie que la requête provient d'un admin authentifié Keystone.
 * On relaie le Bearer token du client vers l'API GraphQL du back et on
 * exige `authenticatedItem.isAdmin`. Sans ça l'endpoint d'envoi d'email
 * serait ouvert à n'importe qui (spam/abus via Resend).
 */
async function isAuthenticatedAdmin(authHeader: string | undefined) {
  if (!authHeader?.startsWith("Bearer ")) return false

  const apiUrl = process.env.VITE_API_URL
  if (!apiUrl) return false

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

  const authorized = await isAuthenticatedAdmin(req.headers.authorization)
  if (!authorized) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  try {
    const { to, subject, html } = req.body

    if (!to || !subject || !html) {
      return res
        .status(400)
        .json({ error: "Missing required fields: to, subject, html" })
    }

    const apiKey = process.env.RESEND_API_KEY ?? ""
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
    return res.status(response.ok ? 200 : 400).json(data)
  } catch {
    return res.status(500).json({ error: "Internal server error" })
  }
}
