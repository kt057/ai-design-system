import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Textarea } from "./Textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    label: "Message",
    placeholder: "Type your message…",
    helperText: "Up to 500 characters",
    onChange: fn(),
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithValue: Story = { args: { defaultValue: "Hello world" } };
export const Invalid: Story = {
  args: { isInvalid: true, errorMessage: "Required", helperText: undefined },
};
export const Disabled: Story = { args: { isDisabled: true } };

export const TypingFiresOnChange: Story = {
  args: {},
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const ta = canvas.getByLabelText(/message/i);
    await userEvent.type(ta, "abc");
    await expect(args.onChange).toHaveBeenCalled();
  },
};
