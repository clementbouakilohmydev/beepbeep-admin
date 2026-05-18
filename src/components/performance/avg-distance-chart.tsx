import { AreaChartCard } from "@/components/shared/area-chart-card"
import { useGetAdminDailyAggregatesQuery } from "@/gql/generated"
import { mapDailyAggregatesToChartData } from "@/lib/chart"
import { CHART_DAYS } from "@/lib/constants"

export function AvgDistanceChart() {
  const { data, isLoading } = useGetAdminDailyAggregatesQuery({
    days: CHART_DAYS,
  })
  // averageDistance vient en mètres → on convertit en km pour l'affichage.
  const chartData = mapDailyAggregatesToChartData(
    data?.adminDailyAggregates?.map((p) => ({
      ...p,
      averageDistanceKm:
        p.averageDistance != null ? p.averageDistance / 1000 : 0,
    })),
    CHART_DAYS,
    "averageDistanceKm"
  )

  return (
    <AreaChartCard
      title="Distance moyenne par jour (km)"
      data={chartData}
      dataKey="value"
      color="#3b82f6"
      configLabel="Distance (km)"
      isLoading={isLoading}
      height={250}
    />
  )
}
