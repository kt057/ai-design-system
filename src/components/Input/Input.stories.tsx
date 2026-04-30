import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Input } from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    label: "Label",
    placeholder: "Placeholder",
    helperText: "Helper text",
    onChange: fn(),
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithValue: Story = { args: { defaultValue: "Hello" } };
export const Invalid: Story = {
  args: { isInvalid: true, errorMessage: "Required", helperText: undefined },
};
export const Disabled: Story = { args: { isDisabled: true } };

export const TypingFiresOnChange: Story = {
  args: {},
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/label/i);
    await userEvent.type(input, "abc");
    await expect(args.onChange).toHaveBeenCalled();
  },
};
