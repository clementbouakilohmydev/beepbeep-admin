// ╔══════════════════════════════════════════════════════════════════╗
// ║  AUTO-GENERATED — DO NOT EDIT                                    ║
// ║  Source: BEEP/shared/error-codes.ts                                ║
// ║  Run `/sync-shared` or `node scripts/sync-shared.mjs` to update.  ║
// ╚══════════════════════════════════════════════════════════════════╝

/**
 * Codes d'erreur métier exposés par les mutations GraphQL custom du back.
 * Source canonique unique consommée par :
 *   - back  → `Course.validateInput` / `Trip.validateInput` / extensions
 *   - mobile → parsing des erreurs catch dans les hooks pour toaster un
 *     message ciblé à l'user
 *   - admin → idem, dans les dialogs / toasts
 *
 * Convention : `snake_case`, lisible, préfixé par l'entité concernée.
 * Avant ce module, on avait un mix de natural language ("trip in past")
 * et de codes (`driver_no_vehicule`) qui rendait le parsing front fragile
 * (un refactor de message break le toast silencieusement).
 *
 * En cas d'ajout : étendre l'enum + le messageMap, sync-shared, puis
 * consommer dans le code consommateur.
 */

export const ErrorCode = {
  // ─── Trip ────────────────────────────────────────────────────────────
  TRIP_IN_PAST: "trip_in_past",
  TRIP_TOO_FAR_IN_FUTURE: "trip_too_far_in_future",
  TRIP_INVALID: "trip_invalid",
  TRIP_MISSING_NODES: "trip_missing_nodes",
  TRIP_HAS_COURSES_CANNOT_DELETE: "trip_has_courses_cannot_delete",
  PASSENGER_ALREADY_HAS_ANNOUNCEMENT: "passenger_already_has_announcement",

  // ─── Course ──────────────────────────────────────────────────────────
  TRIP_ALREADY_HAS_COURSE: "trip_already_has_course",
  COURSE_PAYMENT_INVALID: "course_payment_invalid",
  DRIVER_ALREADY_HAS_ACTIVE_COURSE: "driver_already_has_active_course",
  PASSENGER_ALREADY_HAS_ACTIVE_COURSE: "passenger_already_has_active_course",
  DRIVER_NO_VEHICULE: "driver_no_vehicule",
  DRIVER_INSURANCE_INVALID: "driver_insurance_invalid",
  DRIVER_REGISTRATION_INVALID: "driver_registration_invalid",
  DRIVER_LICENSE_INVALID: "driver_license_invalid",
  COURSE_CANNOT_TERMINATE_IN_FUTURE: "course_cannot_terminate_in_future",
  COURSE_NOT_ACCEPTED: "course_not_accepted",
  COURSE_PAYMENT_REJECTED: "course_payment_rejected",
  COURSE_ONLY_PASSENGER_CAN_REJECT: "course_only_passenger_can_reject",
  COURSE_ONLY_PASSENGER_CAN_TERMINATE: "course_only_passenger_can_terminate",
  COURSE_ALREADY_PAID_CANNOT_CANCEL: "course_already_paid_cannot_cancel",
  COURSE_CANCEL_WINDOW_PASSED: "course_cancel_window_passed",

  // ─── Driver onboarding ───────────────────────────────────────────────
  DRIVER_ONLY_DRIVERS_CAN_CREATE_COURSE: "driver_only_drivers_can_create_course",
  DRIVER_CANNOT_CREATE_COURSE_ON_OWN_TRIP:
    "driver_cannot_create_course_on_own_trip",
} as const;

export type ErrorCodeValue = (typeof ErrorCode)[keyof typeof ErrorCode];

/**
 * Messages user-facing par code. Les clients (mobile/admin) en consomment
 * directement la valeur ; le back se contente d'`addValidationError(code)`
 * et le front map vers un toast en français.
 *
 * Ne pas inclure de variables interpolées ici — si un message a besoin
 * d'un montant ou d'une date, le front le formatte côté UI à partir d'un
 * payload séparé.
 */
