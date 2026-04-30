# `@kt057/ai-design-system`

> AI-friendly React design system built on **React Aria Components** and **Tailwind CSS v4**.

The design system is small on purpose. Every component ships with:

- **Accessibility from `react-aria-components`** — keyboard, focus, and screen-reader behavior come from a battle-tested library.
- **Token-based theming** — override CSS custom properties to rebrand. No `<ThemeProvider>` required.
- **AI-readable docs** — a generated [`components.json`](./components.json) manifest plus per-component [`rules/`](./rules/) so AI agents can use the package correctly in any consumer project.

---

## Installation

> **Note**: This package is not yet on the npm registry, so `npm install @kt057/ai-design-system` does not work yet. To try it out, build a tarball from this repo and install that directly. This section will be replaced once npm publishing is unblocked — see [Roadmap](#roadmap).

### 1. Build a tarball (in this repo)

```bash
pnpm install
pnpm pack
# → kt057-ai-design-system-<version>.tgz is created at the repo root
```

The `prepack` hook runs `pnpm run build` (library + CSS + manifest) automatically, so `pnpm pack` alone produces a fully-built tarball.

### 2. Install in the consuming project

```bash
pnpm add /absolute/path/to/kt057-ai-design-system-<version>.tgz
# example:
# pnpm add /Users/you/works/ai-design-system/kt057-ai-design-system-0.2.0.tgz
```

This is an absolute-path install, so to use the same tarball on another machine you'll need to copy the `.tgz` file over.

### 3. Load the stylesheet

Once, at the entry point of your app:

```ts
import "@kt057/ai-design-system/styles.css";
```

This is **self-contained** — it ships pre-compiled with the design tokens and every Tailwind utility class our components actually use. You do **not** need to install or configure Tailwind in your consumer project to render our components correctly. (If you happen to use Tailwind v4 yourself, you can also reference our tokens like `bg-brand-500` from your own code by re-declaring `@theme` in your CSS — see [Theming](#theming).)

Works seamlessly in Next.js App Router: every component is shipped as a React Client Component (`"use client"` is preserved at the top of the bundle), so you can `import { Button }` directly from a Server Component.

## Usage

```tsx
import { Button } from "@kt057/ai-design-system";

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
@import "@kt057/ai-design-system/styles.css";

:root {
  --color-brand-500: oklch(60% 0.2 30);
  --color-brand-600: oklch(52% 0.2 30);
  --color-brand-700: oklch(44% 0.18 30);
}
```

The full token inventory is documented in [`rules/01-design-tokens.md`](./rules/01-design-tokens.md).

## For AI agents

This package is designed to be consumed by AI coding assistants. After install, the agent can read:

- `node_modules/@kt057/ai-design-system/components.json` — machine-readable component manifest (props, variants, examples, source paths).
- `node_modules/@kt057/ai-design-system/rules/` — markdown specifications for every component plus global conventions.

The recommended prompt is: _"Use components from `@kt057/ai-design-system`. Before writing code, read its `rules/00-overview.md` and `rules/components/<Name>.md` for any component you plan to use."_

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

## Roadmap

- [ ] **Publish to the npm registry** — the first publish of this scoped package currently fails with `E404 Not Found - PUT` (same pattern as [npm/cli#8678](https://github.com/npm/cli/issues/8678) / [#8976](https://github.com/npm/cli/issues/8976)) and is under investigation.
- [ ] **CI-driven release via GitHub Actions** — `.github/workflows/release.yml` is wired up but fails on every push to `main` for the same reason. It will be re-enabled once npm publishing works.
- [ ] **Replace the Installation section** — once the package is on npm, swap the tarball workflow back out for plain `pnpm add @kt057/ai-design-system`.

## License

[MIT](./LICENSE)
