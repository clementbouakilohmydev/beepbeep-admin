import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useUpdateTicketMutation } from "@/gql/generated"
import type { GetTicketsQuery, GetTicketQuery } from "@/gql/generated"

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
        (old: GetTicketsQuery | undefined) => {
          if (!old?.tickets) return old
          return {
            ...old,
            tickets: old.tickets.map((t) =>
              t.id === variables.where.id
                ? { ...t, solved: variables.data.solved }
                : t
            ),
          }
        }
      )

      queryClient.setQueriesData(
        { queryKey: ["GetTicket"] },
        (old: GetTicketQuery | undefined) => {
          if (!old?.ticket) return old
          if (old.ticket.id === variables.where.id) {
            return {
              ...old,
              ticket: { ...old.ticket, solved: variables.data.solved },
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
