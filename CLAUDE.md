# CLAUDE.md

This file is the entry point Claude (and other AI agents) should read before working in this repository.

## What this repo is

`@kt057/ai-design-system` — a small, AI-friendly React design system. See [`README.md`](./README.md) for the human-facing summary.

## Specs are in `rules/`, not in code comments

The full specification of how this design system works lives in [`rules/`](./rules/). **Always read it before making changes**:

1. [`rules/00-overview.md`](./rules/00-overview.md) — what this package is and is not.
2. [`rules/01-design-tokens.md`](./rules/01-design-tokens.md) — how theming works.
3. [`rules/02-component-conventions.md`](./rules/02-component-conventions.md) — how to add or change a component. **Mandatory when authoring components.**
4. [`rules/03-accessibility.md`](./rules/03-accessibility.md) — checklist that applies to every component.
5. [`rules/components/<Name>.md`](./rules/components/) — per-component rule files.

If a rule is missing, write it. If a rule is wrong, fix it. The rules are part of the package and are shipped to consumers.

## Toolchain

| Concern        | Tool                                                           |
| -------------- | -------------------------------------------------------------- |
| Components     | `react-aria-components`                                        |
| Styling        | Tailwind CSS v4 (`@theme` tokens) + `class-variance-authority` |
| Build          | `tsup` (single ESM bundle + DTS)                               |
| Test           | `vitest` (unit + Storybook browser mode)                       |
| Stories / docs | `storybook` v10 (`@storybook/react-vite`)                      |
| Lint / format  | `eslint` v9 (flat config) + `prettier` v3                      |
| Versioning     | `@changesets/cli`                                              |
| Updates        | Renovate (config in `renovate.json`)                           |

## Shortcuts

| Goal                         | Command               |
| ---------------------------- | --------------------- |
| Run Storybook                | `pnpm dev`            |
| Build the library + manifest | `pnpm build`          |
| Run all tests                | `pnpm test`           |
| Lint                         | `pnpm lint`           |
| Format                       | `pnpm format`         |
| Type-check                   | `pnpm typecheck`      |
| Add a changeset              | `pnpm changeset`      |
| Regenerate `components.json` | `pnpm build:manifest` |

## Adding a new component (TL;DR)

1. Read [`rules/02-component-conventions.md`](./rules/02-component-conventions.md).
2. Use `Button` ([`src/components/Button/`](./src/components/Button/)) as your reference implementation.
3. Create:
   - `src/components/<Name>/<Name>.tsx`
   - `src/components/<Name>/<Name>.stories.tsx` (with at least one interaction story)
   - `src/components/<Name>/<Name>.test.tsx`
   - `src/components/<Name>/index.ts`
4. Export from `src/index.ts`.
5. Write `rules/components/<Name>.md` mirroring the Button rule file.
6. Run `pnpm build:manifest` and commit the resulting `components.json`.
7. Run `pnpm changeset` to record a release note.

## Don'ts

- ❌ **Don't** introduce CSS-in-JS, Sass, or PostCSS plugins beyond Tailwind. The styling story is Tailwind v4 + tokens, full stop.
- ❌ **Don't** add a runtime theme `Provider`. Theming is done by overriding CSS custom properties.
- ❌ **Don't** hand-edit `components.json` — it's regenerated from source on every build.
- ❌ **Don't** disable ESLint rules locally. If a rule is wrong, fix the rule in `eslint.config.js`.
- ❌ **Don't** publish from a developer machine. Releases go through the GitHub Actions `release` workflow only.
