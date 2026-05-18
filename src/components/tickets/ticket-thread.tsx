import { useRef, useState } from "react"
import { PaperclipIcon, SendIcon, ShieldIcon, UserIcon, XIcon } from "lucide-react"
import type { MappedTicket } from "@/lib/mappers"
import { useCreateTicketMessage } from "@/hooks"
import { formatDate, getUserDisplay } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

type TicketThreadProps = {
  ticket: MappedTicket
}

/**
 * Thread des messages d'un ticket (TicketMessage côté back). Affiche
 * les messages chronologiquement (admin distingué via badge "Support"),
 * + pièces jointes (image inline ou lien si autre mimetype). Form en
 * bas pour répondre, support attachment optionnel (image/pdf).
 */
export function TicketThread({ ticket }: TicketThreadProps) {
  const [content, setContent] = useState("")
  const [attachment, setAttachment] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { send, isPending } = useCreateTicketMessage(ticket.id)
  const messages = ticket.messages ?? []

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = content.trim()
    if (!trimmed && !attachment) return
    await send(trimmed || "(pièce jointe)", attachment)
    setContent("")
    setAttachment(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <section>
      <h3 className="mb-2 text-sm font-semibold">
        Conversation
        {messages.length > 0 && (
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            ({messages.length})
          </span>
        )}
      </h3>

      <div className="space-y-2">
        {messages.length === 0 ? (
          <p className="rounded-lg border border-dashed p-3 text-center text-xs text-muted-foreground">
            Aucun échange pour le moment.
          </p>
        ) : (
          messages.map((m) => {
            const isAdminMsg = m?.author?.isAdmin === true
            const attUri = m?.attachment?.uri
            const attMime = m?.attachment?.mimetype ?? ""
            const isImage = attMime.startsWith("image/")
            return (
              <div
                key={m?.id}
                className={cn(
                  "rounded-lg border p-3",
                  isAdminMsg
                    ? "border-primary/30 bg-primary/5"
                    : "bg-muted/40"
                )}
              >
                <div className="mb-1.5 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    {isAdminMsg ? (
                      <ShieldIcon className="size-3 text-primary" />
                    ) : (
                      <UserIcon className="size-3" />
                    )}
                    <span className="font-medium">
                      {m?.author
                        ? getUserDisplay(m.author)
                        : "Utilisateur supprimé"}
                    </span>
                    {isAdminMsg && (
                      <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-primary">
                        Support
                      </span>
                    )}
                  </div>
                  <span>{m?.createdAt && formatDate(m.createdAt)}</span>
                </div>
                <p className="whitespace-pre-wrap text-sm">{m?.content}</p>
                {attUri && (
                  <div className="mt-2">
                    {isImage ? (
                      <a
                        href={attUri}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block"
                      >
                        <img
                          src={attUri}
                          alt="Pièce jointe"
                          className="max-h-48 rounded border"
                        />
                      </a>
                    ) : (
                      <a
                        href={attUri}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                      >
                        <PaperclipIcon className="size-3" />
                        Télécharger la pièce jointe
                      </a>
                    )}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-3 space-y-2">
        <textarea
          placeholder="Répondre au ticket…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          className="w-full resize-none rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={(e) => setAttachment(e.target.files?.[0] ?? null)}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isPending}
            >
              <PaperclipIcon className="mr-1.5 size-3.5" />
              Joindre
            </Button>
            {attachment && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="max-w-[180px] truncate">{attachment.name}</span>
                <button
                  type="button"
                  onClick={() => setAttachment(null)}
                  className="rounded p-0.5 hover:bg-muted"
                  aria-label="Retirer"
                >
                  <XIcon className="size-3" />
                </button>
              </span>
            )}
          </div>
          <Button
            type="submit"
            disabled={
              isPending || (content.trim().length === 0 && !attachment)
            }
          >
            {isPending ? <Spinner /> : <SendIcon className="mr-1.5 size-3.5" />}
            Envoyer
          </Button>
        </div>
      </form>
    </section>
  )
}
