import { Navigate, useParams } from "react-router-dom"

export function UserDetailPage() {
  const { id } = useParams<{ id: string }>()
  return <Navigate to={`/users?userId=${id}`} replace />
}
