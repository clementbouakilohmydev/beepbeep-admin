import { AreaChartCard } from "@/components/shared/area-chart-card"
import { useGetAdminUsersTrendQuery } from "@/gql/generated"
import { mapTrendToChartData } from "@/lib/chart"
import { CHART_DAYS } from "@/lib/constants"

export function RegistrationChart() {
  const { data, isLoading } = useGetAdminUsersTrendQuery({
    days: CHART_DAYS,
  })
  const chartData = mapTrendToChartData(data?.adminUsersTrend, CHART_DAYS)

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
