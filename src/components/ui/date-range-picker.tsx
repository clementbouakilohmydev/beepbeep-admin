import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon, XIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DateRangePickerProps = {
  value: DateRange | undefined
  onChange: (range: DateRange | undefined) => void
  className?: string
}

export function DateRangePicker({
  value,
  onChange,
  className,
}: DateRangePickerProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "justify-start text-left font-normal",
              !value?.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="size-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "dd MMM yyyy", { locale: fr })} –{" "}
                  {format(value.to, "dd MMM yyyy", { locale: fr })}
                </>
              ) : (
                format(value.from, "dd MMM yyyy", { locale: fr })
              )
            ) : (
              "Filtrer par période"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            locale={fr}
            disabled={{ after: new Date() }}
          />
        </PopoverContent>
      </Popover>
      {value?.from && (
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={() => onChange(undefined)}
        >
          <XIcon className="size-4" />
        </Button>
      )}
    </div>
  )
}
