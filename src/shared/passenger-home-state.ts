// ╔══════════════════════════════════════════════════════════════════╗
// ║  AUTO-GENERATED — DO NOT EDIT                                    ║
// ║  Source: BEEP/shared/passenger-home-state.ts                       ║
// ║  Run `/sync-shared` or `node scripts/sync-shared.mjs` to update.  ║
// ╚══════════════════════════════════════════════════════════════════╝

/**
 * Logique pure de dérivation pour l'accueil passenger (mobile).
 *
 * Extrait de `mobile/components/templates/home/passenger.tsx` qui fait
 * 720 lignes de UI + queries + state. La fonction `derivePassengerHomeState`
 * isole les règles métier pour qu'elles soient :
 *   - testables sans React (Vitest direct dans BEEP/shared/)
 *   - documentées en un seul endroit (les conditions de "annonce" vs
 *     "course active" + les flags des CTA visibles)
 *   - réutilisables si on doit afficher un mini résumé ailleurs
 *     (notification preview, widget watch, etc.)
 *
 * NB : les types sont structurels — on ne dépend pas du codegen pour
 * rester portable (cf shared/trip-logic.ts qui suit la même règle).
 */

import {
  canShowCancelButton,
  canShowContactButton,
  canShowEndCourseButton,
  isCoursePastDisplayWindow,
  isTripActive,
  isTripExpired,
} from "./trip-logic";

/**
 * Shape minimale qu'on consomme pour calculer le state. Les types
 * concrets (codegen GQL_Trip / GQL_Course) sont des super-ensembles —
 * on préserve leur shape complète via le générique T pour que le
 * caller garde l'accès aux fields complets (driver, fromNode, etc.)
 * sur le retour.
 */
type CourseLike = {
  id?: string;
  state?: string | null;
  createdAt?: string | null;
};

type TripLike = {
  id?: string;
  startDatetimeUtc?: string | null;
  duration?: number | null;
  isInstant?: boolean | null;
  coursesCount?: number | null;
  activeCourse?: CourseLike | null;
  availableDrivers?: unknown[] | null;
  payment?: { state?: string | null } | null;
  endDatetimeUtc?: string | null;
  createdAt?: string | null;
};

export type PassengerHomeState<T extends TripLike = TripLike> = {
  /**
   * Le trip à afficher dans la carte de l'accueil. Priorité à la course
   * active ; sinon l'annonce la plus récente.
   */
  activeTrip: T | null;
  /**
   * Trip qui correspond à une annonce non encore prise (= sans course).
   * Peut coexister avec `nextCourse` si le passenger a programmé une
   * 2e annonce après acceptation de la 1ère (V1 : interdit côté back,
   * mais le front est défensif).
   */
  announcement: T | null;
  /**
   * Trip dont la course est `accepted` (= en cours pour les 2 parties).
   */
  nextCourse: T | null;
  /**
   * Course active dérivée de `nextCourse` (ou null). Type préservé via
   * NonNullable<T['activeCourse']> pour que le caller garde accès aux
   * champs codegen complets (driver, ratings, etc.) sans cast.
   */
  activeCourse: NonNullable<T["activeCourse"]> | null;
  /** True si on est en mode "annonce" (= pas de course acceptée). */
  isAnnouncement: boolean;
  /**
   * True si on est en mode annonce ET qu'au moins un driver candidat
   * est dispo dans le rayon. Pilote l'affichage du message
   * "des conducteurs ont été notifiés" vs "un chauffeur se libère".
   */
  hasAvailableDrivers: boolean;
  /** Bouton "Contacter le conducteur" visible (cf trip-logic). */
  canContactBtn: boolean;
  /** Bouton "Annuler la course" visible (cf trip-logic). */
  canCancelBtn: boolean;
  /** Bouton "Arrivée à destination" visible (cf trip-logic). */
  canEndBtn: boolean;
};

/**
 * Dérive l'état de l'accueil passenger à partir de la liste des trips
 * récupérée via `GQL_GET_USER_TRIPS`.
 *
 * Règle de priorité : si le passenger a à la fois une annonce (= pas
 * encore prise) et une course active (= déjà acceptée par un driver),
 * la carte montre la course active — l'annonce ne s'affiche que si
 * aucune course n'est en cours. Cf passenger.tsx pré-1.7.4 où on
 * basculait vers l'annonce après une fenêtre temps : ce comportement
 * a été supprimé car incohérent avec `Mes trajets`.
 *
 * Fenêtre d'affichage : une course encore en state `accepted` mais
 * dont la fin théorique est dépassée de plus d'1h (cf
 * `COURSE_DISPLAY_BUFFER_MINUTES`) est masquée de la home — le cron
 * back `terminateCourses` la basculera en `paid` sous 6h max. Sans
 * ce filtre, une course non clôturée manuellement restait visible
 * indéfiniment côté passenger (bug client mai 2026).
 */
export function derivePassengerHomeState<T extends TripLike>(
  trips: readonly T[] | null | undefined,
): PassengerHomeState<T> {
  const items = trips ?? [];

  const announcement =
    items.find((t) => (t.coursesCount || 0) === 0 && !isTripExpired(t)) ?? null;
  const nextCourse =
    items.find(
      (t) =>
        isTripActive(t) &&
        !isCoursePastDisplayWindow({
          startDatetimeUtc: t.startDatetimeUtc,
          durationMinutes: t.duration,
          isInstant: t.isInstant,
          courseCreatedAt: t.activeCourse?.createdAt,
        }),
    ) ?? null;
  const activeCourse =
    (nextCourse?.activeCourse as NonNullable<T["activeCourse"]> | null) ?? null;

  const buttonWindow = {
    startDatetimeUtc: nextCourse?.startDatetimeUtc,
    durationMinutes: nextCourse?.duration,
    isInstant: nextCourse?.isInstant,
    courseCreatedAt: activeCourse?.createdAt,
  };

  const isAnnouncement = !nextCourse;

  return {
    activeTrip: nextCourse ?? announcement,
    announcement,
    nextCourse,
    activeCourse,
    isAnnouncement,
    hasAvailableDrivers:
      isAnnouncement && (announcement?.availableDrivers?.length ?? 0) > 0,
    canContactBtn: canShowContactButton(buttonWindow),
    canCancelBtn: canShowCancelButton(buttonWindow),
    canEndBtn: canShowEndCourseButton(buttonWindow),
  };
}
