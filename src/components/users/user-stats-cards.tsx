import {
  CalendarIcon,
  CalendarDaysIcon,
  CalendarRangeIcon,
  UsersIcon,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, Skeleton } from "@/components/ui"

type UserStatsCardsProps = {
  counts?: {
    today?: number | null
    week?: number | null
    month?: number | null
    total?: number | null
  }
  isLoading: boolean
}

const STATS = [
  { key: "today", label: "Aujourd'hui", icon: CalendarIcon },
  { key: "week", label: "Cette semaine", icon: CalendarDaysIcon },
  { key: "month", label: "Ce mois", icon: CalendarRangeIcon },
  { key: "total", label: "Total", icon: UsersIcon },
] as const

export function UserStatsCards({ counts, isLoading }: UserStatsCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {STATS.map(({ key, label, icon: Icon }) => (
        <Card key={key}>
          <CardHeader className="flex flex-row items-center justify-between pb-1 sm:pb-2">
            <CardTitle className="text-xs font-medium sm:text-sm">
              {label}
            </CardTitle>
            <Icon className="size-3.5 text-muted-foreground sm:size-4" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-7 w-12 sm:h-9 sm:w-16" />
            ) : (
              <div className="text-2xl font-bold sm:text-3xl">
                {counts?.[key] ?? 0}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
