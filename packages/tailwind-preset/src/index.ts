import { tokens } from '@instollar-dev/tokens';
import type { Config } from 'tailwindcss';

const preset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        primary: tokens.colors.primary,
        neutral: tokens.colors.neutral,
        success: tokens.colors.success,
        warning: tokens.colors.warning,
        error: tokens.colors.error,
      },
      spacing: tokens.spacing,
      fontSize: tokens.fontSize,
      fontWeight: tokens.fontWeight,
      lineHeight: tokens.lineHeight,
      fontFamily: {
        sans: [tokens.fontFamily.sans],
        mono: [tokens.fontFamily.mono],
      },
      borderRadius: tokens.borderRadius,
      boxShadow: tokens.shadow,
    },
  },
};

export default preset;
