import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Marks a route (or controller) as public, so the globally-registered
 * {@link AuthGuard} lets the request through without a valid JWT.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
