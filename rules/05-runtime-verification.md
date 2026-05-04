# 05 — Runtime verification (Playwright MCP)

> **For AI agents:** when you finish implementing or modifying a component, follow this file to verify its actual runtime behavior in a real browser before declaring the task done.

## Why this exists

The other layers of verification cover different things:

| Layer                                | What it checks                                                                                  |
| ------------------------------------ | ----------------------------------------------------------------------------------------------- |
| `pnpm lint` / `pnpm typecheck`       | Static correctness.                                                                             |
| `pnpm test` (Vitest unit + jsdom)    | Logic and prop wiring in isolation.                                                             |
| `pnpm test` (Vitest browser mode)    | Headless **regression** of `play(...)` stories in Chromium. Fails the build when a story breaks. |
| Storycap + reg-suit                  | Pixel-level **visual** regression.                                                              |
| **Playwright MCP (this file)**       | AI-driven **dynamic behavior** check on the work you just produced — focus traps, dialog open/close, keyboard order, validation, loading state DOM. |

Vitest browser mode is for the build to police regressions. Playwright MCP is for **you, the agent, to convince yourself the thing actually works** before opening a PR.

## Prerequisites

- Project has [`/.mcp.json`](../.mcp.json) declaring the `playwright` server. Approve it once via `/mcp` in Claude Code.
- Chromium is installed: `pnpm install:playwright:browser` has been run at least once.
- No other process is bound to port `6006`.

## Procedure (mandatory after every component change)

1. **Start Storybook in the background.**

   ```bash
   pnpm dev
   ```

   Run with `run_in_background: true`. Capture the output stream so you can detect readiness.

2. **Wait until Storybook is listening.** Poll `http://localhost:6006` (or watch the dev log for `Storybook ... started`) before the next step. Do not race the navigate call.

3. **Open the target story by iframe URL.**

   ```
   http://localhost:6006/iframe.html?id=components-<name>--<story-kebab>
   ```

   Use `mcp__playwright__browser_navigate`. Always use the `iframe.html?id=...` form — the `?path=...` form loads the manager UI, not the isolated story.

4. **Snapshot the DOM** with `mcp__playwright__browser_snapshot`. Confirm the accessible role and name match the rule file in `rules/components/<Name>.md`.

5. **Drive the interactions you actually changed.** At minimum:
   - The primary callback fires on click (`browser_click` then re-snapshot, looking for state changes such as `data-pressed`, callback evidence, or DOM updates).
   - Keyboard activation works (`browser_press_key` with `Enter`, `Space`, `Escape`, or `Tab` as appropriate).
   - The disabled / read-only state suppresses the callback.
   - Any component-specific behavior listed in `rules/components/<Name>.md` (focus trap on Modal, expand/collapse on Tabs, validation on Input, etc.).

6. **Stop the background dev server** when done. Leaving it running blocks subsequent invocations.

## In scope

- Focus management and focus traps (Modal, Tabs, Select).
- Keyboard navigation (arrow keys, Tab, Enter, Space, Escape, Home/End where relevant).
- Form validation timing and error message rendering.
- Open/close transitions and `data-*` state attributes from React Aria.
- Loading and pending state DOM updates.

## Out of scope

- Pixel-level visual diffs — that is **reg-suit's** job. Don't chase 1px differences here.
- Cross-browser screen reader output — manual QA on releases (see [`03-accessibility.md`](./03-accessibility.md)).
- Network-mocked end-to-end flows — this package has no network calls.

## Story URL cheatsheet

All stories use the title pattern `Components/<Name>`, so iframe ids are `components-<name>--<story>`.

| Component | Default story URL                                                                            |
| --------- | -------------------------------------------------------------------------------------------- |
| Button    | `http://localhost:6006/iframe.html?id=components-button--primary`                            |
| Modal     | `http://localhost:6006/iframe.html?id=components-modal--default` (story name varies — list with `mcp__playwright__browser_navigate` + snapshot if unsure) |
| Input     | `http://localhost:6006/iframe.html?id=components-input--default`                             |
| Select    | `http://localhost:6006/iframe.html?id=components-select--default`                            |
| Tabs      | `http://localhost:6006/iframe.html?id=components-tabs--default`                              |

When unsure of the exact story name, navigate to `http://localhost:6006/` first and read the sidebar.

## When to skip this rule

You may skip Playwright MCP only when:

- The change is documentation-only (no code touched).
- The change is purely a token/constant rename with no rendering effect.
- The component has no user interaction (e.g. `Divider`, `Spinner`).

In every other case, run the procedure. The cost is small; the cost of shipping a broken focus trap is not.
