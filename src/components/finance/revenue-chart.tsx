import { AreaChartCard } from "@/components/shared/area-chart-card"
import { useGetCoursesForStatsQuery } from "@/gql/generated"
import { sumByDay } from "@/lib/chart"
import { CHART_DAYS } from "@/lib/constants"

export function RevenueChart() {
  const { data, isLoading } = useGetCoursesForStatsQuery({})

  const chartData = data?.courses
    ? sumByDay(
        data.courses.map((c) => ({ createdAt: c.createdAt, value: c.price })),
        CHART_DAYS
      )
    : []

  return (
    <AreaChartCard
      title="Revenus (30 derniers jours)"
      data={chartData}
      dataKey="value"
      color="var(--color-primary)"
      configLabel="Revenus"
      isLoading={isLoading}
      formatter={(v) => `${v.toFixed(2)} \u20AC`}
    />
  )
}
