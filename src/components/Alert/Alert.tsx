import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const alertStyles = cva(["flex w-full max-w-[360px] items-start gap-2 rounded-md p-3"], {
  variants: {
    variant: {
      info: "bg-info-bg text-info-fg",
      success: "bg-success-bg text-success-fg",
      warning: "bg-warning-bg text-warning-fg",
      error: "bg-error-bg text-error-fg",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

const InfoIcon = () => (
  <svg viewBox="0 0 16 16" className="size-4 shrink-0" aria-hidden="true">
    <circle cx="8" cy="8" r="7" fill="currentColor" opacity="0.2" />
    <circle cx="8" cy="5" r="1" fill="currentColor" />
    <rect x="7" y="7" width="2" height="5" rx="1" fill="currentColor" />
  </svg>
);

const SuccessIcon = () => (
  <svg viewBox="0 0 16 16" className="size-4 shrink-0" aria-hidden="true">
    <circle cx="8" cy="8" r="7" fill="currentColor" opacity="0.2" />
    <path
      d="M5 8.5l2 2 4-4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const WarningIcon = () => (
  <svg viewBox="0 0 16 16" className="size-4 shrink-0" aria-hidden="true">
    <path d="M8 1.5L15 14H1L8 1.5z" fill="currentColor" opacity="0.2" />
    <rect x="7" y="6" width="2" height="4" rx="1" fill="currentColor" />
    <circle cx="8" cy="11.5" r="1" fill="currentColor" />
  </svg>
);

const ErrorIcon = () => (
  <svg viewBox="0 0 16 16" className="size-4 shrink-0" aria-hidden="true">
    <circle cx="8" cy="8" r="7" fill="currentColor" opacity="0.2" />
    <path
      d="M5.5 5.5l5 5M10.5 5.5l-5 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const ICONS = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  error: ErrorIcon,
};

export interface AlertProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "title">,
    VariantProps<typeof alertStyles> {
  /**
   * Severity. Drives icon, background, and text color.
   * @default "info"
   */
  variant?: "info" | "success" | "warning" | "error";
  /** Bold heading shown above the body. */
  title?: React.ReactNode;
  /** Override or extend the computed Tailwind class list. */
  className?: string;
  /** Alert body / description. */
  children?: React.ReactNode;
}

/**
 * Inline notification banner with severity. Renders a `<div role="alert">`
 * with an icon, title, and body sized to the Figma 360 px reference.
 *
 * @example
 * ```tsx
 * <Alert variant="success" title="Saved">Your changes have been saved.</Alert>
 * ```
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { variant = "info", title, className, children, ...rest },
  ref,
) {
  const Icon = ICONS[variant];
  return (
    <div ref={ref} role="alert" className={cn(alertStyles({ variant }), className)} {...rest}>
      <Icon />
      <div className="flex flex-col gap-0.5">
        {title ? <p className="text-sm font-semibold">{title}</p> : null}
        {children ? <p className="text-xs opacity-85">{children}</p> : null}
      </div>
    </div>
  );
});
