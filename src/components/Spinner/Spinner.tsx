import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const spinnerStyles = cva(["inline-block animate-spin"], {
  variants: {
    size: {
      sm: "size-4",
      md: "size-6",
      lg: "size-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface SpinnerProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "aria-label">,
    VariantProps<typeof spinnerStyles> {
  /**
   * Visual size.
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Accessible label announced to screen readers.
   * @default "Loading"
   */
  label?: string;
  /** Override or extend the computed Tailwind class list. */
  className?: string;
}

/**
 * Indeterminate loading indicator. Renders a spinning ring + arc SVG with
 * `role="status"` so assistive tech announces the loading state.
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner size="lg" label="Loading user profile" />
 * ```
 */
export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(function Spinner(
  { size, label = "Loading", className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="status"
      aria-label={label}
      className={cn(spinnerStyles({ size }), className)}
      {...rest}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-full"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
        <path
          d="M22 12a10 10 0 0 0-10-10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
});
