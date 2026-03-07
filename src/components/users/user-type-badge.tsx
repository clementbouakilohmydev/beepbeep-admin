import { Badge } from "@/components/ui/badge"

type UserTypeBadgeProps = {
  type: string | null | undefined
}

const TYPE_CONFIG: Record<string, { label: string; className: string }> = {
  passenger: {
    label: "Passager",
    className: "bg-blue-500/10 text-blue-600",
  },
  driver: {
    label: "Conducteur",
    className: "bg-purple-500/10 text-purple-600",
  },
}

export function UserTypeBadge({ type }: UserTypeBadgeProps) {
  const config = TYPE_CONFIG[type ?? ""] ?? {
    label: type ?? "—",
    className: "bg-muted text-muted-foreground",
  }

  return (
    <Badge variant="secondary" className={config.className}>
      {config.label}
    </Badge>
  )
}
