import { Link } from "react-router-dom"

/**
 * Page d'assistance publique BeepBeepCity (URL support pour App Store /
 * Play Console). Contact + FAQ courte. Hors AuthGuard, contenu statique.
 * URL stable : /public/support.
 */
export function PublicSupportPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <header className="mb-10 border-b border-neutral-200 pb-8">
          <p className="mb-2 text-xs font-medium tracking-widest text-neutral-500 uppercase">
            BeepBeepCity
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl">Centre d'aide</h1>
          <p className="mt-3 text-base text-neutral-600">
            Une question, un problème ? Notre équipe vous répond sous 48 heures
            ouvrées.
          </p>
        </header>

        <section className="mb-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <h2 className="mb-3 text-lg font-semibold">Nous contacter</h2>
          <p className="mb-4 text-sm text-neutral-600">
            Pour toute demande de support, signalement, ou question relative à
            votre compte, écrivez-nous :
          </p>
          <a
            href="mailto:contact@beepbeepcity.com"
            className="inline-block rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
          >
            contact@beepbeepcity.com
          </a>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Questions fréquentes</h2>
          <FAQ />
        </section>

        <section className="mb-12 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="mb-2 text-sm font-semibold text-amber-900">
            Urgence pendant un trajet
          </h2>
          <p className="text-sm text-amber-800">
            En cas d'accident ou de danger immédiat, contactez les secours en
            composant le <strong>112</strong> (numéro d'urgence européen) avant
            toute notification à BeepBeepCity.
          </p>
        </section>

        <footer className="mt-12 border-t border-neutral-200 pt-6 text-sm text-neutral-500">
          <div className="flex flex-wrap gap-4">
            <Link to="/public/about" className="hover:text-neutral-700">
              À propos
            </Link>
            <Link to="/public/legal/cgu" className="hover:text-neutral-700">
              CGU
            </Link>
            <Link
              to="/public/legal/privacy-policy"
              className="hover:text-neutral-700"
            >
              Politique de confidentialité
            </Link>
            <Link
              to="/public/legal/legal-mentions"
              className="hover:text-neutral-700"
            >
              Mentions légales
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}

const QUESTIONS = [
  {
    q: "Comment créer mon compte ?",
    a: "Téléchargez l'application BeepBeepCity, cliquez sur « S'inscrire », renseignez vos informations (nom, prénom, e-mail, téléphone, date de naissance) et validez votre adresse e-mail via le code reçu par message électronique.",
  },
  {
    q: "Comment réserver un trajet ?",
    a: "Une fois connecté, indiquez votre point de départ et votre destination dans l'écran d'accueil. Sélectionnez un conducteur disponible et confirmez votre réservation. Le paiement est sécurisé par notre prestataire Stripe.",
  },
  {
    q: "Comment annuler une réservation ?",
    a: "Vous pouvez annuler depuis la rubrique « Mes trajets ». Le remboursement éventuel dépend du délai d'annulation : les conditions complètes figurent à l'article 7 de nos CGU.",
  },
  {
    q: "Le conducteur ne s'est pas présenté, que faire ?",
    a: "Contactez-le via la messagerie de l'application, accessible après confirmation de la réservation. Si la course est annulée par le conducteur, vous êtes intégralement remboursé selon les modalités de notre prestataire de paiement.",
  },
  {
    q: "Comment signaler un comportement inapproprié ?",
    a: "Depuis la fiche du conducteur ou du passager concerné, utilisez le bouton « Signaler ». Notre équipe examine chaque signalement dans un délai raisonnable et prend des mesures proportionnées à la gravité constatée.",
  },
  {
    q: "Comment supprimer mon compte ?",
    a: "Depuis l'application : Profil → Paramètres → Supprimer mon compte. Vous pouvez également en faire la demande par courriel à contact@beepbeepcity.com. La suppression entraîne la désactivation du profil et l'effacement des données non soumises à une obligation légale de conservation.",
  },
  {
    q: "Que faire en cas de problème de paiement ?",
    a: "Les paiements sont gérés par Stripe. Si une transaction échoue ou si vous constatez une anomalie, vérifiez d'abord auprès de votre banque, puis contactez-nous à contact@beepbeepcity.com en précisant la date, le montant et l'objet de la transaction.",
  },
]

function FAQ() {
  return (
    <div className="space-y-4">
      {QUESTIONS.map((item, i) => (
        <details
          key={i}
          className="group rounded-xl border border-neutral-200 bg-white"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4 text-sm font-medium text-neutral-900 [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <span className="text-neutral-400 transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="px-5 pb-5 text-sm text-neutral-600">{item.a}</div>
        </details>
      ))}
    </div>
  )
}
