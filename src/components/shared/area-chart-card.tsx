import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle, Skeleton } from "@/components/ui"

type AreaChartCardProps = {
  title: string
  data: Array<{ date: string; value: number }>
  dataKey?: string
  color: string
  configLabel: string
  isLoading: boolean
  height?: number
  formatter?: (value: number) => string
}

export function AreaChartCard({
  title,
  data,
  dataKey = "value",
  color,
  configLabel,
  isLoading,
  height = 200,
  formatter,
}: AreaChartCardProps) {
  const chartConfig = {
    [dataKey]: { label: configLabel, color },
  } satisfies ChartConfig

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="w-full" style={{ height }} />
        ) : (
          <ChartContainer config={chartConfig} className="w-full" style={{ height }}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={11} interval="preserveStartEnd" />
              <YAxis tickLine={false} axisLine={false} fontSize={11} allowDecimals={false} width={35} />
              <ChartTooltip content={<ChartTooltipContent formatter={formatter ? (value) => formatter(Number(value)) : undefined} />} />
              <Area type="monotone" dataKey={dataKey} name={dataKey} stroke={color} fill={color} fillOpacity={0.15} strokeWidth={2} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
