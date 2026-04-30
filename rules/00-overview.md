# 00 — Overview

## What this package is

`@kichikawa57/ai-design-system` is a small, opinionated React design system built around three pillars:

1. **Accessibility by default** — every interactive component is built on [`react-aria-components`](https://react-spectrum.adobe.com/react-aria/), so keyboard, focus, and screen-reader behavior comes from a battle-tested library, not from us.
2. **Token-driven theming** — visual styling is expressed as Tailwind CSS v4 `@theme` variables. Consumers theme the system by overriding CSS custom properties, not by passing color props.
3. **AI-friendly by design** — the package ships [`rules/`](./) (this directory), a generated [`components.json`](../components.json) manifest, and rich JSDoc on every prop, so AI agents can use the components correctly without inspecting source.

## What it is not

- ❌ **Not a kitchen-sink library.** We add components on demand, with full rules, tests, and stories. If a primitive isn't here yet, prefer composing one from `react-aria-components` directly rather than reaching for another design system.
- ❌ **Not a visual brand.** The default tokens are a neutral starting point; the expectation is that consumers override them.
- ❌ **Not styled with CSS-in-JS.** All styling is Tailwind utility classes generated through CVA. The published `dist/styles.css` is self-contained (tokens + utility classes), so consumers just `import "@kichikawa57/ai-design-system/styles.css"` once and render — no Tailwind config required on their side.
- ✅ **Server-Component safe.** The bundle is published with `"use client"` at the top, so it can be imported from a Next.js Server Component without ceremony.

## Public API surface

```ts
import { Button, type ButtonProps, cn } from "@kichikawa57/ai-design-system";
import "@kichikawa57/ai-design-system/styles.css";
```

- **Components** — exported from the package root. See [`components/`](./components/) for one rule file per component.
- **`cn(...inputs)`** — convenience wrapper around `clsx` + `tailwind-merge`. Use it when extending classes from outside the package.
- **`styles.css`** — must be imported exactly once, before any component renders. It declares the design tokens (`@theme`) and base styles.
- **`components.json`** — a machine-readable manifest of every exported component (props, variants, examples). Used by AI agents and tooling.
- **`rules/`** — this directory. Imported via `@kichikawa57/ai-design-system/rules/<file>` if needed.

## Versioning and stability

- Versioned with [Changesets](https://github.com/changesets/changesets) and published to npm.
- Semver: breaking changes to a component's prop signature, default variant, or visual contract bump the **minor** version while we are pre-1.0, and the **major** version after 1.0.
- Token additions are non-breaking. Token removals or renames are breaking.

## Quick links

- [Design tokens](./01-design-tokens.md)
- [Component conventions](./02-component-conventions.md)
- [Accessibility checklist](./03-accessibility.md)
- [Per-component rules](./components/)
