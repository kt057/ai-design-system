import figma from "@figma/code-connect";
import { Tooltip, TooltipTrigger } from "./Tooltip";
import { Button } from "../Button/Button";

/**
 * Code Connect mapping for Figma `Tooltip/Recommended` (node 10:46).
 * The Figma node has no variant axes — this snippet shows the canonical
 * `<TooltipTrigger>` + `<Tooltip>` composition.
 */
figma.connect(
  Tooltip,
  "https://www.figma.com/design/vMAQsMSeIcoHMumNzKLeaQ/?node-id=10-46",
  {
    props: {},
    example: () => (
      <TooltipTrigger>
        <Button>Hover me</Button>
        <Tooltip>Helpful hint</Tooltip>
      </TooltipTrigger>
    ),
  },
);
