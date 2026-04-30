import { forwardRef } from "react";
import {
  Select as AriaSelect,
  SelectValue,
  Button as AriaButton,
  Popover,
  ListBox,
  ListBoxItem,
  Label,
  type SelectProps as AriaSelectProps,
  type ListBoxItemProps,
} from "react-aria-components";
import { cn } from "@/utils/cn";

const triggerClass = cn(
  "bg-bg-default flex w-full items-center gap-2 rounded-md",
  "border-border-default border px-3 py-2",
  "text-text-primary text-left text-base",
  "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
  "data-[focus-visible]:border-border-focus data-[focus-visible]:border-2 data-[focus-visible]:px-[11px] data-[focus-visible]:py-[7px]",
  "data-[open]:border-border-focus data-[open]:border-2 data-[open]:px-[11px] data-[open]:py-[7px]",
  "outline-none",
  "data-[disabled]:cursor-not-allowed",
);

const popoverClass = cn(
  "bg-bg-default border-border-default rounded-md border shadow-md",
  "min-w-[--trigger-width] overflow-hidden",
  "data-[entering]:animate-in data-[entering]:fade-in",
  "data-[exiting]:animate-out data-[exiting]:fade-out",
);

const itemClass = cn(
  "text-text-primary cursor-default px-3 py-2 text-base outline-none",
  "data-[focused]:bg-bg-subtle data-[selected]:bg-bg-subtle",
  "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
);

export interface SelectProps<T extends object> extends Omit<
  AriaSelectProps<T>,
  "className" | "children"
> {
  /** Visible label rendered above the trigger. */
  label?: React.ReactNode;
  /** Placeholder shown when no value is selected. */
  placeholder?: string;
  /** Override or extend the wrapper Tailwind class list. */
  className?: string;
  /** A set of `<SelectItem>` children. */
  children?: React.ReactNode;
}

/**
 * Single-select dropdown built on `react-aria-components`'s `<Select>`.
 *
 * @example
 * ```tsx
 * <Select label="Plan" placeholder="Choose an option">
 *   <SelectItem id="free">Free</SelectItem>
 *   <SelectItem id="pro">Pro</SelectItem>
 * </Select>
 * ```
 */
export const Select = forwardRef<HTMLDivElement, SelectProps<object>>(function Select(
  { label, placeholder, className, children, isDisabled, ...rest },
  ref,
) {
  return (
    <AriaSelect
      ref={ref}
      isDisabled={isDisabled}
      className={cn("flex w-[240px] flex-col gap-1", isDisabled && "opacity-55", className)}
      {...rest}
    >
      {label ? <Label className="text-text-primary text-xs font-semibold">{label}</Label> : null}
      <AriaButton className={triggerClass}>
        <SelectValue className="text-text-primary data-[placeholder]:text-text-secondary flex-1">
          {({ defaultChildren, isPlaceholder }) =>
            isPlaceholder ? (placeholder ?? "Select an option") : defaultChildren
          }
        </SelectValue>
        <svg viewBox="0 0 10 7" className="size-2.5 shrink-0" aria-hidden="true">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </AriaButton>
      <Popover className={popoverClass}>
        <ListBox className="outline-none">{children}</ListBox>
      </Popover>
    </AriaSelect>
  );
}) as <T extends object>(
  props: SelectProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement;

export interface SelectItemProps extends Omit<ListBoxItemProps, "className" | "children"> {
  className?: string;
  children?: React.ReactNode;
}

/** Item inside a `<Select>`. */
export const SelectItem = (({ className, children, ...rest }: SelectItemProps) => (
  <ListBoxItem className={cn(itemClass, className)} {...rest}>
    {children}
  </ListBoxItem>
)) as (props: SelectItemProps) => React.ReactElement;
