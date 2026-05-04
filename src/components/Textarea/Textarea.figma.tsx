import figma from "@figma/code-connect";
import { Textarea } from "./Textarea";

/**
 * Code Connect mapping for Figma `Textarea/Recommended` (node 9:63).
 * Figma `state` axis maps to `isInvalid` / `isDisabled`.
 */
figma.connect(
  Textarea,
  "https://www.figma.com/design/vMAQsMSeIcoHMumNzKLeaQ/?node-id=9-63",
  {
    props: {
      isInvalid: figma.enum("state", {
        error: true,
      }),
      isDisabled: figma.enum("state", {
        disabled: true,
      }),
    },
    example: ({ isInvalid, isDisabled }) => (
      <Textarea
        label="Label"
        placeholder="Placeholder"
        isInvalid={isInvalid}
        isDisabled={isDisabled}
      />
    ),
  },
);
