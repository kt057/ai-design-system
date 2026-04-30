# Card

## Purpose

Container for related content. Use it to group a title + body inside a list, dashboard, or settings page.

## Import

```tsx
import { Card } from "@kt057/ai-design-system";
```

## Props

| Prop        | Type                                    | Default     | Description                          |
| ----------- | --------------------------------------- | ----------- | ------------------------------------ |
| `variant`   | `"default" \| "outlined" \| "elevated"` | `"default"` | Visual treatment.                    |
| `title`     | `ReactNode`                             | —           | Optional bold heading.               |
| `className` | `string`                                | —           | Extra Tailwind classes (later wins). |
| `children`  | `ReactNode`                             | —           | Card body.                           |

Renders a `<section>` element.

## Variants

- `default` — 1 px subtle border.
- `outlined` — 1 px stronger border.
- `elevated` — drop shadow, no border.

## Examples

```tsx
<Card title="Profile">User details go here.</Card>
<Card variant="elevated" title="Stats">42 active users</Card>
<Card variant="outlined">No title — just a wrapper.</Card>
```

## Accessibility

- Renders as a `<section>`. Pass `aria-labelledby` if you have a heading outside the title slot.
- The `title` slot is wrapped in a generic `<div>`, not a heading. If your card title should be a heading, render your own inside `children`.

## Don'ts

- ❌ Don't put interactive cards inside `<Card>` — make the whole card a `<Button>` instead, or place a single primary action inside.
