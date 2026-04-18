import type { GetUserQuery, GetTicketQuery } from "@/gql/generated"

// ── User mapper ──

type RawUser = NonNullable<GetUserQuery["user"]>

export type MappedUser = Omit<RawUser, "avatar"> & {
  avatarUrl: string | null
}

export function mapUser(raw: RawUser): MappedUser {
  return {
    ...raw,
    avatarUrl: raw.avatar?.uri ?? null,
  }
}

// ── Ticket mapper ──

type RawTicket = NonNullable<GetTicketQuery["ticket"]>

export type MappedTicket = Omit<RawTicket, "object"> & {
  subject: string
}

export function mapTicket(raw: RawTicket): MappedTicket {
  return {
    ...raw,
    subject: raw.object?.object ?? "Ticket",
  }
}
