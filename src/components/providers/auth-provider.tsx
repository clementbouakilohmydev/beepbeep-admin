import { useEffect, useState, type ReactNode } from "react"
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

function getToken() {
  return localStorage.getItem(SESSION_TOKEN_KEY)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [token, setToken] = useState(getToken)

  // Sync token state when localStorage changes (login/logout from other tabs)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === SESSION_TOKEN_KEY) setToken(e.newValue)
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  // Expose setToken via a custom event so login-page can trigger re-render
  useEffect(() => {
    const onTokenChange = () => setToken(getToken())
    window.addEventListener("auth:token-changed", onTokenChange)
    return () => window.removeEventListener("auth:token-changed", onTokenChange)
  }, [])

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
        setToken(null)
        queryClient.clear()
        navigate("/login")
      },
    })
  }

  useEffect(() => {
    const handleExpired = () => {
      localStorage.removeItem(SESSION_TOKEN_KEY)
      setToken(null)
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
