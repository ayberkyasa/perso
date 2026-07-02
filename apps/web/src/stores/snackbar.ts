import { create } from "zustand"

export type SnackbarColor = "success" | "error" | "warning" | "info"

interface SnackbarState {
  show: boolean
  color: SnackbarColor
  message: string
  showMessage: (message: string, color?: SnackbarColor) => void
  hideMessage: () => void
}

// Timer id for auto-hiding the snackbar after a delay.
let hideTimer: number | undefined

export const useSnackbarStore = create<SnackbarState>((set) => ({
  show: false,
  color: "success",
  message: "",
  showMessage: (message, color = "success") => {
    if (hideTimer !== undefined) {
      clearTimeout(hideTimer)
    }
    set({ show: true, color, message })
    hideTimer = window.setTimeout(() => {
      set({ show: false })
      hideTimer = undefined
    }, 3000)
  },
  hideMessage: () => {
    if (hideTimer !== undefined) {
      clearTimeout(hideTimer)
      hideTimer = undefined
    }
    set({ show: false })
  },
}))
