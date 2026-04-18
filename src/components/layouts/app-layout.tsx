import { NavLink, Outlet } from "react-router-dom"
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
import { Separator } from "@/components/ui/separator"

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboardIcon },
  { to: "/tickets", label: "Tickets", icon: TicketIcon },
  { to: "/users", label: "Utilisateurs", icon: UsersIcon },
  { to: "/documents", label: "Documents", icon: FileTextIcon },
  { to: "/performance", label: "Performance", icon: BarChart3Icon },
  { to: "/finance", label: "Finances", icon: WalletIcon },
]

export function AppLayout() {
  const { user, logout } = useAuth()

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <img src="/icon.png" alt="BeepBeepCity" className="h-8" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {NAV_ITEMS.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.to}
                        end={item.to === "/"}
                        className={({ isActive }) =>
                          isActive ? "bg-primary/10 text-primary" : ""
                        }
                      >
                        <item.icon className="size-4" />
                        <span>{item.label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex min-w-0 flex-1 flex-col text-sm">
              <span className="truncate font-medium">
                {user?.firstname} {user?.lastname}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {user?.email}
              </span>
            </div>
            <button
              onClick={logout}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <LogOutIcon className="size-4" />
            </button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-6">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
