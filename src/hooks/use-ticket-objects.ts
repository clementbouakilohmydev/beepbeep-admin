import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  useCreateTicketObjectMutation,
  useUpdateTicketObjectMutation,
  useDeleteTicketObjectMutation,
} from "@/gql/generated"

export function useTicketObjects() {
  const queryClient = useQueryClient()

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["GetTicketObjects"] })
    // Les tickets affichent le label du sujet via la relation `object` →
    // on resync les listes ouvertes pour éviter d'afficher un label obsolète
    // après rename.
    queryClient.invalidateQueries({ queryKey: ["GetTickets"] })
    queryClient.invalidateQueries({ queryKey: ["GetTicket"] })
  }

  const create = useCreateTicketObjectMutation({
    onSuccess: () => {
      toast.success("Sujet créé")
      invalidate()
    },
    onError: () => toast.error("Erreur lors de la création du sujet"),
  })

  const update = useUpdateTicketObjectMutation({
    onSuccess: () => {
      toast.success("Sujet mis à jour")
      invalidate()
    },
    onError: () => toast.error("Erreur lors de la mise à jour du sujet"),
  })

  const remove = useDeleteTicketObjectMutation({
    onSuccess: () => {
      toast.success("Sujet supprimé")
      invalidate()
    },
    onError: () => toast.error("Erreur lors de la suppression du sujet"),
  })

  return {
    create: create.mutate,
    update: update.mutate,
    remove: remove.mutate,
    isPending: create.isPending || update.isPending || remove.isPending,
  }
}
