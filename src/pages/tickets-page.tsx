import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { DateRange } from "react-day-picker"
import { keepPreviousData } from "@tanstack/react-query"
import { CircleAlertIcon, CircleCheckIcon } from "lucide-react"
import {
  TicketFilters,
  TicketsTable,
  TicketDetailSheet,
} from "@/components/tickets"
import { SendMessageDialog } from "@/components/dialogs/send-message-dialog"
import { PaginationSection } from "@/components/shared/pagination-section"
import { StatCard } from "@/components/shared/stat-card"
import { ErrorState } from "@/components/shared/error-state"
import { usePagedSearchParams, useUpdateTicket } from "@/hooks"
import { useGetTicketsQuery, useGetTicketsCountsQuery } from "@/gql/generated"
import {
  parseTicketFilter,
  ORDER_BY_NEWEST,
  PAGE_SIZE,
  type TicketFilter,
} from "@/lib/constants"

function getWhereClause(
  filter: TicketFilter,
  dateRange?: DateRange,
  search?: string
) {
  const where: Record<string, unknown> = {}

  if (filter === "pending") where.solved = { equals: false }
  if (filter === "solved") where.solved = { equals: true }

  if (dateRange?.from) {
    where.createdAt = {
      gte: dateRange.from.toISOString(),
      ...(dateRange.to && {
        lte: new Date(dateRange.to.getTime() + 86400000 - 1).toISOString(),
      }),
    }
  }

  if (search) {
    const contains = { contains: search, mode: "insensitive" }
    where.OR = [
      { description: contains },
      { user: { firstname: contains } },
      { user: { lastname: contains } },
      { user: { email: contains } },
    ]
  }

  return where
}

export function TicketsPage() {
  const navigate = useNavigate()
  const {
    searchParams,
    page,
    search,
    debouncedSearch,
    updateParams,
    setPage,
    handleSearchChange,
  } = usePagedSearchParams()

  const filter = parseTicketFilter(searchParams.get("filter"))
  const ticketId = searchParams.get("ticketId")

  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [messageDialog, setMessageDialog] = useState<{
    open: boolean
    email: string
    name: string
  }>({ open: false, email: "", name: "" })

  const { toggleSolved } = useUpdateTicket()

  const handleFilterChange = (newFilter: TicketFilter) => {
    updateParams(
      { filter: newFilter === "all" ? null : newFilter },
      true
    )
  }

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range)
    if (page > 1) {
      updateParams({ page: null })
    }
  }

  const handleTicketClick = (id: string) => {
    updateParams({ ticketId: id })
  }

  const handleCloseSheet = () => {
    updateParams({ ticketId: null })
  }

  const handleSendMessage = (email: string, name: string) => {
    setMessageDialog({ open: true, email, name })
  }

  const whereClause = getWhereClause(filter, dateRange, debouncedSearch)

  const { data, isLoading, isError, refetch, isPlaceholderData } = useGetTicketsQuery(
    {
      where: whereClause,
      orderBy: ORDER_BY_NEWEST,
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    },
    { placeholderData: keepPreviousData }
  )

  const { data: countsData, isLoading: countsLoading } =
    useGetTicketsCountsQuery({})

  const totalCount = data?.ticketsCount ?? 0
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

  if (isError && !isLoading) {
    return <ErrorState onRetry={refetch} />
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <StatCard
          title="À traiter"
          value={countsData?.pending ?? 0}
          icon={CircleAlertIcon}
          iconClassName="text-destructive"
          isLoading={countsLoading}
        />
        <StatCard
          title="Traités"
          value={countsData?.solved ?? 0}
          icon={CircleCheckIcon}
          iconClassName="text-primary"
          isLoading={countsLoading}
        />
      </div>

      <TicketFilters
        filter={filter}
        onFilterChange={handleFilterChange}
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
        search={search}
        onSearchChange={handleSearchChange}
        counts={countsData}
      />

      <TicketsTable
        tickets={data?.tickets}
        isLoading={isLoading}
        isStale={isPlaceholderData}
        skeletonCount={PAGE_SIZE}
        onToggleSolved={toggleSolved}
        onSendMessage={handleSendMessage}
        onTicketClick={handleTicketClick}
      />

      <PaginationSection
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
        itemName="ticket"
        onPageChange={setPage}
      />

      <TicketDetailSheet
        ticketId={ticketId}
        onClose={handleCloseSheet}
        onUserClick={(userId) => navigate(`/users?userId=${userId}`)}
      />

      <SendMessageDialog
        open={messageDialog.open}
        onOpenChange={(open) => setMessageDialog((prev) => ({ ...prev, open }))}
        userEmail={messageDialog.email}
        userName={messageDialog.name}
      />
    </div>
  )
}
