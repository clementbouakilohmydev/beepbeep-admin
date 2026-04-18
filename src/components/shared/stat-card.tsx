import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle, Skeleton } from "@/components/ui"

type StatCardProps = {
  title: string
  value: number | string
  icon: React.ComponentType<{ className?: string }>
  iconClassName?: string
  isLoading: boolean
  to?: string
  subtitle?: string
}

export function StatCard({
  title,
  value,
  icon: Icon,
  iconClassName,
  isLoading,
  to,
  subtitle,
}: StatCardProps) {
  const card = (
    <Card className={to ? "transition-colors hover:border-primary/50" : ""}>
      <CardHeader className="flex flex-row items-center justify-between pb-1 sm:pb-2">
        <CardTitle className="text-xs font-medium sm:text-sm">
          {title}
        </CardTitle>
        <Icon
          className={`size-3.5 sm:size-4 ${iconClassName ?? "text-muted-foreground"}`}
        />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-12 sm:h-9 sm:w-16" />
        ) : (
          <>
            <div className="text-2xl font-bold sm:text-3xl">{value}</div>
            {subtitle && (
              <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )

  if (to) return <Link to={to}>{card}</Link>
  return card
}
