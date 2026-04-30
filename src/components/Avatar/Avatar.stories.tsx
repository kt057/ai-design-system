import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Avatar } from "./Avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { alt: "Kota Ichikawa", initials: "KI" },
  argTypes: {
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    shape: { control: { type: "select" }, options: ["circle", "square"] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = { args: { size: "sm" } };
export const Medium: Story = { args: { size: "md" } };
export const Large: Story = { args: { size: "lg" } };
export const Square: Story = { args: { shape: "square" } };
export const Circle: Story = { args: { shape: "circle" } };

export const RendersInitials: Story = {
  args: { initials: "KI" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("KI")).toBeInTheDocument();
  },
};
