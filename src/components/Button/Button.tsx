import { forwardRef } from "react";
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonStyles = cva(
  [
    "inline-flex items-center justify-center font-semibold whitespace-nowrap select-none",
    "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
    "focus-visible:ring-border-focus outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
    "data-[pending]:cursor-progress",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-brand-primary text-text-inverse",
          "hover:bg-brand-primary-hover data-[pressed]:bg-brand-primary-hover",
        ],
        secondary: [
          "bg-bg-default text-text-primary border-border-default border",
          "hover:border-border-strong data-[pressed]:border-border-strong",
        ],
      },
      size: {
        sm: "h-6 gap-1 rounded-sm px-3 py-1 text-xs",
        md: "h-9 gap-2 rounded-md px-4 py-2 text-base",
        lg: "text-md h-11 gap-3 rounded-lg px-5 py-3",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends Omit<AriaButtonProps, "className" | "children">, VariantProps<typeof buttonStyles> {
  /**
   * Visual style of the button.
   * @default "primary"
   */
  variant?: "primary" | "secondary";
  /**
   * Size of the button (controls height, padding, and font size).
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Stretch the button to fill the width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /** Override or extend the computed Tailwind class list. */
  className?: string;
  /** Button label. */
  children?: React.ReactNode;
}

/**
 * Accessible, themeable button.
 *
 * Built on top of `react-aria-components`'s `<Button>`, so it handles
 * keyboard activation, focus rings, press states, and disabled / pending
 * semantics for you. Variants and sizes are wired through CVA.
 *
 * @example
 * ```tsx
 * <Button variant="primary" onPress={() => save()}>Save</Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, fullWidth, className, children, ...rest },
  ref,
) {
  return (
    <AriaButton
      ref={ref}
      className={cn(buttonStyles({ variant, size, fullWidth }), className)}
      {...rest}
    >
      {children}
    </AriaButton>
  );
});
