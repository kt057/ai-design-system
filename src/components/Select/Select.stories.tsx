import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Select, SelectItem } from "./Select";

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { label: "Label", placeholder: "Choose an option", onSelectionChange: fn() },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectItem id="a">Option A</SelectItem>
      <SelectItem id="b">Option B</SelectItem>
      <SelectItem id="c">Option C</SelectItem>
    </Select>
  ),
};

export const Disabled: Story = {
  args: { isDisabled: true },
  render: (args) => (
    <Select {...args}>
      <SelectItem id="a">Option A</SelectItem>
      <SelectItem id="b">Option B</SelectItem>
    </Select>
  ),
};

export const ClickInteraction: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectItem id="a">Option A</SelectItem>
      <SelectItem id="b">Option B</SelectItem>
    </Select>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await userEvent.click(trigger);
    const option = await within(document.body).findByRole("option", { name: /option b/i });
    await userEvent.click(option);
    await expect(args.onSelectionChange).toHaveBeenCalledWith("b");
  },
};
