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
import { useGetAdminRevenueStatsQuery } from "@/gql/generated"
import { getDateBoundaries } from "@/lib/date"
import { formatCurrency } from "@/lib/format"
import { RevenueChart, AvgBasketChart } from "@/components/finance"

export function FinancePage() {
  const boundaries = getDateBoundaries()

  // CA agrégé serveur — 5 appels parallèles (un par fenêtre temporelle).
  // Chaque appel = 1 SUM/AVG/COUNT sur Course.state="paid" → léger même à
  // l'échelle (vs ancien fetch de 500 rows + recalcul JS).
  const todayQ = useGetAdminRevenueStatsQuery({ from: boundaries.todayISO })
  const weekQ = useGetAdminRevenueStatsQuery({ from: boundaries.weekISO })
  const monthQ = useGetAdminRevenueStatsQuery({ from: boundaries.monthISO })
  const yearQ = useGetAdminRevenueStatsQuery({ from: boundaries.yearISO })
  const totalQ = useGetAdminRevenueStatsQuery({})

  const isLoading =
    todayQ.isLoading ||
    weekQ.isLoading ||
    monthQ.isLoading ||
    yearQ.isLoading ||
    totalQ.isLoading

  const isError =
    todayQ.isError ||
    weekQ.isError ||
    monthQ.isError ||
    yearQ.isError ||
    totalQ.isError

  const refetch = () => {
    todayQ.refetch()
    weekQ.refetch()
    monthQ.refetch()
    yearQ.refetch()
    totalQ.refetch()
  }

  const revenueToday = todayQ.data?.adminRevenueStats.revenue ?? 0
  const revenueWeek = weekQ.data?.adminRevenueStats.revenue ?? 0
  const revenueMonth = monthQ.data?.adminRevenueStats.revenue ?? 0
  const revenueYear = yearQ.data?.adminRevenueStats.revenue ?? 0
  const revenueTotal = totalQ.data?.adminRevenueStats.revenue ?? 0
  const feesTotal = totalQ.data?.adminRevenueStats.fees ?? 0
  const avgBasket = totalQ.data?.adminRevenueStats.basket ?? 0

  if (isError && !isLoading) {
    return <ErrorState onRetry={refetch} />
  }

  return (
    <div className="space-y-6">
      {/* Revenue */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">
          Chiffre d'affaires (courses terminées)
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          <StatCard
            title="Aujourd'hui"
            value={formatCurrency(revenueToday)}
            icon={CalendarIcon}
            iconClassName="text-green-500"
            isLoading={todayQ.isLoading}
          />
          <StatCard
            title="Cette semaine"
            value={formatCurrency(revenueWeek)}
            icon={CalendarDaysIcon}
            iconClassName="text-green-500"
            isLoading={weekQ.isLoading}
          />
          <StatCard
            title="Ce mois"
            value={formatCurrency(revenueMonth)}
            icon={CalendarRangeIcon}
            iconClassName="text-green-500"
            isLoading={monthQ.isLoading}
          />
          <StatCard
            title="Cette année"
            value={formatCurrency(revenueYear)}
            icon={HashIcon}
            iconClassName="text-green-500"
            isLoading={yearQ.isLoading}
          />
          <StatCard
            title="Total"
            value={formatCurrency(revenueTotal)}
            icon={TrendingUpIcon}
            iconClassName="text-green-500"
            isLoading={totalQ.isLoading}
          />
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <RevenueChart />
        <AvgBasketChart />
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
            isLoading={totalQ.isLoading}
            subtitle="Par course terminée"
          />
          <StatCard
            title="Commissions totales"
            value={formatCurrency(feesTotal)}
            icon={BanknoteIcon}
            iconClassName="text-purple-500"
            isLoading={totalQ.isLoading}
            subtitle="Cumul des fees plateforme"
          />
          <StatCard
            title="CA net (hors commissions)"
            value={formatCurrency(revenueTotal - feesTotal)}
            icon={TrendingUpIcon}
            iconClassName="text-green-500"
            isLoading={totalQ.isLoading}
            subtitle="Total − commissions"
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
              <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-400">
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
              <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-400">
                À configurer
              </span>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
