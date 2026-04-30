import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const cardStyles = cva(["bg-bg-default flex flex-col gap-2 rounded-lg p-4"], {
  variants: {
    variant: {
      default: "border-border-default border",
      outlined: "border-border-strong border",
      elevated: "shadow-md",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface CardProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "className" | "title">,
    VariantProps<typeof cardStyles> {
  /**
   * Visual treatment.
   * @default "default"
   */
  variant?: "default" | "outlined" | "elevated";
  /** Optional bold title rendered above the body. */
  title?: React.ReactNode;
  /** Override or extend the computed Tailwind class list. */
  className?: string;
  /** Card body. */
  children?: React.ReactNode;
}

/**
 * Container that visually groups related content. Renders a `<section>` with
 * optional title.
 *
 * @example
 * ```tsx
 * <Card title="Profile">User details go here.</Card>
 * <Card variant="elevated" title="Stats">42 active users</Card>
 * ```
 */
export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  { variant, title, className, children, ...rest },
  ref,
) {
  return (
    <section ref={ref} className={cn(cardStyles({ variant }), className)} {...rest}>
      {title ? <div className="text-md text-text-primary font-semibold">{title}</div> : null}
      {children ? <div className="text-text-secondary text-sm">{children}</div> : null}
    </section>
  );
});
