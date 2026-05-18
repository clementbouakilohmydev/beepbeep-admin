import { createContext } from "react"

export type AuthUser = {
  id: string
  email?: string | null
  firstname?: string | null
  lastname?: string | null
  isAdmin?: boolean | null
}

export type AuthContextType = {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
