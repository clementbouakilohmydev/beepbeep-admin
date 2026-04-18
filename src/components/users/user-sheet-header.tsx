import {
  ShieldBanIcon,
  ShieldCheckIcon,
} from "lucide-react"
import type { UpdateUserMutationVariables } from "@/gql/generated"
import type { MappedUser } from "@/lib/mappers"
import { Button } from "@/components/ui"
import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { UserTypeBadge } from "./user-type-badge"
import { UserStatusBadge } from "./user-status-badge"

type UserSheetHeaderProps = {
  user: MappedUser
  updateUser: (variables: UpdateUserMutationVariables) => void
  isUpdatingUser: boolean
}

export function UserSheetHeader({
  user,
  updateUser,
  isUpdatingUser,
}: UserSheetHeaderProps) {
  return (
    <SheetHeader>
      <div className="flex items-start gap-3">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt="Avatar"
            className="size-12 rounded-full object-cover"
          />
        ) : (
          <div className="flex size-12 items-center justify-center rounded-full bg-muted text-lg font-bold text-muted-foreground">
            {(user.firstname?.[0] ?? "").toUpperCase()}
            {(user.lastname?.[0] ?? "").toUpperCase()}
          </div>
        )}
        <div className="flex-1">
          <SheetTitle>
            {user.firstname} {user.lastname}
          </SheetTitle>
          <SheetDescription>{user.email}</SheetDescription>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <UserTypeBadge type={user.type} />
            <UserStatusBadge enabled={user.enabled} />
          </div>
        </div>
      </div>
      <div className="pt-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant={user.enabled ? "outline" : "default"}

              disabled={isUpdatingUser}
              className="w-full sm:w-auto"
            >
              {user.enabled ? (
                <>
                  <ShieldBanIcon className="mr-2 size-4" />
                  Bloquer
                </>
              ) : (
                <>
                  <ShieldCheckIcon className="mr-2 size-4" />
                  Débloquer
                </>
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {user.enabled ? "Bloquer" : "Débloquer"} cet
                utilisateur ?
              </AlertDialogTitle>
              <AlertDialogDescription>
                {user.enabled
                  ? `${user.firstname} ${user.lastname} ne pourra plus accéder à la plateforme.`
                  : `${user.firstname} ${user.lastname} pourra à nouveau accéder à la plateforme.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  updateUser({
                    where: { id: user.id },
                    data: { enabled: !user.enabled },
                  })
                }
              >
                Confirmer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </SheetHeader>
  )
}
