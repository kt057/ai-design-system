import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { children: "Checkbox label", onChange: fn() },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};
export const Checked: Story = { args: { defaultSelected: true } };
export const Indeterminate: Story = { args: { isIndeterminate: true } };
export const Disabled: Story = { args: { isDisabled: true } };

export const ClickInteraction: Story = {
  args: {},
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const cb = canvas.getByRole("checkbox", { name: /checkbox label/i });
    await userEvent.click(cb);
    await expect(args.onChange).toHaveBeenCalledWith(true);
  },
};
