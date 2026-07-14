/**
 * @instollar/tokens – Instollar design tokens (web + native).
 *
 * Brand:
 * - Primary:   #012b15
 * - Secondary: #effe3e
 * - Fonts: Spline Sans (display), Inter (UI), Open Sans (body)
 *
 * CSS vars (also injected in @instollar-dev/ui-web styles):
 *   --font-spline, --font-inter, --font-open-sans
 *   --color-primary, --color-secondary
 */

/** Core brand anchors from the style guide. */
export const brand = {
  primary: '#012b15',
  secondary: '#effe3e',
} as const;

export const colors = {
  /** Dark forest green scale — DEFAULT / 600 ≈ brand primary. */
  primary: {
    50: '#e8f5ee',
    100: '#cfe9db',
    200: '#9ed3b7',
    300: '#6bb88f',
    400: '#3d9666',
    500: '#1f6f42',
    600: '#014d28',
    700: '#012b15',
    800: '#012311',
    900: '#011a0d',
    950: '#011008',
    DEFAULT: '#012b15',
  },
  /** Lime accent scale — DEFAULT / 500 ≈ brand secondary. */
  secondary: {
    50: '#fcffe6',
    100: '#f7ffb8',
    200: '#f3ff8a',
    300: '#effe5c',
    400: '#effe3e',
    500: '#effe3e',
    600: '#d4e020',
    700: '#a8b310',
    800: '#7c850c',
    900: '#55590a',
    950: '#333506',
    DEFAULT: '#effe3e',
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
    50: '#e8f5ee',
    500: '#1f6f42',
    700: '#012b15',
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
  /** Chart palette aligned to brand green + lime accent. */
  chart: {
    area: '#012b15',
    areaMuted: '#1f6f42',
    donutPrimary: '#012b15',
    donutSecondary: '#E8913A',
    donutTertiary: '#effe3e',
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

/**
 * Font stacks. Load the fonts in the consuming app (e.g. Google Fonts):
 * Spline Sans, Inter, Open Sans.
 */
export const fontFamily = {
  /** Display / headings — Spline Sans */
  spline: '"Spline Sans", system-ui, sans-serif',
  /** UI chrome / labels — Inter */
  inter: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  /** Body copy — Open Sans */
  openSans: '"Open Sans", system-ui, sans-serif',
  /** Default UI stack (Inter) */
  sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
} as const;

/** CSS custom properties mirrored in ui-web `:root`. */
export const cssVariables = {
  '--font-spline': fontFamily.spline,
  '--font-inter': fontFamily.inter,
  '--font-open-sans': fontFamily.openSans,
  '--color-primary': brand.primary,
  '--color-secondary': brand.secondary,
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
  brand,
  colors,
  spacing,
  fontSize,
  fontWeight,
  lineHeight,
  fontFamily,
  cssVariables,
  borderRadius,
  shadow,
} as const;

export type InstollarTokens = typeof tokens;
export type InstollarColors = typeof colors;
export type InstollarBrand = typeof brand;
