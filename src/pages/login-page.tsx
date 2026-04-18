import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAuth } from "@/hooks"
import { Button, Field, FieldGroup, FieldLabel, Input, Spinner } from "@/components/ui"
import { AuthLayout } from "@/components/shared/auth-layout"
import { useAuthenticateUserWithPasswordMutation } from "@/gql/generated"
import { SESSION_TOKEN_KEY } from "@/lib/constants"

export function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { mutate: login, isPending } = useAuthenticateUserWithPasswordMutation({
    onSuccess: async (data) => {
      const result = data.authenticateUserWithPassword
      if (!result) {
        toast.error("Une erreur est survenue")
        return
      }

      if ("message" in result) {
        toast.error("E-mail ou mot de passe incorrect")
        return
      }

      if ("sessionToken" in result) {
        localStorage.setItem(SESSION_TOKEN_KEY, result.sessionToken)
        window.dispatchEvent(new Event("auth:token-changed"))
        await queryClient.invalidateQueries({ queryKey: ["GetAuthenticatedItem"] })
        navigate("/")
      }
    },
    onError: () => {
      toast.error("Impossible de contacter le serveur")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login({ email, password })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Spinner className="size-6" />
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <AuthLayout>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">
              Connexion à votre compte
            </h1>
            <p className="text-sm text-balance text-muted-foreground">
              Entrez vos identifiants pour accéder à votre espace
            </p>
          </div>
          <Field>
            <FieldLabel htmlFor="email">E-mail</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="exemple@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-card"
            />
          </Field>
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
              <Link
                to="/forgot-password"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-card"
            />
          </Field>
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending && <Spinner />}
              Se connecter
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </AuthLayout>
  )
}
