import { AreaChartCard } from "@/components/shared/area-chart-card"
import { useGetRecentUsersQuery } from "@/gql/generated"
import { groupByDay } from "@/lib/chart"
import { CHART_DAYS } from "@/lib/constants"

export function RegistrationChart() {
  const since = new Date()
  since.setDate(since.getDate() - (CHART_DAYS - 1))

  const { data, isLoading } = useGetRecentUsersQuery({
    where: {
      isAdmin: { equals: false },
      createdAt: { gte: since.toISOString() },
    },
  })

  const chartData = data?.users ? groupByDay(data.users, CHART_DAYS) : []

  return (
    <AreaChartCard
      title="Inscriptions (30 derniers jours)"
      data={chartData}
      dataKey="count"
      color="var(--color-primary)"
      configLabel="Inscriptions"
      isLoading={isLoading}
    />
  )
}
