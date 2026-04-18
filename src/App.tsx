import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Toaster, TooltipProvider } from "@/components/ui"
import { AuthGuard } from "@/components/guards"
import { ErrorBoundary } from "@/components/shared/error-boundary"
import { AuthProvider } from "@/components/providers"
import { AppLayout } from "@/components/layouts"
import {
  LoginPage,
  ForgotPasswordPage,
  DashboardPage,
  TicketsPage,
  TicketDetailPage,
  UsersPage,
  UserDetailPage,
  DocumentsPage,
  PerformancePage,
  FinancePage,
} from "@/pages"

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route element={<ErrorBoundary><AuthGuard /></ErrorBoundary>}>
              <Route element={<AppLayout />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/tickets" element={<TicketsPage />} />
                <Route path="/tickets/:id" element={<TicketDetailPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/users/:id" element={<UserDetailPage />} />
                <Route path="/documents" element={<DocumentsPage />} />
                <Route path="/performance" element={<PerformancePage />} />
                <Route path="/finance" element={<FinancePage />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster position="top-center" richColors />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
