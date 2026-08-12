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
 * Délai de mise en relation : temps d'attente vécu par le passager entre la
 * publication de son annonce et le moment où un conducteur la prend.
 *
 * Cette carte affichait auparavant un « temps d'acceptation » qui n'existe
 * pas : une Course naît déjà en state "accepted", puisque c'est le conducteur
 * qui la crée en acceptant (cf back Course.ts, resolveInput). Il n'y a donc
 * aucun intervalle « demande → acceptation », ni champ `acceptedAt` en base.
 * L'agrégat serveur calcule désormais `AVG(Course.createdAt - Trip.createdAt)`.
 *
 * Une valeur ≤ 0 (annonce prise dans la seconde) s'affiche « < 1 min » plutôt
 * que « — », qui laissait croire à une métrique non calculée.
 */
export function formatMatchingTimeSeconds(seconds: number | null | undefined) {
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
