/**
 * Cross-platform toast for instollar-sdk
 * Web: DOM toasts; React Native: console
 */

import { detectPlatform } from '../storage/platform-detection';
import { ToastOptions, ToastType } from '../types';

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
  const { message, type = 'default', position = 'top-right', autoClose = 5000, closeOnClick = true } = options;
  const id = `instollar-toast-${++toastId}`;
  const containerId = 'instollar-toast-container';
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.className = `instollar-toast-container ${position}`;
    container.style.cssText =
      'position:fixed;z-index:9999;padding:24px;pointer-events:none;max-width:420px;';
    if (position.includes('top')) container.style.top = '0';
    else container.style.bottom = '0';
    if (position.includes('right')) container.style.right = '0';
    else if (position.includes('left')) container.style.left = '0';
    else container.style.left = '50%';
    document.body.appendChild(container);

    // Add animation styles once
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes instollar-toast-in {
        from { transform: translateY(10px) scale(0.95); opacity: 0; }
        to { transform: translateY(0) scale(1); opacity: 1; }
      }
      @keyframes instollar-toast-out {
        from { transform: translateY(0) scale(1); opacity: 1; }
        to { transform: translateY(10px) scale(0.95); opacity: 0; }
      }
      .instollar-toast.closing { animation: instollar-toast-out 0.2s ease-in forwards; }
    `;
    document.head.appendChild(styleEl);
  }

  const el = document.createElement('div');
  el.id = id;
  el.className = `instollar-toast instollar-toast-${type}`;
  el.style.cssText =
    'padding:14px 18px;margin-bottom:12px;border-radius:10px;box-shadow:0 8px 16px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.1);pointer-events:auto;border-left:3px solid;background:rgba(255,255,255,0.85);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(0,0,0,0.05);color:#171717;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;font-size:14px;font-weight:500;line-height:1.4;animation:instollar-toast-in 0.3s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;cursor:pointer;display:flex;align-items:center;';
  
  const colors: Record<ToastType, string> = {
    success: '#10b981',
    error: '#ef4444',
    info: '#3b82f6',
    warning: '#f59e0b',
    default: '#737373',
  };
  el.style.borderLeft = `3px solid ${colors[type]}`;
  el.textContent = message;

  if (closeOnClick) {
    el.onclick = () => {
      el.classList.add('closing');
      setTimeout(() => el.remove(), 200);
    };
  }

  container.appendChild(el);
  if (autoClose > 0) {
    setTimeout(() => {
      if (el.parentNode) {
        el.classList.add('closing');
        setTimeout(() => el.remove(), 200);
      }
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
