import { SearchIcon } from "lucide-react"
import { Button, Input } from "@/components/ui"

export type UserFilter = "all" | "passenger" | "driver"

type UserFiltersProps = {
  filter: UserFilter
  onFilterChange: (filter: UserFilter) => void
  search: string
  onSearchChange: (search: string) => void
  counts?: {
    passengers?: number | null
    drivers?: number | null
    total?: number | null
  }
}

const FILTERS: { value: UserFilter; label: string; countKey?: string }[] = [
  { value: "all", label: "Tous", countKey: "total" },
  { value: "passenger", label: "Passagers", countKey: "passengers" },
  { value: "driver", label: "Conducteurs", countKey: "drivers" },
]

export function UserFilters({
  filter,
  onFilterChange,
  search,
  onSearchChange,
  counts,
}: UserFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-2">
        {FILTERS.map((f) => {
          const count =
            counts && f.countKey
              ? (counts as Record<string, number | null | undefined>)[
                  f.countKey
                ]
              : undefined

          return (
            <Button
              key={f.value}
              variant={filter === f.value ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(f.value)}
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
  )
}
