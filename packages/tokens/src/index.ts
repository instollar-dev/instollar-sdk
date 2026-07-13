/**
 * @instollar/tokens – shared design tokens for web and native UI packages.
 * Update these values to match your Instollar style guide.
 */

export const colors = {
  primary: {
    50: '#eef7ff',
    100: '#d9ecff',
    200: '#bcdeff',
    300: '#8ecaff',
    400: '#59adff',
    500: '#338bff',
    600: '#1a6cf5',
    700: '#1556e1',
    800: '#1846b6',
    900: '#193d8f',
    950: '#142757',
  },
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  success: {
    50: '#f0fdf4',
    500: '#22c55e',
    700: '#15803d',
  },
  warning: {
    50: '#fffbeb',
    500: '#f59e0b',
    700: '#b45309',
  },
  error: {
    50: '#fef2f2',
    500: '#ef4444',
    700: '#b91c1c',
  },
  /**
   * Chart / data-viz palette matching Instollar dashboard mocks.
   * Forest green area line, donut segments (green / orange / lime).
   */
  chart: {
    area: '#1B5E3B',
    areaMuted: '#2F7A4F',
    donutPrimary: '#1B5E3B',
    donutSecondary: '#E8913A',
    donutTertiary: '#C5D93D',
    grid: '#E5E7EB',
    axis: '#9CA3AF',
  },
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const;

export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
} as const;

export const fontSize = {
  xs: '12px',
  sm: '14px',
  base: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '30px',
  '4xl': '36px',
} as const;

export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const lineHeight = {
  tight: '1.25',
  normal: '1.5',
  relaxed: '1.625',
} as const;

export const fontFamily = {
  sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
} as const;

export const borderRadius = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
} as const;

export const shadow = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
} as const;

export const tokens = {
  colors,
  spacing,
  fontSize,
  fontWeight,
  lineHeight,
  fontFamily,
  borderRadius,
  shadow,
} as const;

export type InstollarTokens = typeof tokens;
export type InstollarColors = typeof colors;
