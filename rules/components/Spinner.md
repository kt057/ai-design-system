# Spinner

## Purpose

Indeterminate loading indicator. Use it inside buttons, panels, and overlays while data is in flight.

## Import

```tsx
import { Spinner } from "@kt057/ai-design-system";
```

## Props

| Prop        | Type                   | Default     | Description                                   |
| ----------- | ---------------------- | ----------- | --------------------------------------------- |
| `size`      | `"sm" \| "md" \| "lg"` | `"md"`      | 16 / 24 / 32 px.                              |
| `label`     | `string`               | `"Loading"` | Announced to screen readers via `aria-label`. |
| `className` | `string`               | —           | Extra Tailwind classes (later wins).          |

The spinner inherits color from `text-*` — use `<Spinner className="text-brand-primary" />` to color it.

## Examples

```tsx
<Spinner />
<Spinner size="lg" label="Loading user profile" className="text-brand-primary" />
```

## Accessibility

- Renders with `role="status"` and the supplied `aria-label`.
- The SVG itself is `aria-hidden`; only the wrapper is announced.

## Don'ts

- ❌ Don't use a `<Spinner>` for determinate progress. Use a `<ProgressBar>` (future) instead.
- ❌ Don't pass an empty `label` — assistive tech will read nothing.
