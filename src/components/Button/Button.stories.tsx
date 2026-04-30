import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Click me",
    onPress: fn(),
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "ghost", "danger"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary" },
};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Ghost: Story = {
  args: { variant: "ghost" },
};

export const Danger: Story = {
  args: { variant: "danger" },
};

export const Small: Story = {
  args: { size: "sm" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  parameters: {
    layout: "padded",
  },
};

export const Disabled: Story = {
  args: { isDisabled: true },
};

export const Pending: Story = {
  args: { isPending: true },
};

export const ClickInteraction: Story = {
  args: { variant: "primary" },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /click me/i });
    await userEvent.click(button);
    await expect(args.onPress).toHaveBeenCalledOnce();
  },
};

export const KeyboardActivation: Story = {
  args: { variant: "primary" },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /click me/i });
    button.focus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onPress).toHaveBeenCalled();
  },
};
