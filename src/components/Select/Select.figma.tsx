import figma from "@figma/code-connect";
import { Select, SelectItem } from "./Select";

/**
 * Code Connect mapping for Figma `Select/Recommended` (node 9:42).
 * Figma `state=open` is a runtime-only state and has no prop counterpart.
 */
figma.connect(
  Select,
  "https://www.figma.com/design/vMAQsMSeIcoHMumNzKLeaQ/?node-id=9-42",
  {
    props: {
      isDisabled: figma.enum("state", {
        disabled: true,
      }),
    },
    example: ({ isDisabled }) => (
      <Select label="Label" isDisabled={isDisabled}>
        <SelectItem id="a">Option A</SelectItem>
        <SelectItem id="b">Option B</SelectItem>
      </Select>
    ),
  },
);
