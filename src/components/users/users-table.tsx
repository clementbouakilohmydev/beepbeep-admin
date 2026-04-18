import { CircleAlertIcon, StarIcon } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Skeleton,
  Badge,
} from "@/components/ui"
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

export function UsersTable({
  users,
  isLoading,
  isStale,
  skeletonCount,
  onUserClick,
}: UsersTableProps) {
  return (
    <div
      className={`overflow-x-auto ${isStale ? "opacity-60 transition-opacity" : ""}`}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Prénom</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead className="hidden sm:table-cell">Email</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Documents</TableHead>
            <TableHead className="hidden sm:table-cell">Note</TableHead>
            <TableHead className="hidden md:table-cell">Inscription</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: skeletonCount }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  <TableCell className="hidden sm:table-cell"><Skeleton className="h-5 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell className="hidden sm:table-cell"><Skeleton className="h-5 w-12" /></TableCell>
                  <TableCell className="hidden md:table-cell"><Skeleton className="h-5 w-20" /></TableCell>
                </TableRow>
              ))
            : users?.map((user) => {
                const pendingDocs = getPendingDocsCount(user)
                return (
                  <TableRow
                    key={user.id}
                    className="cursor-pointer"
                    onClick={() => onUserClick(user.id)}
                  >
                    <TableCell className="font-medium">
                      {user.firstname ?? "—"}
                    </TableCell>
                    <TableCell>{user.lastname ?? "—"}</TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {user.email ?? "—"}
                    </TableCell>
                    <TableCell>
                      <UserTypeBadge type={user.type} />
                    </TableCell>
                    <TableCell>
                      <UserStatusBadge enabled={user.enabled} />
                    </TableCell>
                    <TableCell>
                      {user.type === "driver" ? (
                        pendingDocs > 0 ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge
                                variant="secondary"
                                className="bg-yellow-500/10 text-yellow-600"
                              >
                                <CircleAlertIcon className="mr-1 size-3" />
                                {pendingDocs} en attente
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>Documents à valider</TooltipContent>
                          </Tooltip>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-primary/10 text-primary"
                          >
                            Tous validés
                          </Badge>
                        )
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {user.averageRate != null && user.averageRate > 0 ? (
                        <div className="flex items-center gap-1">
                          <StarIcon className="size-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">
                            {user.averageRate.toFixed(1)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {formatDate(user.createdAt)}
                    </TableCell>
                  </TableRow>
                )
              })}
          {!isLoading && !users?.length && (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                Aucun utilisateur trouvé
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
