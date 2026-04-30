import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Tabs, TabList, Tab, TabPanel } from "./Tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { onSelectionChange: fn() },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList aria-label="Sections">
        <Tab id="one">Tab one</Tab>
        <Tab id="two">Tab two</Tab>
      </TabList>
      <TabPanel id="one">Panel one content</TabPanel>
      <TabPanel id="two">Panel two content</TabPanel>
    </Tabs>
  ),
};

export const DisabledTab: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList aria-label="Sections">
        <Tab id="one">Tab one</Tab>
        <Tab id="two" isDisabled>
          Locked
        </Tab>
      </TabList>
      <TabPanel id="one">Panel one</TabPanel>
      <TabPanel id="two">Panel two</TabPanel>
    </Tabs>
  ),
};

export const SwitchInteraction: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList aria-label="Sections">
        <Tab id="one">Tab one</Tab>
        <Tab id="two">Tab two</Tab>
      </TabList>
      <TabPanel id="one">Panel one</TabPanel>
      <TabPanel id="two">Panel two</TabPanel>
    </Tabs>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const tabTwo = canvas.getByRole("tab", { name: /tab two/i });
    await userEvent.click(tabTwo);
    await expect(args.onSelectionChange).toHaveBeenCalledWith("two");
  },
};
