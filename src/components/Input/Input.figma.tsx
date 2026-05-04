import figma from "@figma/code-connect";
import { Input } from "./Input";

/**
 * Code Connect mapping for Figma `Input/Recommended` (node 5:40).
 * Figma `state` axis maps to `isInvalid` / `isDisabled`. The `default` and
 * `focus` states have no code counterpart — focus is a runtime-only state.
 */
figma.connect(
  Input,
  "https://www.figma.com/design/vMAQsMSeIcoHMumNzKLeaQ/?node-id=5-40",
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
      <Input
        label="Label"
        placeholder="Placeholder"
        isInvalid={isInvalid}
        isDisabled={isDisabled}
      />
    ),
  },
);
