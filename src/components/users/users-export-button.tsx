import { useState } from "react"
import { DownloadIcon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  useGetUsersQuery,
  type GetUsersQuery,
  type GetUsersQueryVariables,
} from "@/gql/generated"
import { buildCsv, downloadCsv } from "@/lib/csv"

type UsersExportButtonProps = {
  /** Where clause GraphQL — typiquement les filtres affichés à l'écran. */
  whereClause: GetUsersQueryVariables["where"]
  /** OrderBy GraphQL — typiquement ORDER_BY_NEWEST. */
  orderBy: GetUsersQueryVariables["orderBy"]
}

/**
 * Exporte la liste users filtrée en CSV. Fetch jusqu'à 10000 rows à la
 * demande (pas via le hook usePagedSearchParams qui est paginé pour la
 * table). UI : un seul bouton "Exporter" → toast loading → download.
 *
 * Note : si le filtre matche >10000 users, on tronque silencieusement.
 * À l'échelle BeepBeepCity actuel (~mille users) c'est OK ; passé 5k
 * il faudrait une route serveur dédiée qui stream le CSV.
 */
export function UsersExportButton({
  whereClause,
  orderBy,
}: UsersExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const data = (await useGetUsersQuery.fetcher({
        where: whereClause,
        orderBy,
        take: 10000,
        skip: 0,
      })()) as GetUsersQuery
      const users = data.users ?? []

      const csv = buildCsv(users, [
        { header: "ID", get: (u) => u?.id },
        { header: "Email", get: (u) => u?.email },
        { header: "Prénom", get: (u) => u?.firstname },
        { header: "Nom", get: (u) => u?.lastname },
        { header: "Téléphone", get: (u) => u?.phoneNumber },
        { header: "Type", get: (u) => u?.type },
        { header: "Actif", get: (u) => (u?.enabled ? "oui" : "non") },
        {
          header: "Inscription",
          get: (u) =>
            u?.createdAt ? new Date(u.createdAt).toISOString() : "",
        },
      ])

      const stamp = new Date().toISOString().slice(0, 10)
      downloadCsv(csv, `beepbeepcity-utilisateurs-${stamp}.csv`)
      toast.success(`${users.length} utilisateur(s) exporté(s)`)
    } catch {
      toast.error("Erreur lors de l'export CSV")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button variant="outline" onClick={handleExport} disabled={isExporting}>
      {isExporting ? (
        <Spinner />
      ) : (
        <DownloadIcon className="mr-1.5 size-3.5" />
      )}
      Exporter CSV
    </Button>
  )
}
