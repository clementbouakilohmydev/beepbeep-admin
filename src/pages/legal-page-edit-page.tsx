import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeftIcon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@/components/ui"
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
import { ErrorState } from "@/components/shared/error-state"
import { MarkdownEditor } from "@/components/shared/markdown-editor"
import { useGetLegalPageQuery } from "@/gql/generated"
import { useLegalPages } from "@/hooks"
import {
  LEGAL_PAGE_LABELS,
  isLegalPageSlug,
  type LegalPageSlug,
} from "@/lib/constants"
import { formatDate } from "@/lib/format"

type SectionRow = {
  id: string
  name?: string | null
  content?: string | null
  updatedAt?: string | null
}

type SectionEditState = { mode: "create" } | { mode: "edit"; id: string } | null

type PageInfoFormProps = {
  pageId: string
  initialName: string
  initialDescription: string
  isPending: boolean
  onSave: (name: string, description: string | null) => void
}

function PageInfoForm({
  initialName,
  initialDescription,
  isPending,
  onSave,
}: PageInfoFormProps) {
  const [name, setName] = useState(initialName)
  const [description, setDescription] = useState(initialDescription)

  const dirty =
    name.trim() !== initialName ||
    (description.trim() || "") !== initialDescription

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    onSave(trimmed, description.trim() || null)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="page-name">Nom</Label>
        <Input
          id="page-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={120}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="page-description">Description (optionnel)</Label>
        <textarea
          id="page-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          placeholder="Affichée en intro de la page côté app"
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={!dirty || isPending || !name.trim()}>
          {isPending && <Spinner />}
          Enregistrer
        </Button>
      </div>
    </form>
  )
}

