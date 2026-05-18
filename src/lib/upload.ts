import { SESSION_TOKEN_KEY } from "@/lib/constants"

// API_URL pointe sur /ks/api (GraphQL). L'endpoint REST d'upload de
// fichier est /ks/api/files, soit la même base — on dérive l'URL.
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://api.beepbeepcity-pp.aleygues.fr/ks/api"
const FILES_ENDPOINT = `${API_URL}/files`

export type UploadedFile = {
  id: string
  uri: string | null
}

/**
 * Upload un fichier via POST /ks/api/files (route REST custom du back,
 * multer disk storage 10MB max). Retourne le File créé { id, uri } qui
 * peut ensuite être lié via une mutation GraphQL (ex: TicketMessage
 * { attachment: { connect: { id } } }).
 */
export async function uploadFile(file: File): Promise<UploadedFile> {
  const token = localStorage.getItem(SESSION_TOKEN_KEY)
  const form = new FormData()
  form.append("file", file)

  const res = await fetch(FILES_ENDPOINT, {
    method: "POST",
    body: form,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })
  if (!res.ok) {
    const msg = await res.text().catch(() => "")
    throw new Error(`Upload failed (${res.status}): ${msg}`)
  }
  const json = (await res.json()) as { item?: UploadedFile }
  if (!json.item?.id) {
    throw new Error("Upload response missing item.id")
  }
  return json.item
}
