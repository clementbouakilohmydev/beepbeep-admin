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

/** États de course considérés comme terminés (plus de suivi attendu) */
export const FINISHED_COURSE_STATES: readonly string[] = [
  "paid",
  "cancelled",
  "rejected",
];

/** États de paiement considérés comme finalisés */
export const FINISHED_PAYMENT_STATES: readonly string[] = [
  "transferred",
  "refunded",
  "failedRefund",
  "cancelled",
  "rejected",
];

export type CourseState = "paid" | "cancelled" | "rejected" | (string & {});
export type PaymentState =
  | "transferred"
  | "refunded"
  | "failedRefund"
  | "cancelled"
  | "rejected"
  | (string & {});

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

/** Seuil en minutes avant le départ pour bloquer l'annulation passager */
export const CANCEL_CUTOFF_MINUTES = 30;

/** Seuil en heures pour annulation gratuite (avant ce délai = sans frais) */
export const FREE_CANCELLATION_HOURS = 24;

/** Seuil en heures pour la fenêtre de contact après fin estimée d'une course */
export const CONTACT_WINDOW_HOURS = 24;

/** Marge en minutes après la fin théorique avant de masquer la course de la home */
export const COURSE_DISPLAY_BUFFER_MINUTES = 60;
