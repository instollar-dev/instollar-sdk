import { tokens } from '@instollar-dev/tokens';
import type { Config } from 'tailwindcss';

const preset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        primary: tokens.colors.primary,
        secondary: tokens.colors.secondary,
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
        spline: [tokens.fontFamily.spline],
        inter: [tokens.fontFamily.inter],
        'open-sans': [tokens.fontFamily.openSans],
        mono: [tokens.fontFamily.mono],
      },
      borderRadius: tokens.borderRadius,
      boxShadow: tokens.shadow,
    },
  },
};

export default preset;
