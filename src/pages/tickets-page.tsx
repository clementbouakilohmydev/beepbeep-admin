import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { DateRange } from "react-day-picker"
import { keepPreviousData } from "@tanstack/react-query"
import {
  SendMessageDialog,
  TicketFilters,
  TicketsTable,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components"
import type { Filter } from "@/components"
import { useDebounce, useUpdateTicket } from "@/hooks"
import { useGetTicketsQuery, useGetTicketsCountsQuery } from "@/gql/generated"

const PAGE_SIZE = 10

function getWhereClause(
  filter: Filter,
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
  const [searchParams, setSearchParams] = useSearchParams()
  const filter = (searchParams.get("filter") as Filter) || "all"
  const page = Number(searchParams.get("page") || "1")

  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search)
  const [messageDialog, setMessageDialog] = useState<{
    open: boolean
    email: string
    name: string
  }>({ open: false, email: "", name: "" })

  const { toggleSolved } = useUpdateTicket()

  const setFilter = (newFilter: Filter) => {
    const params = new URLSearchParams(searchParams)
    if (newFilter === "all") {
      params.delete("filter")
    } else {
      params.set("filter", newFilter)
    }
    params.delete("page")
    setSearchParams(params, { replace: true })
  }

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    if (newPage <= 1) {
      params.delete("page")
    } else {
      params.set("page", String(newPage))
    }
    setSearchParams(params, { replace: true })
  }

  useEffect(() => {
    if (page > 1) {
      const params = new URLSearchParams(searchParams)
      params.delete("page")
      setSearchParams(params, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  const whereClause = useMemo(
    () => getWhereClause(filter, dateRange, debouncedSearch),
    [filter, dateRange, debouncedSearch]
  )

  const { data, isLoading, isPlaceholderData } = useGetTicketsQuery(
    {
      where: whereClause,
      orderBy: [{ createdAt: "desc" as const }],
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    },
    { placeholderData: keepPreviousData }
  )

  const { data: countsData } = useGetTicketsCountsQuery({})

  const totalCount = data?.ticketsCount ?? 0
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range)
    const params = new URLSearchParams(searchParams)
    params.delete("page")
    setSearchParams(params, { replace: true })
  }

  const handleSendMessage = (email: string, name: string) => {
    setMessageDialog({ open: true, email, name })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tickets</h1>
        <p className="text-sm text-muted-foreground">
          Gérez les tickets de support
        </p>
      </div>

      <TicketFilters
        filter={filter}
        onFilterChange={setFilter}
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
        search={search}
        onSearchChange={setSearch}
        counts={countsData}
      />

      <TicketsTable
        tickets={data?.tickets}
        isLoading={isLoading}
        isStale={isPlaceholderData}
        skeletonCount={PAGE_SIZE}
        onToggleSolved={toggleSolved}
        onSendMessage={handleSendMessage}
      />

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {totalCount} ticket{totalCount > 1 ? "s" : ""} · Page {page} /{" "}
            {totalPages}
          </p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  text="Précédent"
                  onClick={() => setPage(page - 1)}
                  className={
                    page <= 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  text="Suivant"
                  onClick={() => setPage(page + 1)}
                  className={
                    page >= totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <SendMessageDialog
        open={messageDialog.open}
        onOpenChange={(open) => setMessageDialog((prev) => ({ ...prev, open }))}
        userEmail={messageDialog.email}
        userName={messageDialog.name}
      />
    </div>
  )
}