export const ErrorCodeMessages: Record<ErrorCodeValue, string> = {
  // Trip
  [ErrorCode.TRIP_IN_PAST]:
    "L'heure de départ choisie est déjà passée, merci d'en sélectionner une nouvelle",
  [ErrorCode.TRIP_TOO_FAR_IN_FUTURE]:
    "Vous ne pouvez pas créer un trajet à plus de 6 jours",
  [ErrorCode.TRIP_INVALID]: "Les informations du trajet sont incomplètes",
  [ErrorCode.TRIP_MISSING_NODES]: "Le départ ou la destination est manquant",
  [ErrorCode.TRIP_HAS_COURSES_CANNOT_DELETE]:
    "Ce trajet a déjà une course associée et ne peut pas être supprimé",
  [ErrorCode.PASSENGER_ALREADY_HAS_ANNOUNCEMENT]:
    "Vous avez déjà une annonce en cours, terminez-la ou annulez-la avant d'en créer une autre",

  // Course
  [ErrorCode.TRIP_ALREADY_HAS_COURSE]:
    "Ce trajet a déjà été pris en charge par un autre conducteur",
  [ErrorCode.COURSE_PAYMENT_INVALID]:
    "Le paiement de cette course n'est pas valide",
  [ErrorCode.DRIVER_ALREADY_HAS_ACTIVE_COURSE]:
    "Vous avez déjà une course en cours. Terminez-la avant d'en accepter une autre.",
  [ErrorCode.PASSENGER_ALREADY_HAS_ACTIVE_COURSE]:
    "Ce passager a déjà une course en cours, vous ne pouvez pas accepter cette annonce",
  [ErrorCode.DRIVER_NO_VEHICULE]:
    "Vous devez renseigner un véhicule avant de pouvoir prendre des courses",
  [ErrorCode.DRIVER_INSURANCE_INVALID]:
    "Votre assurance n'est plus valide. Vérifiez votre profil.",
  [ErrorCode.DRIVER_REGISTRATION_INVALID]:
    "Votre carte grise n'est plus valide. Vérifiez votre profil.",
  [ErrorCode.DRIVER_LICENSE_INVALID]:
    "Votre permis n'est plus valide. Vérifiez votre profil.",
  [ErrorCode.COURSE_CANNOT_TERMINATE_IN_FUTURE]:
    "La course ne peut pas être terminée avant son heure de départ",
  [ErrorCode.COURSE_NOT_ACCEPTED]:
    "Cette course n'est pas dans un état acceptable pour cette action",
  [ErrorCode.COURSE_PAYMENT_REJECTED]:
    "Le paiement de cette course a été refusé",
  [ErrorCode.COURSE_ONLY_PASSENGER_CAN_REJECT]:
    "Seul le passager peut refuser une course",
  [ErrorCode.COURSE_ONLY_PASSENGER_CAN_TERMINATE]:
    "Seul le passager peut clôturer une course",
  [ErrorCode.COURSE_ALREADY_PAID_CANNOT_CANCEL]:
    "Cette course est déjà payée et ne peut plus être annulée",
  [ErrorCode.COURSE_CANCEL_WINDOW_PASSED]:
    "La course ne peut plus être annulée passé 5 minutes après la prise en charge",

  // Driver onboarding
  [ErrorCode.DRIVER_ONLY_DRIVERS_CAN_CREATE_COURSE]:
    "Seuls les conducteurs peuvent accepter une course",
  [ErrorCode.DRIVER_CANNOT_CREATE_COURSE_ON_OWN_TRIP]:
    "Vous ne pouvez pas accepter votre propre annonce",
};

/**
 * Helper pour le mobile/admin : extrait le code d'erreur d'un message
 * GraphQL (qui prend la forme `validation: <code>` ou inclut le code
 * tel quel) et renvoie le message user-facing correspondant, ou null
 * si non reconnu (le caller affichera un fallback générique).
 */
export function resolveErrorMessage(
  rawMessage: string | undefined | null,
): string | null {
  if (!rawMessage) return null;
  for (const code of Object.values(ErrorCode)) {
    if (rawMessage.includes(code)) {
      return ErrorCodeMessages[code];
    }
  }
  return null;
}
