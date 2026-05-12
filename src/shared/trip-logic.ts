// ╔══════════════════════════════════════════════════════════════════╗
// ║  AUTO-GENERATED — DO NOT EDIT                                    ║
// ║  Source: BEEP/shared/trip-logic.ts                                 ║
// ║  Run `/sync-shared` or `node scripts/sync-shared.mjs` to update.  ║
// ╚══════════════════════════════════════════════════════════════════╝

/**
 * Logique métier trip/course partagée entre admin et app.
 * Source canonique : BEEP/shared/trip-logic.ts
 *
 * Toutes les fonctions utilisent des types structurels (pas d'import codegen)
 * pour rester 100% portables entre les 2 projets.
 */

import {
  CANCEL_GRACE_MIN_MINUTES,
  CONTACT_AFTER_END_MINUTES,
  CONTACT_BEFORE_START_MINUTES,
  COURSE_DISPLAY_BUFFER_MINUTES,
  CourseState,
  DISTANCE_THRESHOLD_METERS,
  END_COURSE_THRESHOLD_MIN_MINUTES,
  END_COURSE_THRESHOLD_PERCENT,
  FINISHED_PAYMENT_STATES,
  FREE_CANCELLATION_HOURS,
  INSTANT_TRIP_VALIDITY_MINUTES,
} from "./constants";

// ─── Types structurels (sans dépendance codegen) ───────────────────────

type CourseLike = { state?: string | null };
type PaymentLike = { state?: string | null };
type TripLike = {
  coursesCount?: number | null;
  activeCourse?: CourseLike | null;
  payment?: PaymentLike | null;
  endDatetimeUtc?: string | null;
  isInstant?: boolean | null;
  createdAt?: string | null;
};

// ─── Helpers de course ─────────────────────────────────────────────────

/**
 * Détermine si un trip est encore "en cours" du point de vue passenger/driver.
 * Ne renvoie true QUE si la course active est en state="accepted" — un
 * trip dont la course est passée à "paid" (terminée par le passenger)
 * doit disparaître de la home même si le cron n'a pas encore basculé le
 * payment en "succeeded".
 *
 * NB : Trip.activeCourse côté back inclut intentionnellement les paid pour
 * permettre d'afficher le driver dans la modale de rating juste après
 * l'arrivée. C'est ici qu'on filtre côté client.
 */
export const isTripActive = (trip?: TripLike | null): boolean => {
  if (!trip) return false;
  if ((trip.coursesCount || 0) === 0) return false;
  const paymentState = trip.payment?.state || "";
  if (FINISHED_PAYMENT_STATES.includes(paymentState)) return false;
  if (!trip.activeCourse) return false;
  return trip.activeCourse.state === CourseState.ACCEPTED;
};

/**
 * Vrai si le trip est expiré (= annonce non prise en charge) :
 * - instant : créé il y a plus que INSTANT_TRIP_VALIDITY_MINUTES
 * - planifié : endDatetimeUtc passé
 * Et dans tous les cas : aucune course rattachée.
 *
 * Le back exécute un cron `expireAnnouncements` qui supprime physiquement
 * les Trip dans cet état toutes les 5 min ; cette fonction sert à gérer
 * l'affichage côté client entre deux passages du cron.
 */
export const isTripExpired = (trip?: TripLike | null): boolean => {
  if (!trip) return false;
  const hasNoCourses = (trip.coursesCount || 0) === 0;
  if (!hasNoCourses) return false;

  if (trip.isInstant && trip.createdAt) {
    const createdAtMs = new Date(trip.createdAt).getTime();
    const validityMs = INSTANT_TRIP_VALIDITY_MINUTES * 60 * 1000;
    return Date.now() > createdAtMs + validityMs;
  }

  if (trip.endDatetimeUtc) {
    return Date.now() > new Date(trip.endDatetimeUtc).getTime();
  }

  return false;
};

// ─── Fenêtres de temps ─────────────────────────────────────────────────

/**
 * Vrai si l'annulation est gratuite (> FREE_CANCELLATION_HOURS avant le départ).
 */
export const isCancellationFree = (
  startDatetimeUtc?: string | null
): boolean => {
  if (!startDatetimeUtc) return true;
  const hoursUntilStart =
    (new Date(startDatetimeUtc).getTime() - Date.now()) / (1000 * 60 * 60);
  return hoursUntilStart > FREE_CANCELLATION_HOURS;
};

/**
 * Vrai si le créneau du trajet est dépassé (start + duration < now).
 */
export const isTripPast = (
  startDatetimeUtc?: string | null,
  durationMinutes?: number | null
): boolean => {
  if (!startDatetimeUtc) return false;
  const duration = durationMinutes || 0;
  const estimatedEnd =
    new Date(startDatetimeUtc).getTime() + duration * 60 * 1000;
  return Date.now() > estimatedEnd;
};

/**
 * Vrai si la course doit être retirée de l'affichage home
 * (fin théorique + COURSE_DISPLAY_BUFFER_MINUTES dépassée).
 *
 * Pour un trip instant, le start effectif est `course.createdAt` (moment où
 * le driver accepte) et non `trip.startDatetimeUtc` (= création de l'annonce).
 * Sinon, une annonce instant acceptée 30 min après sa création disparaît
 * prématurément de la home alors que la course est encore en cours.
 */
export const isCoursePastDisplayWindow = (params: {
  startDatetimeUtc?: string | null;
  durationMinutes?: number | null;
  isInstant?: boolean | null;
  courseCreatedAt?: string | null;
}): boolean => {
  const w = getCourseTimeWindow(params);
  if (!w) return false;
  return Date.now() > w.endMs + COURSE_DISPLAY_BUFFER_MINUTES * 60 * 1000;
};

