# Input

## Purpose

Single-line text input with label, helper, and error slots wired automatically.

## Import

```tsx
import { Input } from "@kt057/ai-design-system";
```

## Props

| Prop           | Type                      | Default  | Description                                    |
| -------------- | ------------------------- | -------- | ---------------------------------------------- |
| `label`        | `ReactNode`               | —        | **Required.** Visible label.                   |
| `helperText`   | `ReactNode`               | —        | Below-field hint shown when not invalid.       |
| `errorMessage` | `ReactNode`               | —        | Below-field error shown when `isInvalid`.      |
| `isInvalid`    | `boolean`                 | `false`  | Marks the field as invalid (red border + msg). |
| `isDisabled`   | `boolean`                 | `false`  | Disable input and dim the wrapper.             |
| `value`        | `string`                  | —        | Controlled value.                              |
| `defaultValue` | `string`                  | —        | Uncontrolled initial value.                    |
| `onChange`     | `(value: string) => void` | —        | Fires on every keystroke.                      |
| `placeholder`  | `string`                  | —        | Native placeholder.                            |
| `type`         | `string`                  | `"text"` | Native input type.                             |
| `className`    | `string`                  | —        | Extra Tailwind classes on the wrapper.         |

Inherits every prop from [`react-aria-components`'s `TextField`](https://react-spectrum.adobe.com/react-aria/TextField.html).

## States

- `default`, `focus`, `invalid`, `disabled` — all driven by props above.

## Examples

```tsx
<Input label="Email" type="email" placeholder="you@example.com" />

<Input
  label="Username"
  isInvalid
  errorMessage="That username is taken."
/>

<Input label="API key" isDisabled value="••••" />
```

## Accessibility

- The label is associated with the input via React Aria.
- `helperText` is exposed as `aria-describedby`.
- `errorMessage` is exposed via `aria-errormessage` when `isInvalid`.

## Don'ts

- ❌ Don't omit `label`. If you have no visible label, pass `aria-label` instead.
- ❌ Don't render the same field twice as both `helperText` and `errorMessage` — only the active one is shown.
