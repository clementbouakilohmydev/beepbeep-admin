import { DOCUMENT_TYPES, type DocumentType } from "@/lib/constants"
import { getUserDisplay } from "@/lib/format"

export type FlatDocument = {
  userId: string
  userName: string
  userEmail: string | null | undefined
  docType: DocumentType
  docId: string
  state: string | null | undefined
  pictureUrl: string | null | undefined
  createdAt: string | null | undefined
}

type UserWithDocuments = {
  id: string
  firstname?: string | null
  lastname?: string | null
  email?: string | null
  [key: string]:
    | {
        id: string
        state?: string | null
        picture?: { uri: string } | null
        createdAt?: string | null
      }
    | string
    | null
    | undefined
}

export function flattenUserDocuments(
  users: UserWithDocuments[] | null | undefined
): FlatDocument[] {
  if (!users) return []

  const docs: FlatDocument[] = []

  for (const user of users) {
    const name = getUserDisplay(user)
    for (const type of DOCUMENT_TYPES) {
      const doc = user[type] as
        | {
            id: string
            state?: string | null
            picture?: { uri: string } | null
            createdAt?: string | null
          }
        | null
        | undefined

      if (doc) {
        docs.push({
          userId: user.id,
          userName: name,
          userEmail: user.email,
          docType: type,
          docId: doc.id,
          state: doc.state,
          pictureUrl: doc.picture?.url,
          createdAt: doc.createdAt,
        })
      }
    }
  }

  return docs
}

type DocFilter = "all" | "pending" | "processing" | "todo" | "verified"

export function filterDocuments(
  documents: FlatDocument[],
  filter: DocFilter
): FlatDocument[] {
  if (filter === "all") {
    return documents.filter((d) => d.state !== "verified")
  }
  return documents.filter((d) => d.state === filter)
}
