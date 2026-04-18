import { StatusBadge } from "@/components/shared/status-badge"

type UserStatusBadgeProps = {
  enabled: boolean | null | undefined
}

export function UserStatusBadge({ enabled }: UserStatusBadgeProps) {
  if (enabled) {
    return <StatusBadge label="Actif" variant="primary" />
  }

  return <StatusBadge label="Bloqué" variant="destructive" />
}
