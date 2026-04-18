import { AreaChartCard } from "@/components/shared/area-chart-card"
import { useGetCoursesForStatsQuery } from "@/gql/generated"
import { avgByDay } from "@/lib/chart"
import { CHART_DAYS } from "@/lib/constants"

export function AvgBasketChart() {
  const { data, isLoading } = useGetCoursesForStatsQuery({})

  const chartData = data?.courses
    ? avgByDay(
        data.courses.map((c) => ({ createdAt: c.createdAt, value: c.price })),
        CHART_DAYS
      )
    : []

  return (
    <AreaChartCard
      title="Panier moyen (30 derniers jours)"
      data={chartData}
      dataKey="value"
      color="var(--color-chart-1)"
      configLabel="Panier moyen"
      isLoading={isLoading}
      formatter={(v) => `${v.toFixed(2)} \u20AC`}
    />
  )
}
