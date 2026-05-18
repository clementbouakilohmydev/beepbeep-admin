import { AreaChartCard } from "@/components/shared/area-chart-card"
import { useGetAdminDailyAggregatesQuery } from "@/gql/generated"
import { mapDailyAggregatesToChartData } from "@/lib/chart"
import { CHART_DAYS } from "@/lib/constants"

export function RevenueChart() {
  const { data, isLoading } = useGetAdminDailyAggregatesQuery({
    days: CHART_DAYS,
  })
  const chartData = mapDailyAggregatesToChartData(
    data?.adminDailyAggregates,
    CHART_DAYS,
    "revenue"
  )

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
