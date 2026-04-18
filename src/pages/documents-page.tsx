import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { keepPreviousData } from "@tanstack/react-query"
import { FileWarningIcon, ExternalLinkIcon } from "lucide-react"
import { useGetUsersQuery } from "@/gql/generated"
import { useUpdateDocument } from "@/hooks"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Skeleton,
  Button,
} from "@/components/ui"
import { DocumentStateBadge } from "@/components/users"
import { formatDate, getUserDisplay } from "@/lib/format"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { DOCUMENT_LABELS, DOCUMENT_TYPES, type DocumentType } from "@/lib/constants"
import { ErrorState } from "@/components/shared/error-state"

type DocFilter = "all" | "pending" | "processing" | "todo" | "verified"

const DOC_FILTERS: { value: DocFilter; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "pending", label: "En attente" },
  { value: "processing", label: "En cours" },
  { value: "todo", label: "À faire" },
  { value: "verified", label: "Vérifié" },
]

type FlatDocument = {
  userId: string
  userName: string
  userEmail: string | null | undefined
  docType: DocumentType
  docId: string
  state: string | null | undefined
  pictureUrl: string | null | undefined
  createdAt: string | null | undefined
}

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

  const documents = (() => {
    if (!data?.users) return []

    const docs: FlatDocument[] = []

    for (const user of data.users) {
      const name = getUserDisplay(user)
      for (const type of DOCUMENT_TYPES) {
        const doc = user[type] as
          | {
              id: string
              state?: string | null
              picture?: { url: string } | null
              createdAt?: string | null
            }
          | null
          | undefined

        if (doc) {
          docs.push({
            userId: user.id,
            userName: name,
            userEmail: user.email,
            docType: type,
            docId: doc.id,
            state: doc.state,
            pictureUrl: doc.picture?.url,
            createdAt: doc.createdAt,
          })
        }
      }
    }

    return docs
  })()

  const filteredDocuments =
    filter === "all"
      ? documents.filter((d) => d.state !== "verified")
      : documents.filter((d) => d.state === filter)

  const pendingCount = documents.filter((d) => d.state === "pending").length
  const processingCount = documents.filter(
    (d) => d.state === "processing"
  ).length
  const todoCount = documents.filter((d) => d.state === "todo").length

  if (isError && !isLoading) {
    return <ErrorState onRetry={refetch} />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Documents</h1>
        <p className="text-sm text-muted-foreground">
          Validez les documents des conducteurs
        </p>
      </div>

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
              size="sm"
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

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Conducteur</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Document</TableHead>
              <TableHead>État</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-5 w-24" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : filteredDocuments.map((doc) => (
                  <TableRow key={`${doc.userId}-${doc.docType}`}>
                    <TableCell>
                      <button
                        type="button"
                        onClick={() => navigate(`/users?userId=${doc.userId}`)}
                        className="text-left font-medium hover:underline"
                      >
                        {doc.userName}
                      </button>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {doc.userEmail ?? "—"}
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        {DOCUMENT_LABELS[doc.docType]}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DocumentStateBadge state={doc.state} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(doc.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        {doc.pictureUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
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
                            size="sm"
                            onClick={() =>
                              hookMap[doc.docType].validate(doc.docId)
                            }
                            disabled={isValidating}
                          >
                            Valider
                          </Button>
                        )}
                        {doc.state !== "verified" && doc.state !== "todo" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              hookMap[doc.docType].reject(doc.docId)
                            }
                            disabled={isValidating}
                            className="text-destructive hover:text-destructive"
                          >
                            Rejeter
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            {!isLoading && filteredDocuments.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <FileWarningIcon className="size-8" />
                    <p>Aucun document à traiter</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

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
