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

export type TicketFilter = "all" | "pending" | "solved"

const VALID_TICKET_FILTERS: TicketFilter[] = ["all", "pending", "solved"]

export function parseTicketFilter(raw: string | null): TicketFilter {
  return VALID_TICKET_FILTERS.includes(raw as TicketFilter)
    ? (raw as TicketFilter)
    : "all"
}
