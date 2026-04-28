import { z } from "zod"

/**
 * États possibles d'un document driver côté Keystone.
 * Source : `beepbeepcity-bo-v2/api/src/models/{DrivingLicense,Insurance,...}.ts`
 *
 * - `todo`     : pas encore soumis ou rejeté (à refaire)
 * - `pending`  : soumis, en attente de validation admin
 * - `verified` : validé par un admin
 * - `expired`  : valide mais date d'expiration passée
 */
export const DOCUMENT_STATES = [
  "todo",
  "pending",
  "verified",
  "expired",
] as const

export const documentStateSchema = z.enum(DOCUMENT_STATES)
export type DocumentState = z.infer<typeof documentStateSchema>

/** Constantes typées pour usage côté code (évite les strings magiques) */
export const DOCUMENT_STATE = {
  TODO: "todo",
  PENDING: "pending",
  VERIFIED: "verified",
  EXPIRED: "expired",
} as const satisfies Record<string, DocumentState>

/**
 * Valide qu'un id mongo/uuid n'est pas vide avant d'envoyer une mutation.
 */
export const documentMutationInputSchema = z.object({
  id: z.string().min(1, "id requis"),
  state: documentStateSchema,
})

export type DocumentMutationInput = z.infer<
  typeof documentMutationInputSchema
>

/**
 * Type d'un document tel que retourné par les queries Keystone.
 * Utilisé pour valider les réponses runtime.
 */
export const documentSchema = z.object({
  id: z.string(),
  state: documentStateSchema.nullable().optional(),
  expirationDatetimeUtc: z.string().nullable().optional(),
  isExpired: z.boolean().nullable().optional(),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
  picture: z
    .object({
      id: z.string(),
      url: z.string(),
    })
    .nullable()
    .optional(),
})

export type DocumentParsed = z.infer<typeof documentSchema>
