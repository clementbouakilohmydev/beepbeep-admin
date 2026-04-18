import {
  BanknoteIcon,
  TrendingUpIcon,
  ShoppingCartIcon,
  CalendarIcon,
  CalendarDaysIcon,
  CalendarRangeIcon,
  HashIcon,
  DownloadIcon,
  SmartphoneIcon,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui"
import { StatCard } from "@/components/shared/stat-card"
import { ErrorState } from "@/components/shared/error-state"
import { useGetCoursesForStatsQuery } from "@/gql/generated"
import { getDateBoundaries } from "@/lib/date"
import { formatCurrency } from "@/lib/format"

type Course = {
  price?: number | null
  fees?: number | null
  createdAt?: string | null
}

function computeRevenue(courses: Course[], since?: string) {
  const filtered = since
    ? courses.filter((c) => c.createdAt && c.createdAt >= since)
    : courses
  const total = filtered.reduce((sum, c) => sum + (c.price ?? 0), 0)
  return total
}

function computeFees(courses: Course[], since?: string) {
  const filtered = since
    ? courses.filter((c) => c.createdAt && c.createdAt >= since)
    : courses
  return filtered.reduce((sum, c) => sum + (c.fees ?? 0), 0)
}

function computeAvgBasket(courses: Course[]) {
  const valid = courses.filter((c) => c.price != null && c.price > 0)
  if (!valid.length) return 0
  return valid.reduce((sum, c) => sum + (c.price ?? 0), 0) / valid.length
}

export function FinancePage() {
  const { data: statsData, isLoading: statsLoading, isError, refetch } =
    useGetCoursesForStatsQuery({})

  const courses = (statsData?.courses ?? []) as Course[]
  const boundaries = getDateBoundaries()

  const revenueToday = computeRevenue(courses, boundaries.todayISO)
  const revenueWeek = computeRevenue(courses, boundaries.weekISO)
  const revenueMonth = computeRevenue(courses, boundaries.monthISO)
  const revenueYear = computeRevenue(courses, boundaries.yearISO)
  const revenueTotal = computeRevenue(courses)

  const feesTotal = computeFees(courses)
  const avgBasket = computeAvgBasket(courses)

  if (isError && !statsLoading) {
    return <ErrorState onRetry={refetch} />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Économie & Finances</h1>
        <p className="text-sm text-muted-foreground">
          Revenus, panier moyen et indicateurs financiers
        </p>
      </div>

      {/* Revenue */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">
          Chiffre d'affaires (courses terminées)
        </h2>
        <p className="mb-3 text-xs text-muted-foreground">
          Basé sur les 500 dernières courses terminées. Pour des données
          exhaustives, une agrégation côté serveur est nécessaire.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          <StatCard
            title="Aujourd'hui"
            value={formatCurrency(revenueToday)}
            icon={CalendarIcon}
            iconClassName="text-green-500"
            isLoading={statsLoading}
          />
          <StatCard
            title="Cette semaine"
            value={formatCurrency(revenueWeek)}
            icon={CalendarDaysIcon}
            iconClassName="text-green-500"
            isLoading={statsLoading}
          />
          <StatCard
            title="Ce mois"
            value={formatCurrency(revenueMonth)}
            icon={CalendarRangeIcon}
            iconClassName="text-green-500"
            isLoading={statsLoading}
          />
          <StatCard
            title="Cette année"
            value={formatCurrency(revenueYear)}
            icon={HashIcon}
            iconClassName="text-green-500"
            isLoading={statsLoading}
          />
          <StatCard
            title="Total"
            value={formatCurrency(revenueTotal)}
            icon={TrendingUpIcon}
            iconClassName="text-green-500"
            isLoading={statsLoading}
          />
        </div>
      </div>

      {/* Key metrics */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Indicateurs clés</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          <StatCard
            title="Panier moyen"
            value={formatCurrency(avgBasket)}
            icon={ShoppingCartIcon}
            iconClassName="text-blue-500"
            isLoading={statsLoading}
            subtitle="Par course terminée"
          />
          <StatCard
            title="Commissions totales"
            value={formatCurrency(feesTotal)}
            icon={BanknoteIcon}
            iconClassName="text-purple-500"
            isLoading={statsLoading}
            subtitle="Fees sur les 500 dernières courses"
          />
          <StatCard
            title="CA net (hors commissions)"
            value={formatCurrency(revenueTotal - feesTotal)}
            icon={TrendingUpIcon}
            iconClassName="text-green-500"
            isLoading={statsLoading}
            subtitle="Total - commissions"
          />
        </div>
      </div>

      {/* Downloads — placeholder */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Téléchargements</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center gap-3 py-8">
              <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
                <SmartphoneIcon className="size-6 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="font-medium">App Store (iOS)</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Nécessite une intégration avec l'API App Store Connect
                </p>
              </div>
              <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-600">
                À configurer
              </span>
            </CardContent>
          </Card>
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center gap-3 py-8">
              <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
                <DownloadIcon className="size-6 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="font-medium">Google Play (Android)</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Nécessite une intégration avec l'API Google Play Console
                </p>
              </div>
              <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-600">
                À configurer
              </span>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
