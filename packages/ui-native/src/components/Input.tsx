import { forwardRef, type ElementRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import { borderRadius, colors, fontSize, spacing } from '@instollar-dev/tokens';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  containerStyle?: ViewStyle;
}

export const Input = forwardRef<ElementRef<typeof TextInput>, InputProps>(
  ({ label, error, hint, containerStyle, style, editable = true, ...props }, ref) => (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        ref={ref}
        editable={editable}
        placeholderTextColor={colors.neutral[400]}
        style={[
          styles.input,
          error ? styles.inputError : null,
          !editable && styles.inputDisabled,
          style,
        ]}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {!error && hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  )
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: Number.parseInt(spacing[1], 10),
    fontSize: Number.parseInt(fontSize.sm, 10),
    fontWeight: '500',
    color: colors.neutral[700],
  },
  input: {
    minHeight: 40,
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: Number.parseInt(borderRadius.md, 10),
    backgroundColor: colors.white,
    paddingHorizontal: Number.parseInt(spacing[3], 10),
    paddingVertical: Number.parseInt(spacing[2], 10),
    fontSize: Number.parseInt(fontSize.base, 10),
    color: colors.neutral[900],
  },
  inputError: {
    borderColor: colors.error[500],
  },
  inputDisabled: {
    opacity: 0.5,
  },
  error: {
    marginTop: Number.parseInt(spacing[1], 10),
    fontSize: Number.parseInt(fontSize.sm, 10),
    color: colors.error[700],
  },
  hint: {
    marginTop: Number.parseInt(spacing[1], 10),
    fontSize: Number.parseInt(fontSize.sm, 10),
    color: colors.neutral[500],
  },
});
