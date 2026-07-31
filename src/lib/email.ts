import { SESSION_TOKEN_KEY } from "@/lib/constants"

type SendEmailParams = {
  to: string
  subject: string
  html: string
}

const EMAIL_ENDPOINT = "/api/send-email"

export async function sendEmail(params: SendEmailParams) {
  const token = localStorage.getItem(SESSION_TOKEN_KEY)
  const response = await fetch(EMAIL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(params),
  })

  const data = await response.json()

  if (!response.ok) {
    // L'endpoint renvoie { error }, mais on lit aussi { message } au cas où
    // (format d'erreur brut de Resend) pour un diagnostic plus précis.
    throw new Error(
      data.error || data.message || "Erreur lors de l'envoi de l'email"
    )
  }

  return data
}
