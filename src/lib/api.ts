import { SESSION_TOKEN_KEY } from "@/lib/constants"

const API_URL = import.meta.env.VITE_API_URL || "https://api.beepbeepcity-pp.aleygues.fr/ks/api"

const AUTH_ERROR_EVENT = "auth:expired"

export function onAuthExpired(callback: () => void) {
  window.addEventListener(AUTH_ERROR_EVENT, callback)
  return () => window.removeEventListener(AUTH_ERROR_EVENT, callback)
}

function isAuthError(
  errors: Array<{ message?: string; extensions?: { code?: string } }>
) {
  return errors.some(
    (e) =>
      e.extensions?.code === "KS_ACCESS_DENIED" ||
      e.message?.toLowerCase().includes("access denied") ||
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
          ? { Authorization: `Bearer ${localStorage.getItem(SESSION_TOKEN_KEY)}` }
          : {}),
        ...(headers as Record<string, string>),
      },
      body: JSON.stringify({ query, variables }),
    })

    const json = await response.json()

    if (json.errors) {
      if (localStorage.getItem(SESSION_TOKEN_KEY) && isAuthError(json.errors)) {
        window.dispatchEvent(new Event(AUTH_ERROR_EVENT))
      }

      const message = json.errors[0]?.message || "Erreur GraphQL"
      throw new Error(message)
    }

    if (!json.data) throw new Error("Unexpected API response: missing data")

    return json.data
  }
}
