
import { cn } from '@/util/cn';
import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react';
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'group inline-flex items-center justify-center whitespace-nowrap rounded-lg py-2 align-middle text-sm font-semibold leading-none transition-all duration-300 ease-in-out ' +
    'disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-blue-700 stroke-white px-6 text-white',
        secondary: 'bg-blue-50 stroke-blue-700 px-6 text-blue-700',
        outlined:
          'border border-slate-200 bg-transparent stroke-black px-6 text-black ',
        text: 'stroke-blue-700 px-2 text-blue-700',
        'text-default': 'stroke-slate-500 px-2 text-black',
      },
      size: {
        large: 'h-[42px] min-w-[42px] gap-2',
        medium: 'h-[38px] min-w-[38px] gap-2',
        small: 'h-8 min-w-[32px] gap-1.5 text-xs',
      },
      disabled: {
        true: '',
        false: '',
      },
      href: {
        true: 'cursor-pointer',
        false: '',
      },
      iconOnly: {
        true: 'p-0',
        false: '',
      },
      startIcon: {
        true: '',
        false: '',
      },
      endIcon: {
        true: '',
        false: '',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: ['primary', 'secondary'],
        class: 'disabled:bg-slate-100 disabled:stroke-slate-400 disabled:text-slate-400',
      },
      {
        variant: ['outlined'],
        class:
          'disabled:border-slate-100 disabled:bg-white disabled:stroke-slate-400 disabled:text-slate-400',
      },
      {
        variant: ['primary', 'secondary', 'outlined'],
        iconOnly: false,
        startIcon: true,
        class: 'px-4',
      },
      {
        variant: ['primary', 'secondary', 'outlined'],
        iconOnly: false,
        endIcon: true,
        class: 'px-4',
      },
      {
        variant: ['primary', 'secondary', 'outlined'],
        iconOnly: false,
        size: ['small'],
        class: 'px-2',
      },
      {
        variant: ['text', 'text-default'],
        class: 'disabled:stroke-slate-400 disabled:text-slate-400',
      },
      {
        variant: ['text-default'],
        disabled: false,
        class: 'hover:opacity-80',
      },
    ],
  }
);

export interface ButtonVariants {
  disabled?: boolean;
  endIcon?: boolean;
  fullWidth?: boolean;
  href?: boolean;
  iconOnly?: boolean;
  size?: 'small' | 'medium' | 'large';
  startIcon?: boolean;
  variant?: 'primary' | 'secondary' | 'outlined' | 'text' | 'text-default';
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>,
    Omit<ButtonVariants, 'disabled' | 'href' | 'startIcon' | 'endIcon'>,
    Partial<Pick<HTMLAnchorElement, 'target'>> {
  href?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      iconOnly = false,
      fullWidth = false,
      href,
      className,
      children,
      startIcon,
      endIcon,
      ...rest
    }: ButtonProps,
    ref
  ) => {
    const Component = href && !rest.disabled ? 'a' : 'button';

    return (
      <Component
        ref={ref as never}
        type='button'
        href={href}
        className={cn(
          buttonVariants({
            href: Boolean(href),
            variant,
            size,
            iconOnly,
            startIcon: Boolean(startIcon),
            endIcon: Boolean(endIcon),
            disabled: Boolean(rest?.disabled),
            fullWidth,
          }),
          className
        )}
        {...rest}
      >
        {startIcon}
        {children && <span>{children}</span>}
        {endIcon}
      </Component>
    );
  }
);

Button.displayName = 'Button';