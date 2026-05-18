import type { ReactNode } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"

type DetailSheetProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export function DetailSheet({ open, onClose, children }: DetailSheetProps) {
  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="right"
        // 100% sur mobile, 50% du viewport sur ≥sm. !max-w-none neutralise
        // le max-w-sm hérité du SheetContent shadcn (qui sinon capait à ~24rem).
        className="!w-full overflow-y-auto sm:!w-1/2 sm:!max-w-none"
      >
        {children}
      </SheetContent>
    </Sheet>
  )
}
