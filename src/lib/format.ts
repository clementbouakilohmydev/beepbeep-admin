export function formatDate(date: string | null | undefined) {
  if (!date) return "—"
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function getUserDisplay(
  user:
    | {
        firstname?: string | null
        lastname?: string | null
        email?: string | null
      }
    | null
    | undefined
) {
  if (!user) return "—"
  const name = `${user.firstname ?? ""} ${user.lastname ?? ""}`.trim()
  return name || user.email || "—"
}
