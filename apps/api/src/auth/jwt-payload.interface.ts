import { UserRole } from '@perso/shared';

/**
 * Claims encoded in the access-token JWT. `sub` holds the user id, following
 * the JWT convention for the subject claim.
 */
export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}
