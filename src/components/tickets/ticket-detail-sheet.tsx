import { useState } from "react"

import {
  MailIcon,
  UserIcon,
  PhoneIcon,
  CalendarIcon,
  CheckCircleIcon,
  CircleXIcon,
  ExternalLinkIcon,
} from "lucide-react"
import { useGetTicketQuery } from "@/gql/generated"
import { useUpdateTicket } from "@/hooks"
import { mapTicket } from "@/lib/mappers"
import { formatDate, getUserDisplay } from "@/lib/format"
import {
  Button,
  Skeleton,
  Separator,
} from "@/components/ui"
import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { DetailSheet } from "@/components/shared/detail-sheet"
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
import { TicketStatusBadge } from "./ticket-status-badge"
import { SendMessageDialog } from "@/components/dialogs/send-message-dialog"

type TicketDetailSheetProps = {
  ticketId: string | null
  onClose: () => void
  onUserClick?: (userId: string) => void
}

export function TicketDetailSheet({
  ticketId,
  onClose,
  onUserClick,
}: TicketDetailSheetProps) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [messageOpen, setMessageOpen] = useState(false)

  const { toggleSolved } = useUpdateTicket()

  const { data, isLoading } = useGetTicketQuery(
    { where: { id: ticketId! } },
    { enabled: !!ticketId }
  )

  const ticket = data?.ticket ? mapTicket(data.ticket) : null

  return (
    <DetailSheet open={!!ticketId} onClose={onClose}>
        {isLoading ? (
          <SheetLoadingSkeleton />
        ) : !ticket ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">Ticket introuvable.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <SheetHeader>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <SheetTitle>
                    {ticket.subject}
                  </SheetTitle>
                  <SheetDescription>#{ticket.id}</SheetDescription>
                </div>
                <TicketStatusBadge solved={ticket.solved} />
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button
                  variant="outline"

                  onClick={() => setConfirmOpen(true)}
                >
                  {ticket.solved ? (
                    <>
                      <CircleXIcon className="mr-1.5 size-3.5" />
                      Marquer à traiter
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon className="mr-1.5 size-3.5" />
                      Marquer résolu
                    </>
                  )}
                </Button>
                {ticket.user?.email && (
                  <Button
                    variant="outline"

                    onClick={() => setMessageOpen(true)}
                  >
                    <MailIcon className="mr-1.5 size-3.5" />
                    Envoyer un message
                  </Button>
                )}
              </div>
            </SheetHeader>

            <div className="space-y-6 px-4 pb-6">
              {/* Description */}
              <section>
                <h3 className="mb-2 text-sm font-semibold">Description</h3>
                <div className="rounded-lg border p-3">
                  <p className="whitespace-pre-wrap text-sm">
                    {ticket.description || "Aucune description."}
                  </p>
                  <Separator className="my-3" />
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <CalendarIcon className="size-3" />
                      Créé le {formatDate(ticket.createdAt)}
                    </div>
                    {ticket.updatedAt &&
                      ticket.updatedAt !== ticket.createdAt && (
                        <div className="flex items-center gap-1.5">
                          <CalendarIcon className="size-3" />
                          Mis à jour le {formatDate(ticket.updatedAt)}
                        </div>
                      )}
                  </div>
                </div>
              </section>

              {/* User info */}
              <section>
                <h3 className="mb-2 text-sm font-semibold">Utilisateur</h3>
                {ticket.user ? (
                  <div className="rounded-lg border p-3">
                    <div className="space-y-2.5 text-sm">
                      <div className="flex items-center gap-2">
                        <UserIcon className="size-4 text-muted-foreground" />
                        <span className="font-medium">
                          {getUserDisplay(ticket.user)}
                        </span>
                      </div>
                      {ticket.user.email && (
                        <div className="flex items-center gap-2">
                          <MailIcon className="size-4 text-muted-foreground" />
                          <a
                            href={`mailto:${ticket.user.email}`}
                            className="text-primary hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {ticket.user.email}
                          </a>
                        </div>
                      )}
                      {ticket.user.phoneNumber && (
                        <div className="flex items-center gap-2">
                          <PhoneIcon className="size-4 text-muted-foreground" />
                          <a
                            href={`tel:${ticket.user.phoneNumber}`}
                            className="text-primary hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {ticket.user.phoneNumber}
                          </a>
                        </div>
                      )}
                    </div>
                    <Separator className="my-3" />
                    <Button
                      variant="ghost"

                      className="w-full"
                      onClick={() => {
                        onClose()
                        onUserClick?.(ticket.user!.id)
                      }}
                    >
                      <ExternalLinkIcon className="mr-1.5 size-3.5" />
                      Voir le profil complet
                    </Button>
                  </div>
                ) : (
                  <div className="rounded-lg border p-3">
                    <p className="text-sm text-muted-foreground">
                      Aucun utilisateur associé.
                    </p>
                  </div>
                )}
              </section>
            </div>

            {/* Confirm status change */}
            <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Confirmer le changement de statut
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {ticket.solved
                      ? "Ce ticket sera marqué comme « à traiter ». Voulez-vous continuer ?"
                      : "Ce ticket sera marqué comme « résolu ». Voulez-vous continuer ?"}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => toggleSolved(ticket.id, ticket.solved)}
                  >
                    Confirmer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Send message dialog */}
            {ticket.user?.email && (
              <SendMessageDialog
                open={messageOpen}
                onOpenChange={setMessageOpen}
                userEmail={ticket.user.email}
                userName={getUserDisplay(ticket.user)}
              />
            )}
          </>
        )}
    </DetailSheet>
  )
}

function SheetLoadingSkeleton() {
  return (
    <div className="space-y-6 p-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-5 w-20" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-8 w-40" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-32 w-full rounded-lg" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-28 w-full rounded-lg" />
      </div>
    </div>
  )
}
