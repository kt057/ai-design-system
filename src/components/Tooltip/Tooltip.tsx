import { forwardRef } from "react";
import {
  Tooltip as AriaTooltip,
  TooltipTrigger as AriaTooltipTrigger,
  type TooltipProps as AriaTooltipProps,
  type TooltipTriggerComponentProps as AriaTooltipTriggerProps,
} from "react-aria-components";
import { cn } from "@/utils/cn";

const tooltipClass = cn(
  "bg-text-primary text-text-inverse rounded-sm",
  "px-2 py-1 text-xs",
  "shadow-md",
  "data-[entering]:animate-in data-[entering]:fade-in",
  "data-[exiting]:animate-out data-[exiting]:fade-out",
);

export interface TooltipProps extends Omit<AriaTooltipProps, "className" | "children"> {
  /** Override or extend the computed Tailwind class list. */
  className?: string;
  /** Tooltip body. */
  children?: React.ReactNode;
}

/**
 * Floating hint shown on hover or focus. Wrap a `<TooltipTrigger>` around a
 * focusable element (typically a `<Button>`) and a `<Tooltip>` to enable.
 *
 * @example
 * ```tsx
 * <TooltipTrigger>
 *   <Button aria-label="Save">💾</Button>
 *   <Tooltip>Save your work</Tooltip>
 * </TooltipTrigger>
 * ```
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  { className, children, ...rest },
  ref,
) {
  return (
    <AriaTooltip ref={ref} className={cn(tooltipClass, className)} {...rest}>
      {children}
    </AriaTooltip>
  );
});

/** Wraps a focusable trigger and a `<Tooltip>`. Re-exported from `react-aria-components`. */
export const TooltipTrigger = (props: AriaTooltipTriggerProps) => <AriaTooltipTrigger {...props} />;

export type TooltipTriggerProps = AriaTooltipTriggerProps;
