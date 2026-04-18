import { useEffect, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  useGetAuthenticatedItemQuery,
  useEndSessionMutation,
} from "@/gql/generated"
import { onAuthExpired } from "@/lib"
import { AuthContext, type AuthUser } from "@/contexts"
import { SESSION_TOKEN_KEY } from "@/lib/constants"

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const token = localStorage.getItem(SESSION_TOKEN_KEY)

  const { data, isLoading } = useGetAuthenticatedItemQuery(
    {},
    { enabled: !!token }
  )

  const { mutate: endSession } = useEndSessionMutation()

  const user = (data?.authenticatedItem as AuthUser) ?? null

  const logout = () => {
    endSession(undefined as never, {
      onSettled: () => {
        localStorage.removeItem(SESSION_TOKEN_KEY)
        queryClient.clear()
        navigate("/login")
      },
    })
  }

  useEffect(() => {
    const handleExpired = () => {
      localStorage.removeItem(SESSION_TOKEN_KEY)
      queryClient.clear()
      navigate("/login")
      toast.error("Votre session a expiré, veuillez vous reconnecter")
    }
    return onAuthExpired(handleExpired)
  }, [queryClient, navigate])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: !!token && isLoading,
        isAuthenticated: !!user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
