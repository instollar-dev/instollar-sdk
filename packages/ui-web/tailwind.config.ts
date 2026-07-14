import type { Config } from 'tailwindcss';
import instollarPreset from '@instollar-dev/tailwind-preset';

/**
 * Tailwind config shipped with @instollar-dev/ui-web.
 *
 * Consuming apps do NOT need Tailwind installed for styles to work – CSS is prebuilt.
 * Point the Tailwind CSS IntelliSense extension at this file for class suggestions:
 *
 * "tailwindCSS.experimental.configFile": "node_modules/@instollar-dev/ui-web/tailwind.config.ts"
 */
const config: Config = {
  presets: [instollarPreset],
  content: ['./src/**/*.{ts,tsx}'],
  safelist: [
    'instollar-text-display',
    'instollar-text-heading',
    'instollar-text-title',
    'instollar-text-body',
    'instollar-text-body-sm',
    'instollar-text-caption',
    'instollar-text-label',
    'instollar-text-overline',
    'font-spline',
    'font-inter',
    'font-open-sans',
    {
      pattern:
        /^(bg|text|border|ring|from|to|via)-(primary|secondary|neutral|success|warning|error)(-(50|100|200|300|400|500|600|700|800|900|950))?$/,
    },
    {
      pattern: /^(p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|space-[xy])-(0|1|2|3|4|5|6|8|10|12|16)$/,
    },
    {
      pattern: /^(flex|grid|block|inline|hidden|w|h|min-h|max-w|rounded|shadow|font|text|leading|items|justify|self)-/,
    },
  ],
};

export default config;
