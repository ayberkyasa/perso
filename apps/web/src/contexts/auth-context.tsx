import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"
import type { UserResponse } from "@perso/shared"
import { api } from "@/lib/api"

interface AuthContextType {
  user: UserResponse | null
  token: string | null
  login: (token: string, user: UserResponse) => void
  logout: () => void
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

const TOKEN_KEY = "perso_token"
const USER_KEY = "perso_user"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(() => {
    const storedUser = localStorage.getItem(USER_KEY)
    return storedUser ? JSON.parse(storedUser) : null
  })
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY),
  )
  const [isLoading, setIsLoading] = useState(() => {
    return !!localStorage.getItem(TOKEN_KEY)
  })

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY)

    if (storedToken) {
      void api
        .get<UserResponse>("/auth/me", storedToken)
        .then((freshUser) => {
          setUser(freshUser)
          localStorage.setItem(USER_KEY, JSON.stringify(freshUser))
        })
        .catch(() => {
          localStorage.removeItem(TOKEN_KEY)
          localStorage.removeItem(USER_KEY)
          setToken(null)
          setUser(null)
        })
        .finally(() => setIsLoading(false))
    }
  }, [])

  const login = (newToken: string, newUser: UserResponse) => {
    localStorage.setItem(TOKEN_KEY, newToken)
    localStorage.setItem(USER_KEY, JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

