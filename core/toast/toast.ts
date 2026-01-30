/**
 * Cross-platform toast for instollar-sdk
 * Web: DOM toasts; React Native: console
 */

import { detectPlatform } from '../storage/platform-detection';

export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'default';

export interface ToastOptions {
  message: string;
  type?: ToastType;
  autoClose?: number;
  closeOnClick?: boolean;
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
}

const showMobileToast = (options: ToastOptions): void => {
  const { message, type = 'default' } = options;
  const emoji = type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '⚠' : 'ℹ';
  if (type === 'error') {
    console.warn(`[Instollar SDK] ${emoji} ${message}`);
  } else {
    console.log(`[Instollar SDK] ${emoji} ${message}`);
  }
};

let toastId = 0;
const showWebToast = (options: ToastOptions): void => {
  if (typeof document === 'undefined') {
    showMobileToast(options);
    return;
  }
  const { message, type = 'default', position = 'top-right', autoClose = 5000 } = options;
  const id = `instollar-toast-${++toastId}`;
  const containerId = 'instollar-toast-container';
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.className = `instollar-toast-container ${position}`;
    container.style.cssText =
      'position:fixed;z-index:9999;padding:16px;pointer-events:none;max-width:420px;';
    if (position.includes('top')) container.style.top = '0';
    else container.style.bottom = '0';
    if (position.includes('right')) container.style.right = '0';
    else if (position.includes('left')) container.style.left = '0';
    else container.style.left = '50%';
    document.body.appendChild(container);
  }
  const el = document.createElement('div');
  el.id = id;
  el.className = `instollar-toast instollar-toast-${type}`;
  el.style.cssText =
    'padding:12px 16px;margin-bottom:8px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);pointer-events:auto;border-left:4px solid;';
  const colors: Record<ToastType, string> = {
    success: '#22c55e',
    error: '#ef4444',
    info: '#3b82f6',
    warning: '#f59e0b',
    default: '#6b7280',
  };
  el.style.borderLeftColor = colors[type];
  el.textContent = message;
  container.appendChild(el);
  if (autoClose > 0) {
    setTimeout(() => {
      el.remove();
    }, autoClose);
  }
};

const showToast = (options: ToastOptions): void => {
  try {
    if (detectPlatform() === 'web') showWebToast(options);
    else showMobileToast(options);
  } catch {
    console.log(`[Instollar SDK] ${options.message}`);
  }
};

export const toast = {
  success: (message: string, opts?: Omit<ToastOptions, 'message' | 'type'>) =>
    showToast({ ...opts, message, type: 'success' }),
  error: (message: string, opts?: Omit<ToastOptions, 'message' | 'type'>) =>
    showToast({ ...opts, message, type: 'error' }),
  info: (message: string, opts?: Omit<ToastOptions, 'message' | 'type'>) =>
    showToast({ ...opts, message, type: 'info' }),
  warning: (message: string, opts?: Omit<ToastOptions, 'message' | 'type'>) =>
    showToast({ ...opts, message, type: 'warning' }),
  default: (message: string, opts?: Omit<ToastOptions, 'message' | 'type'>) =>
    showToast({ ...opts, message, type: 'default' }),
  show: (options: ToastOptions) => showToast(options),
};
