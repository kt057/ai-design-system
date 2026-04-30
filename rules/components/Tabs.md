# Tabs / TabList / Tab / TabPanel

## Purpose

Switch between sibling views (tabs) without navigating away.

## Import

```tsx
import { Tabs, TabList, Tab, TabPanel } from "@kt057/ai-design-system";
```

## Props

### `<Tabs>`

| Prop                 | Type                 | Default | Description                            |
| -------------------- | -------------------- | ------- | -------------------------------------- |
| `selectedKey`        | `string`             | —       | Controlled selected tab.               |
| `defaultSelectedKey` | `string`             | —       | Uncontrolled initial tab.              |
| `onSelectionChange`  | `(key: Key) => void` | —       | Fires when the selected tab changes.   |
| `className`          | `string`             | —       | Extra Tailwind classes on the wrapper. |
| `children`           | `ReactNode`          | —       | `TabList` + `TabPanel` children.       |

Inherits every prop from [`react-aria-components`'s `Tabs`](https://react-spectrum.adobe.com/react-aria/Tabs.html).

### `<Tab>`

| Prop         | Type        | Default | Description                             |
| ------------ | ----------- | ------- | --------------------------------------- |
| `id`         | `string`    | —       | **Required.** Pairs the tab to a panel. |
| `isDisabled` | `boolean`   | `false` | Skip the tab in keyboard nav.           |
| `className`  | `string`    | —       | Extra Tailwind classes (later wins).    |
| `children`   | `ReactNode` | —       | Visible label.                          |

### `<TabPanel>`

| Prop        | Type        | Default | Description                          |
| ----------- | ----------- | ------- | ------------------------------------ |
| `id`        | `string`    | —       | **Required.** Matches a `<Tab id>`.  |
| `className` | `string`    | —       | Extra Tailwind classes (later wins). |
| `children`  | `ReactNode` | —       | Panel body.                          |

## Examples

```tsx
<Tabs defaultSelectedKey="overview">
  <TabList aria-label="Sections">
    <Tab id="overview">Overview</Tab>
    <Tab id="settings">Settings</Tab>
  </TabList>
  <TabPanel id="overview">Overview content…</TabPanel>
  <TabPanel id="settings">Settings content…</TabPanel>
</Tabs>
```

## Accessibility

- `role="tablist"`, `role="tab"`, `role="tabpanel"` are applied automatically.
- Arrow keys cycle through tabs; Home / End jump to first / last.
- `aria-selected` and `aria-controls` are wired by React Aria.
- Always pass `aria-label` (or `aria-labelledby`) on `<TabList>`.

## Don'ts

- ❌ Don't render a `<Tab>` without a matching `<TabPanel id>`.
- ❌ Don't put navigation links in `<Tabs>` — use a list of `<Link>`s for navigation.
