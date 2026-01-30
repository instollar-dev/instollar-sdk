/**
 * Mobile storage: AsyncStorage-like and Expo SecureStore
 */

import { IStorage } from './storage';

export interface AsyncStorageLike {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}

export const createMobileStorage = (asyncStorage: AsyncStorageLike): IStorage => ({
  getItem: (key) => asyncStorage.getItem(key),
  setItem: (key, value) => asyncStorage.setItem(key, value),
  removeItem: (key) => asyncStorage.removeItem(key),
  clear: () => asyncStorage.clear(),
});

export const createExpoSecureStorage = (): IStorage => {
  // Dynamic require so expo-secure-store is optional for web-only builds
  const SecureStore = require('expo-secure-store') as {
    getItemAsync: (key: string) => Promise<string | null>;
    setItemAsync: (key: string, value: string) => Promise<void>;
    deleteItemAsync: (key: string) => Promise<void>;
  };
  return {
    getItem: async (key: string) => {
      try {
        return await SecureStore.getItemAsync(key);
      } catch {
        return null;
      }
    },
    setItem: async (key: string, value: string) => {
      await SecureStore.setItemAsync(key, value);
    },
    removeItem: async (key: string) => {
      await SecureStore.deleteItemAsync(key);
    },
    clear: async () => {
      throw new Error(
        '[instollar-sdk] SecureStore does not support clear(). Use removeFromStorage(key) for individual keys.'
      );
    },
  };
};

export default createMobileStorage;
