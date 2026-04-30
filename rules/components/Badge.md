# Badge

## Purpose

A small inline label that conveys status. Use it for tags, list-row state, and simple counters.

## Import

```tsx
import { Badge } from "@kt057/ai-design-system";
```

## Props

| Prop        | Type                                                       | Default  | Description                          |
| ----------- | ---------------------------------------------------------- | -------- | ------------------------------------ |
| `variant`   | `"info" \| "success" \| "warning" \| "error" \| "neutral"` | `"info"` | Color and meaning.                   |
| `className` | `string`                                                   | —        | Extra Tailwind classes (later wins). |
| `children`  | `ReactNode`                                                | —        | Badge label.                         |

Also accepts every prop a `<span>` accepts.

## Variants

- `info`, `success`, `warning`, `error`, `neutral` — each has matching `bg-*` and `text-*` tokens.

## Examples

```tsx
<Badge>Beta</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="error">Failed</Badge>
```

## Accessibility

Badges are decorative by default. If the badge is the only signal of a status change, wrap it in an element that announces the change to assistive tech (e.g. `<div role="status">…<Badge /></div>`).

## Don'ts

- ❌ Don't put interactive content inside a `<Badge>` — use a `<Button>` instead.
- ❌ Don't override colors via `style={{ background: ... }}`. Override tokens.
