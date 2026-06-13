import { useNavigate } from "react-router-dom"
import {
  CheckCircle2Icon,
  CircleDashedIcon,
  FileTextIcon,
  PencilIcon,
  PlusIcon,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Skeleton,
  Badge,
} from "@/components/ui"
import { ErrorState } from "@/components/shared/error-state"
import { useGetLegalPagesQuery } from "@/gql/generated"
import { useLegalPages } from "@/hooks"
import {
  LEGAL_PAGE_SLUGS,
  LEGAL_PAGE_LABELS,
  type LegalPageSlug,
} from "@/lib/constants"
import { formatDate } from "@/lib/format"

export function LegalPagesPage() {
  const navigate = useNavigate()
  const { data, isLoading, isError, refetch } = useGetLegalPagesQuery()
  const { createPage, isPending } = useLegalPages()

  const pagesBySlug = new Map(
    (data?.pages ?? [])
      .filter((p): p is NonNullable<typeof p> & { slug: string } => !!p.slug)
      .map((p) => [p.slug, p])
  )

  const handleCreate = (slug: LegalPageSlug) => {
    createPage(
      { slug, name: LEGAL_PAGE_LABELS[slug], description: null },
      { onSuccess: () => navigate(`/legal-pages/${slug}`) }
    )
  }

  if (isError && !isLoading) {
    return <ErrorState onRetry={refetch} />
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Pages légales et statiques diffusées dans l'app mobile. Le contenu de
        chaque page est découpé en sections markdown (un onglet par section côté
        app). Les modifications sont visibles immédiatement après sauvegarde.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {LEGAL_PAGE_SLUGS.map((slug) => {
          const page = pagesBySlug.get(slug)
          const exists = !!page

          return (
            <Card key={slug}>
              <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-base font-semibold">
                    {LEGAL_PAGE_LABELS[slug]}
                  </CardTitle>
                  <p className="font-mono text-xs text-muted-foreground">
                    {slug}
                  </p>
                </div>
                {exists ? (
                  <Badge variant="default" className="gap-1">
                    <CheckCircle2Icon className="size-3" />
                    Publiée
                  </Badge>
                ) : (
                  <Badge variant="outline" className="gap-1">
                    <CircleDashedIcon className="size-3" />À créer
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                {isLoading ? (
                  <Skeleton className="h-12 w-full" />
                ) : exists ? (
                  <>
                    {page.description && (
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {page.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <FileTextIcon className="size-3" />
                        {page.sectionsCount ?? 0} section
                        {(page.sectionsCount ?? 0) > 1 ? "s" : ""}
                      </span>
                      {page.updatedAt && (
                        <span>· MAJ {formatDate(page.updatedAt)}</span>
                      )}
                    </div>
                    <Button
                      onClick={() => navigate(`/legal-pages/${slug}`)}
                      className="w-full"
                    >
                      <PencilIcon className="mr-1 size-4" />
                      Éditer
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Aucune page publiée pour ce slug. Créez-la pour qu'elle
                      apparaisse dans l'app.
                    </p>
                    <Button
                      onClick={() => handleCreate(slug)}
                      disabled={isPending}
                      className="w-full"
                    >
                      <PlusIcon className="mr-1 size-4" />
                      Créer
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
