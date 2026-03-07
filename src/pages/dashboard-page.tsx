import { useAuth } from "@/hooks"
import { Button } from "@/components"

export function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <div className="flex min-h-svh flex-col p-6 md:p-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={logout}>
          Se déconnecter
        </Button>
      </div>
      <div className="mt-8">
        <p className="text-muted-foreground">
          Bienvenue{user?.firstname ? `, ${user.firstname}` : ""} !
        </p>
      </div>
    </div>
  )
}
