import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const badgeStyles = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap select-none",
    "rounded-sm font-semibold",
    "text-xxs px-2 py-1",
  ],
  {
    variants: {
      variant: {
        info: "bg-info-bg text-info-fg",
        success: "bg-success-bg text-success-fg",
        warning: "bg-warning-bg text-warning-fg",
        error: "bg-error-bg text-error-fg",
        neutral: "bg-neutral-bg text-neutral-fg",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
);

export interface BadgeProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, "className">,
    VariantProps<typeof badgeStyles> {
  /**
   * Status conveyed by the badge color.
   * @default "info"
   */
  variant?: "info" | "success" | "warning" | "error" | "neutral";
  /** Override or extend the computed Tailwind class list. */
  className?: string;
  /** Badge label. */
  children?: React.ReactNode;
}

/**
 * Compact status indicator. Renders an inline `<span>` with a colored
 * background and matching foreground per `variant`.
 *
 * @example
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * ```
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant, className, children, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={cn(badgeStyles({ variant }), className)} {...rest}>
      {children}
    </span>
  );
});
