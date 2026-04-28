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
  CANCEL_CUTOFF_MINUTES,
  CONTACT_WINDOW_HOURS,
  COURSE_DISPLAY_BUFFER_MINUTES,
  DISTANCE_THRESHOLD_METERS,
  FINISHED_COURSE_STATES,
  FINISHED_PAYMENT_STATES,
  FREE_CANCELLATION_HOURS,
} from "./constants";

// ─── Types structurels (sans dépendance codegen) ───────────────────────

type CourseLike = { state?: string | null };
type PaymentLike = { state?: string | null };
type TripLike = {
  coursesCount?: number | null;
  courses?: CourseLike[] | null;
  payment?: PaymentLike | null;
  endDatetimeUtc?: string | null;
};

// ─── Helpers de course ─────────────────────────────────────────────────

/**
 * Trouve la première course active (non terminée) dans une liste.
 */
export const findActiveCourse = <T extends CourseLike>(
  courses?: T[] | null
): T | null =>
  courses?.find((c) => !FINISHED_COURSE_STATES.includes(c.state || "")) ?? null;

/**
 * Détermine si un trip est encore "actif" :
 * - il a au moins une course non terminée
 * - ET le paiement n'est pas finalisé
 */
export const isTripActive = (trip?: TripLike | null): boolean => {
  if (!trip) return false;
  if ((trip.coursesCount || 0) === 0) return false;
  const paymentState = trip.payment?.state || "";
  if (FINISHED_PAYMENT_STATES.includes(paymentState)) return false;
  return !!findActiveCourse(trip.courses);
};

/**
 * Vrai si le trip est expiré : endDatetimeUtc passé ET aucune course rattachée.
 */
export const isTripExpired = (trip?: TripLike | null): boolean => {
  if (!trip?.endDatetimeUtc) return false;
  const hasNoCourses = !trip.courses?.length;
  const isDatePassed = new Date(trip.endDatetimeUtc).getTime() < Date.now();
  return isDatePassed && hasNoCourses;
};

// ─── Fenêtres de temps ─────────────────────────────────────────────────

/**
 * Vrai si le passager peut encore annuler la course
 * (plus de CANCEL_CUTOFF_MINUTES min avant le départ).
 */
export const isCancelWindowOpen = (
  startDatetimeUtc?: string | null
): boolean => {
  if (!startDatetimeUtc) return true;
  const minutesUntilStart =
    (new Date(startDatetimeUtc).getTime() - Date.now()) / (1000 * 60);
  return minutesUntilStart > CANCEL_CUTOFF_MINUTES;
};

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
 */
export const isCoursePastDisplayWindow = (
  startDatetimeUtc?: string | null,
  durationMinutes?: number | null
): boolean => {
  if (!startDatetimeUtc) return false;
  const duration = durationMinutes || 0;
  const estimatedEnd =
    new Date(startDatetimeUtc).getTime() + duration * 60 * 1000;
  const displayEnd = estimatedEnd + COURSE_DISPLAY_BUFFER_MINUTES * 60 * 1000;
  return Date.now() > displayEnd;
};

/**
 * Vrai si on est encore dans la fenêtre CONTACT_WINDOW_HOURS après la fin estimée.
 */
export const isContactWindowOpen = (
  startDatetimeUtc?: string | null,
  durationMinutes?: number | null
): boolean => {
  if (!startDatetimeUtc) return false;
  const duration = durationMinutes || 0;
  const estimatedEnd =
    new Date(startDatetimeUtc).getTime() + duration * 60 * 1000;
  const windowEnd = estimatedEnd + CONTACT_WINDOW_HOURS * 60 * 60 * 1000;
  return Date.now() <= windowEnd;
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

// ─── Format & display ──────────────────────────────────────────────────

/**
 * Formate une distance en label lisible.
 * @example
 * getDistanceLabel(2500) // "Départ à 3 km"
 * getDistanceLabel(800)  // "Départ à moins de 1 km"
 */
export const getDistanceLabel = (distance?: number): string => {
  if (!distance || distance < 0) return "";
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
