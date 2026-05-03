// ╔══════════════════════════════════════════════════════════════════╗
// ║  AUTO-GENERATED — DO NOT EDIT                                    ║
// ║  Source: BEEP/shared/constants.ts                                  ║
// ║  Run `/sync-shared` or `node scripts/sync-shared.mjs` to update.  ║
// ╚══════════════════════════════════════════════════════════════════╝

/**
 * Constantes partagées entre admin et app.
 * Source canonique : BEEP/shared/constants.ts
 */

export const LOCALE = "fr-FR" as const;
export const TIMEZONE = "Europe/Paris" as const;
export const CURRENCY = "EUR" as const;

/** Note maximale pour un Rating (système 1-5 étoiles) */
export const MAX_RATING = 5;

// ─── Course / Trip states ──────────────────────────────────────────────
// Source de vérité = back/api/src/models/Course.ts (Course.state.options)
// Orthographe : "cancelled" (2 L). Les valeurs Stripe internes utilisent
// "canceled" (1 L, US) mais ne fuient jamais via Course.state.

/** Tous les états valides d'une Course côté back */
export const COURSE_STATES = ["accepted", "cancelled", "rejected", "paid"] as const;

export type CourseState = (typeof COURSE_STATES)[number] | (string & {});

/** États de course considérés comme terminés (plus de suivi attendu) */
export const FINISHED_COURSE_STATES: readonly string[] = [
  "paid",
  "cancelled",
  "rejected",
];

// ─── Payment states ────────────────────────────────────────────────────
// Source de vérité = back/api/src/models/Payment.ts (Payment.state.options)

/** Tous les états valides d'un Payment côté back */
export const PAYMENT_STATES = [
  "pending",
  "verification",
  "authorized",
  "succeeded",
  "rejected",
  "refunded",
  "failedRefund",
  "transferred",
] as const;

export type PaymentState = (typeof PAYMENT_STATES)[number] | (string & {});

/** États de paiement considérés comme finalisés (Payment n'a pas d'état d'annulation) */
export const FINISHED_PAYMENT_STATES: readonly string[] = [
  "transferred",
  "refunded",
  "failedRefund",
  "rejected",
];

// ─── Document types ────────────────────────────────────────────────────

export const DOCUMENT_LABELS = {
  drivingLicense: "Permis de conduire",
  insurance: "Assurance",
  registrationDocument: "Carte grise",
  certificate: "Certificat",
} as const;

export type DocumentType = keyof typeof DOCUMENT_LABELS;

export const DOCUMENT_TYPES = Object.keys(DOCUMENT_LABELS) as DocumentType[];

// ─── Pricing / cancellation rules ──────────────────────────────────────

/** Seuil en mètres pour basculer en label "moins de 1 km" */
export const DISTANCE_THRESHOLD_METERS = 1000;

/**
 * Seuil en heures avant le départ en deçà duquel l'annulation passenger
 * déclenche des frais (capture Stripe partielle de CANCELLATION_FEE_EUR).
 * Doit rester aligné avec back env `FREE_CANCELATION_HOURS` (default 1).
 */
export const FREE_CANCELLATION_HOURS = 1;

/**
 * Montant en € prélevé sur le passenger en cas d'annulation tardive
 * (idem default back env `CANCELATION_FEES=500` cents). Le même montant
 * est versé au driver en indemnité.
 */
export const CANCELLATION_FEE_EUR = 5;

/** Marge en minutes après la fin théorique avant de masquer la course de la home */
export const COURSE_DISPLAY_BUFFER_MINUTES = 60;

// ─── Course action buttons (windows) ───────────────────────────────────
// Fenêtres de visibilité des CTA durant le cycle de vie d'une course.
// Les seuils relatifs (% de la durée) garantissent un comportement cohérent
// entre un trajet de 5 min et un trajet de 60 min, avec un plancher en min
// pour éviter une fenêtre quasi-nulle sur les très courts trajets.

/** Bouton "Contacter" : visible à partir de N min avant le départ */
export const CONTACT_BEFORE_START_MINUTES = 60;
/** Bouton "Contacter" : encore visible jusqu'à N min après la fin estimée */
export const CONTACT_AFTER_END_MINUTES = 15;

/** Bouton "Annuler" : reste visible % de la durée après le début théorique */
export const CANCEL_GRACE_PERCENT = 0.2;
/** Plancher en minutes du même grace (si le trajet est très court) */
export const CANCEL_GRACE_MIN_MINUTES = 5;

/** Bouton "Course terminée" : devient visible après % de la durée écoulée */
export const END_COURSE_THRESHOLD_PERCENT = 0.5;
/** Plancher en minutes du même seuil (idem trajets courts) */
export const END_COURSE_THRESHOLD_MIN_MINUTES = 5;