/**
 * Vrai si la course a commencé (startDatetimeUtc dans le passé).
 */
export const hasCourseStarted = (
  startDatetimeUtc?: string | null
): boolean => {
  if (!startDatetimeUtc) return false;
  return Date.now() > new Date(startDatetimeUtc).getTime();
};

// ─── Fenêtres des CTA pendant la course ────────────────────────────────

/**
 * Calcule les bornes temporelles effectives d'une course :
 * - trip planifié : start = trip.startDatetimeUtc
 * - trip instant  : start = course.createdAt (moment où le driver accepte ;
 *   le trip.startDatetimeUtc d'une annonce instant correspond à sa
 *   création passenger, ce qui n'a pas de sens comme "départ réel")
 *
 * `durationMinutes` reste celui du Trip (estimation Google Maps) dans les
 * deux cas — on n'a pas mieux à disposition côté client.
 *
 * Renvoie `null` si on ne dispose pas d'un start exploitable (ex : annonce
 * instant sans course encore acceptée).
 */
export type CourseTimeWindow = {
  /** Timestamp ms du début effectif de la course */
  startMs: number;
  /** Timestamp ms de la fin estimée (start + duration) */
  endMs: number;
  /** Durée en ms (= durationMinutes × 60s) */
  durationMs: number;
};

export const getCourseTimeWindow = (params: {
  startDatetimeUtc?: string | null;
  durationMinutes?: number | null;
  isInstant?: boolean | null;
  courseCreatedAt?: string | null;
}): CourseTimeWindow | null => {
  const startSrc = params.isInstant && params.courseCreatedAt
    ? params.courseCreatedAt
    : params.startDatetimeUtc;
  if (!startSrc) return null;
  const startMs = new Date(startSrc).getTime();
  if (Number.isNaN(startMs)) return null;
  const durationMs = Math.max(0, (params.durationMinutes || 0) * 60 * 1000);
  return { startMs, durationMs, endMs: startMs + durationMs };
};

/**
 * Bouton "Contacter le driver/passenger" :
 * visible à partir de CONTACT_BEFORE_START_MINUTES avant le départ effectif,
 * masqué après CONTACT_AFTER_END_MINUTES après la fin estimée.
 */
export const canShowContactButton = (params: {
  startDatetimeUtc?: string | null;
  durationMinutes?: number | null;
  isInstant?: boolean | null;
  courseCreatedAt?: string | null;
}): boolean => {
  const w = getCourseTimeWindow(params);
  if (!w) return false;
  const now = Date.now();
  const lower = w.startMs - CONTACT_BEFORE_START_MINUTES * 60 * 1000;
  const upper = w.endMs + CONTACT_AFTER_END_MINUTES * 60 * 1000;
  return now >= lower && now <= upper;
};

/**
 * Bouton "Annuler la course" :
 * reste visible jusqu'à `start + CANCEL_GRACE_MIN_MINUTES`. Règle "top chrono"
 * (5 min après la prise en charge, indépendamment de la durée du trajet) —
 * passé ce délai le driver est censé être en course.
 */
export const canShowCancelButton = (params: {
  startDatetimeUtc?: string | null;
  durationMinutes?: number | null;
  isInstant?: boolean | null;
  courseCreatedAt?: string | null;
}): boolean => {
  const w = getCourseTimeWindow(params);
  // Pas de fenêtre = pas encore de start exploitable → on autorise
  // (ex : passenger qui veut supprimer son annonce instant non acceptée).
  if (!w) return true;
  const grace = CANCEL_GRACE_MIN_MINUTES * 60 * 1000;
  return Date.now() <= w.startMs + grace;
};

/**
 * Bouton "Course terminée" / "Arrivée à destination" :
 * apparaît après `start + max(END_COURSE_THRESHOLD_PERCENT × durée,
 * END_COURSE_THRESHOLD_MIN_MINUTES)`. Sur un trajet moto/scooter, le driver
 * arrive souvent en avance — on l'autorise à clore dès la moitié écoulée.
 */
export const canShowEndCourseButton = (params: {
  startDatetimeUtc?: string | null;
  durationMinutes?: number | null;
  isInstant?: boolean | null;
  courseCreatedAt?: string | null;
}): boolean => {
  const w = getCourseTimeWindow(params);
  if (!w) return false;
  const threshold = Math.max(
    w.durationMs * END_COURSE_THRESHOLD_PERCENT,
    END_COURSE_THRESHOLD_MIN_MINUTES * 60 * 1000
  );
  return Date.now() >= w.startMs + threshold;
};

// ─── Format & display ──────────────────────────────────────────────────

/**
 * Formate une distance en label lisible.
 * @example
 * getDistanceLabel(2500) // "Départ à 3 km"
 * getDistanceLabel(800)  // "Départ à moins de 1 km"
 */
export const getDistanceLabel = (distance?: number | null): string => {
  // 0 est une valeur valide (driver est très proche / co-localisé avec le pickup) :
  // ne masquer que null/undefined/négatif. Avant, `!distance` masquait le cas 0
  // → labels incohérents quand 2 pickups au même endroit donnaient 0 vs 1+ via
  // Math.floor côté back.
  if (distance == null || distance < 0) return "";
  return distance > DISTANCE_THRESHOLD_METERS
    ? `Départ à ${(distance / 1000).toFixed(0)} km`
    : "Départ à moins de 1 km";
};

/**
 * Récupère l'URL d'un avatar quel que soit le format d'origine (uri ancien ou url récent).
 * Utile pour la transition pendant que les anciens caches/clients utilisent encore `uri`.
 */
export const getAvatarUrl = (avatar: unknown): string => {
  if (!avatar || typeof avatar !== "object") return "";
  const a = avatar as { uri?: string; url?: string };
  return a.url || a.uri || "";
};
