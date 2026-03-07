import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Toaster, AuthGuard, AuthProvider } from "@/components"
import { LoginPage, ForgotPasswordPage, DashboardPage } from "@/pages"

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route element={<AuthGuard />}>
            <Route path="/" element={<DashboardPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-center" richColors />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
