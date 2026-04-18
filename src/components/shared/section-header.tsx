import { Link } from "react-router-dom"
import { ArrowRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

type SectionHeaderProps = {
  title: string
  to: string
  linkLabel?: string
}

export function SectionHeader({
  title,
  to,
  linkLabel = "Voir tout",
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold">{title}</h2>
      <Button
        className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
        asChild
      >
        <Link to={to}>
          {linkLabel}
          <ArrowRightIcon className="ml-1 size-3.5" />
        </Link>
      </Button>
    </div>
  )
}
