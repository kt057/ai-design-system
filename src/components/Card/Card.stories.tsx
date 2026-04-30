import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Card } from "./Card";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    title: "Card title",
    children: "Body text describing the content of this card.",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "outlined", "elevated"],
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[260px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { variant: "default" } };
export const Outlined: Story = { args: { variant: "outlined" } };
export const Elevated: Story = { args: { variant: "elevated" } };

export const RendersTitleAndBody: Story = {
  args: { title: "Hello", children: "World" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Hello")).toBeInTheDocument();
    await expect(canvas.getByText("World")).toBeInTheDocument();
  },
};
