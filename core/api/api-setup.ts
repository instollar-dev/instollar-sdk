/**
 * API helper layer for instollar-sdk
 * Typed HTTP helpers with optional request metadata
 */

import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiRequestMetadata, CustomAxiosRequestConfig } from '../types';
import { getAxiosInstance } from './axios-setup';

/* eslint-disable @typescript-eslint/no-explicit-any */

const flattenParams = (obj: Record<string, any>, prefix = ''): Record<string, any> => {
  if (obj instanceof FormData) return obj;
  return Object.keys(obj).reduce((acc: Record<string, any>, key: string) => {
    const k = prefix ? `${prefix}.${key}` : key;
    const v = obj[key];
    if (
      v &&
      typeof v === 'object' &&
      !Array.isArray(v) &&
      !(v instanceof Date) &&
      !(v instanceof File) &&
      !(v instanceof Blob) &&
      !(v instanceof FormData)
    ) {
      Object.assign(acc, flattenParams(v, k));
    } else {
      acc[k] = v;
    }
    return acc;
  }, {});
};

const formDataOptions = (options: AxiosRequestConfig, isForm: boolean): AxiosRequestConfig => {
  if (!isForm) return options;
  return {
    ...options,
    headers: { ...options.headers, 'Content-Type': undefined },
  };
};

const apiRequest = <T>(
  endpoint: string,
  options: Omit<AxiosRequestConfig, 'url'> = {},
  metadata?: ApiRequestMetadata
): Promise<AxiosResponse<T>> => {
  const instance = getAxiosInstance();
  const isFormData = options.data instanceof FormData;
  if (!isFormData && options.params) options.params = flattenParams(options.params);
  const configWithForm = isFormData ? formDataOptions(options, true) : options;
  const requestConfig: CustomAxiosRequestConfig = {
    url: endpoint,
    ...configWithForm,
    metadata: { ...(options as CustomAxiosRequestConfig).metadata, ...metadata },
  };
  return instance.request<T>(requestConfig);
};

const api = {
  get: <T>(
    endpoint: string,
    params?: Record<string, any>,
    options: Omit<AxiosRequestConfig, 'url' | 'method' | 'params'> = {},
    metadata?: ApiRequestMetadata
  ): Promise<AxiosResponse<T>> =>
    apiRequest<T>(endpoint, { ...options, method: 'GET', params }, metadata),

  post: <T>(
    endpoint: string,
    data?: any,
    options: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'> = {},
    metadata?: ApiRequestMetadata
  ): Promise<AxiosResponse<T>> => {
    const isForm = data instanceof FormData;
    const opts = isForm ? formDataOptions(options, true) : options;
    return apiRequest<T>(endpoint, { ...opts, method: 'POST', data }, metadata);
  },

  put: <T>(
    endpoint: string,
    data?: any,
    options: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'> = {},
    metadata?: ApiRequestMetadata
  ): Promise<AxiosResponse<T>> => {
    const isForm = data instanceof FormData;
    const opts = isForm ? formDataOptions(options, true) : options;
    return apiRequest<T>(endpoint, { ...opts, method: 'PUT', data }, metadata);
  },

  patch: <T>(
    endpoint: string,
    data?: any,
    options: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'> = {},
    metadata?: ApiRequestMetadata
  ): Promise<AxiosResponse<T>> => {
    const isForm = data instanceof FormData;
    const opts = isForm ? formDataOptions(options, true) : options;
    return apiRequest<T>(endpoint, { ...opts, method: 'PATCH', data }, metadata);
  },

  delete: <T>(
    endpoint: string,
    params?: Record<string, any>,
    options: Omit<AxiosRequestConfig, 'url' | 'method' | 'params'> = {},
    metadata?: ApiRequestMetadata
  ): Promise<AxiosResponse<T>> =>
    apiRequest<T>(endpoint, { ...options, method: 'DELETE', params }, metadata),

  formData: <T>(
    endpoint: string,
    formData: FormData,
    method: 'POST' | 'PUT' | 'PATCH' = 'POST',
    options: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'> = {},
    metadata?: ApiRequestMetadata
  ): Promise<AxiosResponse<T>> =>
    apiRequest<T>(endpoint, formDataOptions({ ...options, method, data: formData }, true), metadata),

  /**
   * Send a request with full control over method, body, params, and headers.
   * Use this when you need a method other than GET/POST/PUT/PATCH/DELETE, or when
   * you already have a full Axios-style config object.
   *
   * @param endpoint - URL path (e.g. '/users/me'). Base URL is applied by the SDK.
   * @param options - Axios request config (without `url`): method, data, params, headers, timeout, etc.
   * @param metadata - Optional SDK metadata: showErrorToast, showSuccessToast, skipRefreshToken, requestId, context.
   * @returns Promise resolving to AxiosResponse<T> (use .data for the response body).
   *
   * @example GET with params
   * const res = await api.request<User[]>('/users', { method: 'GET', params: { page: 1 } });
   *
   * @example POST with body and custom headers
   * const res = await api.request<CreatedUser>('/users', {
   *   method: 'POST',
   *   data: { name: 'Jane' },
   *   headers: { 'X-Custom': 'value' },
   * });
   *
   * @example Suppress error toast for this request
   * const res = await api.request<Data>('/noisy-endpoint', { method: 'GET' }, { showErrorToast: false });
   *
   * @example Show success toast for a POST request
   * const res = await api.request<Data>('/update', { method: 'POST', data: { name: 'New' } }, { showSuccessToast: true });
   */
  request: apiRequest,
};

export default api;
