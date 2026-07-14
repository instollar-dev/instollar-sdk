import { type ElementType, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export type TextVariant = 'body' | 'caption' | 'label' | 'title' | 'heading';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: TextVariant;
}

const variantClasses: Record<TextVariant, string> = {
  body: 'font-open-sans text-base text-neutral-800',
  caption: 'font-inter text-sm text-neutral-500',
  label: 'font-inter text-sm font-medium text-neutral-700',
  title: 'font-spline text-xl font-semibold text-primary-700',
  heading: 'font-spline text-3xl font-bold text-primary-700',
};

export const Text = ({
  as: Component = 'p',
  variant = 'body',
  className,
  ...props
}: TextProps) => (
  <Component className={cn(variantClasses[variant], className)} {...props} />
);
