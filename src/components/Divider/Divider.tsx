import { forwardRef } from "react";
import { Separator, type SeparatorProps } from "react-aria-components";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const dividerStyles = cva("bg-border-default shrink-0", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export interface DividerProps
  extends Omit<SeparatorProps, "className" | "orientation">, VariantProps<typeof dividerStyles> {
  /**
   * Layout direction.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /** Override or extend the computed Tailwind class list. */
  className?: string;
}

/**
 * A 1-pixel rule that separates content. Built on `react-aria-components`'s
 * `Separator`, so it ships the right ARIA semantics for both orientations.
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider orientation="vertical" />
 * ```
 */
export const Divider = forwardRef<HTMLElement, DividerProps>(function Divider(
  { orientation, className, ...rest },
  ref,
) {
  return (
    <Separator
      ref={ref as React.Ref<HTMLElement>}
      orientation={orientation ?? "horizontal"}
      className={cn(dividerStyles({ orientation }), className)}
      {...rest}
    />
  );
});
