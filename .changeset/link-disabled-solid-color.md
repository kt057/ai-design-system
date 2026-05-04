---
"@kt057/ai-design-system": patch
---

`<Link isDisabled>` now uses the solid `--color-text-disabled` token instead of `opacity-50`. The visual outcome is the same (a muted, non-actionable link), but the previous `opacity` filter caused non-deterministic GPU alpha-blending that made the Disabled story flake on every VRT run. Consumers can theme the disabled color by overriding `--color-text-disabled`.
