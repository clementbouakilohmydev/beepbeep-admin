import { useParams } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useGetLegalPageQuery } from "@/gql/generated"
import {
  LEGAL_PAGE_LABELS,
  isLegalPageSlug,
  type LegalPageSlug,
} from "@/lib/constants"

/**
 * Page publique destinée aux liens privacy/CGU exigés par App Store
 * Connect et Google Play Console (URL accessible sans installer l'app).
 *
 * Pas d'auth, pas de header admin. Le model `Page` côté back a
 * `access: { query: () => true }` donc la query passe sans token.
 * Fond clair, texte noir pour la lisibilité (différent du dashboard
 * admin qui est en thème dark).
 *
 * URLs publiques après déploiement Vercel :
 *   /public/legal/cgu
 *   /public/legal/legal-mentions
 *   /public/legal/privacy-policy
 *   /public/legal/faq
 */
export function PublicLegalPage() {
  const { slug: rawSlug } = useParams<{ slug: string }>()
  const slug: LegalPageSlug | null =
    rawSlug && isLegalPageSlug(rawSlug) ? rawSlug : null

  const { data, isLoading, isError } = useGetLegalPageQuery(
    { slug: slug ?? "" },
    { enabled: !!slug }
  )

  const page = data?.pages?.[0]

  if (!slug) {
    return <NotFound message="Page inconnue." />
  }
  if (isError) {
    return <NotFound message="Une erreur est survenue. Réessayez plus tard." />
  }
  if (isLoading) {
    return <Wrapper>Chargement…</Wrapper>
  }
  if (!page) {
    return (
      <NotFound
        message={`La page « ${LEGAL_PAGE_LABELS[slug]} » n'a pas encore été publiée.`}
      />
    )
  }

  return (
    <Wrapper>
      <header className="mb-8 border-b border-neutral-200 pb-6">
        <p className="mb-2 text-xs font-medium tracking-wide text-neutral-500 uppercase">
          BeepBeepCity
        </p>
        <h1 className="text-3xl font-bold text-neutral-900">
          {page.name ?? LEGAL_PAGE_LABELS[slug]}
        </h1>
        {page.description && (
          <p className="mt-3 text-base text-neutral-600">{page.description}</p>
        )}
      </header>

      {(page.sections ?? []).length === 0 ? (
        <p className="text-neutral-600">Aucun contenu pour le moment.</p>
      ) : (
        (page.sections ?? []).map((section) => (
          <section key={section.id} className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-neutral-900">
              {section.name}
            </h2>
            <div className="prose prose-neutral max-w-none text-neutral-800 [&_a]:text-blue-600 [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-neutral-300 [&_blockquote]:pl-4 [&_blockquote]:text-neutral-600 [&_blockquote]:italic [&_code]:rounded [&_code]:bg-neutral-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_h1]:mt-6 [&_h1]:mb-3 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:mt-5 [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_hr]:my-6 [&_hr]:border-neutral-200 [&_li]:my-1 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-3 [&_p]:leading-relaxed [&_strong]:font-semibold [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {section.content ?? ""}
              </ReactMarkdown>
            </div>
          </section>
        ))
      )}

      <footer className="mt-12 border-t border-neutral-200 pt-6 text-sm text-neutral-500">
        © BeepBeepCity — Mise à jour le{" "}
        {page.updatedAt
          ? new Date(page.updatedAt).toLocaleDateString("fr-FR")
          : "—"}
      </footer>
    </Wrapper>
  )
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-3xl px-6 py-10">{children}</div>
    </div>
  )
}

function NotFound({ message }: { message: string }) {
  return (
    <Wrapper>
      <h1 className="mb-4 text-2xl font-bold text-neutral-900">BeepBeepCity</h1>
      <p className="text-neutral-600">{message}</p>
    </Wrapper>
  )
}
