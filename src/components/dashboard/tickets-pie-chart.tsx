import { type ChartConfig } from "@/components/ui/chart"
import { PieChartCard } from "@/components/shared/pie-chart-card"

const chartConfig = {
  pending: { label: "À traiter", color: "var(--color-destructive)" },
  solved: { label: "Traités", color: "var(--color-primary)" },
} satisfies ChartConfig

type TicketsPieChartProps = {
  pending: number
  solved: number
  isLoading: boolean
}

export function TicketsPieChart({
  pending,
  solved,
  isLoading,
}: TicketsPieChartProps) {
  const data = [
    { name: "À traiter", value: pending, fill: "var(--color-destructive)" },
    { name: "Traités", value: solved, fill: "var(--color-primary)" },
  ]

  return (
    <PieChartCard
      title="Tickets"
      data={data}
      config={chartConfig}
      isLoading={isLoading}
    />
  )
}
