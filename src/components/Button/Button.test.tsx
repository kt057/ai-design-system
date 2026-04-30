import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("renders its children", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("calls onPress when activated", async () => {
    const onPress = vi.fn();
    const user = userEvent.setup();
    render(<Button onPress={onPress}>Save</Button>);

    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(onPress).toHaveBeenCalledOnce();
  });

  it("does not call onPress when disabled", async () => {
    const onPress = vi.fn();
    const user = userEvent.setup();
    render(
      <Button isDisabled onPress={onPress}>
        Save
      </Button>,
    );

    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(onPress).not.toHaveBeenCalled();
  });

  it("applies the requested variant class", () => {
    render(<Button variant="danger">Delete</Button>);
    const button = screen.getByRole("button", { name: "Delete" });
    expect(button.className).toMatch(/bg-danger-600/);
  });

  it("merges a consumer className via tailwind-merge", () => {
    render(
      <Button variant="primary" className="bg-brand-50">
        Save
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Save" });
    expect(button.className).toMatch(/bg-brand-50/);
    expect(button.className).not.toMatch(/bg-brand-600/);
  });
});
