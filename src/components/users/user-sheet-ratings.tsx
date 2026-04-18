import { StarIcon } from "lucide-react"
import type { MappedUser } from "@/lib/mappers"
import { Badge, Card, CardContent } from "@/components/ui"
import { formatDate } from "@/lib/format"

type UserSheetRatingsProps = {
  ratings: NonNullable<MappedUser["ratings"]>
  ratingsCount: number
}

function RatingStars({ note }: { note: number | null | undefined }) {
  if (note == null) return <span className="text-muted-foreground">—</span>
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={`size-3.5 ${
            i < note
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium">{note}/5</span>
    </div>
  )
}

export function UserSheetRatings({
  ratings,
  ratingsCount,
}: UserSheetRatingsProps) {
  return (
    <section>
      <h3 className="mb-2 text-sm font-semibold">
        Avis reçus ({ratingsCount})
      </h3>
      <div className="grid gap-2">
        {ratings.map((rating) => (
          <Card key={rating.id}>
            <CardContent className="flex items-start gap-3 pt-4">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    {rating.user?.firstname}{" "}
                    {rating.user?.lastname}
                  </p>
                  <RatingStars note={rating.note} />
                </div>
                {rating.message && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {rating.message}
                  </p>
                )}
                {rating.tags && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {rating.tags.split(",").map((tag, idx) => (
                      <Badge
                        key={`${tag.trim()}-${idx}`}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                )}
                <p className="mt-2 text-xs text-muted-foreground">
                  {formatDate(rating.createdAt)}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
