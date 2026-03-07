import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv, type Plugin } from "vite"

function resendProxy(): Plugin {
  let envVars: Record<string, string> = {}
  return {
    name: "resend-proxy",
    configResolved(config) {
      envVars = loadEnv(config.mode, config.root, "")
    },
    configureServer(server) {
      server.middlewares.use("/api/send-email", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405
          res.end(JSON.stringify({ error: "Method not allowed" }))
          return
        }

        let body = ""
        req.on("data", (chunk: Buffer) => {
          body += chunk.toString()
        })
        req.on("end", async () => {
          try {
            const { to, subject, html } = JSON.parse(body)

            const apiKey = envVars.RESEND_API_KEY || ""
            const fromName = envVars.EMAIL_FROM_NAME || "BeepBeepCity"
            const fromEmail = envVars.EMAIL_FROM_ADDRESS || "contact@ohmydev.fr"
            const replyTo = envVars.EMAIL_REPLY_TO || fromEmail

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
            res.setHeader("Content-Type", "application/json")
            res.statusCode = response.ok ? 200 : 400
            res.end(JSON.stringify(data))
          } catch {
            res.statusCode = 500
            res.end(JSON.stringify({ error: "Internal server error" }))
          }
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), resendProxy()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
