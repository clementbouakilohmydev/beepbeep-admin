import { useCallback, useEffect, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  useGetAuthenticatedItemQuery,
  useEndSessionMutation,
} from "@/gql/generated"
import { onAuthExpired } from "@/lib"
import { AuthContext, type AuthUser } from "@/contexts"

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const token = localStorage.getItem("session-token")

  const { data, isLoading } = useGetAuthenticatedItemQuery(
    {},
    { enabled: !!token }
  )

  const { mutate: endSession } = useEndSessionMutation()

  const user = (data?.authenticatedItem as AuthUser) ?? null

  const logout = useCallback(() => {
    endSession(undefined as never, {
      onSettled: () => {
        localStorage.removeItem("session-token")
        queryClient.clear()
        navigate("/login")
      },
    })
  }, [endSession, queryClient, navigate])

  const forceLogout = useCallback(() => {
    localStorage.removeItem("session-token")
    queryClient.clear()
    navigate("/login")
    toast.error("Votre session a expiré, veuillez vous reconnecter")
  }, [queryClient, navigate])

  useEffect(() => {
    return onAuthExpired(forceLogout)
  }, [forceLogout])

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
