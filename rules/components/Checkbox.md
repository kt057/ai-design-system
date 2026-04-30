# Checkbox

## Purpose

Boolean (or tri-state) toggle. Use it for opt-ins, list-row selection, and "I agree" controls.

## Import

```tsx
import { Checkbox } from "@kt057/ai-design-system";
```

## Props

| Prop              | Type                            | Default | Description                          |
| ----------------- | ------------------------------- | ------- | ------------------------------------ |
| `isSelected`      | `boolean`                       | —       | Controlled checked state.            |
| `defaultSelected` | `boolean`                       | `false` | Uncontrolled initial state.          |
| `isIndeterminate` | `boolean`                       | `false` | Render the mixed (—) state.          |
| `isDisabled`      | `boolean`                       | `false` | Disable activation and focus.        |
| `onChange`        | `(isSelected: boolean) => void` | —       | Fires when the box is toggled.       |
| `className`       | `string`                        | —       | Extra Tailwind classes (later wins). |
| `children`        | `ReactNode`                     | —       | Visible label.                       |

Inherits every prop from [`react-aria-components`'s `Checkbox`](https://react-spectrum.adobe.com/react-aria/Checkbox.html).

## States

- `unchecked`, `checked`, `indeterminate`, `disabled` — all driven by props above.

## Examples

```tsx
<Checkbox onChange={setAccepted}>I agree</Checkbox>

<Checkbox isIndeterminate>Some selected</Checkbox>

<Checkbox isDisabled>Locked</Checkbox>
```

## Accessibility

- Native `role="checkbox"` with `aria-checked={true|false|"mixed"}`.
- Activation: Space.
- Label is automatically associated via the wrapper `<label>`.

## Don'ts

- ❌ Don't omit `children`. If you have no visible label, pass `aria-label` instead.
- ❌ Don't pair a checkbox with a non-controllable parent state. Wire `onChange`.
