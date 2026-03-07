import { useNavigate } from "react-router-dom"
import { CircleAlertIcon } from "lucide-react"
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
}: UsersTableProps) {
  const navigate = useNavigate()

  return (
    <div className={isStale ? "opacity-60 transition-opacity" : ""}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Prénom</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Documents</TableHead>
            <TableHead>Inscription</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: skeletonCount }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 7 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-5 w-24" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : users?.map((user) => {
                const pendingDocs = getPendingDocsCount(user)
                return (
                  <TableRow
                    key={user.id}
                    className="cursor-pointer"
                    onClick={() => navigate(`/users/${user.id}`)}
                  >
                    <TableCell className="font-medium">
                      {user.firstname ?? "—"}
                    </TableCell>
                    <TableCell>{user.lastname ?? "—"}</TableCell>
                    <TableCell className="text-muted-foreground">
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
                    <TableCell className="text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </TableCell>
                  </TableRow>
                )
              })}
          {!isLoading && !users?.length && (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                Aucun utilisateur trouvé
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
