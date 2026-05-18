/**
 * Helpers d'export CSV pour les tables admin (users en V1, étendable
 * tickets/courses/documents si besoin). Sans dépendance — un CSV simple
 * RFC 4180 avec guillemets si nécessaire, header + lignes.
 */

/** Sérialise une cellule en respectant RFC 4180 (quotes + escape). */
function escapeCell(value: unknown): string {
  if (value == null) return ""
  const str = String(value)
  const needsQuote = /[",\n\r;]/.test(str)
  if (!needsQuote) return str
  return `"${str.replace(/"/g, '""')}"`
}

/**
 * Construit un CSV (header + rows). `columns` est la map colonne →
 * extracteur depuis une row. Le préfixe BOM UTF-8 permet à Excel
 * d'ouvrir le fichier en UTF-8 (sinon les accents cassent).
 */
export function buildCsv<T>(
  rows: ReadonlyArray<T>,
  columns: ReadonlyArray<{ header: string; get: (row: T) => unknown }>
): string {
  const headerLine = columns.map((c) => escapeCell(c.header)).join(",")
  const bodyLines = rows.map((row) =>
    columns.map((c) => escapeCell(c.get(row))).join(",")
  )
  return "\uFEFF" + [headerLine, ...bodyLines].join("\r\n")
}

/** Déclenche le download navigateur d'un blob CSV. */
export function downloadCsv(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
