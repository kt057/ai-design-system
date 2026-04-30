import { forwardRef } from "react";
import {
  TextField,
  Label,
  Input as AriaInput,
  Text,
  FieldError,
  type TextFieldProps,
} from "react-aria-components";
import { cn } from "@/utils/cn";

const fieldClass = cn(
  "bg-bg-default flex w-full items-center rounded-md",
  "border-border-default border px-3 py-2",
  "text-text-primary text-base",
  "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
  "data-[focus-within]:border-border-focus data-[focus-within]:border-2 data-[focus-within]:px-[11px] data-[focus-within]:py-[7px]",
);

export interface InputProps extends Omit<TextFieldProps, "className" | "children"> {
  /** Label rendered above the input. Required for accessibility. */
  label: React.ReactNode;
  /** Helper text rendered below the input. */
  helperText?: React.ReactNode;
  /** Error message rendered below the input when `isInvalid`. */
  errorMessage?: React.ReactNode;
  /** Native input `type`. */
  type?: React.ComponentProps<"input">["type"];
  /** Native placeholder. */
  placeholder?: string;
  /** Override or extend the wrapper Tailwind class list. */
  className?: string;
}

/**
 * Single-line text input. Built on `react-aria-components`'s `<TextField>` so
 * label, description, and error wiring are automatic.
 *
 * @example
 * ```tsx
 * <Input label="Email" type="email" placeholder="you@example.com" />
 * <Input label="Email" isInvalid errorMessage="Invalid email" />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, helperText, errorMessage, type, placeholder, className, isInvalid, isDisabled, ...rest },
  ref,
) {
  return (
    <TextField
      isInvalid={isInvalid}
      isDisabled={isDisabled}
      className={cn("flex w-[240px] flex-col gap-1", isDisabled && "opacity-55", className)}
      {...rest}
    >
      <Label className="text-text-primary text-xs font-semibold">{label}</Label>
      <div
        className={cn(fieldClass, isInvalid && "border-border-error border-2 px-[11px] py-[7px]")}
      >
        <AriaInput
          ref={ref}
          type={type}
          placeholder={placeholder}
          className="placeholder:text-text-secondary text-text-primary flex-1 bg-transparent text-base outline-none"
        />
      </div>
      {helperText && !isInvalid ? (
        <Text slot="description" className="text-text-secondary text-xxs">
          {helperText}
        </Text>
      ) : null}
      {isInvalid && errorMessage ? (
        <FieldError className="text-text-error text-xxs">{errorMessage}</FieldError>
      ) : null}
    </TextField>
  );
});
