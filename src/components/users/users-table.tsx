import { CircleAlertIcon, CircleCheckIcon, StarIcon } from "lucide-react"
import { type ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui"
import { DataTable } from "@/components/shared/data-table"
import { UserTypeBadge } from "./user-type-badge"
import { UserStatusBadge } from "./user-status-badge"
import { formatDate } from "@/lib/format"
import type { GetUsersQuery } from "@/gql/generated"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type User = NonNullable<GetUsersQuery["users"]>[number]

type UsersTableProps = {
  users: User[] | null | undefined
  isLoading: boolean
  isStale: boolean
  skeletonCount: number
  onUserClick: (userId: string) => void
}

type DriverDocsStatus =
  | { kind: "na" } // pas un conducteur
  | { kind: "none" } // aucune pièce envoyée
  | { kind: "pending"; awaiting: number } // pièces envoyées, exigences pas encore remplies
  | { kind: "complete" } // exigences remplies → conducteur activable

/**
 * État réel des documents d'un conducteur pour l'affichage admin.
 *
 * Règle métier (docs/REGLES_METIER.md §7) : un conducteur est complet quand
 * **(Permis de conduire OU Certificat)** est validé, **ET** l'Assurance
 * validée, **ET** la Carte grise validée. (Le véhicule est vérifié à part.)
 *
 * ⚠️ Bug historique corrigé ici : un document ABSENT (`undefined`) était
 * écarté par un `s && …`, donc un conducteur n'ayant envoyé aucune pièce
 * ressortait « Tous validés ». Désormais une pièce absente compte comme
 * non validée.
 */
function getDriverDocsStatus(user: User): DriverDocsStatus {
  if (user.type !== "driver") return { kind: "na" }

  const dl = user.drivingLicense?.state
  const cert = user.certificate?.state
  const ins = user.insurance?.state
  const rd = user.registrationDocument?.state
  const states = [dl, cert, ins, rd]

  if (!states.some(Boolean)) return { kind: "none" }

  const licenceOk = dl === "verified" || cert === "verified"
  const complete = licenceOk && ins === "verified" && rd === "verified"
  if (complete) return { kind: "complete" }

  // Pièces déjà envoyées mais pas encore "verified" → à traiter par l'admin.
  const awaiting = states.filter((s) => s && s !== "verified").length
  return { kind: "pending", awaiting }
}

const columns: ColumnDef<User, unknown>[] = [
  {
    accessorKey: "firstname",
    header: "Prénom",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.firstname ?? "—"}</span>
    ),
    meta: { skeletonClassName: "h-5 w-20" },
  },
  {
    accessorKey: "lastname",
    header: "Nom",
    cell: ({ row }) => row.original.lastname ?? "—",
    meta: { skeletonClassName: "h-5 w-20" },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.email ?? "—"}</span>
    ),
    meta: {
      headerClassName: "hidden sm:table-cell",
      cellClassName: "hidden sm:table-cell",
      skeletonClassName: "h-5 w-32",
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <UserTypeBadge type={row.original.type} />,
    meta: { skeletonClassName: "h-5 w-20" },
  },
  {
    id: "status",
    // "Compte" (et pas "Statut") : ce badge reflète le flag `enabled`
    // (blocage admin du compte), PAS l'activation métier du conducteur —
    // celle-ci est portée par la colonne "Documents" ci-dessous.
    header: "Compte",
    cell: ({ row }) => <UserStatusBadge enabled={row.original.enabled} />,
    meta: { skeletonClassName: "h-5 w-16" },
  },
  {
    id: "documents",
    header: "Documents",
    cell: ({ row }) => {
      const status = getDriverDocsStatus(row.original)

      if (status.kind === "na") {
        return <span className="text-muted-foreground">—</span>
      }

      if (status.kind === "complete") {
        return (
          <Badge variant="secondary" className="bg-primary/20 text-primary">
            <CircleCheckIcon className="mr-1 size-3" />
            Validés
          </Badge>
        )
      }

      if (status.kind === "none") {
        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="secondary" className="bg-red-500/20 text-red-400">
                <CircleAlertIcon className="mr-1 size-3" />
                Aucun document
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              Le conducteur n'a envoyé aucune pièce
            </TooltipContent>
          </Tooltip>
        )
      }

      // pending : des pièces sont envoyées mais les exigences ne sont pas
      // encore remplies (soit des pièces à valider, soit des obligatoires
      // manquantes).
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge
              variant="secondary"
              className="bg-yellow-500/20 text-yellow-400"
            >
              <CircleAlertIcon className="mr-1 size-3" />
              {status.awaiting > 0
                ? `${status.awaiting} à valider`
                : "Incomplet"}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            {status.awaiting > 0
              ? "Documents en attente de validation"
              : "Documents obligatoires manquants"}
          </TooltipContent>
        </Tooltip>
      )
    },
    meta: { skeletonClassName: "h-5 w-24" },
  },
  {
    id: "rating",
    header: "Note",
    cell: ({ row }) => {
      const user = row.original
      if (user.averageRate != null && user.averageRate > 0) {
        return (
          <div className="flex items-center gap-1">
            <StarIcon className="size-3 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{user.averageRate.toFixed(1)}</span>
          </div>
        )
      }
      return <span className="text-muted-foreground">—</span>
    },
    meta: {
      headerClassName: "hidden sm:table-cell",
      cellClassName: "hidden sm:table-cell",
      skeletonClassName: "h-5 w-12",
    },
  },
  {
    accessorKey: "createdAt",
    header: "Inscription",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {formatDate(row.original.createdAt)}
      </span>
    ),
    meta: {
      headerClassName: "hidden md:table-cell",
      cellClassName: "hidden md:table-cell",
      skeletonClassName: "h-5 w-20",
    },
  },
]

export function UsersTable({
  users,
  isLoading,
  isStale,
  skeletonCount,
  onUserClick,
}: UsersTableProps) {
  return (
    <DataTable
      columns={columns}
      data={users ?? []}
      isLoading={isLoading}
      isStale={isStale}
      skeletonCount={skeletonCount}
      emptyMessage="Aucun utilisateur trouvé"
      onRowClick={(user) => onUserClick(user.id)}
    />
  )
}
