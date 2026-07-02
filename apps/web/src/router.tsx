import { useEffect } from "react"
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router"
import { Layout } from "@/components/layout"
import { Snackbar } from "@/components/snackbar"
import LoginPage from "@/pages/Login"
import SignUpPage from "@/pages/SignUp"
import DashboardPage from "@/pages/Dashboard"
import { useAuthStore } from "@/stores/auth"

/** Gates the app shell behind authentication. */
function Protected() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return <Layout />
}

/** Keeps authenticated users away from the login/signup pages. */
function PublicOnly() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }
  return <Outlet />
}

export function AppRouter() {
  const initialize = useAuthStore((s) => s.initialize)

  // Rehydrate the user from the stored token on first load.
  useEffect(() => {
    void initialize()
  }, [initialize])

  return (
    <BrowserRouter>
      <Snackbar />
      <Routes>
        <Route element={<PublicOnly />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
        <Route path="/" element={<Protected />}>
          <Route index element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
