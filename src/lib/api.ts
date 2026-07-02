import { SESSION_TOKEN_KEY } from "@/lib/constants"

if (import.meta.env.PROD && !import.meta.env.VITE_API_URL) {
  throw new Error(
    "VITE_API_URL est requis en production (fallback préprod interdit)"
  )
}

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://api.beepbeepcity-pp.aleygues.fr/ks/api"

const AUTH_ERROR_EVENT = "auth:expired"

// Anti-spam : quand N queries échouent en parallèle sur une session morte,
// on ne veut émettre qu'un seul auth:expired (sinon N toasts + N navigate).
// Le flag est remis à false après le prochain tick de l'event loop.
let authExpiredInFlight = false

export function onAuthExpired(callback: () => void) {
  window.addEventListener(AUTH_ERROR_EVENT, callback)
  return () => window.removeEventListener(AUTH_ERROR_EVENT, callback)
}

function emitAuthExpired() {
  if (authExpiredInFlight) return
  authExpiredInFlight = true
  window.dispatchEvent(new Event(AUTH_ERROR_EVENT))
  // Reset asynchrone : laisse passer la salve de queries concurrentes.
  setTimeout(() => {
    authExpiredInFlight = false
  }, 0)
}

/**
 * Détecte une expiration de session réelle. On ne veut PAS déconnecter
 * l'utilisateur sur un simple refus d'accès légitime (KS_ACCESS_DENIED sur
 * une mutation admin par ex) : seul un "not authenticated" signifie que la
 * session elle-même est invalide.
 */
function isSessionExpired(
  errors: Array<{ message?: string; extensions?: { code?: string } }>
) {
  return errors.some((e) =>
    e.message?.toLowerCase().includes("not authenticated")
  )
}

export function graphqlClient<
  TData,
  TVariables extends Record<string, unknown>,
>(
  query: string,
  variables?: TVariables,
  headers?: RequestInit["headers"]
): () => Promise<TData> {
  return async () => {
    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        ...(localStorage.getItem(SESSION_TOKEN_KEY)
          ? {
              Authorization: `Bearer ${localStorage.getItem(SESSION_TOKEN_KEY)}`,
            }
          : {}),
        ...(headers as Record<string, string>),
      },
      body: JSON.stringify({ query, variables }),
    })

    if (!response.ok) {
      throw new Error(
        `Erreur réseau (${response.status} ${response.statusText})`
      )
    }

    const json = await response.json()

    if (json.errors) {
      if (
        localStorage.getItem(SESSION_TOKEN_KEY) &&
        isSessionExpired(json.errors)
      ) {
        emitAuthExpired()
      }

      const message = json.errors[0]?.message || "Erreur GraphQL"
      throw new Error(message)
    }

    if (!json.data) throw new Error("Unexpected API response: missing data")

    return json.data
  }
}
