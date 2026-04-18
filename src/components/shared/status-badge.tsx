import { Badge } from "@/components/ui/badge"

export type StatusBadgeProps = {
  label: string
  variant: "primary" | "destructive" | "yellow" | "blue" | "muted"
}

const VARIANT_CLASSES: Record<StatusBadgeProps["variant"], string> = {
  primary: "bg-primary/20 text-primary",
  destructive: "bg-destructive/20 text-destructive",
  yellow: "bg-yellow-500/20 text-yellow-400",
  blue: "bg-blue-500/20 text-blue-400",
  muted: "bg-muted/50 text-muted-foreground",
}

export function StatusBadge({ label, variant }: StatusBadgeProps) {
  return (
    <Badge variant="secondary" className={VARIANT_CLASSES[variant]}>
      {label}
    </Badge>
  )
}
