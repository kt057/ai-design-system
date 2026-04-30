# Link

## Purpose

Accessible inline link. Use it for navigation; use `<Button>` for actions.

## Import

```tsx
import { Link } from "@kt057/ai-design-system";
```

## Props

| Prop         | Type                      | Default | Description                                                        |
| ------------ | ------------------------- | ------- | ------------------------------------------------------------------ |
| `href`       | `string`                  | —       | Destination URL. Omit to make a `button`-like link with `onPress`. |
| `target`     | `string`                  | —       | Standard anchor target.                                            |
| `onPress`    | `(e: PressEvent) => void` | —       | Activation callback. **Use this, not `onClick`.**                  |
| `isDisabled` | `boolean`                 | `false` | Disable activation.                                                |
| `className`  | `string`                  | —       | Extra Tailwind classes (later wins).                               |
| `children`   | `ReactNode`               | —       | Link label.                                                        |

Inherits every prop from [`react-aria-components`'s `Link`](https://react-spectrum.adobe.com/react-aria/Link.html).

## Examples

```tsx
<Link href="/docs">Read the docs</Link>
<Link onPress={() => navigate("/profile")}>Profile</Link>
<Link href="https://example.com" target="_blank" rel="noopener">External</Link>
```

## Accessibility

- Renders an anchor with the right `aria-disabled` when `isDisabled`.
- Visited styling uses CSS `:visited` — fully theme-able via `--color-text-secondary`.

## Don'ts

- ❌ Don't put a `<Button>` inside a `<Link>` (or vice versa).
- ❌ Don't use `<Link>` for actions that don't navigate. Use `<Button variant="ghost">` (future) or `<Button>`.
