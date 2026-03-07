import { useParams, useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  ArrowLeftIcon,
  ShieldBanIcon,
  ShieldCheckIcon,
  StarIcon,
  PhoneIcon,
  MailIcon,
  CalendarIcon,
  CarIcon,
  HashIcon,
} from "lucide-react"
import { useGetUserQuery, useUpdateUserMutation } from "@/gql/generated"
import { useUpdateDocument } from "@/hooks"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Skeleton,
  Separator,
} from "@/components/ui"
import {
  UserTypeBadge,
  UserStatusBadge,
  DocumentCard,
  DocumentCardSkeleton,
} from "@/components"
import { formatDate } from "@/lib/format"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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
      <span className="ml-auto text-sm font-medium">{value ?? "—"}</span>
    </div>
  )
}

function RatingStars({ note }: { note: number | null | undefined }) {
  if (note == null) return <span className="text-muted-foreground">—</span>
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={`size-4 ${
            i < note
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium">{note}/5</span>
    </div>
  )
}

export function UserDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data, isLoading } = useGetUserQuery(
    { where: { id } },
    { enabled: !!id }
  )

  const user = data?.user

  const invalidateUser = () => {
    queryClient.invalidateQueries({ queryKey: ["GetUser"] })
    queryClient.invalidateQueries({ queryKey: ["GetUsers"] })
  }

  const { mutate: updateUser, isPending: isUpdatingUser } =
    useUpdateUserMutation({
      onSuccess: () => {
        invalidateUser()
        toast.success(
          user?.enabled ? "Utilisateur bloqué" : "Utilisateur débloqué"
        )
      },
      onError: () => toast.error("Erreur lors de la mise à jour"),
    })

  const dl = useUpdateDocument("drivingLicense")
  const ins = useUpdateDocument("insurance")
  const rd = useUpdateDocument("registrationDocument")
  const cert = useUpdateDocument("certificate")

  const isValidatingDoc =
    dl.isPending || ins.isPending || rd.isPending || cert.isPending

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DocumentCardSkeleton />
          <DocumentCardSkeleton />
          <DocumentCardSkeleton />
          <DocumentCardSkeleton />
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/users")}>
          <ArrowLeftIcon className="mr-2 size-4" />
          Retour
        </Button>
        <p className="text-muted-foreground">Utilisateur introuvable.</p>
      </div>
    )
  }

  const isDriver = user.type === "driver"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/users")}
          >
            <ArrowLeftIcon className="size-4" />
          </Button>
          <div className="flex items-center gap-3">
            {user.avatar?.url ? (
              <img
                src={user.avatar.url}
                alt="Avatar"
                className="size-12 rounded-full object-cover"
              />
            ) : (
              <div className="flex size-12 items-center justify-center rounded-full bg-muted text-lg font-bold text-muted-foreground">
                {(user.firstname?.[0] ?? "").toUpperCase()}
                {(user.lastname?.[0] ?? "").toUpperCase()}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold">
                {user.firstname} {user.lastname}
              </h1>
              <div className="mt-1 flex items-center gap-2">
                <UserTypeBadge type={user.type} />
                <UserStatusBadge enabled={user.enabled} />
              </div>
            </div>
          </div>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant={user.enabled ? "outline" : "default"}
              disabled={isUpdatingUser}
            >
              {user.enabled ? (
                <>
                  <ShieldBanIcon className="mr-2 size-4" />
                  Bloquer
                </>
              ) : (
                <>
                  <ShieldCheckIcon className="mr-2 size-4" />
                  Débloquer
                </>
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {user.enabled ? "Bloquer" : "Débloquer"} cet utilisateur ?
              </AlertDialogTitle>
              <AlertDialogDescription>
                {user.enabled
                  ? `${user.firstname} ${user.lastname} ne pourra plus accéder à la plateforme.`
                  : `${user.firstname} ${user.lastname} pourra à nouveau accéder à la plateforme.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  updateUser({
                    where: { id: user.id },
                    data: { enabled: !user.enabled },
                  })
                }
              >
                Confirmer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Info cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal info */}
        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
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
                  ? new Date(user.birthdayDatetimeUtc).toLocaleDateString(
                      "fr-FR"
                    )
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
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Statistiques</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
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
          </CardContent>
        </Card>
      </div>

      {/* Vehicle (driver only) */}
      {isDriver && user.vehicule && (
        <div>
          <h2 className="mb-3 text-lg font-semibold">Véhicule</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Marque / Modèle
                  </p>
                  <p className="font-medium">
                    {user.vehicule.brand} {user.vehicule.model}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Couleur</p>
                  <p className="font-medium">{user.vehicule.color ?? "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Immatriculation
                  </p>
                  <p className="font-medium">
                    {user.vehicule.registration ?? "—"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pays</p>
                  <p className="font-medium">{user.vehicule.country ?? "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Première mise en circulation
                  </p>
                  <p className="font-medium">
                    {user.vehicule.firstYear
                      ? new Date(user.vehicule.firstYear).getFullYear()
                      : "—"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Documents (driver only) */}
      {isDriver && (
        <div>
          <h2 className="mb-3 text-lg font-semibold">Documents</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DocumentCard
              title="Permis de conduire"
              state={user.drivingLicense?.state}
              pictureUrl={user.drivingLicense?.picture?.url}
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
              pictureUrl={user.insurance?.picture?.url}
              createdAt={user.insurance?.createdAt}
              updatedAt={user.insurance?.updatedAt}
              isValidating={isValidatingDoc}
              extra={
                user.insurance ? (
                  <div className="text-xs text-muted-foreground">
                    {user.insurance.expirationDatetimeUtc && (
                      <p>
                        Expire le{" "}
                        {new Date(
                          user.insurance.expirationDatetimeUtc
                        ).toLocaleDateString("fr-FR")}
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
              pictureUrl={user.registrationDocument?.picture?.url}
              createdAt={user.registrationDocument?.createdAt}
              updatedAt={user.registrationDocument?.updatedAt}
              isValidating={isValidatingDoc}
              onValidate={
                user.registrationDocument
                  ? () => rd.validate(user.registrationDocument!.id)
                  : undefined
              }
              onReject={
                user.registrationDocument
                  ? () => rd.reject(user.registrationDocument!.id)
                  : undefined
              }
            />

            <DocumentCard
              title="Certificat"
              state={user.certificate?.state}
              pictureUrl={user.certificate?.picture?.url}
              createdAt={user.certificate?.createdAt}
              updatedAt={user.certificate?.updatedAt}
              isValidating={isValidatingDoc}
              extra={
                user.certificate ? (
                  <div className="text-xs text-muted-foreground">
                    {user.certificate.registrationDatetime && (
                      <p>
                        Enregistré le{" "}
                        {new Date(
                          user.certificate.registrationDatetime
                        ).toLocaleDateString("fr-FR")}
                      </p>
                    )}
                    {user.certificate.expirationDatetime && (
                      <p>
                        Expire le{" "}
                        {new Date(
                          user.certificate.expirationDatetime
                        ).toLocaleDateString("fr-FR")}
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
        </div>
      )}

      {/* Ratings */}
      {(user.ratingsCount ?? 0) > 0 && user.ratings?.length ? (
        <div>
          <h2 className="mb-3 text-lg font-semibold">
            Avis reçus ({user.ratingsCount})
          </h2>
          <div className="grid gap-3">
            {user.ratings.map((rating) => (
              <Card key={rating.id}>
                <CardContent className="flex items-start gap-4 pt-6">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">
                        {rating.user?.firstname} {rating.user?.lastname}
                      </p>
                      <RatingStars note={rating.note} />
                    </div>
                    {rating.message && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {rating.message}
                      </p>
                    )}
                    {rating.tags && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {rating.tags.split(",").map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag.trim()}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <p className="mt-2 text-xs text-muted-foreground">
                      {formatDate(rating.createdAt)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
