import figma from "@figma/code-connect";
import { Radio, RadioGroup } from "./Radio";

/**
 * Code Connect mapping for Figma `Radio/Recommended` (node 8:34).
 * Connected to the single Radio component; consumers wrap multiple in a
 * `<RadioGroup>` in code.
 */
figma.connect(Radio, "https://www.figma.com/design/vMAQsMSeIcoHMumNzKLeaQ/?node-id=8-34", {
  props: {
    isDisabled: figma.enum("state", {
      disabled: true,
    }),
  },
  example: ({ isDisabled }) => (
    <RadioGroup aria-label="Choose one">
      <Radio value="a" isDisabled={isDisabled}>
        Option A
      </Radio>
      <Radio value="b">Option B</Radio>
    </RadioGroup>
  ),
});
