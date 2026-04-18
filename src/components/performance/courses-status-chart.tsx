import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle, Skeleton } from "@/components/ui"

const chartConfig = {
  count: { label: "Courses" },
} satisfies ChartConfig

const STATUS_COLORS: Record<string, string> = {
  "En cours": "var(--color-blue-500, #3b82f6)",
  "En attente": "var(--color-yellow-500, #eab308)",
  "Terminées": "var(--color-primary, hsl(var(--primary)))",
  "Annulées": "var(--color-destructive, hsl(var(--destructive)))",
}

type CoursesStatusChartProps = {
  data?: {
    inProgress?: number | null
    pending?: number | null
    completed?: number | null
    cancelled?: number | null
  }
  isLoading: boolean
}

export function CoursesStatusChart({ data, isLoading }: CoursesStatusChartProps) {
  const chartData = [
    { name: "En cours", count: data?.inProgress ?? 0 },
    { name: "En attente", count: data?.pending ?? 0 },
    { name: "Terminées", count: data?.completed ?? 0 },
    { name: "Annulées", count: data?.cancelled ?? 0 },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          Répartition par statut
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[250px] w-full" />
        ) : (
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                fontSize={11}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                fontSize={11}
                allowDecimals={false}
                width={40}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" name="count" radius={[4, 4, 0, 0]}>
                {chartData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={STATUS_COLORS[entry.name] ?? "var(--color-primary)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
