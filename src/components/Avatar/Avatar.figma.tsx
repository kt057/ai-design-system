import figma from "@figma/code-connect";
import { Avatar } from "./Avatar";

/**
 * Code Connect mapping for Figma `Avatar/Recommended` (node 7:32).
 * Axes: size × shape.
 */
figma.connect(Avatar, "https://www.figma.com/design/vMAQsMSeIcoHMumNzKLeaQ/?node-id=7-32", {
  props: {
    size: figma.enum("size", {
      small: "sm",
      medium: "md",
      large: "lg",
    }),
    shape: figma.enum("shape", {
      circle: "circle",
      square: "square",
    }),
  },
  example: ({ size, shape }) => (
    <Avatar size={size} shape={shape} alt="Ada Lovelace" initials="AL" />
  ),
});
