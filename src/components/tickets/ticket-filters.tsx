import { SearchIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { TicketFilter } from "@/lib/constants"

type TicketFiltersProps = {
  filter: TicketFilter
  onFilterChange: (filter: TicketFilter) => void
  dateRange: DateRange | undefined
  onDateRangeChange: (range: DateRange | undefined) => void
  search: string
  onSearchChange: (search: string) => void
  counts?: { pending?: number | null; solved?: number | null }
}

export function TicketFilters({
  filter,
  onFilterChange,
  dateRange,
  onDateRangeChange,
  search,
  onSearchChange,
  counts,
}: TicketFiltersProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange("all")}
          >
            Tous
            {counts && (
              <span className="ml-1.5 text-xs opacity-70">
                ({(counts.pending ?? 0) + (counts.solved ?? 0)})
              </span>
            )}
          </Button>
          <Button
            variant={filter === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange("pending")}
          >
            À traiter
            {counts && (
              <span className="ml-1.5 text-xs opacity-70">
                ({counts.pending ?? 0})
              </span>
            )}
          </Button>
          <Button
            variant={filter === "solved" ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange("solved")}
          >
            Traités
            {counts && (
              <span className="ml-1.5 text-xs opacity-70">
                ({counts.solved ?? 0})
              </span>
            )}
          </Button>
          <DateRangePicker value={dateRange} onChange={onDateRangeChange} />
        </div>
        <div className="relative w-full sm:w-72">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher par description, utilisateur..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
    </div>
  )
}
