import { Badge } from "@/components/ui/badge"

type DocumentStateBadgeProps = {
  state: string | null | undefined
}

const STATE_CONFIG: Record<string, { label: string; className: string }> = {
  verified: {
    label: "Vérifié",
    className: "bg-primary/10 text-primary",
  },
  pending: {
    label: "En attente",
    className: "bg-yellow-500/10 text-yellow-600",
  },
  processing: {
    label: "En cours",
    className: "bg-blue-500/10 text-blue-600",
  },
  todo: {
    label: "À faire",
    className: "bg-muted text-muted-foreground",
  },
}

export function DocumentStateBadge({ state }: DocumentStateBadgeProps) {
  const config = STATE_CONFIG[state ?? ""] ?? {
    label: state ?? "—",
    className: "bg-muted text-muted-foreground",
  }

  return (
    <Badge variant="secondary" className={config.className}>
      {config.label}
    </Badge>
  )
}
