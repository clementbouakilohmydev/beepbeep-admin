import { LOCALE } from "@/lib/constants"

/**
 * Groups items by day for chart display.
 * Returns an array of { date, count } for the last N days.
 */
export function groupByDay(
  items: Array<{ createdAt?: string | null }>,
  days: number
) {
  const now = new Date()
  const dateKeys: string[] = []
  const result: { date: string; count: number }[] = []

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    dateKeys.push(d.toISOString().slice(0, 10))
    result.push({
      date: d.toLocaleDateString(LOCALE, {
        day: "numeric",
        month: "short",
      }),
      count: 0,
    })
  }

  for (const item of items) {
    if (!item.createdAt) continue
    const key = new Date(item.createdAt).toISOString().slice(0, 10)
    const idx = dateKeys.indexOf(key)
    if (idx !== -1) result[idx].count++
  }

  return result
}
