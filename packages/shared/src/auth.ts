import type { AuthUser } from './user';

/** Payload for creating a new account via `POST /auth/register`. */
export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

/** Payload for authenticating an existing account via `POST /auth/login`. */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Response returned by the register and login endpoints. The `accessToken` is
 * a JWT the client sends as a `Bearer` token in the `Authorization` header on
 * subsequent requests.
 */
export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}
