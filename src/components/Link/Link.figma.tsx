import figma from "@figma/code-connect";
import { Link } from "./Link";

/**
 * Code Connect mapping for Figma `Link/Recommended` (node 8:48).
 * Axis: state. `hover` / `visited` are runtime-only and have no prop counterpart.
 */
figma.connect(
  Link,
  "https://www.figma.com/design/vMAQsMSeIcoHMumNzKLeaQ/?node-id=8-48",
  {
    props: {},
    example: () => <Link href="https://example.com">Link</Link>,
  },
);
