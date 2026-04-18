import type { ReactNode } from "react"
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet"

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
        className="!w-full overflow-y-auto sm:!w-[40%]"
      >
        {children}
      </SheetContent>
    </Sheet>
  )
}
