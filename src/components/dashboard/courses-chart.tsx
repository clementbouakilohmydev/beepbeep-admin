import { AreaChartCard } from "@/components/shared/area-chart-card"
import { useGetAdminCoursesTrendQuery } from "@/gql/generated"
import { mapTrendToChartData } from "@/lib/chart"
import { CHART_DAYS } from "@/lib/constants"

export function CoursesChart() {
  const { data, isLoading } = useGetAdminCoursesTrendQuery({
    days: CHART_DAYS,
  })
  const chartData = mapTrendToChartData(data?.adminCoursesTrend, CHART_DAYS)

  return (
    <AreaChartCard
      title="Courses (30 derniers jours)"
      data={chartData}
      dataKey="count"
      color="var(--color-primary)"
      configLabel="Courses"
      isLoading={isLoading}
    />
  )
}
