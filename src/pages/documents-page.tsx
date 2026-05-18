import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { keepPreviousData } from "@tanstack/react-query"
import type { ColumnDef } from "@tanstack/react-table"
import { ExternalLinkIcon } from "lucide-react"
import {
  useGetAdminDocumentsQuery,
  type AdminDocumentState,
  type GetAdminDocumentsQuery,
} from "@/gql/generated"
import { useUpdateDocument } from "@/hooks"
import { Button } from "@/components/ui"
import { DocumentStateBadge } from "@/components/users"
import { formatDate, getUserDisplay } from "@/lib/format"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { DOCUMENT_LABELS, PAGE_SIZE, type DocumentType } from "@/lib/constants"
import { ErrorState } from "@/components/shared/error-state"
import { DataTable } from "@/components/shared/data-table"
import { PaginationSection } from "@/components/shared/pagination-section"

type DocFilter = "all" | AdminDocumentState
type AdminDocument = NonNullable<
  GetAdminDocumentsQuery["adminDocuments"]
>["items"][number]

const DOC_FILTERS: { value: DocFilter; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "pending", label: "En attente" },
  { value: "processing", label: "En cours" },
  { value: "verified", label: "Vérifié" },
  { value: "rejected", label: "Rejeté" },
]

export function DocumentsPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<DocFilter>("all")
  const [page, setPage] = useState(1)
  const [previewDoc, setPreviewDoc] = useState<{
    open: boolean
    title: string
    url: string
    previousUrl?: string | null
  }>({ open: false, title: "", url: "", previousUrl: null })

  // Query paginée serveur (cf adminStats côté back). Avant : fetch des 200
  // derniers drivers + flatten 4 docs en JS → tronqué et lourd.
  const { data, isLoading, isError, refetch, isPlaceholderData } =
    useGetAdminDocumentsQuery(
      {
        state: filter === "all" ? null : filter,
        take: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
      },
      { placeholderData: keepPreviousData }
    )

  const dl = useUpdateDocument("drivingLicense")
  const ins = useUpdateDocument("insurance")
  const rd = useUpdateDocument("registrationDocument")
  const cert = useUpdateDocument("certificate")

  const hookMap = {
    drivingLicense: dl,
    insurance: ins,
    registrationDocument: rd,
    certificate: cert,
  }

  const isValidating =
    dl.isPending || ins.isPending || rd.isPending || cert.isPending

  const documents = data?.adminDocuments.items ?? []
  const totalCount = data?.adminDocuments.total ?? 0
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

  const handleFilterChange = (next: DocFilter) => {
    setFilter(next)
    setPage(1)
  }

  const columns: ColumnDef<AdminDocument, unknown>[] = [
    {
      accessorKey: "user",
      header: "Conducteur",
      cell: ({ row }) => {
        const userId = row.original.user?.id
        const name = row.original.user ? getUserDisplay(row.original.user) : "—"
        if (!userId) return <span>{name}</span>
        return (
          <button
            type="button"
            onClick={() => navigate(`/users?userId=${userId}`)}
            className="text-left font-medium hover:underline"
          >
            {name}
          </button>
        )
      },
    },
    {
      accessorKey: "userEmail",
      header: "Email",
      cell: ({ row }) => row.original.user?.email ?? "—",
      meta: { cellClassName: "text-muted-foreground" },
    },
    {
      accessorKey: "type",
      header: "Document",
      cell: ({ row }) => (
        <span className="font-medium">
          {DOCUMENT_LABELS[row.original.type as DocumentType]}
        </span>
      ),
    },
    {
      accessorKey: "state",
      header: "État",
      cell: ({ row }) => <DocumentStateBadge state={row.original.state} />,
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => formatDate(row.original.createdAt),
      meta: { cellClassName: "text-muted-foreground" },
    },
    {
      id: "actions",
      header: "Actions",
      meta: { headerClassName: "text-right", stopPropagation: true },
      cell: ({ row }) => {
        const doc = row.original
        const docType = doc.type as DocumentType
        const userName = doc.user ? getUserDisplay(doc.user) : "—"
        const pictureUrl = doc.picture?.uri ?? null
        const previousUrl = doc.previousPicture?.uri ?? null
        return (
          <div className="flex justify-end gap-1">
            {pictureUrl && (
              <Button
                variant="ghost"
                onClick={() =>
                  setPreviewDoc({
                    open: true,
                    title: `${userName} — ${DOCUMENT_LABELS[docType]}`,
                    url: pictureUrl,
                    previousUrl,
                  })
                }
              >
                <ExternalLinkIcon className="mr-1 size-3" />
                Voir
              </Button>
            )}
            {doc.state !== "verified" && (
              <Button
                onClick={() => hookMap[docType].validate(doc.id)}
                disabled={isValidating}
              >
                Valider
              </Button>
            )}
            {doc.state !== "verified" && (
              <Button
                variant="outline"
                onClick={() => hookMap[docType].reject(doc.id)}
                disabled={isValidating}
                className="text-destructive hover:text-destructive"
              >
                Rejeter
              </Button>
            )}
          </div>
        )
      },
    },
  ]

  if (isError && !isLoading) {
    return <ErrorState onRetry={refetch} />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {DOC_FILTERS.map((f) => (
          <Button
            key={f.value}
            variant={filter === f.value ? "default" : "outline"}
            onClick={() => handleFilterChange(f.value)}
          >
            {f.label}
          </Button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={documents}
        isLoading={isLoading}
        isStale={isPlaceholderData}
        skeletonCount={PAGE_SIZE}
        emptyMessage="Aucun document à traiter"
      />

      <PaginationSection
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
        itemName="document"
        onPageChange={setPage}
      />

      <Dialog
        open={previewDoc.open}
        onOpenChange={(open) => setPreviewDoc((prev) => ({ ...prev, open }))}
      >
        <DialogContent className="max-w-5xl">
          <DialogTitle>{previewDoc.title}</DialogTitle>
          {previewDoc.previousUrl ? (
            // Mode comparaison : ancien (rejeté) à gauche, nouveau à droite.
            // Affiché quand le driver a renvoyé le document après rejet —
            // l'admin peut vérifier ce qui a changé sans mémoriser sa raison.
            <div className="grid gap-4 sm:grid-cols-2">
              <figure>
                <figcaption className="mb-2 text-xs font-semibold text-destructive">
                  Précédent (rejeté)
                </figcaption>
                <img
                  src={previewDoc.previousUrl}
                  alt="Document précédent"
                  className="w-full rounded-md border border-destructive/40"
                />
              </figure>
              <figure>
                <figcaption className="mb-2 text-xs font-semibold text-primary">
                  Nouveau (en attente)
                </figcaption>
                <img
                  src={previewDoc.url}
                  alt={previewDoc.title}
                  className="w-full rounded-md border border-primary/40"
                />
              </figure>
            </div>
          ) : (
            previewDoc.url && (
              <img
                src={previewDoc.url}
                alt={previewDoc.title}
                className="w-full rounded-md"
              />
            )
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
