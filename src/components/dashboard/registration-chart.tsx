import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle, Skeleton } from "@/components/ui"
import { useGetRecentUsersQuery } from "@/gql/generated"
import { groupByDay } from "@/lib/chart"
import { CHART_DAYS } from "@/lib/constants"

const chartConfig = {
  inscriptions: {
    label: "Inscriptions",
    color: "var(--color-primary)",
  },
} satisfies ChartConfig

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
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          Inscriptions (30 derniers jours)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[200px] w-full" />
        ) : (
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                fontSize={11}
                interval="preserveStartEnd"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                fontSize={11}
                allowDecimals={false}
                width={30}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="count"
                name="inscriptions"
                stroke="var(--color-primary)"
                fill="var(--color-primary)"
                fillOpacity={0.15}
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
