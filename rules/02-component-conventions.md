# 02 — Component conventions

> **For AI agents:** when you are asked to add a new component to this package, follow this file as a checklist. Every step is mandatory.

## Directory layout

Each component lives under `src/components/<Name>/` with **exactly** these files:

```
src/components/<Name>/
├── <Name>.tsx           # implementation
├── <Name>.stories.tsx   # Storybook stories (mandatory)
├── <Name>.test.tsx      # Vitest unit tests (mandatory)
└── index.ts             # barrel — re-exports the component and its prop type
```

Then re-export the component from [`src/index.ts`](../src/index.ts) and add a rule file to [`rules/components/<Name>.md`](./components/).

## Implementation rules

1. **Build on `react-aria-components`.** Wrap the matching primitive (`Button`, `Dialog`, `ListBox`, …). Do not reimplement keyboard handling, focus management, or ARIA wiring. Only escape to `react-aria` hooks if a primitive does not exist.
2. **Style with CVA + Tailwind.** Define a single `cva(...)` block per component (`<componentName>Styles`). Variants must be string unions, never booleans-pretending-to-be-strings (except for `fullWidth`-style flags).
3. **Use `cn()` to compose classes** from `@/utils/cn`. This is the only safe way to let consumers extend classes via the `className` prop.
4. **Forward refs.** Use `forwardRef` and type the ref against the underlying DOM element.
5. **Forward all unknown props** by spreading `...rest` onto the React Aria primitive. This preserves slot props and data attributes the library relies on.
6. **JSDoc every public prop.** The doc comment is what AI agents see — describe purpose, allowed values, and default. The component's main JSDoc must include a runnable `@example` block.
7. **No side effects on import.** Never run code at module top level beyond `cva(...)` and constant declarations.

## Variant rules

- Each variant axis must have a `defaultVariants` entry. Defaults should be the safest, most generic option.
- When a variant adds non-color styling (e.g. a `loading` state), prefer composing data attributes from React Aria (`data-pressed`, `data-disabled`, `data-pending`) instead of inventing new state props.
- Don't ship a variant unless there is at least one Storybook story for it.

## Story rules

Every component must have:

- One story per variant value (`Primary`, `Secondary`, …).
- One story per size (if applicable).
- A `Disabled` story.
- At least one **interaction story** (uses `play(...)` with `userEvent` and `expect`) — typically a click and a keyboard activation.

Stories live in `<Name>.stories.tsx` and use `Meta<typeof Component>` / `StoryObj<typeof meta>`.

## Test rules

`<Name>.test.tsx` must cover, at minimum:

1. Renders its children / required label.
2. Calls the primary callback (`onPress`, `onChange`, …) on user interaction.
3. **Does not** call the primary callback when in a disabled or read-only state.
4. Applies the requested variant (assert on a variant-specific class fragment).
5. Merges a consumer `className` correctly (asserts `tailwind-merge` actually wins).

Use `@testing-library/react` + `@testing-library/user-event`. Don't reach for `fireEvent` unless you have a strong reason.

## Rule file (`rules/components/<Name>.md`)

For every component, ship a markdown rule file mirroring [`rules/components/Button.md`](./components/Button.md). The structure is:

1. **Purpose** — one sentence.
2. **Import** — exact import line.
3. **Props** — table (name, type, default, description).
4. **Variants** — list of variant values per axis.
5. **Examples** — minimal + common-case.
6. **Accessibility** — what React Aria gives you for free + what you still must do as a consumer.
7. **Don'ts** — common misuses to avoid.

This file is what AI agents read when asked to use the component in a downstream project.
