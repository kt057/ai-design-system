import { forwardRef } from "react";
import {
  TextField,
  Label,
  TextArea as AriaTextArea,
  Text,
  FieldError,
  type TextFieldProps,
} from "react-aria-components";
import { cn } from "@/utils/cn";

const fieldClass = cn(
  "bg-bg-default flex w-full rounded-md",
  "border-border-default border px-3 py-2",
  "text-text-primary text-base",
  "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
  "data-[focus-within]:border-border-focus data-[focus-within]:border-2 data-[focus-within]:px-[11px] data-[focus-within]:py-[7px]",
);

export interface TextareaProps extends Omit<TextFieldProps, "className" | "children"> {
  /** Label rendered above the textarea. Required for accessibility. */
  label: React.ReactNode;
  /** Helper text rendered below the textarea. */
  helperText?: React.ReactNode;
  /** Error message rendered when `isInvalid`. */
  errorMessage?: React.ReactNode;
  /** Visible row count (height heuristic). */
  rows?: number;
  /** Native placeholder. */
  placeholder?: string;
  /** Override or extend the wrapper Tailwind class list. */
  className?: string;
}

/**
 * Multi-line text input. Built on `react-aria-components`'s `<TextField>` +
 * `<TextArea>` so label / helper / error slots are wired automatically.
 *
 * @example
 * ```tsx
 * <Textarea label="Message" placeholder="Type your message…" rows={4} />
 * ```
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    label,
    helperText,
    errorMessage,
    rows = 4,
    placeholder,
    className,
    isInvalid,
    isDisabled,
    ...rest
  },
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
        <AriaTextArea
          ref={ref}
          rows={rows}
          placeholder={placeholder}
          className="placeholder:text-text-secondary text-text-primary w-full resize-y bg-transparent text-base outline-none"
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
