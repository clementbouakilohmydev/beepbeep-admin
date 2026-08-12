import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Trash2Icon } from "lucide-react"
import { useAdminDeleteUserAccountMutation } from "@/gql/generated"
import { Button, Label } from "@/components/ui"
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

type DeleteAccountDialogProps = {
  userId: string
  userName: string
  /** Déjà supprimé : on affiche l'état plutôt qu'une action impossible. */
  isDeleted: boolean
}

/**
 * Suppression d'un compte à la demande du support.
 *
 * Le back peut refuser légitimement (course en cours, paiement en vol, gains
 * non versés) : ce n'est pas une erreur technique, on affiche donc le message
 * métier renvoyé plutôt qu'un « une erreur est survenue » générique.
 */
export function DeleteAccountDialog({
  userId,
  userName,
  isDeleted,
}: DeleteAccountDialogProps) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState("")

  const { mutate: deleteAccount, isPending } =
    useAdminDeleteUserAccountMutation({
      onSuccess: (data) => {
        const res = data.adminDeleteUserAccount
        if (!res.success) {
          toast.error(
            res.reasonMessage ?? "Suppression impossible pour le moment."
          )
          return
        }
        queryClient.invalidateQueries({ queryKey: ["GetUser"] })
        queryClient.invalidateQueries({ queryKey: ["GetUsers"] })
        toast.success("Compte supprimé")
        setOpen(false)
        setReason("")
      },
      onError: () => toast.error("Erreur lors de la suppression"),
    })

  if (isDeleted) {
    return (
      <Button variant="outline" disabled className="w-full sm:w-auto">
        <Trash2Icon className="mr-2 size-4" />
        Compte supprimé
      </Button>
    )
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          disabled={isPending}
          className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive sm:w-auto"
        >
          <Trash2Icon className="mr-2 size-4" />
          Supprimer le compte
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Supprimer le compte de {userName} ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Le compte sera désactivé et sortira immédiatement du matching. Les
            courses et paiements passés sont conservés (ils appartiennent aussi
            à l'autre partie). L'utilisateur pourra réactiver son compte en se
            reconnectant.
            <br />
            <br />
            La suppression sera refusée si une course est en cours, si un
            paiement est en traitement, ou si des gains ne lui ont pas encore
            été versés.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-2">
          <Label htmlFor="deletion-reason">Motif (optionnel)</Label>
          <textarea
            id="deletion-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Ex : demande de l'utilisateur par email du 12/08"
            rows={3}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          />
          <p className="text-xs text-muted-foreground">
            Conservé dans le journal d'actions administrateur.
          </p>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Annuler</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
            onClick={(e) => {
              // Empêche la fermeture automatique : le back peut refuser, on
              // veut alors garder la modale ouverte avec le message d'erreur.
              e.preventDefault()
              deleteAccount({ userId, reason: reason || undefined })
            }}
          >
            {isPending ? "Suppression…" : "Supprimer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
