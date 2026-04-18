import { AreaChartCard } from "@/components/shared/area-chart-card"
import { useGetCoursesForStatsQuery } from "@/gql/generated"
import { avgByDay } from "@/lib/chart"
import { CHART_DAYS } from "@/lib/constants"

export function AvgDistanceChart() {
  const { data, isLoading } = useGetCoursesForStatsQuery({})

  const chartData = data?.courses
    ? avgByDay(
        data.courses.map((c) => ({
          createdAt: c.createdAt,
          value: c.distance != null ? c.distance / 1000 : null,
        })),
        CHART_DAYS
      )
    : []

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
