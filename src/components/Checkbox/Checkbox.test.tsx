import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders its label", () => {
    render(<Checkbox>Accept</Checkbox>);
    expect(screen.getByRole("checkbox", { name: "Accept" })).toBeInTheDocument();
  });

  it("calls onChange when toggled", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Checkbox onChange={onChange}>Accept</Checkbox>);

    await user.click(screen.getByRole("checkbox", { name: "Accept" }));

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("does not call onChange when disabled", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Checkbox isDisabled onChange={onChange}>
        Accept
      </Checkbox>,
    );

    await user.click(screen.getByRole("checkbox", { name: "Accept" }));

    expect(onChange).not.toHaveBeenCalled();
  });

  it("reports indeterminate state on the underlying input", () => {
    render(<Checkbox isIndeterminate>Mixed</Checkbox>);
    const input = screen.getByRole("checkbox", { name: "Mixed" }) as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
  });

  it("merges a consumer className via tailwind-merge", () => {
    render(
      <Checkbox className="text-text-error" defaultSelected>
        Accept
      </Checkbox>,
    );
    const label = screen.getByText("Accept").closest("label");
    expect(label?.className).toMatch(/text-text-error/);
  });
});
