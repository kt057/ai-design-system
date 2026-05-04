import figma from "@figma/code-connect";
import { Badge } from "./Badge";

/**
 * Code Connect mapping for Figma `Badge/Recommended` (node 5:51).
 * Variants: info | success | warning | error | neutral.
 */
figma.connect(Badge, "https://www.figma.com/design/vMAQsMSeIcoHMumNzKLeaQ/?node-id=5-51", {
  props: {
    variant: figma.enum("variant", {
      info: "info",
      success: "success",
      warning: "warning",
      error: "error",
      neutral: "neutral",
    }),
  },
  example: ({ variant }) => <Badge variant={variant}>Label</Badge>,
});
