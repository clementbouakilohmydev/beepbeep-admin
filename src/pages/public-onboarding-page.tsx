import { useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { loadConnectAndInitialize } from "@stripe/connect-js"
import {
  ConnectAccountOnboarding,
  ConnectComponentsProvider,
} from "@stripe/react-connect-js"
import { graphqlClient } from "@/lib/api"

/**
 * Page publique d'onboarding Stripe Connect — white-label BeepBeepCity.
 *
 * Le mobile ouvre cette URL (générée par `getDriverOnboardingLink` côté
 * back, avec un token signé HMAC en path param) dans un in-app browser.
 * Le driver ne voit jamais "stripe.com" : URL admin BBC, branding BBC,
 * composants Stripe stylisés en thème BBC.
 *
 * Flow :
 * 1. Extract token du path
 * 2. Échange token → client_secret + publishable key via la query publique
 *    `getStripeAccountSession` (le token est l'authentification, pas de
 *    cookie Keystone nécessaire)
 * 3. `loadConnectAndInitialize` + monte `<ConnectAccountOnboarding />`
 * 4. À la fin, redirige vers /public/onboarding-success qui propose un
 *    bouton "Retour à l'app" — le mobile détecte la fermeture via
 *    AppState et refetch le statut driver.
 *
 * Hors AuthGuard (publique). Pas de fetch authentifié — la sécurité est
 * portée par le token signé qui expire en 10 min.
 */

const GQL_GET_STRIPE_ACCOUNT_SESSION = `
  query GetStripeAccountSession($token: String!) {
    getStripeAccountSession(token: $token) {
      clientSecret
      publishableKey
    }
  }
`

type SessionData = {
  getStripeAccountSession: {
    clientSecret: string
    publishableKey: string
  } | null
}

// Variables CSS BeepBeepCity (cf mobile/styles/colors.js).
// Les Embedded Components acceptent un set restreint de variables — on
// reste sur les essentielles, suffisant pour matcher le thème BBC sombre.
const BBC_APPEARANCE = {
  variables: {
    colorPrimary: "#21EDA9", // vert BBC (passenger / accent)
    colorBackground: "#161822", // dark bg
    colorText: "#FFFFFF",
    colorDanger: "#FF7675",
    fontFamily: "system-ui, -apple-system, sans-serif",
    borderRadius: "8px",
  },
} as const

type StripeInitResult =
  | { kind: "ready"; instance: ReturnType<typeof loadConnectAndInitialize> }
  | { kind: "error"; message: string }
  | { kind: "pending" }

export function PublicOnboardingPage() {
  const navigate = useNavigate()
  const { token } = useParams<{ token: string }>()

  const { data, isLoading, error } = useQuery<SessionData>({
    queryKey: ["stripe-account-session", token],
    queryFn: graphqlClient<SessionData, { token: string }>(
      GQL_GET_STRIPE_ACCOUNT_SESSION,
      { token: token || "" }
    ),
    enabled: !!token,
    retry: false,
  })

  const session = data?.getStripeAccountSession
  const clientSecret = session?.clientSecret
  const publishableKey = session?.publishableKey

  // `loadConnectAndInitialize` doit être appelée UNE seule fois. Si on la
  // recrée à chaque render, les composants se remontent et perdent leur
  // state (le driver perdrait sa progression dans le tunnel).
  const stripeConnectInstance = useMemo<StripeInitResult>(() => {
    if (!clientSecret || !publishableKey) return { kind: "pending" }
    try {
      return {
        kind: "ready",
        instance: loadConnectAndInitialize({
          publishableKey,
          fetchClientSecret: async () => clientSecret,
          appearance: BBC_APPEARANCE,
        }),
      }
    } catch (e: unknown) {
      const message =
        e instanceof Error
          ? e.message
          : "Initialisation du service de paiement impossible"
      return { kind: "error", message }
    }
  }, [clientSecret, publishableKey])

  if (!token) {
    return (
      <ErrorState
        title="Lien invalide"
        body="Ce lien d'onboarding ne contient pas de token. Veuillez relancer la configuration depuis l'application."
      />
    )
  }

  if (isLoading) {
    return <LoadingState />
  }

  if (error || !session) {
    return (
      <ErrorState
        title="Lien expiré ou invalide"
        body="Ce lien d'onboarding a expiré (durée de validité : 10 minutes) ou n'est pas valide. Veuillez relancer la configuration depuis l'application BeepBeepCity."
      />
    )
  }

  if (stripeConnectInstance.kind === "error") {
    return (
      <ErrorState
        title="Configuration de paiement indisponible"
        body={stripeConnectInstance.message}
      />
    )
  }

  if (stripeConnectInstance.kind !== "ready") {
    return <LoadingState />
  }

  return (
    <div className="min-h-screen bg-[#161822] text-white">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <ConnectComponentsProvider
          connectInstance={stripeConnectInstance.instance}
        >
          <ConnectAccountOnboarding
            onExit={() => {
              // Tiré quand le driver complète l'onboarding OU ferme le
              // composant. Dans les 2 cas, on redirige vers la page de
              // succès — le statut réel sera relu côté mobile au retour.
              navigate("/public/onboarding-success", { replace: true })
            }}
          />
        </ConnectComponentsProvider>
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header className="border-b border-white/10 bg-[#161822] px-4 py-4">
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        <span className="text-lg font-bold tracking-tight">BeepBeepCity</span>
        <span className="text-xs text-white/50">
          Configuration des paiements
        </span>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-8 border-t border-white/10 px-4 py-4 text-center text-xs text-white/40">
      Paiements sécurisés par Stripe
    </footer>
  )
}

function LoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#161822] text-white">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#21EDA9] border-t-transparent" />
        <p className="text-white/80">Chargement de votre espace…</p>
      </div>
    </div>
  )
}

function ErrorState({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#161822] text-white">
      <div className="mx-auto max-w-md px-6 text-center">
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="mt-3 text-white/70">{body}</p>
        <p className="mt-6 text-sm text-white/40">
          Vous pouvez fermer cette fenêtre et revenir à l'application
          BeepBeepCity.
        </p>
      </div>
    </div>
  )
}
