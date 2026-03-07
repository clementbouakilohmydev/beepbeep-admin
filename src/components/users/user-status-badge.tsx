import { Badge } from "@/components/ui/badge"

type UserStatusBadgeProps = {
  enabled: boolean | null | undefined
}

export function UserStatusBadge({ enabled }: UserStatusBadgeProps) {
  if (enabled) {
    return (
      <Badge variant="secondary" className="bg-primary/10 text-primary">
        Actif
      </Badge>
    )
  }

  return (
    <Badge variant="secondary" className="bg-destructive/10 text-destructive">
      Bloqué
    </Badge>
  )
}
