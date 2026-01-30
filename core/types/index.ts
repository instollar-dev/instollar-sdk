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
