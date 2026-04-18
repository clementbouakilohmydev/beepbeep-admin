import { Pie, PieChart, Cell } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle, Skeleton } from "@/components/ui"

type PieChartItem = {
  name: string
  value: number
  fill: string
}

type PieChartCardProps = {
  title: string
  data: PieChartItem[]
  config: ChartConfig
  isLoading: boolean
}

export function PieChartCard({ title, data, config, isLoading }: PieChartCardProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="mx-auto h-[200px] w-[200px] rounded-full" />
        ) : total === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">Aucune donnée</p>
        ) : (
          <ChartContainer config={config} className="mx-auto h-[200px] w-[250px]">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} strokeWidth={2}>
                {data.map((entry) => (<Cell key={entry.name} fill={entry.fill} />))}
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
        {!isLoading && total > 0 && (
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="size-3 rounded-full" style={{ backgroundColor: item.fill }} />
                <span>{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
