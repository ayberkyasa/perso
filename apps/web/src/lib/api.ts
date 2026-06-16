const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

export class ApiError extends Error {
  status: number
  data?: unknown

  constructor(message: string, status: number, data?: unknown) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.data = data
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new ApiError(
      data.message || "An error occurred",
      response.status,
      data,
    )
  }
  return response.json()
}

export const api = {
  async get<T>(path: string, token?: string): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: "GET",
      headers,
    })
    return handleResponse<T>(response)
  },

  async post<T>(path: string, body: unknown, token?: string): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
    return handleResponse<T>(response)
  },
}
