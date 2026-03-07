import { SearchIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export type Filter = "all" | "pending" | "solved"

type TicketFiltersProps = {
  filter: Filter
  onFilterChange: (filter: Filter) => void
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
      <div className="relative max-w-sm">
        <SearchIcon className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher par description, utilisateur..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
    </div>
  )
}
