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

const COLORS = [
  "var(--color-chart-1)",
  "oklch(0.795 0.184 86.047)",
  "var(--color-primary)",
  "var(--color-destructive)",
]

type CoursesStatusBarChartProps = {
  data?: {
    inProgress?: number | null
    rejected?: number | null
    completed?: number | null
    canceled?: number | null
  }
  isLoading: boolean
}

export function CoursesStatusBarChart({
  data,
  isLoading,
}: CoursesStatusBarChartProps) {
  const chartData = [
    { name: "En cours", count: data?.inProgress ?? 0 },
    { name: "Rejetées", count: data?.rejected ?? 0 },
    { name: "Terminées", count: data?.completed ?? 0 },
    { name: "Annulées", count: data?.canceled ?? 0 },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          Courses par statut
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[200px] w-full" />
        ) : (
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
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
                width={30}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" name="count" radius={[4, 4, 0, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
