import { Link } from "react-router-dom"

/**
 * Landing publique BeepBeepCity (URL marketing pour App Store / Play Console).
 *
 * Hors AuthGuard. Contenu statique : pas de fetch back. Si la copie évolue,
 * éditer ce fichier directement. URL stable : /public/about.
 */
export function PublicAboutPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Hero />
      <Features />
      <HowItWorks />
      <Download />
      <Footer />
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 px-6 py-20 text-white">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-3 text-sm font-medium tracking-widest text-neutral-300 uppercase">
          BeepBeepCity
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Le moto-taxi à la demande
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300">
          Réservez votre prochain trajet en deux-roues motorisé en quelques
          secondes. Trajets urbains et périurbains, conducteurs vérifiés,
          paiement sécurisé.
        </p>
      </div>
    </section>
  )
}

function Features() {
  const items = [
    {
      title: "Rapide",
      body: "Évitez les embouteillages et arrivez à l'heure. Nos conducteurs connaissent les meilleurs itinéraires pour traverser la ville sans perdre de temps.",
      emoji: "🛵",
    },
    {
      title: "Sécurisé",
      body: "Tous nos conducteurs sont vérifiés : permis de conduire valide, assurance en cours, attestation 125 cm³ lorsque requise. Équipements de sécurité fournis.",
      emoji: "🛡️",
    },
    {
      title: "Simple",
      body: "Paiement intégré par Stripe, sans espèces. Le prix s'affiche avant la réservation, sans surprise. Aucune commission cachée.",
      emoji: "💳",
    },
  ]
  return (
    <section className="px-6 py-20">
      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8"
          >
            <div className="mb-4 text-4xl">{item.emoji}</div>
            <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
            <p className="text-neutral-600">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {
      n: "1",
      title: "Indiquez votre trajet",
      body: "Renseignez votre point de départ et votre destination dans l'application.",
    },
    {
      n: "2",
      title: "Choisissez un conducteur",
      body: "Sélectionnez parmi les conducteurs disponibles à proximité.",
    },
    {
      n: "3",
      title: "Suivez votre trajet",
      body: "Géolocalisation en temps réel, paiement automatique à l'arrivée.",
    },
  ]
  return (
    <section className="bg-neutral-100 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Comment ça marche
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="text-center">
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-neutral-900 text-lg font-bold text-white">
                {s.n}
              </div>
              <h3 className="mb-2 text-lg font-semibold">{s.title}</h3>
              <p className="text-neutral-600">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Download() {
  return (
    <section className="px-6 py-20 text-center">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-4 text-3xl font-bold">Téléchargez l'application</h2>
        <p className="mb-8 text-neutral-600">
          BeepBeepCity sera bientôt disponible sur l'App Store et Google Play.
          En attendant, consultez nos conditions générales.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#"
            aria-disabled
            className="cursor-not-allowed rounded-lg border border-neutral-300 bg-neutral-100 px-6 py-3 text-sm font-medium text-neutral-400"
          >
            App Store — bientôt
          </a>
          <a
            href="#"
            aria-disabled
            className="cursor-not-allowed rounded-lg border border-neutral-300 bg-neutral-100 px-6 py-3 text-sm font-medium text-neutral-400"
          >
            Google Play — bientôt
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-neutral-900">
            BeepBeepCity World SASU
          </p>
          <p>
            2 Place Louis Aragon, 94450 Limeil-Brévannes —{" "}
            <a
              href="mailto:contact@beepbeepcity.com"
              className="text-blue-600 underline"
            >
              contact@beepbeepcity.com
            </a>
          </p>
        </div>
        <nav className="flex flex-wrap gap-4">
          <Link to="/public/support" className="hover:text-neutral-900">
            Support
          </Link>
          <Link to="/public/legal/cgu" className="hover:text-neutral-900">
            CGU
          </Link>
          <Link
            to="/public/legal/privacy-policy"
            className="hover:text-neutral-900"
          >
            Confidentialité
          </Link>
          <Link
            to="/public/legal/legal-mentions"
            className="hover:text-neutral-900"
          >
            Mentions légales
          </Link>
        </nav>
      </div>
    </footer>
  )
}
