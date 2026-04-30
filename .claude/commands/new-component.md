---
description: Scaffold and implement a new component in this design system following the project conventions.
argument-hint: <ComponentName>
---

You are about to add the `$ARGUMENTS` component to `@kichikawa57/ai-design-system`.

Delegate this work to the **component-author** subagent. Pass it the following directive verbatim:

> Add a new `$ARGUMENTS` component to this design system following `rules/02-component-conventions.md` exactly. Use `src/components/Button/` as the reference. Create the implementation, stories (including a `play` interaction story), unit tests, an `index.ts` barrel, the matching `rules/components/$ARGUMENTS.md`, update `src/index.ts`, then run `pnpm lint && pnpm typecheck && pnpm test && pnpm build:manifest`. Finally run `pnpm changeset` to record the change.

If you are unsure which `react-aria-components` primitive to wrap, pause and ask the user before implementing.
