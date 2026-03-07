type SendEmailParams = {
  to: string
  subject: string
  html: string
}

const EMAIL_ENDPOINT = "/api/send-email"

export async function sendEmail(params: SendEmailParams) {
  const response = await fetch(EMAIL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Erreur lors de l'envoi de l'email")
  }

  return data
}
