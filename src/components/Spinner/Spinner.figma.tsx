import figma from "@figma/code-connect";
import { Spinner } from "./Spinner";

/**
 * Code Connect mapping for Figma `Spinner/Recommended` (node 11:29).
 * Axis: size.
 */
figma.connect(
  Spinner,
  "https://www.figma.com/design/vMAQsMSeIcoHMumNzKLeaQ/?node-id=11-29",
  {
    props: {
      size: figma.enum("size", {
        small: "sm",
        medium: "md",
        large: "lg",
      }),
    },
    example: ({ size }) => <Spinner size={size} />,
  },
);
