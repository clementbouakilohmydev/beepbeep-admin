import { StatusBadge } from "@/components/shared/status-badge"

type TicketStatusBadgeProps = {
  solved: boolean | null | undefined
}

export function TicketStatusBadge({ solved }: TicketStatusBadgeProps) {
  if (solved) {
    return <StatusBadge label="Traité" variant="primary" />
  }

  return <StatusBadge label="À traiter" variant="destructive" />
}
