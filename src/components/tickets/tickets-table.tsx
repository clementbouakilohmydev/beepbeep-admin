import type { ColumnDef } from "@tanstack/react-table"
import type { GetTicketsQuery } from "@/gql/generated"
import { formatDate, getUserDisplay } from "@/lib/format"
import { DataTable } from "@/components/shared/data-table"
import { TicketStatusBadge } from "./ticket-status-badge"
import { TicketActions } from "./ticket-actions"

type Ticket = NonNullable<GetTicketsQuery["tickets"]>[number]

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
  const columns: ColumnDef<Ticket, unknown>[] = [
    {
      accessorFn: (row) => row.object?.object,
      id: "object",
      header: "Objet",
      cell: ({ row }) => (
        <span className="font-medium">
          {row.original.object?.object ?? "—"}
        </span>
      ),
      meta: {
        skeletonClassName: "h-4 w-24",
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => row.original.description ?? "—",
      meta: {
        headerClassName: "hidden md:table-cell",
        cellClassName: "hidden max-w-[300px] truncate md:table-cell",
        skeletonClassName: "h-4 w-48",
      },
    },
    {
      id: "user",
      header: "Utilisateur",
      cell: ({ row }) => getUserDisplay(row.original.user),
      meta: {
        skeletonClassName: "h-4 w-32",
      },
    },
    {
      accessorKey: "solved",
      header: "Statut",
      cell: ({ row }) => <TicketStatusBadge solved={row.original.solved} />,
      meta: {
        skeletonClassName: "h-5 w-16 rounded-full",
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {formatDate(row.original.createdAt)}
        </span>
      ),
      meta: {
        headerClassName: "hidden sm:table-cell",
        cellClassName: "hidden sm:table-cell",
        skeletonClassName: "h-4 w-28",
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <TicketActions
          ticketId={row.original.id}
          solved={row.original.solved}
          user={row.original.user}
          onToggleSolved={onToggleSolved}
          onSendMessage={onSendMessage}
        />
      ),
      meta: {
        headerClassName: "w-12",
        stopPropagation: true,
        skeletonClassName: "h-8 w-8 rounded-md",
      },
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={tickets ?? []}
      isLoading={isLoading}
      isStale={isStale}
      skeletonCount={skeletonCount}
      emptyMessage="Aucun ticket"
      onRowClick={(ticket) => onTicketClick(ticket.id)}
    />
  )
}
