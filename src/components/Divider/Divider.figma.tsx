import figma from "@figma/code-connect";
import { Divider } from "./Divider";

/**
 * Code Connect mapping for Figma `Divider/Recommended` (node 8:51).
 * Axis: orientation.
 */
figma.connect(Divider, "https://www.figma.com/design/vMAQsMSeIcoHMumNzKLeaQ/?node-id=8-51", {
  props: {
    orientation: figma.enum("orientation", {
      horizontal: "horizontal",
      vertical: "vertical",
    }),
  },
  example: ({ orientation }) => <Divider orientation={orientation} />,
});
