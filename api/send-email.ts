import type { VercelRequest, VercelResponse } from "@vercel/node"

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
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
