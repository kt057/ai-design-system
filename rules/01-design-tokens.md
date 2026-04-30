# 01 — Design tokens

All visual decisions in this package go through tokens. Components must **never** hard-code color, radius, spacing, or motion values that bypass the token layer.

## Where tokens live

Tokens are declared in [`src/styles/globals.css`](../src/styles/globals.css) inside a Tailwind v4 `@theme { … }` block. That block has two effects:

1. It exposes each token as a CSS custom property (e.g. `--color-brand-500`).
2. It registers the token with Tailwind, so utility classes like `bg-brand-500`, `text-fg-default`, and `rounded-md` resolve to the same values.

## Token families

| Family     | Prefix                     | Examples                                             |
| ---------- | -------------------------- | ---------------------------------------------------- |
| Color      | `--color-*`                | `brand-500`, `fg-default`, `bg-subtle`, `danger-600` |
| Radius     | `--radius-*`               | `xs`, `sm`, `md`, `lg`, `xl`, `pill`                 |
| Spacing    | `--spacing-*`              | adds custom keys (`touch`); base scale is Tailwind's |
| Typography | `--font-*`, `--text-*`     | `sans`, `mono`, `xs`, `sm`, `base`, `lg`, `xl`       |
| Elevation  | `--shadow-*`               | `sm`, `md`, `lg`                                     |
| Motion     | `--duration-*`, `--ease-*` | `fast`, `base`, `slow`, `standard`                   |

## Rules for component authors

1. **Use Tailwind utilities first** (`bg-brand-600`, `rounded-md`, `text-fg-muted`). They reference the tokens automatically.
2. If a property has no Tailwind utility, reference the CSS variable explicitly: `transition-duration: var(--duration-fast)`.
3. **Never** use hex codes, raw `rgb(...)`, or one-off pixel values inside a component. If you find yourself wanting to, add a token first.
4. Dark mode is handled at the token layer (see `@media (prefers-color-scheme: dark)` in `globals.css`). Components should not branch on color scheme themselves.

## Rules for consumers

Consumers theme the system by **overriding** tokens after importing the stylesheet:

```css
/* app.css */
@import "@kichikawa57/ai-design-system/styles.css";

:root {
  --color-brand-500: oklch(60% 0.2 30); /* override to a warm hue */
}
```

This is the only supported customization path. The package does not accept theme objects via React Context.
