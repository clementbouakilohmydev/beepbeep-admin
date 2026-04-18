import { AlertTriangleIcon } from "lucide-react"
import { Button } from "@/components/ui"

type ErrorStateProps = {
  message?: string
  onRetry?: () => void
}

export function ErrorState({ message = "Une erreur est survenue", onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-12 text-center">
      <AlertTriangleIcon className="size-8 text-destructive" />
      <p className="text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>Réessayer</Button>
      )}
    </div>
  )
}
