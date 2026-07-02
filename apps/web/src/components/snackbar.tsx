import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSnackbarStore, type SnackbarColor } from "@/stores/snackbar"

const colorClasses: Record<SnackbarColor, string> = {
  success: "bg-green-600 text-white",
  error: "bg-red-600 text-white",
  warning: "bg-yellow-600 text-white",
  info: "bg-blue-600 text-white",
}

/** Global toast bound to the snackbar store; render once at the app root. */
export function Snackbar() {
  const show = useSnackbarStore((s) => s.show)
  const color = useSnackbarStore((s) => s.color)
  const message = useSnackbarStore((s) => s.message)
  const hideMessage = useSnackbarStore((s) => s.hideMessage)

  if (!show) {
    return null
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed top-4 right-4 z-[9999] flex items-center gap-3 rounded-md px-4 py-3 shadow-lg",
        colorClasses[color]
      )}
    >
      <span className="text-sm whitespace-pre-line">{message}</span>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={hideMessage}
        className="rounded p-1 hover:bg-white/20"
      >
        <X className="size-4" />
      </button>
    </div>
  )
}
