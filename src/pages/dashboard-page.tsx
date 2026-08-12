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
import { getDateWheres, getCourseWheres } from "@/lib/date"
import { StatCard } from "@/components/shared/stat-card"
import { SectionHeader } from "@/components/shared/section-header"
import { Separator } from "@/components/ui/separator"
import {
  formatDistanceMeters,
  formatMatchingTimeSeconds,
  formatRating,
} from "@/lib/statistics"
import { RegistrationChart } from "@/components/dashboard/registration-chart"
import { CoursesChart } from "@/components/dashboard/courses-chart"
import { UsersDistributionChart } from "@/components/dashboard/users-distribution-chart"
import { CoursesStatusBarChart } from "@/components/dashboard/courses-status-bar-chart"
import { TicketsPieChart } from "@/components/dashboard/tickets-pie-chart"
import { TicketsTrendChart } from "@/components/dashboard/tickets-trend-chart"
import { ErrorState } from "@/components/shared/error-state"

// Polling 30s sur les KPIs qui bougent quotidiennement (tickets,
// documents pending, courses counts, users counts). Le dashboard est un
// outil ops → on veut voir les nouveaux tickets / docs apparaître sans
// reload manuel. Cf BACK_TODO doc #14.
const DASHBOARD_REFETCH_INTERVAL_MS = 30_000

export function DashboardPage() {
  const {
    data: ticketsData,
    isLoading: ticketsLoading,
    isError,
    refetch,
  } = useGetTicketsCountsQuery(
    {},
    { refetchInterval: DASHBOARD_REFETCH_INTERVAL_MS }
  )

  const dateWheres = getDateWheres()
  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
  } = useGetUsersCountsQuery(dateWheres, {
    refetchInterval: DASHBOARD_REFETCH_INTERVAL_MS,
  })

  const {
    data: driversRatingData,
    isLoading: driversRatingLoading,
    isError: driversRatingError,
  } = useGetAdminDriversAverageRatingQuery({})

  const averageDriverRating = formatRating(
    driversRatingData?.adminDriversAverageRating
  )

  const {
    data: pendingDocsData,
    isLoading: pendingDocsLoading,
    isError: pendingDocsError,
  } = useGetAdminPendingDocumentsCountQuery(
    {},
    { refetchInterval: DASHBOARD_REFETCH_INTERVAL_MS }
  )

  const pendingDocsCount = pendingDocsData?.adminPendingDocumentsCount ?? 0

  const {
    data: coursesCountsData,
    isLoading: coursesCountsLoading,
    isError: coursesCountsError,
  } = useGetCoursesCountsQuery(
    {},
    { refetchInterval: DASHBOARD_REFETCH_INTERVAL_MS }
  )

  const {
    data: coursesByPeriodData,
    isLoading: coursesByPeriodLoading,
    isError: coursesByPeriodError,
  } = useGetCoursesCountsByPeriodQuery(getCourseWheres(), {
    refetchInterval: DASHBOARD_REFETCH_INTERVAL_MS,
  })

  /**
   * Sous-titre « sur N créées » — affiché seulement quand le nombre de
   * courses créées diffère du nombre de courses effectuées, pour ne pas
   * alourdir les cartes quand les deux coïncident.
   */
  const createdSubtitle = (
    done: number | null | undefined,
    created: number | null | undefined
  ) =>
    created != null && created !== (done ?? 0)
      ? `sur ${created} créée${created > 1 ? "s" : ""}`
      : undefined

  const {
    data: coursesMetricsData,
    isLoading: coursesMetricsLoading,
    isError: coursesMetricsError,
  } = useGetAdminCoursesMetricsQuery({})

  const avgDistance = formatDistanceMeters(
    coursesMetricsData?.adminCoursesMetrics.averageDistance
  )
  const avgMatchingTime = formatMatchingTimeSeconds(
    coursesMetricsData?.adminCoursesMetrics.averageMatchingTimeSeconds
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
          isError={pendingDocsError}
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
          isError={driversRatingError}
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
            isError={usersError}
          />
          <StatCard
            title="Cette semaine"
            value={usersData?.week ?? 0}
            icon={CalendarDaysIcon}
            isLoading={usersLoading}
            isError={usersError}
          />
          <StatCard
            title="Ce mois"
            value={usersData?.month ?? 0}
            icon={CalendarRangeIcon}
            isLoading={usersLoading}
            isError={usersError}
          />
          <StatCard
            title="Total"
            value={usersData?.total ?? 0}
            icon={UsersIcon}
            isLoading={usersLoading}
            isError={usersError}
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
          title="Courses effectuées"
          to="/performance"
          linkLabel="Performance"
        />

        {/* Valeur principale = courses terminées et payées (même définition
            que la page Finance). Le nombre de courses créées, lui, reste
            visible en sous-titre et dans le graphe par statut ci-dessous. */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          <StatCard
            title="Aujourd'hui"
            value={coursesByPeriodData?.todayDone ?? 0}
            subtitle={createdSubtitle(
              coursesByPeriodData?.todayDone,
              coursesByPeriodData?.today
            )}
            icon={CalendarIcon}
            isLoading={coursesByPeriodLoading}
            isError={coursesByPeriodError}
          />
          <StatCard
            title="Semaine"
            value={coursesByPeriodData?.weekDone ?? 0}
            subtitle={createdSubtitle(
              coursesByPeriodData?.weekDone,
              coursesByPeriodData?.week
            )}
            icon={CalendarDaysIcon}
            isLoading={coursesByPeriodLoading}
            isError={coursesByPeriodError}
          />
          <StatCard
            title="Mois"
            value={coursesByPeriodData?.monthDone ?? 0}
            subtitle={createdSubtitle(
              coursesByPeriodData?.monthDone,
              coursesByPeriodData?.month
            )}
            icon={CalendarRangeIcon}
            isLoading={coursesByPeriodLoading}
            isError={coursesByPeriodError}
          />
          <StatCard
            title="Année"
            value={coursesByPeriodData?.yearDone ?? 0}
            subtitle={createdSubtitle(
              coursesByPeriodData?.yearDone,
              coursesByPeriodData?.year
            )}
            icon={HashIcon}
            isLoading={coursesByPeriodLoading}
            isError={coursesByPeriodError}
          />
          <StatCard
            title="Total"
            value={coursesByPeriodData?.totalDone ?? 0}
            subtitle={createdSubtitle(
              coursesByPeriodData?.totalDone,
              coursesByPeriodData?.total
            )}
            icon={RouteIcon}
            isLoading={coursesByPeriodLoading}
            isError={coursesByPeriodError}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <StatCard
            title="Distance moyenne"
            value={avgDistance}
            icon={RouteIcon}
            iconClassName="text-blue-500"
            isLoading={coursesMetricsLoading}
            isError={coursesMetricsError}
          />
          <StatCard
            title="Délai moyen de mise en relation"
            value={avgMatchingTime}
            subtitle="attente avant qu'un conducteur accepte"
            icon={TimerIcon}
            iconClassName="text-yellow-500"
            isLoading={coursesMetricsLoading}
            isError={coursesMetricsError}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <CoursesStatusBarChart
            data={coursesCountsData}
            isLoading={coursesCountsLoading}
            isError={coursesCountsError}
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
