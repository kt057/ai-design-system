import figma from "@figma/code-connect";
import { Checkbox } from "./Checkbox";

/**
 * Code Connect mapping for Figma `Checkbox/Recommended` (node 6:34).
 * Figma `state` axis maps to React Aria's `isSelected` / `isIndeterminate` /
 * `isDisabled` props.
 */
figma.connect(Checkbox, "https://www.figma.com/design/vMAQsMSeIcoHMumNzKLeaQ/?node-id=6-34", {
  props: {
    isSelected: figma.enum("state", {
      checked: true,
    }),
    isIndeterminate: figma.enum("state", {
      indeterminate: true,
    }),
    isDisabled: figma.enum("state", {
      disabled: true,
    }),
  },
  example: ({ isSelected, isIndeterminate, isDisabled }) => (
    <Checkbox
      defaultSelected={isSelected}
      isIndeterminate={isIndeterminate}
      isDisabled={isDisabled}
    >
      Label
    </Checkbox>
  ),
});
