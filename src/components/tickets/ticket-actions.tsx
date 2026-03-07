import { useState } from "react"
import {
  MoreHorizontalIcon,
  MailIcon,
  CheckCircleIcon,
  CircleXIcon,
} from "lucide-react"
import { getUserDisplay } from "@/lib"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type TicketUser =
  | {
      firstname?: string | null
      lastname?: string | null
      email?: string | null
    }
  | null
  | undefined

type TicketActionsProps = {
  ticketId: string
  solved: boolean | null | undefined
  user: TicketUser
  onToggleSolved: (
    ticketId: string,
    currentSolved: boolean | null | undefined
  ) => void
  onSendMessage: (email: string, name: string) => void
}

export function TicketActions({
  ticketId,
  solved,
  user,
  onToggleSolved,
  onSendMessage,
}: TicketActionsProps) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setConfirmOpen(true)}>
            {solved ? (
              <>
                <CircleXIcon className="mr-2 size-4" />
                Marquer à traiter
              </>
            ) : (
              <>
                <CheckCircleIcon className="mr-2 size-4" />
                Marquer résolu
              </>
            )}
          </DropdownMenuItem>
          {user?.email && (
            <DropdownMenuItem
              onClick={() => onSendMessage(user.email!, getUserDisplay(user))}
            >
              <MailIcon className="mr-2 size-4" />
              Envoyer un message
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Confirmer le changement de statut
            </AlertDialogTitle>
            <AlertDialogDescription>
              {solved
                ? "Ce ticket sera marqué comme « à traiter ». Voulez-vous continuer ?"
                : "Ce ticket sera marqué comme « résolu ». Voulez-vous continuer ?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={() => onToggleSolved(ticketId, solved)}>
              Confirmer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
