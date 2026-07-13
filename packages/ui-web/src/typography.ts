/**
 * Instollar typography class names for use in consuming apps.
 * Styles are precompiled – no Tailwind setup required in your project.
 */
export const typography = {
  display: 'instollar-text-display',
  heading: 'instollar-text-heading',
  title: 'instollar-text-title',
  body: 'instollar-text-body',
  bodySm: 'instollar-text-body-sm',
  caption: 'instollar-text-caption',
  label: 'instollar-text-label',
  overline: 'instollar-text-overline',
} as const;

export type TypographyClass = (typeof typography)[keyof typeof typography];
