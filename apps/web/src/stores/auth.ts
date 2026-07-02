import type {
  AuthResponse,
  AuthUser,
  LoginRequest,
  RegisterRequest,
} from "@perso/shared"
import { create } from "zustand"
import authService from "@/services/authService"
import axiosInstance, {
  baseApiRequest,
  type ApiResponse,
} from "@/services/axiosService"

type State = {
  user: AuthUser | null
  isAuthenticated: boolean
}

type Actions = {
  login: (credentials: LoginRequest) => Promise<ApiResponse<AuthResponse>>
  register: (
    credentials: RegisterRequest
  ) => Promise<ApiResponse<AuthResponse>>
  getUser: () => Promise<void>
  initialize: () => Promise<void>
  logout: () => void
  setAuth: (data: AuthResponse) => void
  setUser: (user: AuthUser) => void
  purgeAuth: () => void
}

export const useAuthStore = create<State & Actions>((set, get) => ({
  user: null,
  isAuthenticated: authService.isLogged(),

  async login(credentials) {
    const response = await baseApiRequest<AuthResponse>(() =>
      axiosInstance.post("/auth/login", credentials)
    )
    if (response.success && response.data) {
      get().setAuth(response.data)
    }
    return response
  },

  async register(credentials) {
    const response = await baseApiRequest<AuthResponse>(() =>
      axiosInstance.post("/auth/register", credentials)
    )
    if (response.success && response.data) {
      get().setAuth(response.data)
    }
    return response
  },

  async getUser() {
    if (!get().isAuthenticated) {
      get().purgeAuth()
      return
    }
    const response = await baseApiRequest<AuthUser>(() =>
      axiosInstance.get("/auth/me")
    )
    if (response.success && response.data) {
      get().setUser(response.data)
    } else {
      get().purgeAuth()
    }
  },

  async initialize() {
    // Rehydrate the user after a reload when only the token is present.
    if (get().isAuthenticated && !get().user) {
      await get().getUser()
    }
  },

  logout() {
    // JWTs are stateless, so there is no server call — just drop the token.
    get().purgeAuth()
  },

  setAuth(data) {
    authService.setToken(data.accessToken)
    set({ isAuthenticated: true, user: data.user })
  },

  setUser(user) {
    set({ isAuthenticated: true, user })
  },

  purgeAuth() {
    authService.removeToken()
    set({ isAuthenticated: false, user: null })
  },
}))
