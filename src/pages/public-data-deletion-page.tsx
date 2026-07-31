import { Link } from "react-router-dom"

/**
 * Page publique de demande de suppression des données personnelles (droit
 * à l'effacement RGPD). Répond au champ « demander la suppression des
 * données » de la Play Console — distinct de la suppression de compte
 * (cf public-account-deletion-page). Accessible sans app, hors AuthGuard,
 * contenu statique. URL stable : /public/data-deletion.
 *
 * Différence avec /public/account-deletion : ici l'utilisateur peut demander
 * l'effacement de tout ou partie de ses données sans nécessairement fermer
 * son compte.
 */
export function PublicDataDeletionPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <header className="mb-10 border-b border-neutral-200 pb-8">
          <p className="mb-2 text-xs font-medium tracking-widest text-neutral-500 uppercase">
            BeepBeepCity
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl">
            Supprimer mes données
          </h1>
          <p className="mt-3 text-base text-neutral-600">
            Conformément à la réglementation applicable (RGPD), vous pouvez
            demander à tout moment l'effacement de tout ou partie des données
            personnelles que BeepBeepCity détient à votre sujet, sans
            nécessairement fermer votre compte.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">Depuis l'application</h2>
          <p className="text-neutral-700">
            Une partie de vos données est directement gérable dans l'application
            depuis l'écran <strong>Profil</strong>&nbsp;: vous pouvez consulter
            et modifier vos informations personnelles, et retirer certains
            éléments que vous avez ajoutés (documents, adresses enregistrées).
            Pour l'effacement d'autres données, utilisez la demande par e-mail
            ci-dessous.
          </p>
        </section>

        <section className="mb-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <h2 className="mb-3 text-lg font-semibold">
            Demander l'effacement par e-mail
          </h2>
          <p className="mb-4 text-sm text-neutral-600">
            Écrivez-nous depuis l'adresse e-mail liée à votre compte, avec pour
            objet «&nbsp;Suppression de mes données&nbsp;», en précisant les
            données concernées (toutes vos données, ou seulement certaines
            catégories). Nous traitons votre demande après vérification de votre
            identité.
          </p>
          <a
            href="mailto:contact@beepbeepcity.com?subject=Suppression%20de%20mes%20donn%C3%A9es"
            className="inline-block rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
          >
            contact@beepbeepcity.com
          </a>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">
            Quelles données sont concernées ?
          </h2>
          <p className="mb-4 text-neutral-700">
            Votre demande peut porter sur l'ensemble de vos données personnelles
            ou uniquement sur certaines catégories&nbsp;: informations de profil
            et coordonnées, documents transmis, historique de messagerie, ou
            données de localisation. Les données visées sont supprimées ou
            anonymisées de façon irréversible.
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

        <section className="mb-10 rounded-xl border border-neutral-200 bg-neutral-50 p-5">
          <h2 className="mb-2 text-sm font-semibold text-neutral-900">
            Vous souhaitez supprimer tout votre compte&nbsp;?
          </h2>
          <p className="text-sm text-neutral-600">
            Pour supprimer intégralement votre compte et l'ensemble des données
            associées, suivez la procédure dédiée sur la page{" "}
            <Link
              to="/public/account-deletion"
              className="text-blue-600 underline hover:text-blue-700"
            >
              Supprimer mon compte
            </Link>
            .
          </p>
        </section>

        <section className="mb-12 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="mb-2 text-sm font-semibold text-amber-900">
            Délai de traitement
          </h2>
          <p className="text-sm text-amber-800">
            Les demandes sont traitées sous 30 jours au maximum. Vous recevez
            une confirmation une fois l'effacement effectué.
          </p>
        </section>

        <footer className="mt-12 border-t border-neutral-200 pt-6 text-sm text-neutral-500">
          <div className="flex flex-wrap gap-4">
            <Link to="/public/support" className="hover:text-neutral-700">
              Centre d'aide
            </Link>
            <Link
              to="/public/account-deletion"
              className="hover:text-neutral-700"
            >
              Supprimer mon compte
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
