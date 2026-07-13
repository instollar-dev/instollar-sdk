import { type ElementType, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export type TextVariant = 'body' | 'caption' | 'label' | 'title' | 'heading';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: TextVariant;
}

const variantClasses: Record<TextVariant, string> = {
  body: 'text-base text-neutral-800',
  caption: 'text-sm text-neutral-500',
  label: 'text-sm font-medium text-neutral-700',
  title: 'text-xl font-semibold text-neutral-900',
  heading: 'text-3xl font-bold text-neutral-900',
};

export const Text = ({
  as: Component = 'p',
  variant = 'body',
  className,
  ...props
}: TextProps) => (
  <Component className={cn(variantClasses[variant], className)} {...props} />
);
