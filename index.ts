/**
 * instollar-sdk – SDK for React (web) and Expo apps
 *
 * @example Web:
 * ```ts
 * import { initStorage, createWebStorage, initAxios, api } from 'instollar-sdk';
 * initStorage(createWebStorage());
 * initAxios({ baseUrl: 'https://api.example.com', onAuthError: () => { /* logout *\/ } });
 * const res = await api.get('/users/me');
 * ```
 *
 * @example Expo:
 * ```ts
 * import { initStorage, createExpoSecureStorage, initAxios, api } from 'instollar-sdk';
 * initStorage(createExpoSecureStorage());
 * initAxios({ baseUrl: 'https://api.example.com', onAuthError: () => { /* navigate to login *\/ } });
 * const res = await api.get('/users/me');
 * ```
 *
 * @example Auto-detect platform (web → localStorage, Expo → SecureStore):
 * ```ts
 * import { initStorageAuto, initAxios, api } from 'instollar-sdk';
 * initStorageAuto();
 * initAxios({ baseUrl: 'https://api.example.com' });
 * ```
 */

// Storage
export {
  StorageKeys,
  initStorage,
  initStorageAuto,
  getStorage,
  isStorageInitialized,
  getFromStorage,
  saveToStorage,
  removeFromStorage,
  clearStorage,
  createWebStorage,
  createExpoSecureStorage,
  detectPlatform,
  isWeb,
  isMobile,
} from './core/storage';
export type { IStorage } from './core/storage';

// API
export { initAxios, getSDKConfig, getAxiosInstance, api } from './core/api';
export * from './core/api/api-endpoints';

// Types
export type {
  TokenData,
  RefreshTokenModel,
  GeneralResponseModel,
  SortOrder,
  PaginationMeta,
  ApiResponse,
  ServerError,
  ApiError,
  ApiRequestMetadata,
  CustomAxiosRequestConfig,
  CustomInternalAxiosRequestConfig,
  InstollarSDKConfig,
  Platform,
} from './core/types';

// Toast
export { toast } from './core/toast';
export type { ToastType, ToastOptions } from './core/types';
