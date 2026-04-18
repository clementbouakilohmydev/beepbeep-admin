import { CircleAlertIcon, StarIcon } from "lucide-react"
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

function getPendingDocsCount(user: User) {
  if (user.type !== "driver") return 0
  const docs = [
    user.drivingLicense?.state,
    user.insurance?.state,
    user.registrationDocument?.state,
    user.certificate?.state,
  ]
  return docs.filter((s) => s && s !== "verified").length
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
    header: "Statut",
    cell: ({ row }) => <UserStatusBadge enabled={row.original.enabled} />,
    meta: { skeletonClassName: "h-5 w-16" },
  },
  {
    id: "documents",
    header: "Documents",
    cell: ({ row }) => {
      const user = row.original
      if (user.type !== "driver") {
        return <span className="text-muted-foreground">—</span>
      }
      const pendingDocs = getPendingDocsCount(user)
      if (pendingDocs > 0) {
        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge
                variant="secondary"
                className="bg-yellow-500/20 text-yellow-400"
              >
                <CircleAlertIcon className="mr-1 size-3" />
                {pendingDocs} en attente
              </Badge>
            </TooltipTrigger>
            <TooltipContent>Documents à valider</TooltipContent>
          </Tooltip>
        )
      }
      return (
        <Badge variant="secondary" className="bg-primary/20 text-primary">
          Tous validés
        </Badge>
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
