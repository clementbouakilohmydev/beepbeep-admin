import type { VercelRequest, VercelResponse } from "@vercel/node"

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" })
  }

  const fromName = process.env.EMAIL_FROM_NAME || "BeepBeepCity"
  const fromEmail = process.env.EMAIL_FROM_ADDRESS || "contact@ohmydev.fr"
  const replyTo = process.env.EMAIL_REPLY_TO || fromEmail

  try {
    const { to, subject, html } = req.body

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
