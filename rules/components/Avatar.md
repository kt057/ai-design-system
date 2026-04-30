# Avatar

## Purpose

Visual identity for a user — initials by default, image when supplied.

## Import

```tsx
import { Avatar } from "@kt057/ai-design-system";
```

## Props

| Prop        | Type                   | Default          | Description                                      |
| ----------- | ---------------------- | ---------------- | ------------------------------------------------ |
| `alt`       | `string`               | —                | **Required.** Accessible label / image alt text. |
| `src`       | `string`               | —                | Image URL. Falls back to initials when missing.  |
| `initials`  | `string`               | first 2 of `alt` | Override the displayed initials.                 |
| `size`      | `"sm" \| "md" \| "lg"` | `"md"`           | 28 / 40 / 56 px.                                 |
| `shape`     | `"circle" \| "square"` | `"circle"`       | Square uses a size-matched radius.               |
| `className` | `string`               | —                | Extra Tailwind classes (later wins).             |

## Examples

```tsx
<Avatar alt="Kota Ichikawa" />
<Avatar alt="Kota Ichikawa" src="/me.jpg" size="lg" />
<Avatar alt="K" shape="square" />
```

## Accessibility

- Always pass `alt` — it becomes the `aria-label` and the image's `alt`.
- The visible initials are `aria-hidden`; screen readers read `alt` only, so don't repeat the name.

## Don'ts

- ❌ Don't pass an empty `alt` — it removes the only signal a screen reader has.
- ❌ Don't use `<Avatar>` for purely decorative imagery — use a plain `<img>`.
