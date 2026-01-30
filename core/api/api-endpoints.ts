/**
 * API endpoint constants for instollar-sdk
 * Extend with your backend routes as needed.
 */

// Auth
export const loginEndpoint = '/auth/login';
export const refreshTokenEndpoint = '/auth/refresh';
export const logoutEndpoint = '/auth/logout';

// User (example - adjust paths to match your API)
export const getCurrentUserEndpoint = '/users/me';
export const updateUserEndpoint = (userId: string) => `/users/${userId}`;
