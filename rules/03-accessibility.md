# 03 — Accessibility checklist

The package is built on [`react-aria-components`](https://react-spectrum.adobe.com/react-aria/), which means most accessibility concerns — focus management, keyboard interaction, ARIA roles and labelling, screen-reader announcements — are handled for you. This file enumerates the things that React Aria **cannot** do automatically and that you must verify on every component or feature.

## Per-component checklist

Before merging any component change, verify:

- [ ] **Visible focus.** A `focus-visible` style is applied with sufficient contrast against every variant's background. Default uses `ring-2 ring-brand-500`. Do not remove the ring.
- [ ] **Touch target ≥ 44px.** Smallest interactive component must reach `var(--spacing-touch)` in at least one axis when used at its smallest size.
- [ ] **Color contrast.** Text-on-background must meet WCAG AA (4.5:1 for body, 3:1 for large text and UI). Verify with the `@storybook/addon-a11y` panel.
- [ ] **No information by color alone.** State (error, success, disabled) must also be conveyed via icon, text, or `aria-*` attribute.
- [ ] **Disabled vs read-only.** Use `isDisabled` only when the control truly cannot be activated. Prefer `isReadOnly` when the value is fixed but still focusable. Never style something to look disabled while leaving it focusable.
- [ ] **Pending state communicated.** Long-running buttons use `isPending`; the rule files must mention it.
- [ ] **Labels.** Every input-like component must accept and render an accessible label. If a component is purely iconographic, require an `aria-label` prop and document it.

## Storybook integration

The `@storybook/addon-a11y` addon is enabled with `a11y.test = "todo"` in [`.storybook/preview.ts`](../.storybook/preview.ts). This means a11y checks run alongside Storybook tests and surface as warnings. Resolve them before shipping.

## Testing accessibility

For component-level smoke tests, prefer asserting on **roles and accessible names** in `*.test.tsx`:

```tsx
screen.getByRole("button", { name: "Save" });
screen.getByRole("dialog", { name: /confirm/i });
```

Avoid `getByTestId` unless there is no semantic equivalent.

## What we deliberately do not test

- Cross-browser screen-reader output. Track this with manual QA on releases.
- Localized keyboard layouts beyond what React Aria covers. If you encounter a regression, file an issue against `react-aria` upstream first.
