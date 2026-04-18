import { AreaChartCard } from "@/components/shared/area-chart-card"
import { useGetTicketsQuery } from "@/gql/generated"
import { groupByDay } from "@/lib/chart"
import { CHART_DAYS } from "@/lib/constants"

export function TicketsTrendChart() {
  const since = new Date()
  since.setDate(since.getDate() - (CHART_DAYS - 1))

  const { data, isLoading } = useGetTicketsQuery({
    where: { createdAt: { gte: since.toISOString() } },
    orderBy: [{ createdAt: "asc" as const }],
    take: 1000,
    skip: 0,
  })

  const chartData = data?.tickets ? groupByDay(data.tickets, CHART_DAYS) : []

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
