import { LOCALE } from "@/lib/constants"

/**
 * Helpers de mise en forme des trends serveur en buckets jour pour les
 * AreaChartCard. Les anciens groupByDay/avgByDay/sumByDay (qui faisaient
 * le regroupement côté client à partir d'une liste de rows brutes) ont
 * été supprimés au profit de ces mappers qui consomment directement la
 * réponse adminCoursesTrend / adminUsersTrend / adminTicketsTrend /
 * adminDailyAggregates (cf back/api/src/extensions/adminStats.ts).
 */

/**
 * Mappe la trend serveur ([{ date: "YYYY-MM-DD", count }]) sur les N derniers
 * jours en complétant les jours sans data à 0 et en formatant la date en
 * locale courte ("12 mai").
 */
export function mapTrendToChartData(
  trend: ReadonlyArray<{ date: string; count: number }> | null | undefined,
  days: number
) {
  const lookup = new Map<string, number>()
  for (const point of trend ?? []) lookup.set(point.date, point.count)

  const now = new Date()
  const result: { date: string; count: number }[] = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    result.push({
      date: d.toLocaleDateString(LOCALE, {
        day: "numeric",
        month: "short",
      }),
      count: lookup.get(key) ?? 0,
    })
  }
  return result
}

/**
 * Comme `mapTrendToChartData` mais sélectionne une métrique numérique
 * arbitraire (revenue/fees/averagePrice/averageDistance) sur les points
 * de `adminDailyAggregates`. Les jours absents sont remplis à 0.
 */
export function mapDailyAggregatesToChartData<
  T extends { date: string } & Record<string, unknown>
>(
  aggregates: ReadonlyArray<T> | null | undefined,
  days: number,
  metric: keyof T
) {
  const lookup = new Map<string, number>()
  for (const point of aggregates ?? []) {
    const value = point[metric]
    if (typeof value === "number") lookup.set(point.date, value)
  }

  const now = new Date()
  const result: { date: string; value: number }[] = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    result.push({
      date: d.toLocaleDateString(LOCALE, {
        day: "numeric",
        month: "short",
      }),
      value: lookup.get(key) ?? 0,
    })
  }
  return result
}
