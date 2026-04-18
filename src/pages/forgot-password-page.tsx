import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import { Button, Field, FieldGroup, FieldLabel, Input, Spinner } from "@/components/ui"
import { AuthLayout } from "@/components/shared/auth-layout"
import { useResetPasswordMutation } from "@/gql/generated"

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("")

  const { mutate: resetPassword, isPending } = useResetPasswordMutation({
    onSuccess: (data) => {
      if (data.resetPassword.success) {
        toast.success(
          "Un nouveau mot de passe a été envoyé à votre adresse e-mail"
        )
      } else {
        toast.error("Impossible de réinitialiser le mot de passe")
      }
    },
    onError: () => {
      toast.error("Impossible de contacter le serveur")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    resetPassword({ email })
  }

  return (
    <AuthLayout>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Mot de passe oublié</h1>
            <p className="text-sm text-balance text-muted-foreground">
              Entrez votre e-mail pour recevoir un nouveau mot de passe
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
            <Button type="submit" disabled={isPending}>
              {isPending && <Spinner />}
              Réinitialiser
            </Button>
          </Field>
          <div className="text-center text-sm">
            <Link
              to="/login"
              className="underline-offset-4 hover:underline"
            >
              Retour à la connexion
            </Link>
          </div>
        </FieldGroup>
      </form>
    </AuthLayout>
  )
}
