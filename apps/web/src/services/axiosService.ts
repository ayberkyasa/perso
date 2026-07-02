import axios, { type AxiosResponse } from "axios"
import authService from "./authService"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Attach the JWT as a Bearer token on every request when the user is logged in.
axiosInstance.interceptors.request.use((config) => {
  const token = authService.getToken()
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`
  }
  return config
})

/** Normalized result of an API call, so callers never handle raw errors. */
export interface ApiResponse<T = unknown> {
  success: boolean
  data: T | null
  error: string | null
  status: number | null
}

/** NestJS error payloads: `{ message: string | string[], error, statusCode }`. */
interface NestErrorBody {
  message?: string | string[]
}

function formatErrorMessage(data: unknown): string {
  if (data && typeof data === "object" && "message" in data) {
    const { message } = data as NestErrorBody
    if (Array.isArray(message)) {
      return message.join("\n")
    }
    if (typeof message === "string") {
      return message
    }
  }
  return "Something went wrong."
}

/**
 * Wraps an axios call and returns a normalized {@link ApiResponse}, turning
 * thrown errors into a formatted message instead of a rejected promise.
 */
export async function baseApiRequest<T = unknown>(
  requestFn: () => Promise<AxiosResponse<T>>
): Promise<ApiResponse<T>> {
  const response: ApiResponse<T> = {
    success: true,
    data: null,
    error: null,
    status: null,
  }

  try {
    const { data, status } = await requestFn()
    response.data = data
    response.status = status
  } catch (error) {
    response.success = false
    if (axios.isAxiosError(error)) {
      response.error = formatErrorMessage(error.response?.data)
      response.status = error.response?.status ?? null
    } else {
      response.error = "Something went wrong."
    }
  }

  return response
}

export default axiosInstance
