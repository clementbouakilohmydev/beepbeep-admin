import {
  CalendarIcon,
  CalendarDaysIcon,
  CalendarRangeIcon,
  UsersIcon,
} from "lucide-react"
import { StatCard } from "@/components/shared/stat-card"

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
      {STATS.map(({ key, label, icon }) => (
        <StatCard
          key={key}
          title={label}
          value={counts?.[key] ?? 0}
          icon={icon}
          isLoading={isLoading}
        />
      ))}
    </div>
  )
}
