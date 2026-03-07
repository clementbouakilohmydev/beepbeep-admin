import { Badge } from "@/components/ui/badge"

type TicketStatusBadgeProps = {
  solved: boolean | null | undefined
}

export function TicketStatusBadge({ solved }: TicketStatusBadgeProps) {
  if (solved) {
    return (
      <Badge variant="secondary" className="bg-primary/10 text-primary">
        Traité
      </Badge>
    )
  }

  return (
    <Badge variant="secondary" className="bg-destructive/10 text-destructive">
      À traiter
    </Badge>
  )
}
