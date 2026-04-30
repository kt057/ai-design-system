import { forwardRef } from "react";
import { Switch as AriaSwitch, type SwitchProps as AriaSwitchProps } from "react-aria-components";
import { cn } from "@/utils/cn";

const wrapperClass = cn(
  "inline-flex items-center gap-2 select-none",
  "text-text-primary text-base",
  "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  "outline-none",
);

const trackClass = cn(
  "relative inline-flex shrink-0 items-center",
  "rounded-pill h-5 w-9 p-0.5",
  "bg-border-strong transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
  "data-[selected]:bg-brand-primary",
  "group-data-[focus-visible]:ring-border-focus group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-offset-2",
);

const knobClass = cn(
  "bg-bg-default size-4 rounded-full shadow-sm",
  "transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
  "translate-x-0 group-data-[selected]:translate-x-4",
);

export interface SwitchProps extends Omit<AriaSwitchProps, "className" | "children"> {
  /** Override or extend the wrapper Tailwind class list. */
  className?: string;
  /** Visible label rendered next to the track. */
  children?: React.ReactNode;
}

/**
 * Two-state on/off switch built on `react-aria-components`'s `<Switch>`.
 *
 * @example
 * ```tsx
 * <Switch onChange={setEnabled}>Enable notifications</Switch>
 * ```
 */
export const Switch = forwardRef<HTMLLabelElement, SwitchProps>(function Switch(
  { className, children, ...rest },
  ref,
) {
  return (
    <AriaSwitch ref={ref} className={cn("group", wrapperClass, className)} {...rest}>
      <span className={trackClass} aria-hidden="true">
        <span className={knobClass} />
      </span>
      {children}
    </AriaSwitch>
  );
});
