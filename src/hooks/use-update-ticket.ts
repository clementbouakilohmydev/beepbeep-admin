import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useUpdateTicketMutation } from "@/gql/generated"

export function useUpdateTicket() {
  const queryClient = useQueryClient()

  const { mutate: updateTicket, isPending } = useUpdateTicketMutation({
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["GetTickets"] })
      await queryClient.cancelQueries({ queryKey: ["GetTicket"] })

      const previousTickets = queryClient.getQueriesData({
        queryKey: ["GetTickets"],
      })
      const previousTicket = queryClient.getQueriesData({
        queryKey: ["GetTicket"],
      })

      queryClient.setQueriesData(
        { queryKey: ["GetTickets"] },
        (old: Record<string, unknown> | undefined) => {
          if (!old || !Array.isArray((old as { tickets?: unknown[] }).tickets))
            return old
          const typedOld = old as {
            tickets: Array<{ id: string; solved?: boolean | null }>
          }
          return {
            ...typedOld,
            tickets: typedOld.tickets.map((t) =>
              t.id === variables.where.id
                ? { ...t, solved: variables.data.solved }
                : t
            ),
          }
        }
      )

      queryClient.setQueriesData(
        { queryKey: ["GetTicket"] },
        (old: Record<string, unknown> | undefined) => {
          if (!old || !(old as { ticket?: unknown }).ticket) return old
          const typedOld = old as {
            ticket: { id: string; solved?: boolean | null }
          }
          if (typedOld.ticket.id === variables.where.id) {
            return {
              ...typedOld,
              ticket: { ...typedOld.ticket, solved: variables.data.solved },
            }
          }
          return old
        }
      )

      return { previousTickets, previousTicket }
    },
    onError: (_err, _vars, context) => {
      if (context?.previousTickets) {
        context.previousTickets.forEach(([key, data]) => {
          queryClient.setQueryData(key, data)
        })
      }
      if (context?.previousTicket) {
        context.previousTicket.forEach(([key, data]) => {
          queryClient.setQueryData(key, data)
        })
      }
      toast.error("Erreur lors de la mise à jour du ticket")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["GetTickets"] })
      queryClient.invalidateQueries({ queryKey: ["GetTicket"] })
      queryClient.invalidateQueries({ queryKey: ["GetTicketsCounts"] })
    },
    onSuccess: () => {
      toast.success("Ticket mis à jour")
    },
  })

  const toggleSolved = (
    ticketId: string,
    currentSolved: boolean | null | undefined
  ) => {
    updateTicket({
      where: { id: ticketId },
      data: { solved: !currentSolved },
    })
  }

  return { toggleSolved, isPending }
}
