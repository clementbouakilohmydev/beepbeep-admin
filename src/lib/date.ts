export function getDateWheres() {
  const now = new Date()

  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const dayOfWeek = now.getDay() === 0 ? 6 : now.getDay() - 1
  const weekStart = new Date(todayStart)
  weekStart.setDate(weekStart.getDate() - dayOfWeek)
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

  const base = { isAdmin: { equals: false } }

  return {
    todayWhere: { ...base, createdAt: { gte: todayStart.toISOString() } },
    weekWhere: { ...base, createdAt: { gte: weekStart.toISOString() } },
    monthWhere: { ...base, createdAt: { gte: monthStart.toISOString() } },
  }
}
