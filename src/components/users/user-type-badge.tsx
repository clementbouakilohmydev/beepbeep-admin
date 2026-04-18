import { StatusBadge } from "@/components/shared/status-badge"

type UserTypeBadgeProps = {
  type: string | null | undefined
}

const TYPE_CONFIG: Record<string, { label: string; variant: "primary" | "destructive" | "muted" }> = {
  passenger: {
    label: "Passager",
    variant: "primary",
  },
  driver: {
    label: "Conducteur",
    variant: "destructive",
  },
}

export function UserTypeBadge({ type }: UserTypeBadgeProps) {
  const config = TYPE_CONFIG[type ?? ""] ?? {
    label: type ?? "—",
    variant: "muted" as const,
  }

  return <StatusBadge label={config.label} variant={config.variant} />
}
