/**
 * instollar-sdk – Cross-platform SDK for React and React Native
 *
 * @example Web:
 * ```ts
 * import { initStorage, createWebStorage, initAxios, api } from 'instollar-sdk';
 * initStorage(createWebStorage());
 * initAxios({ baseUrl: 'https://api.example.com', onAuthError: () => { /* logout *\/ } });
 * const res = await api.get('/users/me');
 * ```
 *
 * @example React Native:
 * ```ts
 * import { initStorage, createMobileStorage, initAxios, api } from 'instollar-sdk';
 * import AsyncStorage from '@react-native-async-storage/async-storage';
 * initStorage(createMobileStorage(AsyncStorage));
 * initAxios({ baseUrl: 'https://api.example.com', onAuthError: () => { /* navigate to login *\/ } });
 * const res = await api.get('/users/me');
 * ```
 *
 * @example Auto-detect platform:
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
  createMobileStorage,
  createExpoSecureStorage,
  detectPlatform,
  isWeb,
  isMobile,
} from './core/storage';
export type { IStorage, AsyncStorageLike } from './core/storage';

// API
export { initAxios, getSDKConfig, getAxiosInstance, api } from './core/api';
export * from './core/api/api-endpoints';

// Types
export type {
  TokenData,
  RefreshTokenModel,
  GeneralResponseModel,
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
export type { ToastType, ToastOptions } from './core/toast';
