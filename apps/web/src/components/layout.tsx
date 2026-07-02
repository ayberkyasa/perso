import { Outlet } from "react-router"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores/auth"

/** Authenticated app shell: a header with the current user and logout. */
export function Layout() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex h-14 shrink-0 items-center justify-between border-b px-4">
        <span className="font-semibold">Perso</span>
        <div className="flex items-center gap-3">
          {user && (
            <span className="text-muted-foreground text-sm">{user.email}</span>
          )}
          <Button variant="outline" size="sm" onClick={logout}>
            Log out
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
