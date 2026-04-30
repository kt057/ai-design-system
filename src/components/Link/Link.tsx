import { forwardRef } from "react";
import { Link as AriaLink, type LinkProps as AriaLinkProps } from "react-aria-components";
import { cn } from "@/utils/cn";

const linkClass = cn(
  "text-brand-primary text-base underline underline-offset-2",
  "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
  "hover:text-brand-primary-hover data-[hovered]:text-brand-primary-hover",
  "visited:text-text-secondary",
  "focus-visible:ring-border-focus outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
);

export interface LinkProps extends Omit<AriaLinkProps, "className" | "children"> {
  /** Override or extend the computed Tailwind class list. */
  className?: string;
  /** Link label. */
  children?: React.ReactNode;
}

/**
 * Accessible inline link. Built on `react-aria-components`'s `<Link>`, so it
 * exposes `data-hovered`, `data-pressed`, `data-focused`, `data-disabled`
 * attributes for styling and behaves correctly for both anchor and `onPress`
 * use cases.
 *
 * @example
 * ```tsx
 * <Link href="/docs">Read the docs</Link>
 * <Link onPress={() => navigate("/profile")}>Profile</Link>
 * ```
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { className, children, ...rest },
  ref,
) {
  return (
    <AriaLink ref={ref} className={cn(linkClass, className)} {...rest}>
      {children}
    </AriaLink>
  );
});
