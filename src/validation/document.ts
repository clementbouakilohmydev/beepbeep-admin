import { z } from "zod"

/**
 * États possibles d'un document driver côté Keystone.
 * Source de vérité : back/api/src/models/{DrivingLicense,Insurance,Certificate,RegistrationDocument}.ts
 *
 * - `processing` : uploadé, à vérifier par un admin (état initial)
 * - `verified`   : validé par un admin
 * - `rejected`   : rejeté par un admin (driver doit re-uploader ; au prochain
 *                  upload, `previousPicture` est posée → diff visuel admin)
 *
 * (`pending` retiré lors de l'unification — était un doublon historique sur
 * DrivingLicense uniquement, sémantiquement identique à `processing`.)
 *
 * L'expiration n'est pas un state — c'est un champ séparé `expirationDatetimeUtc` +
 * un champ virtuel `isExpired` (sur Insurance et Certificate uniquement).
 */
export const DOCUMENT_STATES = ["processing", "verified", "rejected"] as const

export const documentStateSchema = z.enum(DOCUMENT_STATES)
export type DocumentState = z.infer<typeof documentStateSchema>

/** Constantes typées pour usage côté code (évite les strings magiques) */
export const DOCUMENT_STATE = {
  PROCESSING: "processing",
  VERIFIED: "verified",
  REJECTED: "rejected",
} as const satisfies Record<string, DocumentState>

/**
 * Valide qu'un id mongo/uuid n'est pas vide avant d'envoyer une mutation.
 */
export const documentMutationInputSchema = z.object({
  id: z.string().min(1, "id requis"),
  state: documentStateSchema,
})

export type DocumentMutationInput = z.infer<typeof documentMutationInputSchema>

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
