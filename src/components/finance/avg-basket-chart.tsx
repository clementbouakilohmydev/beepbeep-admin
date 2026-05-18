import { AreaChartCard } from "@/components/shared/area-chart-card"
import { useGetAdminDailyAggregatesQuery } from "@/gql/generated"
import { mapDailyAggregatesToChartData } from "@/lib/chart"
import { CHART_DAYS } from "@/lib/constants"

export function AvgBasketChart() {
  const { data, isLoading } = useGetAdminDailyAggregatesQuery({
    days: CHART_DAYS,
  })
  const chartData = mapDailyAggregatesToChartData(
    data?.adminDailyAggregates,
    CHART_DAYS,
    "averagePrice"
  )

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
