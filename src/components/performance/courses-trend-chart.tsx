import { AreaChartCard } from "@/components/shared/area-chart-card"
import { useGetAdminCoursesTrendQuery } from "@/gql/generated"
import { mapTrendToChartData } from "@/lib/chart"
import { CHART_DAYS } from "@/lib/constants"

export function CoursesTrendChart() {
  const { data, isLoading } = useGetAdminCoursesTrendQuery({
    days: CHART_DAYS,
  })
  const chartData = mapTrendToChartData(data?.adminCoursesTrend, CHART_DAYS)

  return (
    <AreaChartCard
      title="Évolution des courses (30 jours)"
      data={chartData}
      dataKey="count"
      color="var(--color-primary)"
      configLabel="Courses"
      isLoading={isLoading}
      height={250}
    />
  )
}