export function LegalPageEditPage() {
  const { slug: rawSlug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const slug: LegalPageSlug | null =
    rawSlug && isLegalPageSlug(rawSlug) ? rawSlug : null

  const { data, isLoading, isError, refetch } = useGetLegalPageQuery(
    { slug: slug ?? "" },
    { enabled: !!slug }
  )

  const { updatePage, createSection, updateSection, deleteSection, isPending } =
    useLegalPages()

  const page = data?.pages?.[0]
  const sections: SectionRow[] = (page?.sections ?? []) as SectionRow[]

  // Dialog section : create + edit unifié.
  const [sectionEdit, setSectionEdit] = useState<SectionEditState>(null)
  const [sectionName, setSectionName] = useState("")
  const [sectionContent, setSectionContent] = useState("")
  const [sectionToDelete, setSectionToDelete] = useState<SectionRow | null>(
    null
  )

  const openCreateSection = () => {
    setSectionName("")
    setSectionContent("")
    setSectionEdit({ mode: "create" })
  }

  const openEditSection = (section: SectionRow) => {
    setSectionName(section.name ?? "")
    setSectionContent(section.content ?? "")
    setSectionEdit({ mode: "edit", id: section.id })
  }

  const closeSectionDialog = () => {
    setSectionEdit(null)
    setSectionName("")
    setSectionContent("")
  }

  const handleSaveSection = (e: React.FormEvent) => {
    e.preventDefault()
    if (!sectionEdit) return
    const name = sectionName.trim()
    const content = sectionContent
    if (!name) return

    if (sectionEdit.mode === "create") {
      if (!page) return
      createSection(
        { pageId: page.id, name, content },
        { onSuccess: closeSectionDialog }
      )
      return
    }
    updateSection(
      { id: sectionEdit.id, name, content },
      { onSuccess: closeSectionDialog }
    )
  }

  const handleConfirmDeleteSection = () => {
    if (!sectionToDelete) return
    deleteSection(
      { id: sectionToDelete.id },
      { onSuccess: () => setSectionToDelete(null) }
    )
  }

  if (!slug) {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={() => navigate("/legal-pages")}>
          <ArrowLeftIcon className="mr-1 size-4" />
          Retour
        </Button>
        <p className="text-sm text-muted-foreground">
          Slug inconnu : « {rawSlug} ». Ouvrez la page depuis la liste.
        </p>
      </div>
    )
  }

  if (isError && !isLoading) {
    return <ErrorState onRetry={refetch} />
  }

  if (!isLoading && !page) {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={() => navigate("/legal-pages")}>
          <ArrowLeftIcon className="mr-1 size-4" />
          Retour
        </Button>
        <Card>
          <CardContent className="space-y-2 py-6 text-sm text-muted-foreground">
            Cette page n'a pas encore été créée. Revenez à la liste pour la
            créer.
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <Button variant="outline" onClick={() => navigate("/legal-pages")}>
          <ArrowLeftIcon className="mr-1 size-4" />
          Retour
        </Button>
        <div className="text-right">
          <h2 className="text-lg font-semibold">{LEGAL_PAGE_LABELS[slug]}</h2>
          <p className="font-mono text-xs text-muted-foreground">{slug}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Informations</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading || !page ? (
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : (
            // key={page.id} : remonte le sous-composant quand la page change
            // (drafts repartent des valeurs serveur sans useEffect — évite le
            // setState-in-effect refusé par React Compiler).
            <PageInfoForm
              key={page.id}
              pageId={page.id}
              initialName={page.name ?? ""}
              initialDescription={page.description ?? ""}
              isPending={isPending}
              onSave={(name, description) =>
                updatePage({ id: page.id, name, description })
              }
            />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base">
            Sections{" "}
            <span className="text-sm font-normal text-muted-foreground">
              ({sections.length})
            </span>
          </CardTitle>
          <Button
            onClick={openCreateSection}
            disabled={isLoading || !page || isPending}
          >
            <PlusIcon className="mr-1 size-4" />
            Ajouter
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {isLoading ? (
            <Skeleton className="h-24 w-full" />
          ) : sections.length === 0 ? (
            <p className="rounded-md border border-dashed bg-muted/30 p-6 text-center text-sm text-muted-foreground">
              Aucune section. Ajoutez-en au moins une pour que la page affiche
              du contenu côté app.
            </p>
          ) : (
            sections.map((section, idx) => (
              <Card key={section.id} className="border-muted">
                <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-semibold">
                      <span className="text-muted-foreground">{idx + 1}.</span>{" "}
                      {section.name || <em>Sans nom</em>}
                    </CardTitle>
                    {section.updatedAt && (
                      <p className="text-xs text-muted-foreground">
                        MAJ {formatDate(section.updatedAt)}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditSection(section)}
                      disabled={isPending}
                    >
                      <PencilIcon className="mr-1 size-3" />
                      Éditer
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSectionToDelete(section)}
                      disabled={isPending}
                      className="text-destructive hover:text-destructive"
                    >
                      <TrashIcon className="mr-1 size-3" />
                      Supprimer
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="line-clamp-4 rounded-md bg-muted/40 p-3 text-xs whitespace-pre-wrap text-muted-foreground">
                    {section.content?.trim() || "(contenu vide)"}
                  </pre>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>

      <Dialog
        open={sectionEdit !== null}
        onOpenChange={(open) => {
          if (!open) closeSectionDialog()
        }}
      >
        <DialogContent className="sm:max-w-2xl">
          <form onSubmit={handleSaveSection}>
            <DialogHeader>
              <DialogTitle>
                {sectionEdit?.mode === "edit"
                  ? "Modifier la section"
                  : "Nouvelle section"}
              </DialogTitle>
              <DialogDescription>
                Utilisez la barre d'outils pour la mise en forme. Le contenu
                s'affichera tel quel dans l'app.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="section-name">Titre de la section</Label>
                <Input
                  id="section-name"
                  value={sectionName}
                  onChange={(e) => setSectionName(e.target.value)}
                  autoFocus
                  required
                  maxLength={120}
                />
              </div>
              <div className="space-y-2">
                <Label>Contenu</Label>
                {/* key force le remount de l'éditeur quand on bascule
                    create ↔ edit ou qu'on édite une autre section : sinon
                    le state interne Lexical garde l'ancien contenu. */}
                <MarkdownEditor
                  key={
                    sectionEdit?.mode === "edit"
                      ? `edit-${sectionEdit.id}`
                      : "create"
                  }
                  markdown={sectionContent}
                  onChange={setSectionContent}
                  placeholder="Saisissez le contenu de la section…"
                />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={closeSectionDialog}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isPending || !sectionName.trim()}>
                {isPending && <Spinner />}
                {sectionEdit?.mode === "edit" ? "Enregistrer" : "Créer"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={sectionToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setSectionToDelete(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cette section ?</AlertDialogTitle>
            <AlertDialogDescription>
              La section « {sectionToDelete?.name} » sera retirée de la page.
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDeleteSection}
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
