import { forwardRef } from "react";
import {
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
  type RadioProps as AriaRadioProps,
  type RadioGroupProps as AriaRadioGroupProps,
} from "react-aria-components";
import { cn } from "@/utils/cn";

const wrapperClass = cn(
  "inline-flex items-center gap-2 select-none",
  "text-text-primary text-base",
  "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  "outline-none",
);

const dotClass = cn(
  "flex items-center justify-center rounded-full",
  "bg-bg-default size-[18px] shrink-0",
  "border-border-strong border-[1.5px]",
  "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
  "data-[selected]:border-brand-primary",
  "group-data-[focus-visible]:ring-border-focus group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-offset-2",
);

export interface RadioProps extends Omit<AriaRadioProps, "className" | "children"> {
  /** Override or extend the computed Tailwind class list (the wrapper). */
  className?: string;
  /** Visible label rendered next to the dot. */
  children?: React.ReactNode;
}

/**
 * A single radio button. Must live inside a `<RadioGroup>` to function.
 *
 * @example
 * ```tsx
 * <RadioGroup label="Plan" defaultValue="pro">
 *   <Radio value="free">Free</Radio>
 *   <Radio value="pro">Pro</Radio>
 * </RadioGroup>
 * ```
 */
export const Radio = forwardRef<HTMLLabelElement, RadioProps>(function Radio(
  { className, children, ...rest },
  ref,
) {
  return (
    <AriaRadio ref={ref} className={cn("group", wrapperClass, className)} {...rest}>
      <span className={dotClass} aria-hidden="true">
        <span className="bg-brand-primary size-2 origin-center scale-0 rounded-full transition-transform group-data-[selected]:scale-100" />
      </span>
      {children}
    </AriaRadio>
  );
});

const groupClass = "flex flex-col gap-2";

export interface RadioGroupProps extends Omit<AriaRadioGroupProps, "className" | "children"> {
  /** Override or extend the wrapper Tailwind class list. */
  className?: string;
  /** A set of `<Radio>` children. */
  children?: React.ReactNode;
}

/**
 * Container for a group of `<Radio>` items. Forwards all selection / disabled
 * props to React Aria.
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  { className, children, ...rest },
  ref,
) {
  return (
    <AriaRadioGroup ref={ref} className={cn(groupClass, className)} {...rest}>
      {children}
    </AriaRadioGroup>
  );
});
