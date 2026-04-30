import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Alert } from "./Alert";

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    title: "Alert title",
    children: "Description message goes here for additional context.",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["info", "success", "warning", "error"],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = { args: { variant: "info", title: "Info alert" } };
export const Success: Story = { args: { variant: "success", title: "Success alert" } };
export const Warning: Story = { args: { variant: "warning", title: "Warning alert" } };
export const Error: Story = { args: { variant: "error", title: "Error alert" } };

export const RendersTitleAndBody: Story = {
  args: { variant: "info", title: "Heads up", children: "Take note." },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("alert")).toBeInTheDocument();
    await expect(canvas.getByText("Heads up")).toBeInTheDocument();
    await expect(canvas.getByText("Take note.")).toBeInTheDocument();
  },
};
