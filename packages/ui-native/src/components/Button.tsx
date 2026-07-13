import { forwardRef, type ElementRef } from 'react';
import {
  type PressableProps,
  Pressable,
  Text,
  StyleSheet,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { borderRadius, colors, fontSize, spacing } from '@instollar-dev/tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const sizeStyles: Record<ButtonSize, { container: ViewStyle; label: TextStyle }> = {
  sm: {
    container: { minHeight: 32, paddingHorizontal: Number.parseInt(spacing[3], 10) },
    label: { fontSize: Number.parseInt(fontSize.sm, 10) },
  },
  md: {
    container: { minHeight: 40, paddingHorizontal: Number.parseInt(spacing[4], 10) },
    label: { fontSize: Number.parseInt(fontSize.base, 10) },
  },
  lg: {
    container: { minHeight: 48, paddingHorizontal: Number.parseInt(spacing[6], 10) },
    label: { fontSize: Number.parseInt(fontSize.lg, 10) },
  },
};

const variantStyles: Record<
  ButtonVariant,
  { container: ViewStyle; label: TextStyle; pressed: ViewStyle }
> = {
  primary: {
    container: { backgroundColor: colors.primary[600] },
    label: { color: colors.white },
    pressed: { backgroundColor: colors.primary[700] },
  },
  secondary: {
    container: { backgroundColor: colors.neutral[100] },
    label: { color: colors.neutral[900] },
    pressed: { backgroundColor: colors.neutral[200] },
  },
  outline: {
    container: {
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.neutral[300],
    },
    label: { color: colors.neutral[900] },
    pressed: { backgroundColor: colors.neutral[50] },
  },
  ghost: {
    container: { backgroundColor: colors.transparent },
    label: { color: colors.neutral[700] },
    pressed: { backgroundColor: colors.neutral[100] },
  },
  danger: {
    container: { backgroundColor: colors.error[500] },
    label: { color: colors.white },
    pressed: { backgroundColor: colors.error[700] },
  },
};

export const Button = forwardRef<ElementRef<typeof Pressable>, ButtonProps>(
  (
    {
      title,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    const variantStyle = variantStyles[variant];
    const sizeStyle = sizeStyles[size];

    return (
      <Pressable
        ref={ref}
        disabled={disabled}
        style={({ pressed }) => [
          styles.base,
          variantStyle.container,
          sizeStyle.container,
          fullWidth && styles.fullWidth,
          pressed && variantStyle.pressed,
          disabled && styles.disabled,
          style as ViewStyle,
        ]}
        {...props}
      >
        <Text style={[styles.label, variantStyle.label, sizeStyle.label]}>{title}</Text>
      </Pressable>
    );
  }
);

Button.displayName = 'Button';

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Number.parseInt(borderRadius.md, 10),
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});
