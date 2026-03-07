import { Link } from "react-router-dom"
import { CircleCheckIcon, CircleAlertIcon } from "lucide-react"
import { Skeleton } from "@/components"
import { useGetTicketsCountsQuery } from "@/gql/generated"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardPage() {
  const { data, isLoading } = useGetTicketsCountsQuery({})

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Vue d'ensemble de l'activité
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/tickets?filter=pending">
          <Card className="transition-colors hover:border-primary/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Tickets à traiter
              </CardTitle>
              <CircleAlertIcon className="size-4 text-destructive" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-9 w-16" />
              ) : (
                <div className="text-3xl font-bold">{data?.pending ?? 0}</div>
              )}
            </CardContent>
          </Card>
        </Link>
        <Link to="/tickets?filter=solved">
          <Card className="transition-colors hover:border-primary/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Tickets traités
              </CardTitle>
              <CircleCheckIcon className="size-4 text-primary" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-9 w-16" />
              ) : (
                <div className="text-3xl font-bold">{data?.solved ?? 0}</div>
              )}
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
