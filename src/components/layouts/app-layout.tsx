import { NavLink, Outlet, useLocation } from "react-router-dom"
import {
  LayoutDashboardIcon,
  TicketIcon,
  UsersIcon,
  FileTextIcon,
  BarChart3Icon,
  WalletIcon,
  LogOutIcon,
} from "lucide-react"
import { useAuth } from "@/hooks"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboardIcon },
  { to: "/tickets", label: "Support", icon: TicketIcon },
  { to: "/users", label: "Utilisateurs", icon: UsersIcon },
  { to: "/documents", label: "Documents", icon: FileTextIcon },
  { to: "/performance", label: "Performance", icon: BarChart3Icon },
  { to: "/finance", label: "Finances", icon: WalletIcon },
]

export function AppLayout() {
  const { user, logout } = useAuth()
  const { pathname } = useLocation()

  const currentPage = NAV_ITEMS.find((item) =>
    item.to === "/" ? pathname === "/" : pathname.startsWith(item.to)
  )

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-6">
          <img
            src="/icon.png"
            alt="BeepBeepCity"
            className="h-16 w-auto object-contain"
          />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {NAV_ITEMS.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      asChild
                      isActive={false}
                      size="lg"
                    >
                      <NavLink to={item.to} end>
                        {({ isActive }) => (
                          <>
                            <span
                              className={`inline-flex items-center justify-center rounded-md p-1.5 ${
                                isActive
                                  ? "bg-primary text-primary-foreground"
                                  : ""
                              }`}
                            >
                              <item.icon className="size-5" />
                            </span>
                            <span
                              className={
                                isActive ? "font-semibold" : ""
                              }
                            >
                              {item.label}
                            </span>
                          </>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <div className="text-sm">
            <span className="truncate font-medium">
              {user?.firstname} {user?.lastname}
            </span>
            {user?.email && (
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b px-6">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">
            {currentPage?.label ?? "Dashboard"}
          </h1>
          <div className="ml-auto">
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={logout}
            >
              <LogOutIcon className="mr-2 size-4" />
              Déconnexion
            </Button>
          </div>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
