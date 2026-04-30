import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Radio, RadioGroup } from "./Radio";

describe("Radio", () => {
  it("renders the children labels", () => {
    render(
      <RadioGroup aria-label="Plan">
        <Radio value="free">Free</Radio>
        <Radio value="pro">Pro</Radio>
      </RadioGroup>,
    );
    expect(screen.getByRole("radio", { name: "Free" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Pro" })).toBeInTheDocument();
  });

  it("calls onChange when a radio is selected", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <RadioGroup aria-label="Plan" onChange={onChange}>
        <Radio value="free">Free</Radio>
        <Radio value="pro">Pro</Radio>
      </RadioGroup>,
    );

    await user.click(screen.getByRole("radio", { name: "Pro" }));

    expect(onChange).toHaveBeenCalledWith("pro");
  });

  it("does not call onChange when group is disabled", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <RadioGroup aria-label="Plan" isDisabled onChange={onChange}>
        <Radio value="free">Free</Radio>
        <Radio value="pro">Pro</Radio>
      </RadioGroup>,
    );

    await user.click(screen.getByRole("radio", { name: "Pro" }));

    expect(onChange).not.toHaveBeenCalled();
  });

  it("reports the selected value via the input's checked state", () => {
    render(
      <RadioGroup aria-label="Plan" defaultValue="pro">
        <Radio value="free">Free</Radio>
        <Radio value="pro">Pro</Radio>
      </RadioGroup>,
    );
    const pro = screen.getByRole("radio", { name: "Pro" }) as HTMLInputElement;
    expect(pro.checked).toBe(true);
  });

  it("merges a consumer className via tailwind-merge on the group", () => {
    render(
      <RadioGroup aria-label="Plan" className="gap-8">
        <Radio value="free">Free</Radio>
      </RadioGroup>,
    );
    const group = screen.getByRole("radiogroup");
    expect(group.className).toMatch(/gap-8/);
    expect(group.className).not.toMatch(/gap-2/);
  });
});
