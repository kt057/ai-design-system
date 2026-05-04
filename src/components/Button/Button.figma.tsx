import figma from "@figma/code-connect";
import { Button } from "./Button";

/**
 * Code Connect mapping for the Figma component `Button/Recommended` (node 4:74)
 * in the design-system file `vMAQsMSeIcoHMumNzKLeaQ`.
 *
 * Figma variant axes:
 *   - variant: primary | secondary
 *   - size:    small   | medium   | large
 *   - state:   default | hover    | disabled
 *
 * `state=hover` is a presentational state in Figma only — it has no code
 * counterpart because hover is handled by `react-aria-components` data
 * attributes at runtime. `state=disabled` maps to the `isDisabled` prop.
 */
figma.connect(
  Button,
  "https://www.figma.com/design/vMAQsMSeIcoHMumNzKLeaQ/?node-id=4-74",
  {
    props: {
      variant: figma.enum("variant", {
        primary: "primary",
        secondary: "secondary",
      }),
      size: figma.enum("size", {
        small: "sm",
        medium: "md",
        large: "lg",
      }),
      isDisabled: figma.enum("state", {
        disabled: true,
      }),
    },
    example: ({ variant, size, isDisabled }) => (
      <Button variant={variant} size={size} isDisabled={isDisabled}>
        Label
      </Button>
    ),
  },
);
