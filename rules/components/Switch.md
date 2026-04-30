# Switch

## Purpose

A two-state toggle. Use it for settings that take effect immediately (notifications, dark mode). For form-style on/off use `<Checkbox>`.

## Import

```tsx
import { Switch } from "@kt057/ai-design-system";
```

## Props

| Prop              | Type                            | Default | Description                          |
| ----------------- | ------------------------------- | ------- | ------------------------------------ |
| `isSelected`      | `boolean`                       | —       | Controlled on/off state.             |
| `defaultSelected` | `boolean`                       | `false` | Uncontrolled initial state.          |
| `onChange`        | `(isSelected: boolean) => void` | —       | Fires when toggled.                  |
| `isDisabled`      | `boolean`                       | `false` | Disable activation.                  |
| `className`       | `string`                        | —       | Extra Tailwind classes (later wins). |
| `children`        | `ReactNode`                     | —       | Visible label.                       |

Inherits every prop from [`react-aria-components`'s `Switch`](https://react-spectrum.adobe.com/react-aria/Switch.html).

## States

- `off`, `on`, `disabled`.

## Examples

```tsx
<Switch onChange={setEnabled}>Notifications</Switch>
<Switch defaultSelected>Dark mode</Switch>
<Switch isDisabled>Locked</Switch>
```

## Accessibility

- Native `role="switch"` with `aria-checked={true|false}`.
- Activation: Space.

## Don'ts

- ❌ Don't use a switch for an action that doesn't take effect immediately. Use a `<Checkbox>` + a Save button instead.
- ❌ Don't omit `children`. Pass `aria-label` if the label is not visible.
