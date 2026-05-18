import { useState } from "react"
import { SendIcon, ShieldIcon, UserIcon } from "lucide-react"
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
 * les messages dans l'ordre chronologique, l'admin et le user (= owner
 * du ticket) sont visuellement distingués. Form en bas pour répondre.
 *
 * Pendant côté admin du send-email-dialog : ici tout est persisté en
 * DB, le user pourra lire les réponses depuis l'app.
 */
export function TicketThread({ ticket }: TicketThreadProps) {
  const [content, setContent] = useState("")
  const { send, isPending } = useCreateTicketMessage(ticket.id)
  const messages = ticket.messages ?? []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = content.trim()
    if (!trimmed) return
    send(trimmed)
    setContent("")
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
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isPending || content.trim().length === 0}
          >
            {isPending ? <Spinner /> : <SendIcon className="mr-1.5 size-3.5" />}
            Envoyer
          </Button>
        </div>
      </form>
    </section>
  )
}
