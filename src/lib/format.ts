import { LOCALE } from "@/lib/constants"

export function formatDate(date: string | null | undefined) {
  if (!date) return "—"
  return new Date(date).toLocaleDateString(LOCALE, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function getUserDisplay(
  user:
    | {
        firstname?: string | null
        lastname?: string | null
        email?: string | null
      }
    | null
    | undefined
) {
  if (!user) return "—"
  const name = `${user.firstname ?? ""} ${user.lastname ?? ""}`.trim()
  return name || user.email || "—"
}

export function formatShortDate(date: string | null | undefined) {
  if (!date) return "—"
  return new Date(date).toLocaleDateString(LOCALE, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(value)
}
