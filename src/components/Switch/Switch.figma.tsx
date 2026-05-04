import figma from "@figma/code-connect";
import { Switch } from "./Switch";

/**
 * Code Connect mapping for Figma `Switch/Recommended` (node 8:41).
 * Axis: state — `on` maps to `defaultSelected`, `disabled` to `isDisabled`.
 */
figma.connect(
  Switch,
  "https://www.figma.com/design/vMAQsMSeIcoHMumNzKLeaQ/?node-id=8-41",
  {
    props: {
      isSelected: figma.enum("state", {
        on: true,
      }),
      isDisabled: figma.enum("state", {
        disabled: true,
      }),
    },
    example: ({ isSelected, isDisabled }) => (
      <Switch defaultSelected={isSelected} isDisabled={isDisabled}>
        Label
      </Switch>
    ),
  },
);
