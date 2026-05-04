# `rules/` — Specification for AI agents and contributors

This folder is the **single source of truth** for how this design system is meant to be used and extended. It is shipped as part of the npm package, so consumers (including AI coding agents) can read the same rules from `node_modules/@kt057/ai-design-system/rules/`.

## How to read this directory

| File                                                           | Audience                 | Read it when…                                                                                       |
| -------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------- |
| [`00-overview.md`](./00-overview.md)                           | Consumers + AI agents    | You are about to use the package for the first time.                                                |
| [`01-design-tokens.md`](./01-design-tokens.md)                 | Consumers + AI agents    | You need to theme, override colors, or pick a token.                                                |
| [`02-component-conventions.md`](./02-component-conventions.md) | Contributors + AI agents | You are about to write a new component or refactor one.                                             |
| [`03-accessibility.md`](./03-accessibility.md)                 | Everyone                 | You are reviewing or implementing any component.                                                    |
| [`04-code-connect.md`](./04-code-connect.md)                   | Contributors + AI agents | You are adding/updating a `*.figma.tsx` mapping or wiring a component to its Figma source-of-truth. |
| [`05-runtime-verification.md`](./05-runtime-verification.md)   | Contributors + AI agents | You finished implementing a component and want to drive it in a real browser before opening a PR.   |
| [`components/*.md`](./components/)                             | Consumers + AI agents    | You need the contract for a specific component.                                                     |

## How AI agents should consume the rules

1. Always read [`00-overview.md`](./00-overview.md) first — it tells you what the system is and is not.
2. When asked to use a component, read the matching file in [`components/`](./components/). Do not invent props.
3. When asked to add a new component, read [`02-component-conventions.md`](./02-component-conventions.md) and follow it exactly. Generate a matching `components/<Name>.md`.
4. Cross-check against [`../components.json`](../components.json) — that file is the machine-readable mirror of these rules and is regenerated from the source code on every build.
5. After you finish coding, run the procedure in [`05-runtime-verification.md`](./05-runtime-verification.md) to drive the component in a real browser via Playwright MCP.

If a rule and the source code disagree, **the source code wins** — but please open an issue or update this directory in the same change.
