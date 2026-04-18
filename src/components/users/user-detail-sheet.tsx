import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useGetUserQuery, useUpdateUserMutation } from "@/gql/generated"
import { useUpdateDocument } from "@/hooks"
import { Skeleton } from "@/components/ui"
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet"
import { DocumentCardSkeleton } from "./document-card"
import { UserSheetHeader } from "./user-sheet-header"
import { UserSheetInfo } from "./user-sheet-info"
import { UserSheetVehicle } from "./user-sheet-vehicle"
import { UserSheetDocuments } from "./user-sheet-documents"
import { UserSheetRatings } from "./user-sheet-ratings"

type UserDetailSheetProps = {
  userId: string | null
  onClose: () => void
}

export function UserDetailSheet({ userId, onClose }: UserDetailSheetProps) {
  const queryClient = useQueryClient()

  const { data, isLoading } = useGetUserQuery(
    { where: { id: userId! } },
    { enabled: !!userId }
  )

  const user = data?.user

  const invalidateUser = () => {
    queryClient.invalidateQueries({ queryKey: ["GetUser"] })
    queryClient.invalidateQueries({ queryKey: ["GetUsers"] })
  }

  const { mutate: updateUser, isPending: isUpdatingUser } =
    useUpdateUserMutation({
      onSuccess: () => {
        invalidateUser()
        toast.success(
          user?.enabled ? "Utilisateur bloqué" : "Utilisateur débloqué"
        )
      },
      onError: () => toast.error("Erreur lors de la mise à jour"),
    })

  const dl = useUpdateDocument("drivingLicense")
  const ins = useUpdateDocument("insurance")
  const rd = useUpdateDocument("registrationDocument")
  const cert = useUpdateDocument("certificate")

  const isValidatingDoc =
    dl.isPending || ins.isPending || rd.isPending || cert.isPending

  const isDriver = user?.type === "driver"

  return (
    <Sheet open={!!userId} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="max-w-full overflow-y-auto sm:max-w-xl lg:max-w-2xl"
      >
        {isLoading ? (
          <SheetLoadingSkeleton />
        ) : !user ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">Utilisateur introuvable.</p>
          </div>
        ) : (
          <>
            <UserSheetHeader
              user={user}
              updateUser={updateUser}
              isUpdatingUser={isUpdatingUser}
            />

            <div className="space-y-6 px-4 pb-6">
              <UserSheetInfo user={user} />

              {isDriver && user.vehicule && (
                <UserSheetVehicle vehicule={user.vehicule} />
              )}

              {isDriver && (
                <UserSheetDocuments
                  user={user}
                  dl={dl}
                  ins={ins}
                  rd={rd}
                  cert={cert}
                  isValidatingDoc={isValidatingDoc}
                />
              )}

              {(user.ratingsCount ?? 0) > 0 && user.ratings?.length ? (
                <UserSheetRatings
                  ratings={user.ratings}
                  ratingsCount={user.ratingsCount ?? 0}
                />
              ) : null}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

function SheetLoadingSkeleton() {
  return (
    <div className="space-y-6 p-4">
      <div className="flex items-start gap-3">
        <Skeleton className="size-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-56" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      </div>
      <Skeleton className="h-8 w-28" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-48 w-full rounded-lg" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-36 w-full rounded-lg" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <DocumentCardSkeleton />
        <DocumentCardSkeleton />
      </div>
    </div>
  )
}
