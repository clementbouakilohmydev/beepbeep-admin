/**
 * Sentinelle de retour Stripe Connect Express onboarding.
 *
 * Stripe redirige le driver ici à la fin (ou en cas de refresh) du tunnel
 * KYC/IBAN. Le mobile ouvre l'URL Stripe via WebBrowser.openBrowserAsync
 * dans une sheet SFSafariViewController (iOS) / Custom Tab (Android).
 * Cette page sert de confirmation visuelle avant que l'utilisateur
 * ferme la fenêtre via le bouton natif "Terminer" / "OK" / croix.
 *
 * Servie côté admin Vercel plutôt que côté back Keystone : édition rapide
 * (Vercel auto-deploy sur push, pas de tag Portainer). Le back pointe
 * vers cette URL via `STRIPE_RETURN_BASE_URL` (voir services/stripe.ts).
 *
 * Public — hors AuthGuard. Contenu statique.
 */
export function PublicStripeReturnPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#161822] px-6 py-8 text-center font-[system-ui,-apple-system,sans-serif] text-white">
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#21EDA9]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#161822"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-9 w-9"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h1 className="m-0 text-[22px] font-bold">Configuration enregistrée</h1>
      <p className="m-0 max-w-[420px] leading-relaxed text-[#b8b8b8]">
        Vos informations ont bien été transmises. Vous serez payable dès la fin
        des vérifications.
      </p>
      <div className="mt-2 max-w-[420px] rounded-[10px] border border-[#21EDA9] px-5 py-4">
        <p className="m-0 text-[15px] font-semibold text-white">
          Fermez cette fenêtre pour retourner à BeepBeepCity.
        </p>
        <p className="mt-2 mb-0 text-[13px] font-normal text-[#8a8a8a]">
          Utilisez le bouton « Terminer » (ou « OK ») en haut de cette fenêtre.
        </p>
      </div>
    </div>
  )
}
