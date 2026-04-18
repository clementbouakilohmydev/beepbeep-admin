import {
  StarIcon,
  PhoneIcon,
  MailIcon,
  CalendarIcon,
  CarIcon,
  HashIcon,
} from "lucide-react"
import type { MappedUser } from "@/lib/mappers"
import { Separator } from "@/components/ui"
import { formatDate } from "@/lib/format"
import { LOCALE } from "@/lib/constants"

type UserSheetInfoProps = {
  user: MappedUser
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3 py-2">
      <Icon className="size-4 shrink-0 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="ml-auto text-right text-sm font-medium">
        {value ?? "—"}
      </span>
    </div>
  )
}

export function UserSheetInfo({ user }: UserSheetInfoProps) {
  return (
    <>
      {/* Personal info */}
      <section>
        <h3 className="mb-2 text-sm font-semibold">
          Informations personnelles
        </h3>
        <div className="rounded-lg border p-3">
          <InfoRow icon={MailIcon} label="Email" value={user.email} />
          <Separator />
          <InfoRow
            icon={PhoneIcon}
            label="Téléphone"
            value={user.phoneNumber}
          />
          <Separator />
          <InfoRow
            icon={CalendarIcon}
            label="Date de naissance"
            value={
              user.birthdayDatetimeUtc
                ? new Date(
                    user.birthdayDatetimeUtc
                  ).toLocaleDateString(LOCALE)
                : "—"
            }
          />
          <Separator />
          <InfoRow
            icon={HashIcon}
            label="Âge"
            value={user.age != null ? `${user.age} ans` : "—"}
          />
          <Separator />
          <InfoRow
            icon={HashIcon}
            label="Code affiliation"
            value={user.affiliationCode}
          />
          <Separator />
          <InfoRow
            icon={CalendarIcon}
            label="Inscription"
            value={formatDate(user.createdAt)}
          />
        </div>
      </section>

      {/* Stats */}
      <section>
        <h3 className="mb-2 text-sm font-semibold">Statistiques</h3>
        <div className="rounded-lg border p-3">
          <InfoRow
            icon={StarIcon}
            label="Note moyenne"
            value={
              user.averageRate != null
                ? `${user.averageRate.toFixed(1)} / 5`
                : "—"
            }
          />
          <Separator />
          <InfoRow
            icon={CarIcon}
            label="Nombre de courses"
            value={user.coursesCount ?? 0}
          />
          <Separator />
          <InfoRow
            icon={HashIcon}
            label="Nombre d'avis"
            value={user.ratingsCount ?? 0}
          />
          <Separator />
          <InfoRow
            icon={HashIcon}
            label="Stripe ID"
            value={user.stripeCustomerId}
          />
          <Separator />
          <InfoRow
            icon={CalendarIcon}
            label="Dernière mise à jour"
            value={formatDate(user.updatedAt)}
          />
        </div>
      </section>
    </>
  )
}
