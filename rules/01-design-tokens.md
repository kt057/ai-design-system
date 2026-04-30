# 01 — Design tokens

All visual decisions in this package go through tokens. Components must **never** hard-code color, radius, spacing, or motion values that bypass the token layer.

## Where tokens live

Tokens are declared in [`src/styles/globals.css`](../src/styles/globals.css) inside a Tailwind v4 `@theme { … }` block. That block has two effects:

1. It exposes each token as a CSS custom property (e.g. `--color-brand-primary`).
2. It registers the token with Tailwind, so utility classes like `bg-brand-primary`, `text-text-secondary`, and `rounded-md` resolve to the same values.

The palette mirrors the Figma library `vMAQsMSeIcoHMumNzKLeaQ` (file _Design System_).

## Token families

| Family     | Prefix                     | Examples                                                                            |
| ---------- | -------------------------- | ----------------------------------------------------------------------------------- |
| Color      | `--color-*`                | `brand-primary`, `text-primary`, `bg-default`, `border-focus`, `info-bg`            |
| Radius     | `--radius-*`               | `sm` (4 px), `md` (6 px), `lg` (8 px), `xl` (12 px), `pill`                         |
| Spacing    | `--spacing-*`              | adds `touch` (44 px); base scale is Tailwind's (1=4 px, 2=8 px, 3=12 px …)          |
| Typography | `--font-*`, `--text-*`     | `sans`, `mono`, `xxs` (11), `xs` (12), `sm` (13), `base` (14), `md` (16), `lg` (18) |
| Elevation  | `--shadow-*`               | `sm`, `md`, `lg`                                                                    |
| Motion     | `--duration-*`, `--ease-*` | `fast`, `base`, `slow`, `standard`                                                  |

### Color tokens (full list)

| Token                         | Hex                   | Used for                                    |
| ----------------------------- | --------------------- | ------------------------------------------- |
| `--color-brand-primary`       | `#3b82f5`             | Primary button bg, link, focus ring, switch |
| `--color-brand-primary-hover` | `#2e6bd9`             | Hover state of brand surfaces               |
| `--color-text-primary`        | `#121a24`             | Default body text, input value              |
| `--color-text-secondary`      | `#667080`             | Helper text, placeholder, secondary tabs    |
| `--color-text-inverse`        | `#ffffff`             | Text on brand / primary surfaces            |
| `--color-text-error`          | `#d93345`             | Error helper text                           |
| `--color-bg-default`          | `#ffffff`             | Card / modal / input background             |
| `--color-bg-subtle`           | `#f7f7fa`             | Hovered list rows, inset surfaces           |
| `--color-border-default`      | `#dbdee3`             | Default 1 px borders                        |
| `--color-border-strong`       | `#b2b8c2`             | Hovered borders, checkbox / radio outlines  |
| `--color-border-error`        | `#d93345`             | Invalid input borders                       |
| `--color-border-focus`        | `#3b82f5`             | Focus ring color                            |
| `--color-info-bg` / `-fg`     | `#e8f5ff` / `#1a66bf` | Info badge / alert                          |
| `--color-success-bg` / `-fg`  | `#e5f7eb` / `#1a8033` | Success badge / alert                       |
| `--color-warning-bg` / `-fg`  | `#fff2d9` / `#a6730d` | Warning badge / alert                       |
| `--color-error-bg` / `-fg`    | `#ffebed` / `#cf123b` | Error badge / alert                         |
| `--color-neutral-bg` / `-fg`  | `#f0f0f2` / `#4d4d52` | Neutral badge                               |

## Rules for component authors

1. **Use Tailwind utilities first** (`bg-brand-primary`, `rounded-md`, `text-text-secondary`). They reference the tokens automatically.
2. If a property has no Tailwind utility, reference the CSS variable explicitly: `transition-duration: var(--duration-fast)`.
3. **Never** use hex codes, raw `rgb(...)`, or one-off pixel values inside a component. If you find yourself wanting to, add a token first.

## Rules for consumers

Consumers theme the system by **overriding** tokens after importing the stylesheet:

```css
/* app.css */
@import "@kt057/ai-design-system/styles.css";

:root {
  --color-brand-primary: #14a37f; /* override to a teal hue */
  --color-brand-primary-hover: #0e7a5e;
}
```

This is the only supported customization path. The package does not accept theme objects via React Context.
