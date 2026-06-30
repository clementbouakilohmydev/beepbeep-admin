import { StatusBadge } from "@/components/shared/status-badge"
import type { StatusBadgeProps } from "@/components/shared/status-badge"

type DocumentStateBadgeProps = {
  state: string | null | undefined
}

const STATE_CONFIG: Record<
  string,
  { label: string; variant: StatusBadgeProps["variant"] }
> = {
  verified: {
    label: "Vérifié",
    variant: "primary",
  },
  // `pending` retiré : tous les docs utilisent désormais `processing`
  // (cf back/DrivingLicense.ts). Garder une entrée de fallback pour les
  // anciennes rows si la migration SQL n'a pas encore tourné.
  pending: {
    label: "À vérifier",
    variant: "yellow",
  },
  processing: {
    label: "À vérifier",
    variant: "yellow",
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
