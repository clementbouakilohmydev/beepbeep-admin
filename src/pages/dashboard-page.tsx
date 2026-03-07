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
} from "lucide-react"
import { Skeleton } from "@/components"
import {
  useGetTicketsCountsQuery,
  useGetUsersCountsQuery,
  useGetDriversAverageRatingQuery,
  useGetUsersQuery,
} from "@/gql/generated"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDateWheres } from "@/lib/date"

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
