import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import {
  ArrowLeftIcon,
  MailIcon,
  UserIcon,
  PhoneIcon,
  CalendarIcon,
} from "lucide-react"
import { Skeleton, SendMessageDialog, TicketStatusBadge } from "@/components"
import { useUpdateTicket } from "@/hooks"
import { useGetTicketQuery } from "@/gql/generated"
import { formatDate, getUserDisplay } from "@/lib"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
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

export function TicketDetailPage() {
  const { id } = useParams<{ id: string }>()

  const [messageDialog, setMessageDialog] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const { toggleSolved } = useUpdateTicket()

  const { data, isLoading } = useGetTicketQuery(
    { where: { id: id! } },
    { enabled: !!id }
  )

  const ticket = data?.ticket

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-48 rounded-lg" />
          <Skeleton className="h-48 rounded-lg" />
        </div>
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="space-y-4">
        <Link
          to="/tickets"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          Retour aux tickets
        </Link>
        <p className="text-muted-foreground">Ticket introuvable.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/tickets"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeftIcon className="size-4" />
            Retour
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <div>
            <h1 className="text-2xl font-bold">
              {ticket.object?.object ?? "Ticket"}
            </h1>
            <p className="text-sm text-muted-foreground">#{ticket.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TicketStatusBadge solved={ticket.solved} />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setConfirmOpen(true)}
          >
            {ticket.solved ? "Marquer à traiter" : "Marquer résolu"}
          </Button>
        </div>
      </div>

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

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">
              {ticket.description || "Aucune description."}
            </p>
            <Separator className="my-4" />
            <div className="flex gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CalendarIcon className="size-3.5" />
                Créé le {formatDate(ticket.createdAt)}
              </div>
              {ticket.updatedAt && ticket.updatedAt !== ticket.createdAt && (
                <div className="flex items-center gap-1.5">
                  <CalendarIcon className="size-3.5" />
                  Mis à jour le {formatDate(ticket.updatedAt)}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Utilisateur</CardTitle>
            {ticket.user?.email && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMessageDialog(true)}
              >
                <MailIcon className="mr-1.5 size-3.5" />
                Envoyer un message
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {ticket.user ? (
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <UserIcon className="size-4 text-muted-foreground" />
                  <span>{getUserDisplay(ticket.user)}</span>
                </div>
                {ticket.user.email && (
                  <div className="flex items-center gap-2">
                    <MailIcon className="size-4 text-muted-foreground" />
                    <span>{ticket.user.email}</span>
                  </div>
                )}
                {ticket.user.phoneNumber && (
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="size-4 text-muted-foreground" />
                    <span>{ticket.user.phoneNumber}</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Aucun utilisateur associé.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {ticket.user?.email && (
        <SendMessageDialog
          open={messageDialog}
          onOpenChange={setMessageDialog}
          userEmail={ticket.user.email}
          userName={getUserDisplay(ticket.user)}
        />
      )}
    </div>
  )
}
