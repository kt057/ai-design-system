import figma from "@figma/code-connect";
import { Alert } from "./Alert";

/**
 * Code Connect mapping for Figma `Alert/Recommended` (node 10:40).
 * Variants: variant = info | success | warning | error.
 */
figma.connect(Alert, "https://www.figma.com/design/vMAQsMSeIcoHMumNzKLeaQ/?node-id=10-40", {
  props: {
    variant: figma.enum("variant", {
      info: "info",
      success: "success",
      warning: "warning",
      error: "error",
    }),
  },
  example: ({ variant }) => (
    <Alert variant={variant} title="Heads up">
      Something happened.
    </Alert>
  ),
});
