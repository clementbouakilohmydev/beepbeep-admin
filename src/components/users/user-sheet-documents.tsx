import type { MappedUser } from "@/lib/mappers"
import type { useUpdateDocument } from "@/hooks"
import { Badge } from "@/components/ui"
import { formatShortDate } from "@/lib/format"
import { DocumentCard } from "./document-card"

type DocumentHook = ReturnType<typeof useUpdateDocument>

type UserSheetDocumentsProps = {
  user: MappedUser
  dl: DocumentHook
  ins: DocumentHook
  rd: DocumentHook
  cert: DocumentHook
  isValidatingDoc: boolean
}

export function UserSheetDocuments({
  user,
  dl,
  ins,
  rd,
  cert,
  isValidatingDoc,
}: UserSheetDocumentsProps) {
  return (
    <section>
      <h3 className="mb-2 text-sm font-semibold">Documents</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <DocumentCard
          title="Permis de conduire"
          state={user.drivingLicense?.state}
          pictureUrl={user.drivingLicense?.picture?.uri}
          createdAt={user.drivingLicense?.createdAt}
          updatedAt={user.drivingLicense?.updatedAt}
          isValidating={isValidatingDoc}
          extra={
            user.drivingLicense?.obtentionYear != null ? (
              <p className="text-xs text-muted-foreground">
                Obtenu en {user.drivingLicense.obtentionYear}
              </p>
            ) : null
          }
          onValidate={
            user.drivingLicense
              ? () => dl.validate(user.drivingLicense!.id)
              : undefined
          }
          onReject={
            user.drivingLicense
              ? () => dl.reject(user.drivingLicense!.id)
              : undefined
          }
        />
        <DocumentCard
          title="Assurance"
          state={user.insurance?.state}
          pictureUrl={user.insurance?.picture?.uri}
          createdAt={user.insurance?.createdAt}
          updatedAt={user.insurance?.updatedAt}
          isValidating={isValidatingDoc}
          extra={
            user.insurance ? (
              <div className="text-xs text-muted-foreground">
                {user.insurance.expirationDatetimeUtc && (
                  <p>
                    Expire le{" "}
                    {formatShortDate(user.insurance.expirationDatetimeUtc)}
                  </p>
                )}
                {user.insurance.isExpired && (
                  <Badge
                    variant="secondary"
                    className="mt-1 bg-destructive/10 text-destructive"
                  >
                    Expirée
                  </Badge>
                )}
              </div>
            ) : null
          }
          onValidate={
            user.insurance
              ? () => ins.validate(user.insurance!.id)
              : undefined
          }
          onReject={
            user.insurance
              ? () => ins.reject(user.insurance!.id)
              : undefined
          }
        />
        <DocumentCard
          title="Carte grise"
          state={user.registrationDocument?.state}
          pictureUrl={user.registrationDocument?.picture?.uri}
          createdAt={user.registrationDocument?.createdAt}
          updatedAt={user.registrationDocument?.updatedAt}
          isValidating={isValidatingDoc}
          onValidate={
            user.registrationDocument
              ? () =>
                  rd.validate(user.registrationDocument!.id)
              : undefined
          }
          onReject={
            user.registrationDocument
              ? () =>
                  rd.reject(user.registrationDocument!.id)
              : undefined
          }
        />
        <DocumentCard
          title="Certificat"
          state={user.certificate?.state}
          pictureUrl={user.certificate?.picture?.uri}
          createdAt={user.certificate?.createdAt}
          updatedAt={user.certificate?.updatedAt}
          isValidating={isValidatingDoc}
          extra={
            user.certificate ? (
              <div className="text-xs text-muted-foreground">
                {user.certificate.registrationDatetime && (
                  <p>
                    Enregistré le{" "}
                    {formatShortDate(user.certificate.registrationDatetime)}
                  </p>
                )}
                {user.certificate.expirationDatetime && (
                  <p>
                    Expire le{" "}
                    {formatShortDate(user.certificate.expirationDatetime)}
                  </p>
                )}
              </div>
            ) : null
          }
          onValidate={
            user.certificate
              ? () => cert.validate(user.certificate!.id)
              : undefined
          }
          onReject={
            user.certificate
              ? () => cert.reject(user.certificate!.id)
              : undefined
          }
        />
      </div>
    </section>
  )
}
