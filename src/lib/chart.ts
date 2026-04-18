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

/**
 * Groups numeric values by day and computes average per day.
 * Returns an array of { date, value } for the last N days.
 */
export function avgByDay(
  items: Array<{ createdAt?: string | null; value: number | null | undefined }>,
  days: number
) {
  const now = new Date()
  const dateKeys: string[] = []
  const result: { date: string; value: number }[] = []
  const sums: { total: number; count: number }[] = []

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    dateKeys.push(d.toISOString().slice(0, 10))
    result.push({
      date: d.toLocaleDateString(LOCALE, {
        day: "numeric",
        month: "short",
      }),
      value: 0,
    })
    sums.push({ total: 0, count: 0 })
  }

  for (const item of items) {
    if (!item.createdAt || item.value == null) continue
    const key = new Date(item.createdAt).toISOString().slice(0, 10)
    const idx = dateKeys.indexOf(key)
    if (idx !== -1) {
      sums[idx].total += item.value
      sums[idx].count++
    }
  }

  for (let i = 0; i < result.length; i++) {
    result[i].value = sums[i].count > 0
      ? Math.round((sums[i].total / sums[i].count) * 100) / 100
      : 0
  }

  return result
}

/**
 * Groups numeric values by day and computes sum per day.
 */
export function sumByDay(
  items: Array<{ createdAt?: string | null; value: number | null | undefined }>,
  days: number
) {
  const now = new Date()
  const dateKeys: string[] = []
  const result: { date: string; value: number }[] = []

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    dateKeys.push(d.toISOString().slice(0, 10))
    result.push({
      date: d.toLocaleDateString(LOCALE, {
        day: "numeric",
        month: "short",
      }),
      value: 0,
    })
  }

  for (const item of items) {
    if (!item.createdAt || item.value == null) continue
    const key = new Date(item.createdAt).toISOString().slice(0, 10)
    const idx = dateKeys.indexOf(key)
    if (idx !== -1) {
      result[idx].value = Math.round((result[idx].value + item.value) * 100) / 100
    }
  }

  return result
}
