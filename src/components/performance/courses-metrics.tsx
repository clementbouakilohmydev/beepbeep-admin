import {
  RouteIcon,
  TimerIcon,
  ClockIcon,
  BanknoteIcon,
} from "lucide-react"
import { StatCard } from "@/components/shared/stat-card"
import { useGetAdminCoursesMetricsQuery } from "@/gql/generated"
import {
  formatDistanceMeters,
  formatAcceptanceTimeSeconds,
  formatDurationSeconds,
  formatPriceEur,
} from "@/lib/statistics"

export function CoursesMetrics() {
  const { data, isLoading } = useGetAdminCoursesMetricsQuery({})
  const m = data?.adminCoursesMetrics
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      <StatCard
        title="Distance moyenne"
        value={formatDistanceMeters(m?.averageDistance)}
        icon={RouteIcon}
        iconClassName="text-blue-500"
        isLoading={isLoading}
      />
      <StatCard
        title="Temps moyen d'acceptation"
        value={formatAcceptanceTimeSeconds(m?.averageAcceptanceTimeSeconds)}
        icon={TimerIcon}
        iconClassName="text-yellow-500"
        isLoading={isLoading}
      />
      <StatCard
        title="Durée moyenne"
        value={formatDurationSeconds(m?.averageDuration)}
        icon={ClockIcon}
        iconClassName="text-purple-500"
        isLoading={isLoading}
      />
      <StatCard
        title="Prix moyen"
        value={formatPriceEur(m?.averagePrice)}
        icon={BanknoteIcon}
        iconClassName="text-green-500"
        isLoading={isLoading}
      />
    </div>
  )
}
