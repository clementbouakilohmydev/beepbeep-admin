import { useMemo } from "react"
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
} from "lucide-react"
import { Skeleton } from "@/components"
import {
  useGetTicketsCountsQuery,
  useGetUsersCountsQuery,
  useGetDriversAverageRatingQuery,
  useGetUsersQuery,
  useGetCoursesCountsQuery,
  useGetCoursesCountsByPeriodQuery,
  useGetCoursesForStatsQuery,
} from "@/gql/generated"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDateWheres, getDateBoundaries } from "@/lib/date"

function StatCard({
  title,
  value,
  icon: Icon,
  iconClassName,
  isLoading,
  to,
}: {
  title: string
  value: number | string
  icon: React.ComponentType<{ className?: string }>
  iconClassName?: string
  isLoading: boolean
  to?: string
}) {
  const card = (
    <Card className={to ? "transition-colors hover:border-primary/50" : ""}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon
          className={`size-4 ${iconClassName ?? "text-muted-foreground"}`}
        />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-9 w-16" />
        ) : (
          <div className="text-3xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  )

  if (to) return <Link to={to}>{card}</Link>
  return card
}

export function DashboardPage() {
  const { data: ticketsData, isLoading: ticketsLoading } =
    useGetTicketsCountsQuery({})

  const dateWheres = useMemo(() => getDateWheres(), [])
  const { data: usersData, isLoading: usersLoading } =
    useGetUsersCountsQuery(dateWheres)

  // TODO: Idéalement, cette moyenne devrait être calculée côté back via une route custom
  const { data: driversData, isLoading: driversLoading } =
    useGetDriversAverageRatingQuery({})

  const averageDriverRating = useMemo(() => {
    const drivers = driversData?.users?.filter(
      (u) => u.averageRate != null && u.averageRate > 0
    )
    if (!drivers?.length) return "—"
    const avg =
      drivers.reduce((sum, u) => sum + (u.averageRate ?? 0), 0) / drivers.length
    return avg.toFixed(1)
  }, [driversData])

  const { data: driversListData, isLoading: driversListLoading } =
    useGetUsersQuery({
      where: { type: { equals: "driver" }, isAdmin: { equals: false } },
      orderBy: [{ createdAt: "desc" as const }],
      take: 200,
      skip: 0,
    })

  const pendingDocsCount = useMemo(() => {
    if (!driversListData?.users) return 0
    let count = 0
    for (const user of driversListData.users) {
      for (const key of [
        "drivingLicense",
        "insurance",
        "registrationDocument",
        "certificate",
      ] as const) {
        const doc = user[key] as { state?: string | null } | null | undefined
        if (doc?.state && doc.state !== "verified") count++
      }
    }
    return count
  }, [driversListData])

  // --- Courses ---
  const { data: coursesCountsData, isLoading: coursesCountsLoading } =
    useGetCoursesCountsQuery({})

  const dateBoundaries = useMemo(() => getDateBoundaries(), [])
  const { data: coursesByPeriodData, isLoading: coursesByPeriodLoading } =
    useGetCoursesCountsByPeriodQuery({
      todayWhere: { createdAt: { gte: dateBoundaries.todayISO } },
      weekWhere: { createdAt: { gte: dateBoundaries.weekISO } },
      monthWhere: { createdAt: { gte: dateBoundaries.monthISO } },
      yearWhere: { createdAt: { gte: dateBoundaries.yearISO } },
    })

  // TODO: La distance moyenne et le temps moyen d'acceptation devraient
  // être calculés côté back via une route custom pour éviter de fetch
  // toutes les courses côté client.
  const { data: coursesStatsData, isLoading: coursesStatsLoading } =
    useGetCoursesForStatsQuery({})

  const avgDistance = useMemo(() => {
    const courses = coursesStatsData?.courses?.filter(
      (c) => c.distance != null && c.distance > 0
    )
    if (!courses?.length) return "—"
    const avg =
      courses.reduce((sum, c) => sum + (c.distance ?? 0), 0) / courses.length
    return `${(avg / 1000).toFixed(1)} km`
  }, [coursesStatsData])

  const avgAcceptanceTime = useMemo(() => {
    const courses = coursesStatsData?.courses?.filter(
      (c) => c.createdAt && c.startDatetimeUtc
    )
    if (!courses?.length) return "—"
    let totalMs = 0
    let count = 0
    for (const c of courses) {
      const created = new Date(c.createdAt).getTime()
      const started = new Date(c.startDatetimeUtc).getTime()
      const diff = started - created
      if (diff > 0) {
        totalMs += diff
        count++
      }
    }
    if (!count) return "—"
    const avgMin = totalMs / count / 1000 / 60
    if (avgMin < 1) return `${Math.round(avgMin * 60)}s`
    if (avgMin < 60) return `${avgMin.toFixed(0)} min`
    return `${(avgMin / 60).toFixed(1)}h`
  }, [coursesStatsData])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Vue d'ensemble de l'activité
        </p>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold">Tickets</h2>
        <div className="grid gap-4 sm:grid-cols-2">
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

      <div>
        <h2 className="mb-3 text-lg font-semibold">Utilisateurs</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <StatCard
            title="Passagers"
            value={usersData?.passengers ?? 0}
            icon={UserIcon}
            isLoading={usersLoading}
            to="/users?filter=passenger"
          />
          <StatCard
            title="Conducteurs"
            value={usersData?.drivers ?? 0}
            icon={CarIcon}
            isLoading={usersLoading}
            to="/users?filter=driver"
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

      <div>
        <h2 className="mb-3 text-lg font-semibold">Courses — par statut</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      <div>
        <h2 className="mb-3 text-lg font-semibold">Courses — par période</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
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

      <div>
        <h2 className="mb-3 text-lg font-semibold">Documents</h2>
        <div className="grid gap-4 sm:grid-cols-2">
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
