import { Link } from "react-router-dom"
import {
  CircleCheckIcon,
  CircleAlertIcon,
  UsersIcon,
  CarIcon,
  UserIcon,
  CalendarIcon,
  CalendarDaysIcon,
  CalendarRangeIcon,
  StarIcon,
  FileTextIcon,
  PlayIcon,
  ClockIcon,
  XCircleIcon,
  RouteIcon,
  TimerIcon,
  HashIcon,
  ShieldBanIcon,
} from "lucide-react"
import { Skeleton } from "@/components/ui"
import {
  useGetTicketsCountsQuery,
  useGetUsersCountsQuery,
  useGetDriversAverageRatingQuery,
  useGetUsersQuery,
  useGetCoursesCountsQuery,
  useGetCoursesCountsByPeriodQuery,
  useGetCoursesForStatsQuery,
} from "@/gql/generated"
import { Card, CardContent } from "@/components/ui/card"
import { getDateWheres, getDateBoundaries } from "@/lib/date"
import { StatCard } from "@/components/shared/stat-card"
import {
  computeAvgDriverRating,
  computePendingDocsCount,
  computeAvgDistance,
  computeAvgAcceptanceTime,
} from "@/lib/statistics"
import { RegistrationChart } from "@/components/dashboard/registration-chart"
import { CoursesChart } from "@/components/dashboard/courses-chart"
import { ErrorState } from "@/components/shared/error-state"

