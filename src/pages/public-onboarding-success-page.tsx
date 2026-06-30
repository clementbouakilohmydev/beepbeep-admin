/**
 * Page de succès affichée après que le driver a complété (ou fermé) le
 * tunnel d'onboarding Stripe Embedded Components.
 *
 * Le driver est invité à fermer cette fenêtre et retourner sur l'app
 * BeepBeepCity. Côté mobile, le retour est détecté via AppState (le code
 * de bank.tsx refetch user au moment où l'in-app browser se referme) —
 * pas besoin de deeplink ici. Le bouton "Retour à BeepBeepCity" est un
 * lien beepbeepcity:// optionnel : sur iOS/Android le scheme custom
 * referme le browser et ramène à l'app si possible, sinon le user ferme
 * manuellement.
 */
export function PublicOnboardingSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#161822] px-6 text-white">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#21EDA9]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#161822"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">
          Configuration enregistrée
        </h1>
        <p className="mt-4 text-white/70">
          Vos informations de paiement sont en cours de vérification. Vous
          pouvez maintenant retourner à l'application BeepBeepCity.
        </p>
        <a
          href="beepbeepcity://dashboard/profile/driver/bank"
          className="mt-8 inline-block rounded-lg bg-[#21EDA9] px-6 py-3 font-bold text-[#161822] no-underline"
        >
          Retour à BeepBeepCity
        </a>
        <p className="mt-6 text-xs text-white/40">
          Vous pouvez fermer cette fenêtre si le bouton ne réagit pas.
        </p>
      </div>
    </div>
  )
}
