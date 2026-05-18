import {
  PlayIcon,
  ClockIcon,
  CircleCheckIcon,
  XCircleIcon,
  CalendarIcon,
  CalendarDaysIcon,
  CalendarRangeIcon,
  HashIcon,
  RouteIcon,
} from "lucide-react"
import { StatCard } from "@/components/shared/stat-card"
import {
  useGetCoursesCountsQuery,
  useGetCoursesCountsByPeriodQuery,
} from "@/gql/generated"
import { getDateBoundaries } from "@/lib/date"
import { ErrorState } from "@/components/shared/error-state"
import { CoursesStatusChart } from "@/components/performance/courses-status-chart"
import { CoursesTrendChart } from "@/components/performance/courses-trend-chart"
import { CoursesMetrics } from "@/components/performance/courses-metrics"
import { AvgDistanceChart } from "@/components/performance/avg-distance-chart"

export function PerformancePage() {
  const { data: statusData, isLoading: statusLoading, isError, refetch } =
    useGetCoursesCountsQuery({})

  const dateBoundaries = getDateBoundaries()
  const { data: periodData, isLoading: periodLoading } =
    useGetCoursesCountsByPeriodQuery({
      todayWhere: { createdAt: { gte: dateBoundaries.todayISO } },
      weekWhere: { createdAt: { gte: dateBoundaries.weekISO } },
      monthWhere: { createdAt: { gte: dateBoundaries.monthISO } },
      yearWhere: { createdAt: { gte: dateBoundaries.yearISO } },
    })

  if (isError && !statusLoading) {
    return <ErrorState onRetry={refetch} />
  }

  return (
    <div className="space-y-6">
      {/* Status counts */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Par statut</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <StatCard
            title="En cours"
            value={statusData?.inProgress ?? 0}
            icon={PlayIcon}
            iconClassName="text-blue-500"
            isLoading={statusLoading}
          />
          <StatCard
            title="Rejetées"
            value={statusData?.rejected ?? 0}
            icon={ClockIcon}
            iconClassName="text-yellow-500"
            isLoading={statusLoading}
          />
          <StatCard
            title="Terminées"
            value={statusData?.completed ?? 0}
            icon={CircleCheckIcon}
            iconClassName="text-primary"
            isLoading={statusLoading}
          />
          <StatCard
            title="Annulées"
            value={statusData?.cancelled ?? 0}
            icon={XCircleIcon}
            iconClassName="text-destructive"
            isLoading={statusLoading}
          />
        </div>
      </div>

      {/* Period counts */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Par période</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          <StatCard
            title="Aujourd'hui"
            value={periodData?.today ?? 0}
            icon={CalendarIcon}
            isLoading={periodLoading}
          />
          <StatCard
            title="Cette semaine"
            value={periodData?.week ?? 0}
            icon={CalendarDaysIcon}
            isLoading={periodLoading}
          />
          <StatCard
            title="Ce mois"
            value={periodData?.month ?? 0}
            icon={CalendarRangeIcon}
            isLoading={periodLoading}
          />
          <StatCard
            title="Cette année"
            value={periodData?.year ?? 0}
            icon={HashIcon}
            isLoading={periodLoading}
          />
          <StatCard
            title="Total"
            value={periodData?.total ?? 0}
            icon={RouteIcon}
            isLoading={periodLoading}
          />
        </div>
      </div>

      {/* Metrics */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">
          Métriques (courses terminées)
        </h2>
        <CoursesMetrics />
      </div>

      {/* Charts */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Visualisation</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <CoursesTrendChart />
          <AvgDistanceChart />
          <CoursesStatusChart data={statusData} isLoading={statusLoading} />
        </div>
      </div>
    </div>
  )
}
