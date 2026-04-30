import { forwardRef } from "react";
import {
  Checkbox as AriaCheckbox,
  type CheckboxProps as AriaCheckboxProps,
} from "react-aria-components";
import { cn } from "@/utils/cn";

const wrapperClass = cn(
  "inline-flex items-center gap-2 select-none",
  "text-text-primary text-base",
  "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  "outline-none",
);

const boxClass = cn(
  "flex items-center justify-center rounded-sm",
  "bg-bg-default size-[18px] shrink-0",
  "border-border-strong border-[1.5px]",
  "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
  "data-[selected]:bg-brand-primary data-[selected]:border-brand-primary",
  "data-[indeterminate]:bg-brand-primary data-[indeterminate]:border-brand-primary",
  "group-data-[focus-visible]:ring-border-focus group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-offset-2",
);

export interface CheckboxProps extends Omit<AriaCheckboxProps, "className" | "children"> {
  /** Override or extend the computed Tailwind class list (the wrapper). */
  className?: string;
  /** Visible label rendered next to the box. */
  children?: React.ReactNode;
}

/**
 * Accessible checkbox built on `react-aria-components`'s `<Checkbox>`. Supports
 * `isSelected`, `isIndeterminate`, and `isDisabled` along with controlled and
 * uncontrolled use.
 *
 * @example
 * ```tsx
 * <Checkbox onChange={setAccepted}>I agree</Checkbox>
 * <Checkbox isIndeterminate>Mixed</Checkbox>
 * ```
 */
export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(function Checkbox(
  { className, children, ...rest },
  ref,
) {
  return (
    <AriaCheckbox ref={ref} className={cn("group", wrapperClass, className)} {...rest}>
      {({ isIndeterminate }) => (
        <>
          <span className={boxClass} aria-hidden="true">
            {isIndeterminate ? (
              <span className="bg-text-inverse h-0.5 w-2.5 rounded-[1px]" />
            ) : (
              <svg viewBox="0 0 14 14" className="text-text-inverse size-3">
                <path
                  d="M2.5 7.5l3 3 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  className="origin-center scale-0 group-data-[selected]:scale-100"
                />
              </svg>
            )}
          </span>
          {children}
        </>
      )}
    </AriaCheckbox>
  );
});
