/**
 * Axios instance for instollar-sdk
 * Handles auth, token refresh, and errors for React & React Native
 */

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { getFromStorage, saveToStorage, StorageKeys } from '../storage';
import { isMobile } from '../storage/platform-detection';
import { toast } from '../toast';
import {
  ApiError,
  CustomInternalAxiosRequestConfig,
  GeneralResponseModel,
  RefreshTokenModel,
  ServerError,
  TokenData,
  InstollarSDKConfig,
} from '../types';
import { refreshTokenEndpoint } from './api-endpoints';

let sdkConfig: InstollarSDKConfig | null = null;
let axiosInstance: AxiosInstance | null = null;
let refreshAxiosInstance: AxiosInstance | null = null;
let isRefreshing = false;
const pending: Array<{
  resolve: (v: unknown) => void;
  reject: (r?: unknown) => void;
  config: CustomInternalAxiosRequestConfig;
}> = [];

const removeEmpty = (obj: unknown): unknown => {
  if (obj == null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(removeEmpty).filter((x) => x != null && x !== '');
  return Object.fromEntries(
    Object.entries(obj as Record<string, unknown>)
      .filter(([, v]) => v !== null && v !== '')
      .map(([k, v]) => [k, typeof v === 'object' ? removeEmpty(v) : v])
  );
};

const getServerMessage = (error: AxiosError<ServerError>): string | null => {
  const data = error.response?.data;
  if (!data) return null;
  const errs = data.errors;
  if (Array.isArray(errs) && errs.length) return errs[0];
  if (typeof errs === 'string') return errs;
  return data.message ?? null;
};

const getErrorMessage = (error: AxiosError<ServerError>): string => {
  if (error.response) {
    const statusMessages: Record<number, string> = {
      400: 'Bad request. Please try again.',
      401: 'Unauthorized. Please sign in again.',
      403: 'Access denied.',
      404: 'Not found.',
      429: 'Too many requests. Try again later.',
      500: 'Server error. Try again later.',
      502: 'Service temporarily unavailable.',
      504: 'Request timed out.',
    };
    const server = getServerMessage(error);
    const status = error.response.status;
    return server ?? statusMessages[status] ?? 'Something went wrong. Please try again.';
  }
  if (error.request) return "No response from server. Please try again.";
  return error.message || 'Something went wrong. Please try again.';
};

const createCleanError = (error: AxiosError<ServerError>, message: string): ApiError => {
  const out = error as unknown as ApiError;
  out.message = message;
  if (isMobile()) {
    try {
      (out as Error).stack = undefined;
    } catch {
      /* no-op */
    }
  }
  return out;
};

const triggerRefresh = async (): Promise<string | null | undefined> => {
  const config = getSDKConfig();
  const tokenData = await getFromStorage<TokenData>(StorageKeys.TOKEN_DATA);
  if (!tokenData?.refreshToken) throw new Error('Please sign in again.');
  const res = await refreshAxiosInstance!.post<GeneralResponseModel<RefreshTokenModel>>(
    refreshTokenEndpoint,
    { refreshToken: tokenData.refreshToken },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenData.token}`,
      },
    }
  );
  const newData: TokenData = {
    token: res.data.data?.token,
    refreshToken: res.data.data?.refreshToken,
  };
  await saveToStorage(StorageKeys.TOKEN_DATA, newData);
  config.onTokenRefreshed?.(newData);
  return newData.token;
};

const flushPending = (newToken: string | null | undefined): void => {
  const instance = getAxiosInstance();
  pending.forEach(({ resolve, reject, config }) => {
    config.headers.Authorization = `Bearer ${newToken}`;
    instance.request(config).then(resolve).catch(reject);
  });
  pending.length = 0;
};

export const initAxios = (config: InstollarSDKConfig): void => {
  sdkConfig = config;
  axiosInstance = axios.create({
    baseURL: config.baseUrl,
    timeout: config.timeout ?? 30000,
    headers: config.defaultHeaders,
  });
  refreshAxiosInstance = axios.create({
    baseURL: config.baseUrl,
    timeout: config.refreshTokenTimeout ?? 20000,
  });

  axiosInstance.interceptors.request.use(
    async (cfg: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
      const c = cfg as CustomInternalAxiosRequestConfig;
      const tokenData = await getFromStorage<TokenData>(StorageKeys.TOKEN_DATA);
      if (tokenData?.token) c.headers.Authorization = `Bearer ${tokenData.token}`;
      if (!c.metadata) c.metadata = {};
      if (c.metadata.showErrorToast === undefined) c.metadata.showErrorToast = true;
      if (c.data && !(c.data instanceof FormData)) c.data = removeEmpty(c.data) as typeof c.data;
      if (c.params) c.params = removeEmpty(c.params) as typeof c.params;
      return c;
    },
    (err) => Promise.reject(err)
  );

  axiosInstance.interceptors.response.use(
    (res: AxiosResponse) => res,
    async (error: AxiosError<ServerError>) => {
      const config = getSDKConfig();
      const original = error.config as CustomInternalAxiosRequestConfig | undefined;
      const metadata = original?.metadata;
      const url = (error.request?.responseURL ?? original?.url ?? '') as string;
      const skipRefresh = [refreshTokenEndpoint].some((r) => url.includes(r)) || metadata?.skipRefreshToken || !original;

      if (error.response?.status === 401 && !skipRefresh) {
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const newToken = await triggerRefresh();
            isRefreshing = false;
            flushPending(newToken);
            original!.headers.Authorization = `Bearer ${newToken}`;
            return axiosInstance!.request(original!);
          } catch (refreshErr) {
            isRefreshing = false;
            pending.forEach(({ reject }) => reject(refreshErr));
            pending.length = 0;
            config.onAuthError?.();
            return Promise.reject(refreshErr);
          }
        }
        return new Promise((resolve, reject) => {
          pending.push({ resolve, reject, config: original! });
        });
      }

      if (error.response?.status === 401) config.onAuthError?.();

      const message = getErrorMessage(error);
      const cleanError = createCleanError(error, message);

      if (metadata?.showErrorToast !== false) {
        toast.error(cleanError.message);
        config.onError?.(cleanError);
      }

      return Promise.reject(cleanError);
    }
  );
};

export const getAxiosInstance = (): AxiosInstance => {
  if (!axiosInstance) {
    throw new Error('[instollar-sdk] API not initialized. Call initAxios(config) first.');
  }
  return axiosInstance;
};

export const getSDKConfig = (): InstollarSDKConfig => {
  if (!sdkConfig) {
    throw new Error('[instollar-sdk] SDK not initialized. Call initAxios(config) first.');
  }
  return sdkConfig;
};

export type { CustomAxiosRequestConfig, CustomInternalAxiosRequestConfig } from '../types';
