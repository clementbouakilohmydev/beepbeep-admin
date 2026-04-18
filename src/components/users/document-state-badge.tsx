import { StatusBadge } from "@/components/shared/status-badge"
import type { StatusBadgeProps } from "@/components/shared/status-badge"

type DocumentStateBadgeProps = {
  state: string | null | undefined
}

const STATE_CONFIG: Record<string, { label: string; variant: StatusBadgeProps["variant"] }> = {
  verified: {
    label: "Vérifié",
    variant: "primary",
  },
  pending: {
    label: "En attente",
    variant: "yellow",
  },
  processing: {
    label: "En cours",
    variant: "blue",
  },
  todo: {
    label: "À faire",
    variant: "muted",
  },
}

export function DocumentStateBadge({ state }: DocumentStateBadgeProps) {
  const config = STATE_CONFIG[state ?? ""] ?? {
    label: state ?? "—",
    variant: "muted" as const,
  }

  return <StatusBadge label={config.label} variant={config.variant} />
}
