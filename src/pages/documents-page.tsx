import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { keepPreviousData } from "@tanstack/react-query"
import type { ColumnDef } from "@tanstack/react-table"
import { ExternalLinkIcon } from "lucide-react"
import { useGetUsersQuery } from "@/gql/generated"
import { useUpdateDocument } from "@/hooks"
import { Button } from "@/components/ui"
import { DocumentStateBadge } from "@/components/users"
import { formatDate } from "@/lib/format"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { DOCUMENT_LABELS } from "@/lib/constants"
import { type FlatDocument, flattenUserDocuments, filterDocuments } from "@/lib/documents"
import { ErrorState } from "@/components/shared/error-state"
import { DataTable } from "@/components/shared/data-table"

type DocFilter = "all" | "pending" | "processing" | "todo" | "verified"

const DOC_FILTERS: { value: DocFilter; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "pending", label: "En attente" },
  { value: "processing", label: "En cours" },
  { value: "todo", label: "À faire" },
  { value: "verified", label: "Vérifié" },
]

export function DocumentsPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<DocFilter>("all")
  const [previewDoc, setPreviewDoc] = useState<{
    open: boolean
    title: string
    url: string
  }>({ open: false, title: "", url: "" })

  const { data, isLoading, isError, refetch } = useGetUsersQuery(
    {
      where: { type: { equals: "driver" }, isAdmin: { equals: false } },
      orderBy: [{ createdAt: "desc" as const }],
      take: 200,
      skip: 0,
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

  const documents = flattenUserDocuments(data?.users)
  const filteredDocuments = filterDocuments(documents, filter)

  const pendingCount = documents.filter((d) => d.state === "pending").length
  const processingCount = documents.filter(
    (d) => d.state === "processing"
  ).length
  const todoCount = documents.filter((d) => d.state === "todo").length

  const columns: ColumnDef<FlatDocument, unknown>[] = [
    {
      accessorKey: "userName",
      header: "Conducteur",
      cell: ({ row }) => (
        <button
          type="button"
          onClick={() => navigate(`/users?userId=${row.original.userId}`)}
          className="text-left font-medium hover:underline"
        >
          {row.original.userName}
        </button>
      ),
    },
    {
      accessorKey: "userEmail",
      header: "Email",
      cell: ({ row }) => row.original.userEmail ?? "—",
      meta: { cellClassName: "text-muted-foreground" },
    },
    {
      accessorKey: "docType",
      header: "Document",
      cell: ({ row }) => (
        <span className="font-medium">
          {DOCUMENT_LABELS[row.original.docType]}
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
        return (
          <div className="flex justify-end gap-1">
            {doc.pictureUrl && (
              <Button
                variant="ghost"
                onClick={() =>
                  setPreviewDoc({
                    open: true,
                    title: `${doc.userName} — ${DOCUMENT_LABELS[doc.docType]}`,
                    url: doc.pictureUrl!,
                  })
                }
              >
                <ExternalLinkIcon className="mr-1 size-3" />
                Voir
              </Button>
            )}
            {doc.state !== "verified" && (
              <Button
                onClick={() => hookMap[doc.docType].validate(doc.docId)}
                disabled={isValidating}
              >
                Valider
              </Button>
            )}
            {doc.state !== "verified" && doc.state !== "todo" && (
              <Button
                variant="outline"
                onClick={() => hookMap[doc.docType].reject(doc.docId)}
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
        {DOC_FILTERS.map((f) => {
          let count: number | undefined
          if (f.value === "all")
            count = pendingCount + processingCount + todoCount
          if (f.value === "pending") count = pendingCount
          if (f.value === "processing") count = processingCount
          if (f.value === "todo") count = todoCount

          return (
            <Button
              key={f.value}
              variant={filter === f.value ? "default" : "outline"}

              onClick={() => setFilter(f.value)}
            >
              {f.label}
              {count != null && (
                <span className="ml-1.5 text-xs opacity-70">({count})</span>
              )}
            </Button>
          )
        })}
      </div>

      <DataTable
        columns={columns}
        data={filteredDocuments}
        isLoading={isLoading}
        skeletonCount={5}
        emptyMessage="Aucun document à traiter"
      />

      <Dialog
        open={previewDoc.open}
        onOpenChange={(open) => setPreviewDoc((prev) => ({ ...prev, open }))}
      >
        <DialogContent className="max-w-3xl">
          <DialogTitle>{previewDoc.title}</DialogTitle>
          {previewDoc.url && (
            <img
              src={previewDoc.url}
              alt={previewDoc.title}
              className="w-full rounded-md"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
