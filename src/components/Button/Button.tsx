import { forwardRef } from "react";
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonStyles = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-md font-medium select-none",
    "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
    "focus-visible:ring-brand-500 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
    "data-[pending]:cursor-progress",
  ],
  {
    variants: {
      variant: {
        primary: ["bg-brand-600 text-fg-onbrand", "hover:bg-brand-700 data-[pressed]:bg-brand-800"],
        secondary: [
          "bg-bg-subtle text-fg-default border-border-default border",
          "hover:bg-bg-muted data-[pressed]:bg-bg-muted",
        ],
        ghost: ["text-fg-default bg-transparent", "hover:bg-bg-subtle data-[pressed]:bg-bg-muted"],
        danger: [
          "bg-danger-600 text-fg-onbrand",
          "hover:bg-danger-500 data-[pressed]:bg-danger-600",
        ],
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
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
  variant?: "primary" | "secondary" | "ghost" | "danger";
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
