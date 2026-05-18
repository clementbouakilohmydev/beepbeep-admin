import { useState } from "react"
import { CheckIcon, XIcon, ExternalLinkIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Skeleton,
} from "@/components/ui"
import { DocumentStateBadge } from "./document-state-badge"
import { formatDate } from "@/lib/format"
import { withSessionToken } from "@/lib/file-url"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

type DocumentCardProps = {
  title: string
  state: string | null | undefined
  pictureUrl: string | null | undefined
  extra?: React.ReactNode
  createdAt?: string | null
  updatedAt?: string | null
  isValidating?: boolean
  onValidate?: () => void
  onReject?: () => void
}

export function DocumentCard({
  title,
  state,
  pictureUrl,
  extra,
  createdAt,
  updatedAt,
  isValidating,
  onValidate,
  onReject,
}: DocumentCardProps) {
  const [previewOpen, setPreviewOpen] = useState(false)
  // Le back protège /api/files/:id par auth Bearer → on injecte le token
  // en query param pour que <img> puisse charger l'image (cf lib/file-url.ts).
  const tokenizedUrl = withSessionToken(pictureUrl)

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <DocumentStateBadge state={state} />
        </CardHeader>
        <CardContent className="space-y-3">
          {pictureUrl ? (
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="group relative block w-full overflow-hidden rounded-md border"
            >
              <img
                src={tokenizedUrl ?? pictureUrl}
                alt={title}
                className="h-40 w-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                <ExternalLinkIcon className="size-6 text-white opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </button>
          ) : (
            <div className="flex h-40 items-center justify-center rounded-md border bg-muted">
              <p className="text-sm text-muted-foreground">Aucun document</p>
            </div>
          )}

          {extra}

          <div className="flex gap-2 text-xs text-muted-foreground">
            {createdAt && <span>Créé le {formatDate(createdAt)}</span>}
            {updatedAt && <span>· Modifié le {formatDate(updatedAt)}</span>}
          </div>

          {state !== "verified" && (onValidate || onReject) && (
            <div className="flex gap-2">
              {onValidate && (
                <Button
                  onClick={onValidate}
                  disabled={isValidating}
                  className="flex-1"
                >
                  <CheckIcon className="mr-1 size-4" />
                  Valider
                </Button>
              )}
              {onReject && (
                <Button
                  variant="outline"
                  onClick={onReject}
                  disabled={isValidating}
                  className="flex-1 text-destructive hover:text-destructive"
                >
                  <XIcon className="mr-1 size-4" />
                  Rejeter
                </Button>
              )}
            </div>
          )}

          {state === "verified" && (
            <p className="text-center text-sm font-medium text-primary">
              ✓ Document validé
            </p>
          )}
        </CardContent>
      </Card>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogTitle>{title}</DialogTitle>
          {pictureUrl && (
            <img
              src={tokenizedUrl ?? pictureUrl}
              alt={title}
              className="w-full rounded-md"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export function DocumentCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-16" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-40 w-full rounded-md" />
        <Skeleton className="h-4 w-40" />
        <div className="flex gap-2">
          <Skeleton className="h-8 flex-1" />
          <Skeleton className="h-8 flex-1" />
        </div>
      </CardContent>
    </Card>
  )
}
