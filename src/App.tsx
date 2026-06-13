import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Toaster, TooltipProvider } from "@/components/ui"
import { AuthGuard } from "@/components/guards"
import { ErrorBoundary } from "@/components/shared/error-boundary"
import { AuthProvider } from "@/components/providers"
import { AppLayout } from "@/components/layouts"
import { LoginPage, ForgotPasswordPage, DashboardPage } from "@/pages"

// Code-splitting des pages lourdes : DataTable + recharts + Stripe-like
// libs faisaient un bundle 1.2 MB. On garde Login + Dashboard en sync
// (premier écran après auth) et on lazy-load le reste — chaque route
// devient son propre chunk, chargé à la 1re navigation.
const TicketsPage = lazy(() =>
  import("@/pages/tickets-page").then((m) => ({ default: m.TicketsPage }))
)
const TicketDetailPage = lazy(() =>
  import("@/pages/ticket-detail-page").then((m) => ({
    default: m.TicketDetailPage,
  }))
)
const TicketSubjectsPage = lazy(() =>
  import("@/pages/ticket-subjects-page").then((m) => ({
    default: m.TicketSubjectsPage,
  }))
)
const LegalPagesPage = lazy(() =>
  import("@/pages/legal-pages-page").then((m) => ({
    default: m.LegalPagesPage,
  }))
)
const LegalPageEditPage = lazy(() =>
  import("@/pages/legal-page-edit-page").then((m) => ({
    default: m.LegalPageEditPage,
  }))
)
const PublicLegalPage = lazy(() =>
  import("@/pages/public-legal-page").then((m) => ({
    default: m.PublicLegalPage,
  }))
)
const UsersPage = lazy(() =>
  import("@/pages/users-page").then((m) => ({ default: m.UsersPage }))
)
const UserDetailPage = lazy(() =>
  import("@/pages/user-detail-page").then((m) => ({
    default: m.UserDetailPage,
  }))
)
const DocumentsPage = lazy(() =>
  import("@/pages/documents-page").then((m) => ({ default: m.DocumentsPage }))
)
const PerformancePage = lazy(() =>
  import("@/pages/performance-page").then((m) => ({
    default: m.PerformancePage,
  }))
)
const FinancePage = lazy(() =>
  import("@/pages/finance-page").then((m) => ({ default: m.FinancePage }))
)

function PageFallback() {
  // Skeleton minimal — chaque page rend ses propres skeletons une fois
  // chargée, donc ce fallback est juste un placeholder le temps du fetch
  // du chunk JS (typiquement 100-300ms).
  return (
    <div className="flex h-[60vh] items-center justify-center text-muted-foreground">
      Chargement…
    </div>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/public/legal/:slug"
              element={
                <Suspense fallback={<PageFallback />}>
                  <PublicLegalPage />
                </Suspense>
              }
            />
            <Route
              element={
                <ErrorBoundary>
                  <AuthGuard />
                </ErrorBoundary>
              }
            >
              <Route element={<AppLayout />}>
                <Route path="/" element={<DashboardPage />} />
                <Route
                  path="/tickets"
                  element={
                    <Suspense fallback={<PageFallback />}>
                      <TicketsPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/tickets/:id"
                  element={
                    <Suspense fallback={<PageFallback />}>
                      <TicketDetailPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/ticket-subjects"
                  element={
                    <Suspense fallback={<PageFallback />}>
                      <TicketSubjectsPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/legal-pages"
                  element={
                    <Suspense fallback={<PageFallback />}>
                      <LegalPagesPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/legal-pages/:slug"
                  element={
                    <Suspense fallback={<PageFallback />}>
                      <LegalPageEditPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <Suspense fallback={<PageFallback />}>
                      <UsersPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/users/:id"
                  element={
                    <Suspense fallback={<PageFallback />}>
                      <UserDetailPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/documents"
                  element={
                    <Suspense fallback={<PageFallback />}>
                      <DocumentsPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/performance"
                  element={
                    <Suspense fallback={<PageFallback />}>
                      <PerformancePage />
                    </Suspense>
                  }
                />
                <Route
                  path="/finance"
                  element={
                    <Suspense fallback={<PageFallback />}>
                      <FinancePage />
                    </Suspense>
                  }
                />
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
