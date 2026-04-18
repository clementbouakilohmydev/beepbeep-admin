import { keepPreviousData } from "@tanstack/react-query"
import {
  UserFilters,
  UsersTable,
  UserStatsCards,
  UserDetailSheet,
} from "@/components/users"
import {
  parseTypeFilter,
  parseStatusFilter,
  PAGE_SIZE,
  type UserTypeFilter,
  type UserStatusFilter,
  ORDER_BY_NEWEST,
} from "@/lib/constants"
import { PaginationSection } from "@/components/shared/pagination-section"
import { usePagedSearchParams } from "@/hooks"
import { ErrorState } from "@/components/shared/error-state"
import { useGetUsersQuery, useGetUsersCountsQuery } from "@/gql/generated"
import { getDateWheres } from "@/lib/date"

function getWhereClause(
  typeFilter: UserTypeFilter,
  statusFilter: UserStatusFilter,
  search?: string
) {
  const where: Record<string, unknown> = { isAdmin: { equals: false } }

  if (typeFilter === "passenger") where.type = { equals: "passenger" }
  if (typeFilter === "driver") where.type = { equals: "driver" }

  if (statusFilter === "active") where.enabled = { equals: true }
  if (statusFilter === "blocked") where.enabled = { equals: false }

  if (search) {
    const terms = search.trim().split(/\s+/).filter(Boolean)
    if (terms.length > 1) {
      // "Jean Dupont" → firstname contains "Jean" AND lastname contains "Dupont"
      // Also try the reverse: firstname contains "Dupont" AND lastname contains "Jean"
      where.OR = [
        {
          AND: terms.map((t) => ({
            OR: [
              { firstname: { contains: t, mode: "insensitive" } },
              { lastname: { contains: t, mode: "insensitive" } },
            ],
          })),
        },
        { email: { contains: search, mode: "insensitive" } },
      ]
    } else {
      const contains = { contains: search, mode: "insensitive" }
      where.OR = [
        { firstname: contains },
        { lastname: contains },
        { email: contains },
      ]
    }
  }

  return where
}

export function UsersPage() {
  const {
    searchParams,
    page,
    search,
    debouncedSearch,
    updateParams,
    setPage,
    handleSearchChange,
  } = usePagedSearchParams()

  const typeFilter = parseTypeFilter(searchParams.get("type"))
  const statusFilter = parseStatusFilter(searchParams.get("status"))
  const userId = searchParams.get("userId")

  const handleTypeFilterChange = (filter: UserTypeFilter) => {
    updateParams(
      { type: filter === "all" ? null : filter },
      true
    )
  }

  const handleStatusFilterChange = (filter: UserStatusFilter) => {
    updateParams(
      { status: filter === "all" ? null : filter },
      true
    )
  }

  const handleUserClick = (id: string) => {
    updateParams({ userId: id })
  }

  const handleCloseSheet = () => {
    updateParams({ userId: null })
  }

  const whereClause = getWhereClause(typeFilter, statusFilter, debouncedSearch)

  const { data, isLoading, isError, refetch, isPlaceholderData } = useGetUsersQuery(
    {
      where: whereClause,
      orderBy: ORDER_BY_NEWEST,
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    },
    { placeholderData: keepPreviousData }
  )

  const dateWheres = getDateWheres()
  const { data: countsData, isLoading: countsLoading } =
    useGetUsersCountsQuery(dateWheres)

  const totalCount = data?.usersCount ?? 0
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

  if (isError && !isLoading) {
    return <ErrorState onRetry={refetch} />
  }

  return (
    <div className="space-y-6">
      <UserStatsCards counts={countsData} isLoading={countsLoading} />

      <UserFilters
        typeFilter={typeFilter}
        onTypeFilterChange={handleTypeFilterChange}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        search={search}
        onSearchChange={handleSearchChange}
        counts={countsData}
      />

      <UsersTable
        users={data?.users}
        isLoading={isLoading}
        isStale={isPlaceholderData}
        skeletonCount={PAGE_SIZE}
        onUserClick={handleUserClick}
      />

      <PaginationSection
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
        itemName="utilisateur"
        onPageChange={setPage}
      />

      <UserDetailSheet userId={userId} onClose={handleCloseSheet} />
    </div>
  )
}
