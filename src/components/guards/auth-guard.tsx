import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/hooks"
import { Skeleton } from "@/components/ui"

/**
 * Garde d'accès au back-office.
 *
 * Contrôle DEUX choses, pas une seule : être authentifié ne suffit pas, il
 * faut être administrateur.
 *
 * Avant ce correctif, seule l'authentification était vérifiée — n'importe quel
 * passager ou conducteur pouvait donc se connecter avec ses identifiants
 * d'application et parcourir le back-office. Les protections par champ et par
 * ligne côté Keystone limitaient les dégâts (ni email, ni téléphone, ni
 * finances, ni documents), mais la liste des utilisateurs restait lisible :
 * nom, prénom et rôle des 799 inscrits.
 *
 * Ce garde est une défense de CONFORT, pas la protection réelle : un client
 * web se contourne. La vraie barrière est côté serveur, dans les accesses
 * Keystone. Les deux sont nécessaires.
 */
export function AuthGuard() {
  const { isAuthenticated, isLoading, user } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center gap-4 p-6">
        <div className="w-64 space-y-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex-1 space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Skeleton className="h-28 rounded-lg" />
            <Skeleton className="h-28 rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Authentifié mais pas administrateur : compte d'application. On ne le
  // laisse pas entrer, et on le renvoie vers /login qui affichera le refus
  // (le token reste valide pour l'app mobile, on ne le purge pas).
  if (user?.isAdmin !== true) {
    return <Navigate to="/login" replace state={{ notAdmin: true }} />
  }

  return <Outlet />
}
