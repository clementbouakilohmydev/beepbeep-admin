import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui"

type PaginationSectionProps = {
  page: number
  totalPages: number
  totalCount: number
  itemName: string
  onPageChange: (page: number) => void
}

export function PaginationSection({
  page,
  totalPages,
  totalCount,
  itemName,
  onPageChange,
}: PaginationSectionProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        {totalCount} {itemName}{totalCount > 1 ? "s" : ""} · Page {page} / {totalPages}
      </p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              text="Précédent"
              onClick={() => onPageChange(page - 1)}
              className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              text="Suivant"
              onClick={() => onPageChange(page + 1)}
              className={page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
