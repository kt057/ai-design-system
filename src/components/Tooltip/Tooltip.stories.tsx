import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Button } from "../Button/Button";
import { Tooltip, TooltipTrigger } from "./Tooltip";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TooltipTrigger delay={0}>
      <Button>Hover me</Button>
      <Tooltip>Helpful hint</Tooltip>
    </TooltipTrigger>
  ),
};

export const ShowsOnFocus: Story = {
  render: () => (
    <TooltipTrigger delay={0}>
      <Button>Focus me</Button>
      <Tooltip>Helpful hint</Tooltip>
    </TooltipTrigger>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /focus me/i });
    await userEvent.tab();
    button.focus();
    await new Promise((r) => setTimeout(r, 200));
    await expect(document.body.textContent).toContain("Helpful hint");
  },
};
