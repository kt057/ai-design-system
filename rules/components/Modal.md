# Modal / ModalTrigger

## Purpose

Centered confirmation dialog. Use it for irreversible actions, complex forms that need to interrupt the page, and short flows that warrant focus.

## Import

```tsx
import { Modal, ModalTrigger } from "@kt057/ai-design-system";
```

## Props

### `<ModalTrigger>` (alias of React Aria's `DialogTrigger`)

| Prop           | Type                      | Default | Description                         |
| -------------- | ------------------------- | ------- | ----------------------------------- |
| `isOpen`       | `boolean`                 | —       | Controlled open state.              |
| `defaultOpen`  | `boolean`                 | `false` | Uncontrolled initial state.         |
| `onOpenChange` | `(open: boolean) => void` | —       | Fires when the dialog opens/closes. |
| `children`     | `[Trigger, Modal]`        | —       | Exactly two children.               |

### `<Modal>`

| Prop            | Type         | Default     | Description                             |
| --------------- | ------------ | ----------- | --------------------------------------- |
| `title`         | `ReactNode`  | —           | **Required.** Heading.                  |
| `subtitle`      | `ReactNode`  | —           | Optional sub-heading.                   |
| `cancelLabel`   | `ReactNode`  | `"Cancel"`  | Pass `null` to hide the cancel button.  |
| `confirmLabel`  | `ReactNode`  | `"Confirm"` | Pass `null` to hide the confirm button. |
| `onCancel`      | `() => void` | —           | Fires when Cancel is pressed.           |
| `onConfirm`     | `() => void` | —           | Fires when Confirm is pressed.          |
| `isDismissable` | `boolean`    | `false`     | Allow click-outside / Escape to close.  |
| `className`     | `string`     | —           | Extra Tailwind classes (later wins).    |
| `children`      | `ReactNode`  | —           | Body content.                           |

## Examples

```tsx
<ModalTrigger>
  <Button>Delete account</Button>
  <Modal
    title="Delete account?"
    subtitle="This cannot be undone."
    confirmLabel="Delete"
    onConfirm={deleteAccount}
  >
    Your data will be permanently removed.
  </Modal>
</ModalTrigger>
```

## Accessibility

- Renders inside a `role="dialog"` element with focus trap and scroll lock.
- Escape closes when `isDismissable`. The first focusable element is focused on open.
- The title is bound via `aria-labelledby`.

## Don'ts

- ❌ Don't render long forms inside a modal — use a full page.
- ❌ Don't render a modal without a title — screen readers will read it nameless.
- ❌ Don't suppress both Cancel and Confirm — the user has no way to dismiss the dialog.
