# Textarea

## Purpose

Multi-line text input with the same label / helper / error slots as `<Input>`. Use it for free-form messages and descriptions.

## Import

```tsx
import { Textarea } from "@kt057/ai-design-system";
```

## Props

| Prop           | Type                      | Default | Description                            |
| -------------- | ------------------------- | ------- | -------------------------------------- |
| `label`        | `ReactNode`               | —       | **Required.** Visible label.           |
| `helperText`   | `ReactNode`               | —       | Hint shown when not invalid.           |
| `errorMessage` | `ReactNode`               | —       | Error shown when `isInvalid`.          |
| `rows`         | `number`                  | `4`     | Visible rows.                          |
| `isInvalid`    | `boolean`                 | `false` | Red border + error message.            |
| `isDisabled`   | `boolean`                 | `false` | Disable input.                         |
| `value`        | `string`                  | —       | Controlled value.                      |
| `defaultValue` | `string`                  | —       | Uncontrolled initial value.            |
| `onChange`     | `(value: string) => void` | —       | Fires on every keystroke.              |
| `placeholder`  | `string`                  | —       | Native placeholder.                    |
| `className`    | `string`                  | —       | Extra Tailwind classes on the wrapper. |

## Examples

```tsx
<Textarea label="Message" placeholder="Type your message…" rows={4} />

<Textarea
  label="Bio"
  isInvalid
  errorMessage="Bio must be under 200 characters."
/>
```

## Accessibility

- Label is wired automatically via React Aria.
- `helperText` becomes `aria-describedby`; `errorMessage` becomes `aria-errormessage`.

## Don'ts

- ❌ Don't use a textarea for a single-line value. Use `<Input>` instead.
- ❌ Don't disable resizing without a strong reason — it hurts long-form writing.
