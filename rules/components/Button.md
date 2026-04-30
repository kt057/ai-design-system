# Button

## Purpose

A themeable, accessible button. Use it for any action a user takes — `submit`, `cancel`, dialog triggers, etc.

## Import

```tsx
import { Button } from "@kt057/ai-design-system";
import "@kt057/ai-design-system/styles.css"; // once, at app root
```

## Props

| Prop         | Type                       | Default     | Description                                                        |
| ------------ | -------------------------- | ----------- | ------------------------------------------------------------------ |
| `variant`    | `"primary" \| "secondary"` | `"primary"` | Visual style.                                                      |
| `size`       | `"sm" \| "md" \| "lg"`     | `"md"`      | Height, padding, and font size.                                    |
| `fullWidth`  | `boolean`                  | `false`     | Stretch to fill the container's width.                             |
| `isDisabled` | `boolean`                  | `false`     | Disable activation (still rendered, not focusable).                |
| `isPending`  | `boolean`                  | `false`     | Mark the button as performing an async action (cursor + a11y).     |
| `onPress`    | `(e: PressEvent) => void`  | —           | Activation callback. **Use this, not `onClick`.**                  |
| `className`  | `string`                   | —           | Extra Tailwind classes; merged with `tailwind-merge` (later wins). |
| `children`   | `ReactNode`                | —           | Button label.                                                      |

The component also accepts every prop from [`react-aria-components`'s `Button`](https://react-spectrum.adobe.com/react-aria/Button.html#props), such as `type`, `form`, `excludeFromTabOrder`, etc.

## Variants

- **variant:** `primary` (filled brand color) | `secondary` (white with border)
- **size:** `sm` (24 px tall) | `md` (36 px) | `lg` (44 px)

## Examples

**Primary action**

```tsx
<Button onPress={() => save()}>Save</Button>
```

**Secondary, full width**

```tsx
<Button variant="secondary" fullWidth onPress={() => cancel()}>
  Cancel
</Button>
```

**Async**

```tsx
<Button isPending={isSaving} onPress={() => save()}>
  Save
</Button>
```

**Theming via tokens** (in the consumer app)

```css
:root {
  --color-brand-primary: #14a37f;
  --color-brand-primary-hover: #0e7a5e;
}
```

## Accessibility

You get for free, from `react-aria-components`:

- Keyboard activation (Enter / Space).
- Correct `disabled` semantics — focus is removed and `onPress` is suppressed when `isDisabled`.
- `data-pressed`, `data-hovered`, `data-focused`, `data-focus-visible`, `data-disabled`, `data-pending` data attributes for styling.
- Screen-reader announcement of the pending state.

You must still:

- Provide a meaningful label as `children`. If the button is icon-only, pass `aria-label`.
- Pair a `<Button>` with surrounding text in a way that makes its action clear out of context (toolbar, table row, etc.).

## Don'ts

- ❌ **Don't** use `onClick` — React Aria's `onPress` covers mouse, touch, and keyboard uniformly.
- ❌ **Don't** disable + style as enabled. Use `isDisabled` consistently.
- ❌ **Don't** override colors via `style={{ background: ... }}`. Override tokens instead.
- ❌ **Don't** wrap a `<Button>` in an `<a>` to make it a link. Use `<Link>` for navigation.
