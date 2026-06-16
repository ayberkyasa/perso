import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"

export function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <div className="flex min-h-svh flex-col p-6">
      <header className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            P
          </div>
          <h1 className="text-xl font-semibold">Perso Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <span className="text-muted-foreground">Logged in as </span>
            <span className="font-medium">{user?.email}</span>
          </div>
          <Button variant="outline" size="sm" onClick={logout}>
            Logout
          </Button>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Welcome to Perso!</h2>
          <p className="mt-2 text-muted-foreground">
            Your personal dashboard is ready to be built.
          </p>
        </div>
      </main>
    </div>
  )
}
