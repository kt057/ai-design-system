---
"@kt057/ai-design-system": minor
---

Implement the full Figma component library and migrate design tokens.

- Replace the previous oklch token palette with the Figma palette (blue
  brand, neutral grays, status colors). Radius scale switches to 4 / 6 / 8 px,
  and a 6-step type ramp (11 / 12 / 13 / 14 / 16 / 18 px) is exposed.
- Rework `Button` to the Figma spec: `variant: primary | secondary`, sizes
  `sm | md | lg` (24 / 36 / 44 px tall). The `ghost` and `danger` variants
  are removed; theme via tokens for custom palettes.
- Add 16 new components: `Alert`, `Avatar`, `Badge`, `Card`, `Checkbox`,
  `Divider`, `Input`, `Link`, `Modal` (+ `ModalTrigger`), `Radio`
  (+ `RadioGroup`), `Select` (+ `SelectItem`), `Spinner`, `Switch`, `Tabs`
  (+ `TabList`, `Tab`, `TabPanel`), `Textarea`, `Tooltip` (+ `TooltipTrigger`).

Each component ships with React Aria primitives, CVA variant styling,
Storybook stories (incl. interaction `play` tests), Vitest unit tests, and a
`rules/components/<Name>.md` rule file.
