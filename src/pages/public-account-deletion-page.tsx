import { Link } from "react-router-dom"

/**
 * Page publique de demande de suppression de compte (URL exigée par
 * Google Play Console — section « Sécurité des données » — et App Store
 * Connect : accessible sans installer ni ouvrir l'application).
 *
 * Hors AuthGuard, contenu statique. URL stable : /public/account-deletion.
 * Décrit les 2 canaux (in-app + e-mail) et le sort des données, aligné sur
 * le comportement réel de la mutation `deleteMyAccount` côté back
 * (re-confirmation du mot de passe, refus si engagement actif, désactivation
 * immédiate puis anonymisation, conservation des données à obligation légale).
 */
export function PublicAccountDeletionPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <header className="mb-10 border-b border-neutral-200 pb-8">
          <p className="mb-2 text-xs font-medium tracking-widest text-neutral-500 uppercase">
            BeepBeepCity
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl">
            Supprimer mon compte et mes données
          </h1>
          <p className="mt-3 text-base text-neutral-600">
            Vous pouvez à tout moment demander la suppression de votre compte
            BeepBeepCity et des données personnelles associées. Deux moyens sont
            à votre disposition.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">Depuis l'application</h2>
          <ol className="list-decimal space-y-2 pl-6 text-neutral-700">
            <li>Ouvrez l'application BeepBeepCity et connectez-vous.</li>
            <li>
              Rendez-vous dans{" "}
              <strong>Profil → Paramètres → Supprimer mon compte</strong>.
            </li>
            <li>Confirmez votre mot de passe pour valider la demande.</li>
          </ol>
          <p className="mt-4 text-sm text-neutral-600">
            La suppression peut être temporairement refusée si un engagement est
            en cours (course acceptée, paiement en cours de traitement ou solde
            non encore reversé). Réglez d'abord ces éléments, puis relancez la
            demande.
          </p>
        </section>

        <section className="mb-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <h2 className="mb-3 text-lg font-semibold">Par e-mail</h2>
          <p className="mb-4 text-sm text-neutral-600">
            Si vous n'avez plus accès à l'application, écrivez-nous depuis
            l'adresse e-mail liée à votre compte, avec pour objet
            «&nbsp;Suppression de mon compte&nbsp;». Nous traitons votre demande
            après vérification de votre identité.
          </p>
          <a
            href="mailto:contact@beepbeepcity.com?subject=Suppression%20de%20mon%20compte"
            className="inline-block rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
          >
            contact@beepbeepcity.com
          </a>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">
            Quelles données sont supprimées ?
          </h2>
          <p className="mb-4 text-neutral-700">
            Dès la validation de votre demande, votre compte est désactivé et
            n'est plus accessible. Vos données personnelles (profil,
            coordonnées, documents, historique de messagerie) sont ensuite
            supprimées ou anonymisées de façon irréversible.
          </p>
          <p className="text-sm text-neutral-600">
            Certaines données peuvent être conservées de manière restreinte
            pendant la durée légale requise&nbsp;: les pièces liées à la
            facturation et aux transactions sont conservées au titre de nos
            obligations comptables et fiscales, et certaines informations
            peuvent être retenues le temps de traiter un litige ou une
            réclamation en cours. Ces données ne sont plus utilisées à d'autres
            fins.
          </p>
        </section>

        <section className="mb-12 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="mb-2 text-sm font-semibold text-amber-900">
            Délai de traitement
          </h2>
          <p className="text-sm text-amber-800">
            Les demandes sont traitées sous 30 jours au maximum. Vous recevez
            une confirmation une fois la suppression effectuée.
          </p>
        </section>

        <footer className="mt-12 border-t border-neutral-200 pt-6 text-sm text-neutral-500">
          <div className="flex flex-wrap gap-4">
            <Link to="/public/support" className="hover:text-neutral-700">
              Centre d'aide
            </Link>
            <Link to="/public/data-deletion" className="hover:text-neutral-700">
              Supprimer mes données
            </Link>
            <Link
              to="/public/legal/privacy-policy"
              className="hover:text-neutral-700"
            >
              Politique de confidentialité
            </Link>
            <Link to="/public/legal/cgu" className="hover:text-neutral-700">
              CGU
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
