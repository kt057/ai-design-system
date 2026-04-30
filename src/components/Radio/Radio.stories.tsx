import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Radio, RadioGroup } from "./Radio";

const meta = {
  title: "Components/Radio",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { "aria-label": "Plan", onChange: fn() },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="free">Free</Radio>
      <Radio value="pro">Pro</Radio>
      <Radio value="team">Team</Radio>
    </RadioGroup>
  ),
};

export const Selected: Story = {
  args: { defaultValue: "pro" },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="free">Free</Radio>
      <Radio value="pro">Pro</Radio>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  args: { isDisabled: true },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="free">Free</Radio>
      <Radio value="pro">Pro</Radio>
    </RadioGroup>
  ),
};

export const ClickInteraction: Story = {
  args: {},
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="free">Free</Radio>
      <Radio value="pro">Pro</Radio>
    </RadioGroup>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole("radio", { name: /pro/i });
    await userEvent.click(radio);
    await expect(args.onChange).toHaveBeenCalledWith("pro");
  },
};
