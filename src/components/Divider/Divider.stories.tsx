import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Divider } from "./Divider";

const meta = {
  title: "Components/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <div className="w-[200px]">
      <Divider {...args} />
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div className="flex h-[80px] items-center">
      <Divider {...args} />
    </div>
  ),
};

export const RendersSeparatorRole: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <div className="w-[200px]">
      <Divider {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("separator")).toBeInTheDocument();
  },
};
