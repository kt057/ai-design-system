# Divider

## Purpose

A 1-pixel rule that separates groups of content.

## Import

```tsx
import { Divider } from "@kt057/ai-design-system";
```

## Props

| Prop          | Type                         | Default        | Description                          |
| ------------- | ---------------------------- | -------------- | ------------------------------------ |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout direction.                    |
| `className`   | `string`                     | —              | Extra Tailwind classes (later wins). |

Built on [`react-aria-components`'s `Separator`](https://react-spectrum.adobe.com/react-aria/Separator.html), so it accepts every prop that primitive does.

## Examples

```tsx
<Divider />
<div className="flex h-8">
  <span>A</span>
  <Divider orientation="vertical" />
  <span>B</span>
</div>
```

## Accessibility

- Renders with `role="separator"` and the appropriate `aria-orientation`.

## Don'ts

- ❌ Don't use `<Divider>` to draw a border. Use Tailwind's `border-*` utilities for borders.
