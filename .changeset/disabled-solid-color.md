---
"@kt057/ai-design-system": patch
---

Replace `opacity` on disabled states with solid color tokens across every component (Button, Checkbox, Input, Link, Radio, Select, Switch, Tabs, Textarea). The visual outcome is the same (muted, non-actionable controls), but the previous `opacity` filter created GPU compositing layers whose alpha-blended pixels were not bit-deterministic across runs, which made VRT screenshots flake every CI run.

New design tokens:

- `--color-text-disabled` (`#a6acb8`) — disabled foreground / label text.
- `--color-bg-disabled` (`#f0f1f3`) — disabled filled surfaces (Button, Input, Textarea, Select trigger, Checkbox / Radio chrome).
- `--color-border-disabled` (`#c5cad1`) — disabled borders and the muted indicator color (Switch track, Checkbox tick, Radio dot).

Consumers can theme any of these by overriding the variable.

Also: Checkbox's tick and Radio's dot are now conditionally rendered (instead of always-rendered + `scale-0`), so they no longer create a hidden GPU layer that contributes to VRT non-determinism.
