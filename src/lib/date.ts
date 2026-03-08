export function getDateBoundaries() {
  const now = new Date()

  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const dayOfWeek = now.getDay() === 0 ? 6 : now.getDay() - 1
  const weekStart = new Date(todayStart)
  weekStart.setDate(weekStart.getDate() - dayOfWeek)
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const yearStart = new Date(now.getFullYear(), 0, 1)

  return {
    todayISO: todayStart.toISOString(),
    weekISO: weekStart.toISOString(),
    monthISO: monthStart.toISOString(),
    yearISO: yearStart.toISOString(),
  }
}

export function getDateWheres() {
  const { todayISO, weekISO, monthISO } = getDateBoundaries()

  const base = { isAdmin: { equals: false } }

  return {
    todayWhere: { ...base, createdAt: { gte: todayISO } },
    weekWhere: { ...base, createdAt: { gte: weekISO } },
    monthWhere: { ...base, createdAt: { gte: monthISO } },
  }
}
