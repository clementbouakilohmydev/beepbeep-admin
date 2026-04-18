import type { GetUserQuery } from "@/gql/generated"

type User = NonNullable<GetUserQuery["user"]>

type UserSheetVehicleProps = {
  vehicule: NonNullable<User["vehicule"]>
}

export function UserSheetVehicle({ vehicule }: UserSheetVehicleProps) {
  return (
    <section>
      <h3 className="mb-2 text-sm font-semibold">Véhicule</h3>
      <div className="grid gap-3 rounded-lg border p-3 sm:grid-cols-2">
        <div>
          <p className="text-xs text-muted-foreground">Marque / Modèle</p>
          <p className="text-sm font-medium">
            {vehicule.brand} {vehicule.model}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Couleur</p>
          <p className="text-sm font-medium">{vehicule.color ?? "—"}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Immatriculation</p>
          <p className="text-sm font-medium">
            {vehicule.registration ?? "—"}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Pays</p>
          <p className="text-sm font-medium">{vehicule.country ?? "—"}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">
            Première mise en circulation
          </p>
          <p className="text-sm font-medium">
            {vehicule.firstYear
              ? new Date(vehicule.firstYear).getFullYear()
              : "—"}
          </p>
        </div>
      </div>
    </section>
  )
}
