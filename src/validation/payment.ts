import { z } from "zod"

/**
 * États possibles d'un Payment côté Keystone (cf bo-v2/api/src/models/Payment.ts).
 *
 * Cycle de vie typique : pending → succeeded → transferred (driver payout)
 * Erreurs / annulations : failed, refunded, cancelled, rejected, failedRefund
 */
export const PAYMENT_STATES = [
  "pending",
  "succeeded",
  "failed",
  "transferred",
  "refunded",
  "failedRefund",
  "cancelled",
  "rejected",
] as const

export const paymentStateSchema = z.enum(PAYMENT_STATES)
export type PaymentState = z.infer<typeof paymentStateSchema>

export const PAYMENT_STATE = {
  PENDING: "pending",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
  TRANSFERRED: "transferred",
  REFUNDED: "refunded",
  FAILED_REFUND: "failedRefund",
  CANCELLED: "cancelled",
  REJECTED: "rejected",
} as const satisfies Record<string, PaymentState>

/**
 * Schéma d'un Payment tel que retourné par GraphQL.
 * Tous les champs sont optionnels car les sélections varient.
 */
export const paymentSchema = z.object({
  id: z.string(),
  state: paymentStateSchema.nullable().optional(),
  price: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .nullable()
    .optional(),
  fees: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .nullable()
    .optional(),
  stripePaymentIntentId: z.string().nullable().optional(),
  capturedAt: z.string().nullable().optional(),
  refundedAt: z.string().nullable().optional(),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
})

export type PaymentParsed = z.infer<typeof paymentSchema>

/** True si le payment est dans un état terminal (plus de transition attendue). */
export function isPaymentTerminal(state: PaymentState | null | undefined): boolean {
  if (!state) return false
  return (
    [
      "transferred",
      "refunded",
      "failedRefund",
      "cancelled",
      "rejected",
    ] satisfies PaymentState[]
  ).includes(state as never)
}
