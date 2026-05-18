import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useAuth } from "@/hooks"
import {
  Button,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
  Spinner,
} from "@/components/ui"
import { AuthLayout } from "@/components/shared/auth-layout"
import { useAuthenticateUserWithPasswordMutation } from "@/gql/generated"
import { SESSION_TOKEN_KEY } from "@/lib/constants"

export function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

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
        await queryClient.invalidateQueries({
          queryKey: ["GetAuthenticatedItem"],
        })
        navigate("/")
      }
    },
    onError: () => {
      toast.error("Impossible de contacter le serveur")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Trim email + password : évite les espaces invisibles ajoutés par
    // les gestionnaires de mdp / copier-coller. Sur le password on garde
    // les espaces internes (peuvent être intentionnels), seulement les
    // bordures sont coupées.
    login({ email: email.trim(), password: password.trim() })
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
            <h1 className="text-2xl font-bold">Connexion à votre compte</h1>
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
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-card pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={
                  showPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOffIcon className="size-4" />
                ) : (
                  <EyeIcon className="size-4" />
                )}
              </button>
            </div>
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
