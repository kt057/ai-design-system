import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Switch } from "./Switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { children: "Enable notifications", onChange: fn() },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {};
export const On: Story = { args: { defaultSelected: true } };
export const Disabled: Story = { args: { isDisabled: true } };

export const ClickInteraction: Story = {
  args: {},
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const sw = canvas.getByRole("switch", { name: /enable notifications/i });
    await userEvent.click(sw);
    await expect(args.onChange).toHaveBeenCalledWith(true);
  },
};
