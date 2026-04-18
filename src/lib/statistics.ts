type CourseWithStats = {
  distance?: number | null
  duration?: number | null
  price?: number | null
  fees?: number | null
  createdAt?: string | null
  startDatetimeUtc?: string | null
}

export function computeAvgDistance(courses: CourseWithStats[]) {
  const valid = courses.filter((c) => c.distance != null && c.distance > 0)
  if (!valid.length) return "—"
  const avg =
    valid.reduce((sum, c) => sum + (c.distance ?? 0), 0) / valid.length
  return `${(avg / 1000).toFixed(1)} km`
}

export function computeAvgAcceptanceTime(courses: CourseWithStats[]) {
  const valid = courses.filter((c) => c.createdAt && c.startDatetimeUtc)
  if (!valid.length) return "—"
  let totalMs = 0
  let count = 0
  for (const c of valid) {
    const diff =
      new Date(c.startDatetimeUtc!).getTime() -
      new Date(c.createdAt!).getTime()
    if (diff > 0) {
      totalMs += diff
      count++
    }
  }
  if (!count) return "—"
  const avgMin = totalMs / count / 1000 / 60
  if (avgMin < 1) return `${Math.round(avgMin * 60)}s`
  if (avgMin < 60) return `${avgMin.toFixed(0)} min`
  return `${(avgMin / 60).toFixed(1)}h`
}

export function computeAvgDuration(courses: CourseWithStats[]) {
  const valid = courses.filter((c) => c.duration != null && c.duration > 0)
  if (!valid.length) return "—"
  const avg =
    valid.reduce((sum, c) => sum + (c.duration ?? 0), 0) / valid.length
  const mins = avg / 60
  if (mins < 60) return `${mins.toFixed(0)} min`
  return `${(mins / 60).toFixed(1)}h`
}

export function computeAvgPrice(courses: CourseWithStats[]) {
  const valid = courses.filter((c) => c.price != null && c.price > 0)
  if (!valid.length) return "—"
  const avg =
    valid.reduce((sum, c) => sum + (c.price ?? 0), 0) / valid.length
  return `${avg.toFixed(2)} €`
}

export function computeAvgDriverRating(
  users: Array<{ averageRate?: number | null }>
) {
  const drivers = users.filter(
    (u) => u.averageRate != null && u.averageRate > 0
  )
  if (!drivers.length) return "—"
  const avg =
    drivers.reduce((sum, u) => sum + (u.averageRate ?? 0), 0) / drivers.length
  return avg.toFixed(1)
}

export function computePendingDocsCount(
  users: Array<Record<string, unknown>>
) {
  let count = 0
  for (const user of users) {
    for (const key of [
      "drivingLicense",
      "insurance",
      "registrationDocument",
      "certificate",
    ]) {
      const doc = user[key] as { state?: string | null } | null | undefined
      if (doc?.state && doc.state !== "verified") count++
    }
  }
  return count
}
