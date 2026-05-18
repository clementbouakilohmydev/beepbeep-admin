import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useCreateTicketMessageMutation } from "@/gql/generated"

/**
 * Hook pour poster un message sur un ticket (thread support persisté
 * dans TicketMessage côté back, cf adminStats commit). Invalide la
 * query GetTicket à la fin pour refresh le thread sans reload manuel.
 */
export function useCreateTicketMessage(ticketId: string | null | undefined) {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useCreateTicketMessageMutation({
    onSuccess: () => {
      toast.success("Message envoyé")
      queryClient.invalidateQueries({ queryKey: ["GetTicket"] })
    },
    onError: () => {
      toast.error("Erreur lors de l'envoi du message")
    },
  })

  const send = (content: string) => {
    if (!ticketId) return
    mutate({
      data: {
        content,
        ticket: { connect: { id: ticketId } },
      },
    })
  }

  return { send, isPending }
}
