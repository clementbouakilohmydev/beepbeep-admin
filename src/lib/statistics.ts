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

export function formatAcceptanceTimeSeconds(seconds: number | null | undefined) {
  if (seconds == null || seconds <= 0) return "—"
  const mins = seconds / 60
  if (mins < 1) return `${Math.round(mins * 60)}s`
  if (mins < 60) return `${mins.toFixed(0)} min`
  return `${(mins / 60).toFixed(1)}h`
}

export function formatPriceEur(price: number | null | undefined) {
  if (price == null || price <= 0) return "—"
  return `${price.toFixed(2)} €`
}

export function formatRating(rating: number | null | undefined) {
  if (rating == null || rating <= 0) return "—"
  return rating.toFixed(1)
}
