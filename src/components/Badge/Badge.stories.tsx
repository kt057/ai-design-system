import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { children: "Info" },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["info", "success", "warning", "error", "neutral"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = { args: { variant: "info", children: "Info" } };
export const Success: Story = { args: { variant: "success", children: "Success" } };
export const Warning: Story = { args: { variant: "warning", children: "Warning" } };
export const Error: Story = { args: { variant: "error", children: "Error" } };
export const Neutral: Story = { args: { variant: "neutral", children: "Neutral" } };

export const RendersChildren: Story = {
  args: { variant: "info", children: "Hello" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Hello")).toBeInTheDocument();
  },
};
