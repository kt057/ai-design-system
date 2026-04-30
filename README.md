# `@kichikawa57/ai-design-system`

> AI-friendly React design system built on **React Aria Components** and **Tailwind CSS v4**.

The design system is small on purpose. Every component ships with:

- **Accessibility from `react-aria-components`** — keyboard, focus, and screen-reader behavior come from a battle-tested library.
- **Token-based theming** — override CSS custom properties to rebrand. No `<ThemeProvider>` required.
- **AI-readable docs** — a generated [`components.json`](./components.json) manifest plus per-component [`rules/`](./rules/) so AI agents can use the package correctly in any consumer project.

---

## Installation

```bash
npm install @kichikawa57/ai-design-system
# or
pnpm add @kichikawa57/ai-design-system
# or
yarn add @kichikawa57/ai-design-system
```

Then, **once at the root of your app**:

```ts
import "@kichikawa57/ai-design-system/styles.css";
```

This is **self-contained** — it ships pre-compiled with the design tokens and every Tailwind utility class our components actually use. You do **not** need to install or configure Tailwind in your consumer project to render our components correctly. (If you happen to use Tailwind v4 yourself, you can also reference our tokens like `bg-brand-500` from your own code by re-declaring `@theme` in your CSS — see [Theming](#theming).)

Works seamlessly in Next.js App Router: every component is shipped as a React Client Component (`"use client"` is preserved at the top of the bundle), so you can `import { Button }` directly from a Server Component.

## Usage

```tsx
import { Button } from "@kichikawa57/ai-design-system";

export function SaveBar() {
  return (
    <Button variant="primary" onPress={() => save()}>
      Save
    </Button>
  );
}
```

See the per-component rule files in [`rules/components/`](./rules/components/) for the full prop contract, examples, and accessibility notes.

## Theming

Override any token after importing the stylesheet:

```css
@import "@kichikawa57/ai-design-system/styles.css";

:root {
  --color-brand-500: oklch(60% 0.2 30);
  --color-brand-600: oklch(52% 0.2 30);
  --color-brand-700: oklch(44% 0.18 30);
}
```

The full token inventory is documented in [`rules/01-design-tokens.md`](./rules/01-design-tokens.md).

## For AI agents

This package is designed to be consumed by AI coding assistants. After install, the agent can read:

- `node_modules/@kichikawa57/ai-design-system/components.json` — machine-readable component manifest (props, variants, examples, source paths).
- `node_modules/@kichikawa57/ai-design-system/rules/` — markdown specifications for every component plus global conventions.

The recommended prompt is: _"Use components from `@kichikawa57/ai-design-system`. Before writing code, read its `rules/00-overview.md` and `rules/components/<Name>.md` for any component you plan to use."_

## Contributing

This repo is managed primarily through Claude Code. The conventions live in [`rules/`](./rules/) and the AI orchestration files live in [`.claude/`](./.claude/).

Quick reference:

```bash
pnpm install              # install
pnpm dev                  # start Storybook on http://localhost:6006
pnpm test                 # vitest (unit + storybook browser mode)
pnpm lint                 # eslint
pnpm format               # prettier
pnpm typecheck            # tsc --noEmit
pnpm build                # build dist + regenerate components.json
pnpm changeset            # record a release note
```

To add a new component, see [`rules/02-component-conventions.md`](./rules/02-component-conventions.md). Or, in Claude Code, run `/new-component <Name>`.

## License

[MIT](./LICENSE)
