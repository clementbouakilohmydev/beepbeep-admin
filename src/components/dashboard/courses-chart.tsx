import { AreaChartCard } from "@/components/shared/area-chart-card"
import { useGetRecentCoursesQuery } from "@/gql/generated"
import { groupByDay } from "@/lib/chart"
import { CHART_DAYS } from "@/lib/constants"

export function CoursesChart() {
  const since = new Date()
  since.setDate(since.getDate() - (CHART_DAYS - 1))

  const { data, isLoading } = useGetRecentCoursesQuery({
    where: {
      createdAt: { gte: since.toISOString() },
    },
  })

  const chartData = data?.courses ? groupByDay(data.courses, CHART_DAYS) : []

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
