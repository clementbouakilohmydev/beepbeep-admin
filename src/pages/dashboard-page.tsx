import {
  CircleCheckIcon,
  CircleAlertIcon,
  UsersIcon,
  CalendarIcon,
  CalendarDaysIcon,
  CalendarRangeIcon,
  StarIcon,
  FileTextIcon,
  RouteIcon,
  TimerIcon,
  HashIcon,
} from "lucide-react"
import {
  useGetTicketsCountsQuery,
  useGetUsersCountsQuery,
  useGetCoursesCountsQuery,
  useGetCoursesCountsByPeriodQuery,
  useGetAdminCoursesMetricsQuery,
  useGetAdminDriversAverageRatingQuery,
  useGetAdminPendingDocumentsCountQuery,
} from "@/gql/generated"
import { getDateWheres, getDateBoundaries } from "@/lib/date"
import { StatCard } from "@/components/shared/stat-card"
import { SectionHeader } from "@/components/shared/section-header"
import { Separator } from "@/components/ui/separator"
import {
  formatDistanceMeters,
  formatAcceptanceTimeSeconds,
  formatRating,
} from "@/lib/statistics"
import { RegistrationChart } from "@/components/dashboard/registration-chart"
import { CoursesChart } from "@/components/dashboard/courses-chart"
import { UsersDistributionChart } from "@/components/dashboard/users-distribution-chart"
import { CoursesStatusBarChart } from "@/components/dashboard/courses-status-bar-chart"
import { TicketsPieChart } from "@/components/dashboard/tickets-pie-chart"
import { TicketsTrendChart } from "@/components/dashboard/tickets-trend-chart"
import { ErrorState } from "@/components/shared/error-state"

