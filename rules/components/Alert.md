# Alert

## Purpose

Inline banner that communicates the result of an action or a system state. Use it for in-page messages, not for transient toasts (use a dedicated toast component for those).

## Import

```tsx
import { Alert } from "@kt057/ai-design-system";
```

## Props

| Prop        | Type                                          | Default  | Description                          |
| ----------- | --------------------------------------------- | -------- | ------------------------------------ |
| `variant`   | `"info" \| "success" \| "warning" \| "error"` | `"info"` | Severity. Drives icon and color.     |
| `title`     | `ReactNode`                                   | —        | Bold heading.                        |
| `className` | `string`                                      | —        | Extra Tailwind classes (later wins). |
| `children`  | `ReactNode`                                   | —        | Body / description.                  |

## Examples

```tsx
<Alert variant="success" title="Saved">Your changes have been saved.</Alert>
<Alert variant="error" title="Couldn't save">Try again in a moment.</Alert>
```

## Accessibility

- Renders with `role="alert"` so screen readers announce it as soon as it mounts.
- The icon is decorative (`aria-hidden`); the visible text carries the message.

## Don'ts

- ❌ Don't put a `<Button>` inside an alert. Render the action below the alert or as a separate row.
- ❌ Don't suppress the title — without it, the variant alone won't communicate intent.
