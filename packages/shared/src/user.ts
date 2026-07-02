/**
 * How a user's account is authenticated. `local` is an email + password
 * account stored in Perso itself; further providers (e.g. OIDC/SSO) can be
 * added later without changing the local flow.
 */
export enum AuthProvider {
  Local = 'local',
}

/**
 * A user's privilege level within a Perso instance. The first account created
 * on a fresh instance becomes the `owner`; everyone else is a `member`.
 */
export enum UserRole {
  Owner = 'owner',
  Member = 'member',
}

/**
 * The public shape of a user as returned by the API. Never includes secrets
 * such as the password hash.
 */
export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  role: UserRole;
  authProvider: AuthProvider;
}
