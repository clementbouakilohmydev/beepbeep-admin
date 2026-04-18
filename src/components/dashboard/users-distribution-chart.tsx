import { type ChartConfig } from "@/components/ui/chart"
import { PieChartCard } from "@/components/shared/pie-chart-card"

const chartConfig = {
  passengers: { label: "Passagers", color: "var(--color-primary)" },
  drivers: { label: "Conducteurs", color: "var(--color-destructive)" },
} satisfies ChartConfig

type UsersDistributionChartProps = {
  passengers: number
  drivers: number
  isLoading: boolean
}

export function UsersDistributionChart({
  passengers,
  drivers,
  isLoading,
}: UsersDistributionChartProps) {
  const data = [
    { name: "Passagers", value: passengers, fill: "var(--color-primary)" },
    { name: "Conducteurs", value: drivers, fill: "var(--color-destructive)" },
  ]

  return (
    <PieChartCard
      title="Répartition des utilisateurs"
      data={data}
      config={chartConfig}
      isLoading={isLoading}
    />
  )
}
