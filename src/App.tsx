import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import {
  Toaster,
  AuthGuard,
  AuthProvider,
  AppLayout,
  TooltipProvider,
} from "@/components"
import {
  LoginPage,
  ForgotPasswordPage,
  DashboardPage,
  TicketsPage,
  TicketDetailPage,
} from "@/pages"

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route element={<AuthGuard />}>
              <Route element={<AppLayout />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/tickets" element={<TicketsPage />} />
                <Route path="/tickets/:id" element={<TicketDetailPage />} />
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
