import { z } from "zod"

/**
 * États possibles d'un document driver côté Keystone.
 * Source de vérité : back/api/src/models/{DrivingLicense,Insurance,Certificate,RegistrationDocument}.ts
 *
 * - `pending`    : soumis, en attente de validation admin (état initial)
 * - `processing` : en cours d'examen
 * - `verified`   : validé par un admin
 *
 * L'expiration n'est pas un state — c'est un champ séparé `expirationDatetimeUtc` +
 * un champ virtuel `isExpired` (sur Insurance et Certificate uniquement).
 */
export const DOCUMENT_STATES = ["pending", "processing", "verified"] as const

export const documentStateSchema = z.enum(DOCUMENT_STATES)
export type DocumentState = z.infer<typeof documentStateSchema>

/** Constantes typées pour usage côté code (évite les strings magiques) */
export const DOCUMENT_STATE = {
  PENDING: "pending",
  PROCESSING: "processing",
  VERIFIED: "verified",
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
