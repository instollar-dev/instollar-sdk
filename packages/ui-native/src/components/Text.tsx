import { Text as RNText, type TextProps as RNTextProps, StyleSheet } from 'react-native';
import { colors, fontSize } from '@instollar-dev/tokens';

export type TextVariant = 'body' | 'caption' | 'label' | 'title' | 'heading';

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
}

const variantStyles = StyleSheet.create({
  body: {
    fontSize: Number.parseInt(fontSize.base, 10),
    color: colors.neutral[800],
  },
  caption: {
    fontSize: Number.parseInt(fontSize.sm, 10),
    color: colors.neutral[500],
  },
  label: {
    fontSize: Number.parseInt(fontSize.sm, 10),
    fontWeight: '500',
    color: colors.neutral[700],
  },
  title: {
    fontSize: Number.parseInt(fontSize.xl, 10),
    fontWeight: '600',
    color: colors.neutral[900],
  },
  heading: {
    fontSize: Number.parseInt(fontSize['3xl'], 10),
    fontWeight: '700',
    color: colors.neutral[900],
  },
});

export const Text = ({ variant = 'body', style, ...props }: TextProps) => (
  <RNText style={[variantStyles[variant], style]} {...props} />
);
