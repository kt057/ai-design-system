# Radio / RadioGroup

## Purpose

Single-select group of options. Use it when at most one choice is valid; for multi-select use `<Checkbox>`.

## Import

```tsx
import { Radio, RadioGroup } from "@kt057/ai-design-system";
```

## Props

### `<RadioGroup>`

| Prop           | Type                      | Default | Description                            |
| -------------- | ------------------------- | ------- | -------------------------------------- |
| `label`        | `ReactNode`               | —       | Group label (rendered above options).  |
| `value`        | `string`                  | —       | Controlled selected value.             |
| `defaultValue` | `string`                  | —       | Uncontrolled initial value.            |
| `onChange`     | `(value: string) => void` | —       | Fires when selection changes.          |
| `isDisabled`   | `boolean`                 | `false` | Disable the entire group.              |
| `className`    | `string`                  | —       | Extra Tailwind classes on the wrapper. |
| `children`     | `ReactNode`               | —       | A set of `<Radio>` items.              |

### `<Radio>`

| Prop         | Type        | Default | Description                          |
| ------------ | ----------- | ------- | ------------------------------------ |
| `value`      | `string`    | —       | Identifies this option.              |
| `isDisabled` | `boolean`   | `false` | Disable just this radio.             |
| `className`  | `string`    | —       | Extra Tailwind classes (later wins). |
| `children`   | `ReactNode` | —       | Visible label.                       |

## Examples

```tsx
<RadioGroup label="Plan" defaultValue="pro">
  <Radio value="free">Free</Radio>
  <Radio value="pro">Pro</Radio>
  <Radio value="team">Team</Radio>
</RadioGroup>
```

## Accessibility

- The group is a native `radiogroup`; each `<Radio>` is a native `radio`.
- Arrow keys cycle through options; Space activates.

## Don'ts

- ❌ Don't render a `<Radio>` outside a `<RadioGroup>` — it won't be keyboard-navigable.
- ❌ Don't disable individual radios when the whole group should be disabled — use `<RadioGroup isDisabled>`.
