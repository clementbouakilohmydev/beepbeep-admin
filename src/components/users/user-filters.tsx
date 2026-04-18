import { SearchIcon } from "lucide-react"
import { Button, Input } from "@/components/ui"
import type { UserTypeFilter, UserStatusFilter } from "@/lib/constants"

type UserFiltersProps = {
  typeFilter: UserTypeFilter
  onTypeFilterChange: (filter: UserTypeFilter) => void
  statusFilter: UserStatusFilter
  onStatusFilterChange: (filter: UserStatusFilter) => void
  search: string
  onSearchChange: (search: string) => void
  counts?: {
    passengers?: number | null
    drivers?: number | null
    total?: number | null
    active?: number | null
    blocked?: number | null
  }
}

const TYPE_FILTERS: { value: UserTypeFilter; label: string; countKey: string }[] = [
  { value: "all", label: "Tous", countKey: "total" },
  { value: "passenger", label: "Passagers", countKey: "passengers" },
  { value: "driver", label: "Conducteurs", countKey: "drivers" },
]

const STATUS_FILTERS: { value: UserStatusFilter; label: string; countKey?: string }[] = [
  { value: "all", label: "Tous" },
  { value: "active", label: "Actifs", countKey: "active" },
  { value: "blocked", label: "Bloqués", countKey: "blocked" },
]

export function UserFilters({
  typeFilter,
  onTypeFilterChange,
  statusFilter,
  onStatusFilterChange,
  search,
  onSearchChange,
  counts,
}: UserFiltersProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {TYPE_FILTERS.map((f) => {
            const count = counts
              ? (counts as Record<string, number | null | undefined>)[f.countKey]
              : undefined

            return (
              <Button
                key={f.value}
                variant={typeFilter === f.value ? "default" : "outline"}

                onClick={() => onTypeFilterChange(f.value)}
              >
                {f.label}
                {count != null && (
                  <span className="ml-1.5 text-xs opacity-70">({count})</span>
                )}
              </Button>
            )
          })}
        </div>
        <div className="relative w-full sm:w-72">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un utilisateur…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => {
          const count =
            counts && f.countKey
              ? (counts as Record<string, number | null | undefined>)[f.countKey]
              : undefined

          return (
            <Button
              key={f.value}
              variant={statusFilter === f.value ? "default" : "outline"}

              onClick={() => onStatusFilterChange(f.value)}
            >
              {f.label}
              {count != null && (
                <span className="ml-1.5 text-xs opacity-70">({count})</span>
              )}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
