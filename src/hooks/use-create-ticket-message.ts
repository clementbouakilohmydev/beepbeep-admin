import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useCreateTicketMessageMutation } from "@/gql/generated"
import { uploadFile } from "@/lib/upload"

/**
 * Hook pour poster un message sur un ticket (thread support persisté
 * dans TicketMessage côté back). Optionnel : un fichier joint, uploadé
 * d'abord via POST /ks/api/files puis attaché via attachment.connect.id.
 * Invalide GetTicket à la fin pour refresh le thread.
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

  const send = async (content: string, attachment?: File | null) => {
    if (!ticketId) return
    let attachmentId: string | null = null
    if (attachment) {
      try {
        const uploaded = await uploadFile(attachment)
        attachmentId = uploaded.id
      } catch {
        toast.error("Erreur lors de l'upload de la pièce jointe")
        return
      }
    }
    mutate({
      data: {
        content,
        ticket: { connect: { id: ticketId } },
        ...(attachmentId
          ? { attachment: { connect: { id: attachmentId } } }
          : {}),
      },
    })
  }

  return { send, isPending }
}
