export const SESSION_TOKEN_KEY = "session-token"
export const MAX_RATING = 5
export const PAGE_SIZE = 10
export const LOCALE = "fr-FR" as const
export const CHART_DAYS = 30

export const DOCUMENT_LABELS = {
  drivingLicense: "Permis de conduire",
  insurance: "Assurance",
  registrationDocument: "Carte grise",
  certificate: "Certificat",
} as const

export type DocumentType = keyof typeof DOCUMENT_LABELS

export const DOCUMENT_TYPES = Object.keys(DOCUMENT_LABELS) as DocumentType[]

export const ORDER_BY_NEWEST = [{ createdAt: "desc" as const }]

export type UserTypeFilter = "all" | "passenger" | "driver"
export type UserStatusFilter = "all" | "active" | "blocked"

const VALID_TYPE_FILTERS: UserTypeFilter[] = ["all", "passenger", "driver"]
const VALID_STATUS_FILTERS: UserStatusFilter[] = ["all", "active", "blocked"]

export function parseTypeFilter(raw: string | null): UserTypeFilter {
  return VALID_TYPE_FILTERS.includes(raw as UserTypeFilter)
    ? (raw as UserTypeFilter)
    : "all"
}

export function parseStatusFilter(raw: string | null): UserStatusFilter {
  return VALID_STATUS_FILTERS.includes(raw as UserStatusFilter)
    ? (raw as UserStatusFilter)
    : "all"
}

// Pages légales/statiques : doit rester aligné sur
// `back/api/src/models/Page.ts` → `PAGE_SLUGS` et `mobile/lib/page-slugs.ts`.
// Pour ajouter un slug (ex. "cgv") : étendre la liste aux trois endroits +
// redéployer le back (validation `select`).
export const LEGAL_PAGE_SLUGS = [
  "cgu",
  "legal-mentions",
  "privacy-policy",
  "faq",
] as const

export type LegalPageSlug = (typeof LEGAL_PAGE_SLUGS)[number]

export const LEGAL_PAGE_LABELS: Record<LegalPageSlug, string> = {
  cgu: "Conditions générales d'utilisation",
  "legal-mentions": "Mentions légales",
  "privacy-policy": "Politique de confidentialité",
  faq: "FAQ",
}

export function isLegalPageSlug(value: string): value is LegalPageSlug {
  return (LEGAL_PAGE_SLUGS as readonly string[]).includes(value)
}

export type TicketFilter = "all" | "pending" | "solved"

const VALID_TICKET_FILTERS: TicketFilter[] = ["all", "pending", "solved"]

export function parseTicketFilter(raw: string | null): TicketFilter {
  return VALID_TICKET_FILTERS.includes(raw as TicketFilter)
    ? (raw as TicketFilter)
    : "all"
}
