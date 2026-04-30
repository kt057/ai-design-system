import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../Button/Button";
import { Modal, ModalTrigger } from "./Modal";

describe("Modal", () => {
  it("does not render the dialog until the trigger is activated", () => {
    render(
      <ModalTrigger>
        <Button>Open</Button>
        <Modal title="Hello">Body</Modal>
      </ModalTrigger>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens the dialog and renders title + body", async () => {
    const user = userEvent.setup();
    render(
      <ModalTrigger>
        <Button>Open</Button>
        <Modal title="Hello">Body</Modal>
      </ModalTrigger>,
    );

    await user.click(screen.getByRole("button", { name: "Open" }));

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it("calls onConfirm and closes when Confirm is pressed", async () => {
    const onConfirm = vi.fn();
    const user = userEvent.setup();
    render(
      <ModalTrigger>
        <Button>Open</Button>
        <Modal title="Hello" onConfirm={onConfirm}>
          Body
        </Modal>
      </ModalTrigger>,
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    await user.click(await screen.findByRole("button", { name: /confirm/i }));

    expect(onConfirm).toHaveBeenCalledOnce();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onCancel when Cancel is pressed", async () => {
    const onCancel = vi.fn();
    const user = userEvent.setup();
    render(
      <ModalTrigger>
        <Button>Open</Button>
        <Modal title="Hello" onCancel={onCancel}>
          Body
        </Modal>
      </ModalTrigger>,
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    await user.click(await screen.findByRole("button", { name: /cancel/i }));

    expect(onCancel).toHaveBeenCalledOnce();
  });
});
