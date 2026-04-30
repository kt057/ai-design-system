import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders its label", () => {
    render(<Switch>Notifications</Switch>);
    expect(screen.getByRole("switch", { name: "Notifications" })).toBeInTheDocument();
  });

  it("calls onChange when toggled", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Switch onChange={onChange}>Notifications</Switch>);

    await user.click(screen.getByRole("switch", { name: "Notifications" }));

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("does not call onChange when disabled", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Switch isDisabled onChange={onChange}>
        Notifications
      </Switch>,
    );

    await user.click(screen.getByRole("switch", { name: "Notifications" }));

    expect(onChange).not.toHaveBeenCalled();
  });

  it("reports the current state via the input's checked state", () => {
    render(<Switch defaultSelected>Notifications</Switch>);
    const input = screen.getByRole("switch", { name: "Notifications" }) as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it("merges a consumer className via tailwind-merge", () => {
    render(<Switch className="gap-8">Notifications</Switch>);
    const label = screen.getByText("Notifications").closest("label");
    expect(label?.className).toMatch(/gap-8/);
    expect(label?.className).not.toMatch(/gap-2/);
  });
});
