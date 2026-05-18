import { SESSION_TOKEN_KEY } from "@/lib/constants"

/**
 * Ajoute le sessionToken en query param à une URL de fichier protégé
 * (`File.uri` du back). Nécessaire parce que les `<img src=...>` ne
 * peuvent pas envoyer le header `Authorization` → la route REST
 * `/ks/api/files/:id` accepte `?token=` en fallback (cf back routes.ts).
 *
 * Retourne null si pas de token ou pas d'URL — le composant appelant
 * doit gérer le cas absent.
 */
export function withSessionToken(
  url: string | null | undefined
): string | null {
  if (!url) return null
  const token = localStorage.getItem(SESSION_TOKEN_KEY)
  if (!token) return url
  const sep = url.includes("?") ? "&" : "?"
  return `${url}${sep}token=${encodeURIComponent(token)}`
}
