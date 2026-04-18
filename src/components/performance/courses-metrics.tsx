import {
  RouteIcon,
  TimerIcon,
  ClockIcon,
  BanknoteIcon,
} from "lucide-react"
import { StatCard } from "@/components/shared/stat-card"
import type { GetCoursesForStatsQuery } from "@/gql/generated"
import {
  computeAvgDistance,
  computeAvgAcceptanceTime,
  computeAvgDuration,
  computeAvgPrice,
} from "@/lib/statistics"

type Course = NonNullable<GetCoursesForStatsQuery["courses"]>[number]

type CoursesMetricsProps = {
  courses: Course[] | undefined
  isLoading: boolean
}

const METRICS = [
  {
    key: "distance",
    label: "Distance moyenne",
    icon: RouteIcon,
    iconClassName: "text-blue-500",
    compute: computeAvgDistance,
  },
  {
    key: "acceptance",
    label: "Temps moyen d'acceptation",
    icon: TimerIcon,
    iconClassName: "text-yellow-500",
    compute: computeAvgAcceptanceTime,
  },
  {
    key: "duration",
    label: "Durée moyenne",
    icon: ClockIcon,
    iconClassName: "text-purple-500",
    compute: computeAvgDuration,
  },
  {
    key: "price",
    label: "Prix moyen",
    icon: BanknoteIcon,
    iconClassName: "text-green-500",
    compute: computeAvgPrice,
  },
] as const

export function CoursesMetrics({ courses, isLoading }: CoursesMetricsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {METRICS.map(({ key, label, icon, iconClassName, compute }) => (
        <StatCard
          key={key}
          title={label}
          value={courses ? compute(courses) : "—"}
          icon={icon}
          iconClassName={iconClassName}
          isLoading={isLoading}
        />
      ))}
    </div>
  )
}
