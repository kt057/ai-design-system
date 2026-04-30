import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Link } from "./Link";

const meta = {
  title: "Components/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { children: "Link text", href: "#" },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };

export const Disabled: Story = { args: { isDisabled: true } };

export const ClickInteraction: Story = {
  args: { onPress: fn(), href: undefined },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: /link text/i });
    await userEvent.click(link);
    await expect(args.onPress).toHaveBeenCalled();
  },
};
