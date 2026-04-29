import { z } from "zod"

/**
 * États possibles d'un Payment côté Keystone.
 * Source de vérité : back/api/src/models/Payment.ts (Payment.state.options).
 *
 * Cycle de vie :
 *   pending → verification → authorized → succeeded → transferred (driver payout)
 * Branches d'échec / remboursement : rejected, refunded, failedRefund.
 *
 * Note : Payment n'a pas d'état "canceled" (les courses annulées sont signalées
 * sur Course.state, pas sur Payment).
 */
export const PAYMENT_STATES = [
  "pending",
  "verification",
  "authorized",
  "succeeded",
  "rejected",
  "refunded",
  "failedRefund",
  "transferred",
] as const

export const paymentStateSchema = z.enum(PAYMENT_STATES)
export type PaymentState = z.infer<typeof paymentStateSchema>

export const PAYMENT_STATE = {
  PENDING: "pending",
  VERIFICATION: "verification",
  AUTHORIZED: "authorized",
  SUCCEEDED: "succeeded",
  REJECTED: "rejected",
  REFUNDED: "refunded",
  FAILED_REFUND: "failedRefund",
  TRANSFERRED: "transferred",
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
    ["transferred", "refunded", "failedRefund", "rejected"] satisfies PaymentState[]
  ).includes(state as never)
}
