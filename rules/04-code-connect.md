# 04 — Code Connect

This package ships [Figma Code Connect](https://www.figma.com/code-connect-docs/) templates so that when a designer selects a component in the Figma library `vMAQsMSeIcoHMumNzKLeaQ` (file _Design System_), the Dev Mode panel shows the **exact** import + JSX usage from this package — variants, sizes, and states included. The goal is that an AI coding agent (or a human) never has to guess "is there an existing `Button`?" — the answer comes from Figma itself.

## Where templates live

Each component has a sibling `*.figma.tsx` file:

```
src/components/<Name>/
├── <Name>.tsx
├── <Name>.figma.tsx     # ← Code Connect template
├── <Name>.stories.tsx
├── <Name>.test.tsx
└── index.ts
```

`*.figma.tsx` files are excluded from the published bundle (see `tsconfig.build.json` and `figma.config.json`). They are tooling-only.

## File contract

Every Code Connect template **must**:

1. Import the actual component from its sibling source file (`./<Name>`), not from the package barrel. This keeps the import statement that Code Connect _shows_ in Figma resolvable to `@kt057/ai-design-system` via `figma.config.json`'s `importPaths`.
2. Call `figma.connect(<Component>, "https://www.figma.com/design/vMAQsMSeIcoHMumNzKLeaQ/?node-id=<X-Y>", { … })`. Use the canonical library file key (`vMAQsMSeIcoHMumNzKLeaQ`) and the node ID listed in [Figma node map](#figma-node-map) below.
3. Map every Figma variant axis that has a code counterpart with `figma.enum(...)`. Runtime-only states (`hover`, `focus`, `default`, `open`, `visited`, …) **must not** be mapped — they are derived from React Aria data attributes at runtime.
4. Provide an `example: (props) => <JSX />` that compiles without errors. The `pnpm typecheck` and `pnpm code-connect:parse` commands both validate this.

## Figma node map

| Component | Figma node | Variant axes (Figma → code)                                  |
| --------- | ---------- | ------------------------------------------------------------ |
| Alert     | `10:40`    | `variant` → `variant`                                        |
| Avatar    | `7:32`     | `size`, `shape` → `size`, `shape`                            |
| Badge     | `5:51`     | `variant` → `variant`                                        |
| Button    | `4:74`     | `variant`, `size`, `state` → `variant`, `size`, `isDisabled` |
| Card      | `6:44`     | `variant` → `variant`                                        |
| Checkbox  | `6:34`     | `state` → `isSelected` / `isIndeterminate` / `isDisabled`    |
| Divider   | `8:51`     | `orientation` → `orientation`                                |
| Input     | `5:40`     | `state` → `isInvalid` / `isDisabled`                         |
| Link      | `8:48`     | _(none — `state` is runtime-only)_                           |
| Modal     | `11:30`    | _(none — composition only)_                                  |
| Radio     | `8:34`     | `state` → `isDisabled`                                       |
| Select    | `9:42`     | `state` → `isDisabled`                                       |
| Spinner   | `11:29`    | `size` → `size`                                              |
| Switch    | `8:41`     | `state` → `isSelected` / `isDisabled`                        |
| Tabs      | `10:45`    | _(none — composition only)_                                  |
| Textarea  | `9:63`     | `state` → `isInvalid` / `isDisabled`                         |
| Tooltip   | `10:46`    | _(none — composition only)_                                  |

## Workflow

### Authoring or updating a template

```bash
pnpm code-connect:parse        # validate locally — no Figma token needed
```

A successful parse means: the import resolves, the node URL matches `figma.config.json`'s `documentUrlSubstitutions`, and the example compiles. Always run this before committing.

### Publishing to Figma

```bash
FIGMA_ACCESS_TOKEN=... pnpm code-connect:publish
```

Publishing updates the Code Connect mappings on Figma's side so designers see the new snippet in Dev Mode. Notes:

- The token requires the `code_connect:write` scope.
- Publishing requires a Figma **Organization or Enterprise** plan. On a personal Pro plan, publishing returns 403 — `code-connect:parse` is the only feedback loop available.
- CI is the canonical publisher. Don't publish from a developer machine in normal flow.

### Removing a mapping

```bash
FIGMA_ACCESS_TOKEN=... pnpm code-connect:unpublish
```

This removes the mappings declared in the local templates from Figma. Use when retiring a component.

## Mandatory for new components

When adding a component (see [`02-component-conventions.md`](./02-component-conventions.md)):

1. Create `src/components/<Name>/<Name>.figma.tsx` alongside the implementation, stories, and tests.
2. Add the new node ID to the [Figma node map](#figma-node-map) table above.
3. `pnpm code-connect:parse` must pass.
4. `pnpm build:manifest` regenerates `components.json` so `codeConnectPath` and `figmaNodeUrl` are populated for the new component.

## Why this exists

Without Code Connect, an AI agent that gets a Figma frame as input will re-implement a `<button>` from scratch every time, even though `Button` already exists in this package. Code Connect closes that loop by making the existing implementation discoverable directly from the design — which is exactly the failure mode the [PeopleX article on Figma + AI coding](https://zenn.dev/peoplex_blog/articles/2604-figma-ai-coding-practices) flags as the single biggest source of churn.
