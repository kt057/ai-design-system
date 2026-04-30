import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from "../Button/Button";
import { Modal, ModalTrigger } from "./Modal";

const meta = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    title: "Modal title",
    subtitle: "Optional supporting description for the modal context.",
    children: "This is the modal body. Place form fields, descriptions, or any content here.",
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ModalTrigger>
      <Button>Open modal</Button>
      <Modal {...args} />
    </ModalTrigger>
  ),
};

export const ConfirmInteraction: Story = {
  args: { title: "Confirm", subtitle: undefined, children: "Are you sure?", onConfirm: fn() },
  render: (args) => (
    <ModalTrigger>
      <Button>Open modal</Button>
      <Modal {...args} />
    </ModalTrigger>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /open modal/i });
    await userEvent.click(trigger);
    const dialog = await within(document.body).findByRole("dialog");
    await expect(dialog).toBeInTheDocument();
    const confirm = await within(document.body).findByRole("button", { name: /^confirm$/i });
    await userEvent.click(confirm);
    await expect(args.onConfirm).toHaveBeenCalled();
  },
};
