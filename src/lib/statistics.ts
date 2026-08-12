// ─── Formatters pour les agrégats serveur (cf adminStats côté back) ────
// Acceptent un nombre brut (ou null) renvoyé par adminCoursesMetrics /
// adminRevenueStats / adminDriversAverageRating et retournent la string
// affichable. Les anciens compute*(courses[]) qui faisaient le calcul
// côté client ont été supprimés (cf back/api/src/extensions/adminStats.ts).

export function formatDistanceMeters(meters: number | null | undefined) {
  if (meters == null || meters <= 0) return "—"
  return `${(meters / 1000).toFixed(1)} km`
}

export function formatDurationSeconds(seconds: number | null | undefined) {
  if (seconds == null || seconds <= 0) return "—"
  const mins = seconds / 60
  if (mins < 60) return `${mins.toFixed(0)} min`
  return `${(mins / 60).toFixed(1)}h`
}

/**
 * Délai entre la création de la course et l'heure de départ prévue.
 *
 * ⚠️ Ce n'est PAS un « temps d'acceptation », malgré le nom que portait
 * cette carte jusqu'ici. Une Course naît déjà en state "accepted" : c'est le
 * conducteur qui la crée en acceptant (cf back Course.ts, resolveInput). Il
 * n'existe donc aucun intervalle « demande → acceptation » à mesurer, et
 * aucun champ `acceptedAt` en base. L'agrégat serveur calcule
 * `AVG(startDatetimeUtc - createdAt)` = le délai d'anticipation des
 * réservations, ce que le libellé reflète désormais.
 *
 * Une valeur ≤ 0 signifie que la course a été acceptée après l'heure de
 * départ prévue (réservation de dernière minute). On l'affiche « < 1 min »
 * plutôt que « — », qui laissait croire à une métrique non calculée.
 */
export function formatLeadTimeSeconds(seconds: number | null | undefined) {
  if (seconds == null) return "—"
  if (seconds <= 0) return "< 1 min"
  const mins = seconds / 60
  if (mins < 1) return `${Math.round(mins * 60)}s`
  if (mins < 60) return `${mins.toFixed(0)} min`
  if (mins < 60 * 24) return `${(mins / 60).toFixed(1)}h`
  return `${(mins / 60 / 24).toFixed(1)} j`
}

export function formatPriceEur(price: number | null | undefined) {
  if (price == null || price <= 0) return "—"
  return `${price.toFixed(2)} €`
}

export function formatRating(rating: number | null | undefined) {
  if (rating == null || rating <= 0) return "—"
  return rating.toFixed(1)
}