export function DashboardPage() {
  const {
    data: ticketsData,
    isLoading: ticketsLoading,
    isError,
    refetch,
  } = useGetTicketsCountsQuery({})

  const dateWheres = getDateWheres()
  const { data: usersData, isLoading: usersLoading } =
    useGetUsersCountsQuery(dateWheres)

  const { data: driversRatingData, isLoading: driversRatingLoading } =
    useGetAdminDriversAverageRatingQuery({})

  const averageDriverRating = formatRating(
    driversRatingData?.adminDriversAverageRating
  )

  const { data: pendingDocsData, isLoading: pendingDocsLoading } =
    useGetAdminPendingDocumentsCountQuery({})

  const pendingDocsCount = pendingDocsData?.adminPendingDocumentsCount ?? 0

  const { data: coursesCountsData, isLoading: coursesCountsLoading } =
    useGetCoursesCountsQuery({})

  const dateBoundaries = getDateBoundaries()
  const { data: coursesByPeriodData, isLoading: coursesByPeriodLoading } =
    useGetCoursesCountsByPeriodQuery({
      todayWhere: { createdAt: { gte: dateBoundaries.todayISO } },
      weekWhere: { createdAt: { gte: dateBoundaries.weekISO } },
      monthWhere: { createdAt: { gte: dateBoundaries.monthISO } },
      yearWhere: { createdAt: { gte: dateBoundaries.yearISO } },
    })

  const { data: coursesMetricsData, isLoading: coursesMetricsLoading } =
    useGetAdminCoursesMetricsQuery({})

  const avgDistance = formatDistanceMeters(
    coursesMetricsData?.adminCoursesMetrics.averageDistance
  )
  const avgAcceptanceTime = formatAcceptanceTimeSeconds(
    coursesMetricsData?.adminCoursesMetrics.averageAcceptanceTimeSeconds
  )

  if (isError && !ticketsLoading) {
    return <ErrorState onRetry={refetch} />
  }

  return (
    <div className="space-y-8">
      {/* ─── Alertes ─── */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          title="Tickets à traiter"
          value={ticketsData?.pending ?? 0}
          icon={CircleAlertIcon}
          iconClassName="text-destructive"
          to="/tickets?filter=pending"
          isLoading={ticketsLoading}
        />
        <StatCard
          title="Documents à valider"
          value={pendingDocsCount}
          icon={FileTextIcon}
          iconClassName="text-yellow-600"
          to="/documents"
          isLoading={pendingDocsLoading}
        />
        <StatCard
          title="Tickets traités"
          value={ticketsData?.solved ?? 0}
          icon={CircleCheckIcon}
          isLoading={ticketsLoading}
          to="/tickets?filter=solved"
        />
        <StatCard
          title="Note conducteurs"
          value={averageDriverRating}
          icon={StarIcon}
          iconClassName="text-yellow-500"
          isLoading={driversRatingLoading}
        />
      </div>

      <Separator />

      {/* ─── Utilisateurs ─── */}
      <section className="space-y-4">
        <SectionHeader title="Utilisateurs" to="/users" />

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <StatCard
            title="Aujourd'hui"
            value={usersData?.today ?? 0}
            icon={CalendarIcon}
            isLoading={usersLoading}
          />
          <StatCard
            title="Cette semaine"
            value={usersData?.week ?? 0}
            icon={CalendarDaysIcon}
            isLoading={usersLoading}
          />
          <StatCard
            title="Ce mois"
            value={usersData?.month ?? 0}
            icon={CalendarRangeIcon}
            isLoading={usersLoading}
          />
          <StatCard
            title="Total"
            value={usersData?.total ?? 0}
            icon={UsersIcon}
            isLoading={usersLoading}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <UsersDistributionChart
            passengers={usersData?.passengers ?? 0}
            drivers={usersData?.drivers ?? 0}
            isLoading={usersLoading}
          />
          <RegistrationChart />
        </div>
      </section>

      <Separator />

      {/* ─── Courses ─── */}
      <section className="space-y-4">
        <SectionHeader
          title="Courses"
          to="/performance"
          linkLabel="Performance"
        />

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          <StatCard
            title="Aujourd'hui"
            value={coursesByPeriodData?.today ?? 0}
            icon={CalendarIcon}
            isLoading={coursesByPeriodLoading}
          />
          <StatCard
            title="Semaine"
            value={coursesByPeriodData?.week ?? 0}
            icon={CalendarDaysIcon}
            isLoading={coursesByPeriodLoading}
          />
          <StatCard
            title="Mois"
            value={coursesByPeriodData?.month ?? 0}
            icon={CalendarRangeIcon}
            isLoading={coursesByPeriodLoading}
          />
          <StatCard
            title="Année"
            value={coursesByPeriodData?.year ?? 0}
            icon={HashIcon}
            isLoading={coursesByPeriodLoading}
          />
          <StatCard
            title="Total"
            value={coursesByPeriodData?.total ?? 0}
            icon={RouteIcon}
            isLoading={coursesByPeriodLoading}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <StatCard
            title="Distance moyenne"
            value={avgDistance}
            icon={RouteIcon}
            iconClassName="text-blue-500"
            isLoading={coursesMetricsLoading}
          />
          <StatCard
            title="Temps d'acceptation"
            value={avgAcceptanceTime}
            icon={TimerIcon}
            iconClassName="text-yellow-500"
            isLoading={coursesMetricsLoading}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <CoursesStatusBarChart
            data={coursesCountsData}
            isLoading={coursesCountsLoading}
          />
          <CoursesChart />
        </div>
      </section>

      <Separator />

      {/* ─── Support ─── */}
      <section className="space-y-4">
        <SectionHeader title="Support" to="/tickets" />

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <StatCard
            title="À traiter"
            value={ticketsData?.pending ?? 0}
            icon={CircleAlertIcon}
            iconClassName="text-destructive"
            isLoading={ticketsLoading}
            to="/tickets?filter=pending"
          />
          <StatCard
            title="Traités"
            value={ticketsData?.solved ?? 0}
            icon={CircleCheckIcon}
            isLoading={ticketsLoading}
            to="/tickets?filter=solved"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <TicketsPieChart
            pending={ticketsData?.pending ?? 0}
            solved={ticketsData?.solved ?? 0}
            isLoading={ticketsLoading}
          />
          <TicketsTrendChart />
        </div>
      </section>
    </div>
  )
}
