import { Navigate, useParams } from "react-router-dom"

export function TicketDetailPage() {
  const { id } = useParams<{ id: string }>()
  return <Navigate to={`/tickets?ticketId=${id}`} replace />
}
