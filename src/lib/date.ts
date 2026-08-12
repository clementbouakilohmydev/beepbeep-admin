import { CourseState } from "@/shared/constants"

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

/**
 * Filtres du bloc « Courses » du dashboard, en DEUX séries volontairement
 * distinctes :
 * - `*Where`     : toutes les courses créées (acceptée, annulée, rejetée, payée)
 * - `*DoneWhere` : les seules courses réellement effectuées (state "paid")
 *
 * Sans cette distinction, le dashboard comptait toutes les courses créées
 * pendant que la page Finance ne comptait que les "paid" — d'où un « 2 courses »
 * en face d'un « 1 course / 11,50 € » sans que rien ne l'explique à l'écran.
 */
export function getCourseWheres() {
  const { todayISO, weekISO, monthISO, yearISO } = getDateBoundaries()

  const done = { state: { equals: CourseState.PAID } }

  return {
    todayWhere: { createdAt: { gte: todayISO } },
    weekWhere: { createdAt: { gte: weekISO } },
    monthWhere: { createdAt: { gte: monthISO } },
    yearWhere: { createdAt: { gte: yearISO } },
    todayDoneWhere: { ...done, createdAt: { gte: todayISO } },
    weekDoneWhere: { ...done, createdAt: { gte: weekISO } },
    monthDoneWhere: { ...done, createdAt: { gte: monthISO } },
    yearDoneWhere: { ...done, createdAt: { gte: yearISO } },
    doneWhere: done,
  }
}
