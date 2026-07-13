export type IconVariant = 'Linear' | 'Outline' | 'TwoTone' | 'Bulk' | 'Broken' | 'Bold';

export interface BaseIconProps {
  /** Pixel size. Defaults to 24. */
  size?: number | string;
  /** Icon color. Defaults to `currentColor` on web. */
  color?: string;
  /** Iconsax style variant. Defaults to `Linear`. */
  variant?: IconVariant;
  /** Accessible label. When set, the icon is exposed to screen readers. */
  title?: string;
  className?: string;
}

/**
 * Curated Instollar icon names.
 * Add more here, then wire them in `web/` and `native/`.
 */
export const ICON_NAMES = [
  'home',
  'search',
  'user',
  'profile',
  'settings',
  'notification',
  'menu',
  'more',
  'close',
  'add',
  'edit',
  'trash',
  'check',
  'info',
  'warning',
  'danger',
  'arrowLeft',
  'arrowRight',
  'arrowUp',
  'arrowDown',
  'eye',
  'eyeSlash',
  'lock',
  'unlock',
  'logout',
  'login',
  'message',
  'call',
  'calendar',
  'clock',
  'document',
  'download',
  'upload',
  'image',
  'location',
  'filter',
  'wallet',
  'copy',
  'share',
  'sms',
] as const;

export type IconName = (typeof ICON_NAMES)[number];

export const isIconName = (value: string): value is IconName =>
  (ICON_NAMES as readonly string[]).includes(value);
