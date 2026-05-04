import figma from "@figma/code-connect";
import { Tabs, TabList, Tab, TabPanel } from "./Tabs";

/**
 * Code Connect mapping for Figma `Tabs/Recommended` (node 10:45).
 *
 * The Figma node represents a single Tab. Active/inactive is a runtime state
 * derived from `selectedKey`, so it isn't mapped to a prop here. The example
 * shows the canonical `<Tabs>`/`<TabList>`/`<Tab>`/`<TabPanel>` composition.
 */
figma.connect(Tabs, "https://www.figma.com/design/vMAQsMSeIcoHMumNzKLeaQ/?node-id=10-45", {
  props: {},
  example: () => (
    <Tabs>
      <TabList aria-label="Sections">
        <Tab id="overview">Overview</Tab>
        <Tab id="details">Details</Tab>
      </TabList>
      <TabPanel id="overview">Overview content</TabPanel>
      <TabPanel id="details">Details content</TabPanel>
    </Tabs>
  ),
});
