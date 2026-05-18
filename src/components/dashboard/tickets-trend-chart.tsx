import { AreaChartCard } from "@/components/shared/area-chart-card"
import { useGetAdminTicketsTrendQuery } from "@/gql/generated"
import { mapTrendToChartData } from "@/lib/chart"
import { CHART_DAYS } from "@/lib/constants"

export function TicketsTrendChart() {
  const { data, isLoading } = useGetAdminTicketsTrendQuery({
    days: CHART_DAYS,
  })
  const chartData = mapTrendToChartData(data?.adminTicketsTrend, CHART_DAYS)

  return (
    <AreaChartCard
      title="Tickets (30 derniers jours)"
      data={chartData}
      dataKey="count"
      color="var(--color-destructive)"
      configLabel="Tickets"
      isLoading={isLoading}
    />
  )
}
