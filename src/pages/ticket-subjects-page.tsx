import { useState } from "react"
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { DataTable } from "@/components/shared/data-table"
import { ErrorState } from "@/components/shared/error-state"
import { useGetTicketObjectsQuery } from "@/gql/generated"
import { useTicketObjects } from "@/hooks"
import { formatDate } from "@/lib/format"

type TicketObjectRow = {
  id: string
  object?: string | null
  createdAt?: string | null
  updatedAt?: string | null
}

type EditState =
  | { mode: "create" }
  | { mode: "edit"; id: string; current: string }
  | null

export function TicketSubjectsPage() {
  const { data, isLoading, isError, refetch } = useGetTicketObjectsQuery()
  const { create, update, remove, isPending } = useTicketObjects()

  const [editing, setEditing] = useState<EditState>(null)
  const [draft, setDraft] = useState("")
  const [deleting, setDeleting] = useState<TicketObjectRow | null>(null)

  const items: TicketObjectRow[] = data?.ticketObjects ?? []

  const openCreate = () => {
    setDraft("")
    setEditing({ mode: "create" })
  }

  const openEdit = (row: TicketObjectRow) => {
    setDraft(row.object ?? "")
    setEditing({ mode: "edit", id: row.id, current: row.object ?? "" })
  }

  const closeForm = () => {
    setEditing(null)
    setDraft("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = draft.trim()
    if (!value || !editing) return

    if (editing.mode === "create") {
      create({ object: value }, { onSuccess: closeForm })
      return
    }

    if (value === editing.current) {
      closeForm()
      return
    }
    update({ id: editing.id, object: value }, { onSuccess: closeForm })
  }

  const handleConfirmDelete = () => {
    if (!deleting) return
    remove({ id: deleting.id }, { onSuccess: () => setDeleting(null) })
  }

  const columns: ColumnDef<TicketObjectRow, unknown>[] = [
    {
      accessorKey: "object",
      header: "Sujet",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.object ?? "—"}</span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Créé le",
      cell: ({ row }) => formatDate(row.original.createdAt),
      meta: { cellClassName: "text-muted-foreground" },
    },
    {
      accessorKey: "updatedAt",
      header: "Modifié le",
      cell: ({ row }) => formatDate(row.original.updatedAt),
      meta: { cellClassName: "text-muted-foreground" },
    },
    {
      id: "actions",
      header: "Actions",
      meta: { headerClassName: "text-right" },
      cell: ({ row }) => (
        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => openEdit(row.original)}
            disabled={isPending}
          >
            <PencilIcon className="mr-1 size-3" />
            Renommer
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDeleting(row.original)}
            disabled={isPending}
            className="text-destructive hover:text-destructive"
          >
            <TrashIcon className="mr-1 size-3" />
            Supprimer
          </Button>
        </div>
      ),
    },
  ]

  if (isError && !isLoading) {
    return <ErrorState onRetry={refetch} />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Liste des sujets proposés aux utilisateurs au moment de créer un
          ticket. Modifier un sujet met à jour son libellé sur tous les tickets
          existants. Supprimer un sujet le détache des tickets concernés (les
          tickets restent, sans sujet).
        </p>
        <Button onClick={openCreate} disabled={isPending}>
          <PlusIcon className="mr-1 size-4" />
          Nouveau sujet
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={items}
        isLoading={isLoading}
        skeletonCount={5}
        emptyMessage="Aucun sujet — créez-en un pour qu'il apparaisse dans le formulaire de ticket."
      />

      <Dialog
        open={editing !== null}
        onOpenChange={(open) => {
          if (!open) closeForm()
        }}
      >
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                {editing?.mode === "edit"
                  ? "Renommer le sujet"
                  : "Nouveau sujet"}
              </DialogTitle>
              <DialogDescription>
                {editing?.mode === "edit"
                  ? "Le nouveau libellé s'appliquera immédiatement aux tickets liés à ce sujet."
                  : "Ce sujet apparaîtra dans la liste déroulante côté app."}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-2">
              <Label htmlFor="ticket-subject">Libellé</Label>
              <Input
                id="ticket-subject"
                placeholder="Ex. Problème de paiement"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                autoFocus
                required
                maxLength={120}
              />
            </div>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={closeForm}>
                Annuler
              </Button>
              <Button type="submit" disabled={isPending || !draft.trim()}>
                {isPending && <Spinner />}
                {editing?.mode === "edit" ? "Enregistrer" : "Créer"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deleting !== null}
        onOpenChange={(open) => {
          if (!open) setDeleting(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer ce sujet ?</AlertDialogTitle>
            <AlertDialogDescription>
              Les tickets existants qui utilisaient « {deleting?.object} » ne
              seront pas supprimés mais n'auront plus de sujet. Cette action est
              irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isPending}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {isPending && <Spinner />}
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
