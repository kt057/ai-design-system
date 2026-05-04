import figma from "@figma/code-connect";
import { Card } from "./Card";

/**
 * Code Connect mapping for Figma `Card/Recommended` (node 6:44).
 * Variants: default | outlined | elevated.
 */
figma.connect(Card, "https://www.figma.com/design/vMAQsMSeIcoHMumNzKLeaQ/?node-id=6-44", {
  props: {
    variant: figma.enum("variant", {
      default: "default",
      outlined: "outlined",
      elevated: "elevated",
    }),
  },
  example: ({ variant }) => (
    <Card variant={variant}>
      <p>Card body</p>
    </Card>
  ),
});
