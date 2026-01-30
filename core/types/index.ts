/**
 * Core types for instollar-sdk
 */

import { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

// ============================================
// Token & Auth Types
// ============================================

export interface TokenData {
  token?: string;
  refreshToken?: string;
}

export interface RefreshTokenModel {
  token: string;
  refreshToken: string;
}

// ============================================
// API Response Types
// ============================================

export interface GeneralResponseModel<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string | string[];
}

/**
 * General API response types for the app.
 */
export type SortOrder = 'asc' | 'desc';

export interface PaginationMeta {
  page?: number | null;
  limit?: number | null;
  total?: number | null;
  totalPages?: number | null;
  hasNext?: boolean | null;
  hasPrev?: boolean | null;
  nextPage?: number | null;
  prevPage?: number | null;
  sortOrder?: SortOrder | null;
}

export interface ApiResponse<T> {
  data?: T | null;
  pagination?: PaginationMeta;
  message?: string | null;
  success?: boolean | null;
  errors?: Record<string, string[]> | null;
}

export interface ServerError {
  errors?: string | string[];
  message?: string | null;
}

export interface ApiError {
  message: string;
  metadata?: {
    showErrorToast?: boolean;
  };
  response?: {
    status: number;
    data: ServerError;
  };
  request?: unknown;
}

// ============================================
// Request Metadata Types
// ============================================

export interface ApiRequestMetadata {
  showErrorToast?: boolean;
  skipRefreshToken?: boolean;
  requestId?: string;
  context?: unknown;
  [key: string]: unknown;
}

// ============================================
// Custom Axios Config Types
// ============================================

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  metadata?: ApiRequestMetadata;
}

export interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  metadata?: ApiRequestMetadata;
}

// ============================================
// SDK Configuration Types
// ============================================

export interface InstollarSDKConfig {
  baseUrl: string;
  timeout?: number;
  refreshTokenTimeout?: number;
  onError?: (error: ApiError) => void;
  onAuthError?: () => void;
  onTokenRefreshed?: (tokenData: TokenData) => void;
  defaultHeaders?: Record<string, string>;
}

// ============================================
// Platform Types
// ============================================

export type Platform = 'web' | 'mobile';
