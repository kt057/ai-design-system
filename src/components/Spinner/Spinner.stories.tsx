import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Spinner } from "./Spinner";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { className: "text-brand-primary" },
  argTypes: {
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = { args: { size: "sm" } };
export const Medium: Story = { args: { size: "md" } };
export const Large: Story = { args: { size: "lg" } };

export const HasStatusRole: Story = {
  args: { size: "md", label: "Loading" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  },
};
