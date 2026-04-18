import type { GetTicketsQuery } from "@/gql/generated"
import { formatDate, getUserDisplay } from "@/lib/format"
import { Skeleton } from "@/components/ui/skeleton"
import { TicketStatusBadge } from "./ticket-status-badge"
import { TicketActions } from "./ticket-actions"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type TicketsTableProps = {
  tickets: GetTicketsQuery["tickets"] | undefined
  isLoading: boolean
  isStale: boolean
  skeletonCount: number
  onToggleSolved: (
    ticketId: string,
    currentSolved: boolean | null | undefined
  ) => void
  onSendMessage: (email: string, name: string) => void
  onTicketClick: (ticketId: string) => void
}

export function TicketsTable({
  tickets,
  isLoading,
  isStale,
  skeletonCount,
  onToggleSolved,
  onSendMessage,
  onTicketClick,
}: TicketsTableProps) {
  return (
    <div
      className={`overflow-x-auto rounded-lg border ${isStale ? "opacity-60 transition-opacity" : ""}`}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Objet</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead>Utilisateur</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="hidden sm:table-cell">Date</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: skeletonCount }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-48" /></TableCell>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell><Skeleton className="h-5 w-16 rounded-full" /></TableCell>
                <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-28" /></TableCell>
                <TableCell><Skeleton className="h-8 w-8 rounded-md" /></TableCell>
              </TableRow>
            ))
          ) : tickets && tickets.length > 0 ? (
            tickets.map((ticket) => (
              <TableRow
                key={ticket.id}
                className="cursor-pointer"
                onClick={() => onTicketClick(ticket.id)}
              >
                <TableCell className="font-medium">
                  {ticket.object?.object ?? "—"}
                </TableCell>
                <TableCell className="hidden max-w-[300px] truncate md:table-cell">
                  {ticket.description ?? "—"}
                </TableCell>
                <TableCell>{getUserDisplay(ticket.user)}</TableCell>
                <TableCell>
                  <TicketStatusBadge solved={ticket.solved} />
                </TableCell>
                <TableCell className="hidden text-muted-foreground sm:table-cell">
                  {formatDate(ticket.createdAt)}
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <TicketActions
                    ticketId={ticket.id}
                    solved={ticket.solved}
                    user={ticket.user}
                    onToggleSolved={onToggleSolved}
                    onSendMessage={onSendMessage}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center text-muted-foreground"
              >
                Aucun ticket
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
