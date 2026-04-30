# Tooltip

## Purpose

Floating hint shown on hover or focus. Use it to surface short, supporting information about a focusable control.

## Import

```tsx
import { Tooltip, TooltipTrigger } from "@kt057/ai-design-system";
```

## Props

### `<TooltipTrigger>`

Inherits every prop from [`react-aria-components`'s `TooltipTrigger`](https://react-spectrum.adobe.com/react-aria/Tooltip.html#tooltiptrigger).

Common ones: `delay` (open delay in ms), `closeDelay`, `isOpen`, `defaultOpen`, `onOpenChange`.

### `<Tooltip>`

| Prop        | Type        | Default | Description                          |
| ----------- | ----------- | ------- | ------------------------------------ |
| `className` | `string`    | —       | Extra Tailwind classes (later wins). |
| `children`  | `ReactNode` | —       | Tooltip body.                        |

Plus every prop the React Aria `Tooltip` accepts (placement, offset, …).

## Examples

```tsx
<TooltipTrigger>
  <Button aria-label="Save">💾</Button>
  <Tooltip>Save your work</Tooltip>
</TooltipTrigger>
```

## Accessibility

- Tooltip is associated with the trigger via `aria-describedby`.
- Tooltip opens on focus (keyboard) and on hover (pointer).
- Escape closes the tooltip.

## Don'ts

- ❌ Don't put interactive content (links, buttons) inside a tooltip — it isn't reachable.
- ❌ Don't use a tooltip as the only label for an icon-only button. Use `aria-label` on the button itself.
