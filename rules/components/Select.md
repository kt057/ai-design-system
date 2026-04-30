# Select / SelectItem

## Purpose

Single-select dropdown. Use it for choosing one value from a small-to-medium list. For 5+ options with search use a future `<ComboBox>`.

## Import

```tsx
import { Select, SelectItem } from "@kt057/ai-design-system";
```

## Props

### `<Select>`

| Prop                 | Type                 | Default | Description                               |
| -------------------- | -------------------- | ------- | ----------------------------------------- |
| `label`              | `ReactNode`          | —       | Visible label rendered above the trigger. |
| `placeholder`        | `string`             | —       | Shown when no value is selected.          |
| `selectedKey`        | `string`             | —       | Controlled selected value.                |
| `defaultSelectedKey` | `string`             | —       | Uncontrolled initial value.               |
| `onSelectionChange`  | `(key: Key) => void` | —       | Fires when selection changes.             |
| `isDisabled`         | `boolean`            | `false` | Disable the trigger.                      |
| `className`          | `string`             | —       | Extra Tailwind classes on the wrapper.    |
| `children`           | `ReactNode`          | —       | A set of `<SelectItem>` children.         |

Inherits every prop from [`react-aria-components`'s `Select`](https://react-spectrum.adobe.com/react-aria/Select.html).

### `<SelectItem>`

| Prop        | Type        | Default | Description                          |
| ----------- | ----------- | ------- | ------------------------------------ |
| `id`        | `string`    | —       | **Required.** Identifies the option. |
| `className` | `string`    | —       | Extra Tailwind classes (later wins). |
| `children`  | `ReactNode` | —       | Visible label.                       |

## Examples

```tsx
<Select label="Plan" placeholder="Choose an option" onSelectionChange={setPlan}>
  <SelectItem id="free">Free</SelectItem>
  <SelectItem id="pro">Pro</SelectItem>
  <SelectItem id="team">Team</SelectItem>
</Select>
```

## Accessibility

- The trigger button is associated with the listbox via `aria-haspopup`.
- Arrow keys cycle options; Enter / Space selects.
- Escape closes the popover.

## Don'ts

- ❌ Don't render a `<SelectItem>` outside a `<Select>` — it won't be keyboard-navigable.
- ❌ Don't omit `id` on `<SelectItem>` — selection won't be reportable.