function ShortcutCard({
  title,
  value,
  icon: Icon,
  iconClassName,
  to,
  isLoading,
}: {
  title: string
  value: number | string
  icon: React.ComponentType<{ className?: string }>
  iconClassName?: string
  to: string
  isLoading: boolean
}) {
  return (
    <Link to={to}>
      <Card className="transition-colors hover:border-primary/50 hover:bg-accent/50">
        <CardContent className="flex items-center gap-3 p-4">
          <div
            className={`flex size-10 items-center justify-center rounded-lg bg-primary/10 ${iconClassName ?? ""}`}
          >
            <Icon className="size-5" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground sm:text-sm">{title}</p>
            {isLoading ? (
              <Skeleton className="mt-1 h-6 w-10" />
            ) : (
              <p className="text-lg font-bold sm:text-xl">{value}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export function DashboardPage() {
  const { data: ticketsData, isLoading: ticketsLoading, isError, refetch } =
    useGetTicketsCountsQuery({})

  const dateWheres = getDateWheres()
  const { data: usersData, isLoading: usersLoading } =
    useGetUsersCountsQuery(dateWheres)

  const { data: driversData, isLoading: driversLoading } =
    useGetDriversAverageRatingQuery({})

  const averageDriverRating = computeAvgDriverRating(driversData?.users ?? [])

  const { data: driversListData, isLoading: driversListLoading } =
    useGetUsersQuery({
      where: { type: { equals: "driver" }, isAdmin: { equals: false } },
      orderBy: [{ createdAt: "desc" as const }],
      take: 200,
      skip: 0,
    })

  const pendingDocsCount = computePendingDocsCount(
    (driversListData?.users as Array<Record<string, unknown>>) ?? []
  )

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

  const { data: coursesStatsData, isLoading: coursesStatsLoading } =
    useGetCoursesForStatsQuery({})

  const avgDistance = computeAvgDistance(coursesStatsData?.courses ?? [])
  const avgAcceptanceTime = computeAvgAcceptanceTime(
    coursesStatsData?.courses ?? []
  )

  if (isError && !ticketsLoading) {
    return <ErrorState onRetry={refetch} />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Vue d'ensemble de l'activité
        </p>
      </div>

      {/* Shortcuts */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <ShortcutCard
          title="Tickets à traiter"
          value={ticketsData?.pending ?? 0}
          icon={CircleAlertIcon}
          iconClassName="text-destructive"
          to="/tickets?filter=pending"
          isLoading={ticketsLoading}
        />
        <ShortcutCard
          title="Documents à valider"
          value={pendingDocsCount}
          icon={FileTextIcon}
          iconClassName="text-yellow-600"
          to="/documents"
          isLoading={driversListLoading}
        />
        <ShortcutCard
          title="Conducteurs bloqués"
          value={usersData?.blocked ?? 0}
          icon={ShieldBanIcon}
          iconClassName="text-destructive"
          to="/users?status=blocked&type=driver"
          isLoading={usersLoading}
        />
        <ShortcutCard
          title="Nouveaux inscrits"
          value={usersData?.today ?? 0}
          icon={UsersIcon}
          iconClassName="text-primary"
          to="/users"
          isLoading={usersLoading}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <RegistrationChart />
        <CoursesChart />
      </div>

      {/* Tickets */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Tickets</h2>
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <StatCard
            title="Tickets à traiter"
            value={ticketsData?.pending ?? 0}
            icon={CircleAlertIcon}
            iconClassName="text-destructive"
            isLoading={ticketsLoading}
            to="/tickets?filter=pending"
          />
          <StatCard
            title="Tickets traités"
            value={ticketsData?.solved ?? 0}
            icon={CircleCheckIcon}
            iconClassName="text-primary"
            isLoading={ticketsLoading}
            to="/tickets?filter=solved"
          />
        </div>
      </div>

      {/* Users */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Utilisateurs</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <StatCard
            title="Aujourd'hui"
            value={usersData?.today ?? 0}
            icon={CalendarIcon}
            isLoading={usersLoading}
            to="/users"
          />
          <StatCard
            title="Cette semaine"
            value={usersData?.week ?? 0}
            icon={CalendarDaysIcon}
            isLoading={usersLoading}
            to="/users"
          />
          <StatCard
            title="Ce mois"
            value={usersData?.month ?? 0}
            icon={CalendarRangeIcon}
            isLoading={usersLoading}
            to="/users"
          />
          <StatCard
            title="Total"
            value={usersData?.total ?? 0}
            icon={UsersIcon}
            isLoading={usersLoading}
            to="/users"
          />
        </div>
        <div className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-4">
          <StatCard
            title="Passagers"
            value={usersData?.passengers ?? 0}
            icon={UserIcon}
            isLoading={usersLoading}
            to="/users?type=passenger"
          />
          <StatCard
            title="Conducteurs"
            value={usersData?.drivers ?? 0}
            icon={CarIcon}
            isLoading={usersLoading}
            to="/users?type=driver"
          />
          <StatCard
            title="Note moyenne conducteurs"
            value={averageDriverRating}
            icon={StarIcon}
            iconClassName="text-yellow-500"
            isLoading={driversLoading}
          />
        </div>
      </div>

      {/* Courses by status */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Courses — par statut</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <StatCard
            title="En cours"
            value={coursesCountsData?.inProgress ?? 0}
            icon={PlayIcon}
            iconClassName="text-blue-500"
            isLoading={coursesCountsLoading}
          />
          <StatCard
            title="En attente"
            value={coursesCountsData?.pending ?? 0}
            icon={ClockIcon}
            iconClassName="text-yellow-500"
            isLoading={coursesCountsLoading}
          />
          <StatCard
            title="Terminées"
            value={coursesCountsData?.completed ?? 0}
            icon={CircleCheckIcon}
            iconClassName="text-primary"
            isLoading={coursesCountsLoading}
          />
          <StatCard
            title="Annulées"
            value={coursesCountsData?.cancelled ?? 0}
            icon={XCircleIcon}
            iconClassName="text-destructive"
            isLoading={coursesCountsLoading}
          />
        </div>
      </div>

      {/* Courses by period */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Courses — par période</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          <StatCard
            title="Aujourd'hui"
            value={coursesByPeriodData?.today ?? 0}
            icon={CalendarIcon}
            isLoading={coursesByPeriodLoading}
          />
          <StatCard
            title="Cette semaine"
            value={coursesByPeriodData?.week ?? 0}
            icon={CalendarDaysIcon}
            isLoading={coursesByPeriodLoading}
          />
          <StatCard
            title="Ce mois"
            value={coursesByPeriodData?.month ?? 0}
            icon={CalendarRangeIcon}
            isLoading={coursesByPeriodLoading}
          />
          <StatCard
            title="Cette année"
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
        <div className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4">
          <StatCard
            title="Distance moyenne par course"
            value={avgDistance}
            icon={RouteIcon}
            iconClassName="text-blue-500"
            isLoading={coursesStatsLoading}
          />
          <StatCard
            title="Temps moyen d'acceptation"
            value={avgAcceptanceTime}
            icon={TimerIcon}
            iconClassName="text-yellow-500"
            isLoading={coursesStatsLoading}
          />
        </div>
      </div>

      {/* Documents */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Documents</h2>
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <StatCard
            title="Documents à valider"
            value={pendingDocsCount}
            icon={FileTextIcon}
            iconClassName="text-yellow-500"
            isLoading={driversListLoading}
            to="/documents"
          />
        </div>
      </div>
    </div>
  )
}
