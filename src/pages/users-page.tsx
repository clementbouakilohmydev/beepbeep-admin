import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { keepPreviousData } from "@tanstack/react-query"
import {
  UserFilters,
  UsersTable,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components"
import type { UserFilter } from "@/components"
import { useDebounce } from "@/hooks"
import { useGetUsersQuery, useGetUsersCountsQuery } from "@/gql/generated"
import { getDateWheres } from "@/lib/date"

const PAGE_SIZE = 10

function getWhereClause(filter: UserFilter, search?: string) {
  const where: Record<string, unknown> = { isAdmin: { equals: false } }

  if (filter === "passenger") where.type = { equals: "passenger" }
  if (filter === "driver") where.type = { equals: "driver" }

  if (search) {
    const contains = { contains: search, mode: "insensitive" }
    where.OR = [
      { firstname: contains },
      { lastname: contains },
      { email: contains },
    ]
  }

  return where
}

export function UsersPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filter = (searchParams.get("filter") as UserFilter) || "all"
  const page = Number(searchParams.get("page") || "1")

  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search)

  const setFilter = (newFilter: UserFilter) => {
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
    () => getWhereClause(filter, debouncedSearch),
    [filter, debouncedSearch]
  )

  const { data, isLoading, isPlaceholderData } = useGetUsersQuery(
    {
      where: whereClause,
      orderBy: [{ createdAt: "desc" as const }],
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    },
    { placeholderData: keepPreviousData }
  )

  const dateWheres = useMemo(() => getDateWheres(), [])
  const { data: countsData } = useGetUsersCountsQuery(dateWheres)

  const totalCount = data?.usersCount ?? 0
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Utilisateurs</h1>
        <p className="text-sm text-muted-foreground">
          Gérez les utilisateurs de la plateforme
        </p>
      </div>

      <UserFilters
        filter={filter}
        onFilterChange={setFilter}
        search={search}
        onSearchChange={setSearch}
        counts={countsData}
      />

      <UsersTable
        users={data?.users}
        isLoading={isLoading}
        isStale={isPlaceholderData}
        skeletonCount={PAGE_SIZE}
      />

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {totalCount} utilisateur{totalCount > 1 ? "s" : ""} · Page {page} /{" "}
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
    </div>
  )
}
