import { z } from "zod"

/**
 * Validation runtime des données d'authentification.
 *
 * Keystone peut renvoyer une réponse au shape inattendu (champ supprimé,
 * accesses qui filtrent, version de l'API en avance/retard). Ces schemas
 * empêchent un cast aveugle de générer des erreurs silencieuses.
 *
 * Pattern emprunté à `beepbeepcity-app/validation/`.
 */

export const authUserSchema = z.object({
  id: z.string(),
  email: z.string().nullable().optional(),
  firstname: z.string().nullable().optional(),
  lastname: z.string().nullable().optional(),
  isAdmin: z.boolean().nullable().optional(),
})

export type AuthUserParsed = z.infer<typeof authUserSchema>

/**
 * Parse une donnée inconnue en AuthUser ou null.
 * Log un warning console si la validation échoue (utile en dev).
 */
export function parseAuthUser(input: unknown): AuthUserParsed | null {
  if (!input) return null
  const result = authUserSchema.safeParse(input)
  if (!result.success) {
    if (typeof console !== "undefined") {
      console.warn(
        "[auth] authenticatedItem validation failed:",
        result.error.issues
      )
    }
    return null
  }
  return result.data
}

export const loginSuccessSchema = z.object({
  __typename: z.literal("UserAuthenticationWithPasswordSuccess").optional(),
  sessionToken: z.string(),
  item: authUserSchema,
})

export const loginFailureSchema = z.object({
  __typename: z.literal("UserAuthenticationWithPasswordFailure").optional(),
  message: z.string(),
})

export const loginResponseSchema = z.discriminatedUnion("__typename", [
  loginSuccessSchema.required({ __typename: true }),
  loginFailureSchema.required({ __typename: true }),
])

export type LoginResponseParsed = z.infer<typeof loginResponseSchema>
