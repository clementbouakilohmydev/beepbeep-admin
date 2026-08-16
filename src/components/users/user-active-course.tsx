import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { CircleAlertIcon, XCircleIcon } from "lucide-react"
import {
  useGetUserActiveCourseQuery,
  useAdminCancelCourseMutation,
} from "@/gql/generated"
import { Button, Label, Skeleton } from "@/components/ui"
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
import { formatDate } from "@/lib/format"

/**
 * Course en cours de l'utilisateur, avec possibilité de l'annuler.
 *
 * Contrepartie du verrouillage de l'annulation côté passager : depuis qu'il ne
 * peut plus annuler passé sa fenêtre de rétractation, un passager dont le
 * conducteur ne vient jamais n'a plus aucun recours dans l'application. C'est
 * ici que le support débloque la situation.
 *
 * Le remboursement est un choix explicite, pas une case pré-cochée : il faut
 * trancher entre conducteur absent (on rembourse) et passager absent au
 * rendez-vous (on ne rembourse pas, le conducteur s'est déplacé pour rien).
 */

type UserActiveCourseProps = {
  userId: string
  userName: string
}

export function UserActiveCourse({ userId, userName }: UserActiveCourseProps) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState("")
  const [refund, setRefund] = useState(false)

  const { data, isLoading } = useGetUserActiveCourseQuery({ userId })

  const course = data?.asPassenger?.[0] ?? data?.asDriver?.[0] ?? null
  const isPassenger = !!data?.asPassenger?.[0]

  const { mutate: cancelCourse, isPending } = useAdminCancelCourseMutation({
    onSuccess: (res) => {
      const r = res.adminCancelCourse
      if (!r.success) {
        toast.error(r.reasonMessage ?? "Annulation impossible.")
        return
      }
      queryClient.invalidateQueries({ queryKey: ["GetUserActiveCourse"] })
      queryClient.invalidateQueries({ queryKey: ["GetUser"] })
      toast.success(
        r.refundStatus === "succeeded" || r.refundStatus === "pending"
          ? "Course annulée et passager remboursé"
          : "Course annulée"
      )
      setOpen(false)
      setReason("")
      setRefund(false)
    },
    onError: () => toast.error("Erreur lors de l'annulation"),
  })

  if (isLoading) {
    return <Skeleton className="h-24 w-full rounded-lg" />
  }

  // Pas de course en cours : on n'affiche rien plutôt qu'un bloc vide.
  if (!course) return null

  const other = isPassenger ? course.driver : course.passenger

  return (
    <section className="space-y-3 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
      <div className="flex items-center gap-2">
        <CircleAlertIcon className="size-4 text-yellow-500" />
        <h3 className="text-sm font-semibold">Course en cours</h3>
      </div>

      <dl className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <dt className="text-xs text-muted-foreground">Rôle</dt>
          <dd>{isPassenger ? "Passager" : "Conducteur"}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Montant</dt>
          <dd>{course.price != null ? `${course.price} €` : "—"}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">
            {isPassenger ? "Conducteur" : "Passager"}
          </dt>
          <dd>
            {other ? `${other.firstname ?? ""} ${other.lastname ?? ""}` : "—"}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Acceptée le</dt>
          <dd>{course.createdAt ? formatDate(course.createdAt) : "—"}</dd>
        </div>
      </dl>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            disabled={isPending}
            className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive sm:w-auto"
          >
            <XCircleIcon className="mr-2 size-4" />
            Annuler cette course
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Annuler la course de {userName} ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Les deux parties seront notifiées. À utiliser quand la course ne
              peut plus se dérouler — conducteur qui ne vient pas, passager
              injoignable — car ni l'un ni l'autre ne peut plus annuler lui-même
              passé le délai de rétractation.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="cancel-reason">Motif</Label>
              <textarea
                id="cancel-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Ex : le conducteur ne s'est pas présenté"
                rows={2}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              />
            </div>

            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                checked={refund}
                onChange={(e) => setRefund(e.target.checked)}
                className="mt-0.5"
              />
              <span>
                Rembourser le passager
                <span className="block text-xs text-muted-foreground">
                  À cocher si la course n'a pas eu lieu du fait du conducteur.
                  Sans remboursement si c'est le passager qui ne s'est pas
                  présenté — le conducteur s'est déplacé.
                </span>
              </span>
            </label>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Retour</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
              onClick={(e) => {
                // Le back peut refuser (course déjà close, remboursement
                // Stripe en échec) : on garde la modale ouverte pour afficher
                // le motif au lieu de la fermer sur un faux succès.
                e.preventDefault()
                cancelCourse({
                  courseId: course.id,
                  reason: reason || undefined,
                  refund,
                })
              }}
            >
              {isPending ? "Annulation…" : "Confirmer"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}
