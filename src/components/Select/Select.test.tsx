import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select, SelectItem } from "./Select";

describe("Select", () => {
  it("renders the label and placeholder", () => {
    render(
      <Select label="Plan" placeholder="Choose">
        <SelectItem id="free">Free</SelectItem>
      </Select>,
    );
    expect(screen.getByText("Plan")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /choose/i })).toBeInTheDocument();
  });

  it("opens the popover and selects an item", async () => {
    const onSelectionChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Select label="Plan" placeholder="Choose" onSelectionChange={onSelectionChange}>
        <SelectItem id="free">Free</SelectItem>
        <SelectItem id="pro">Pro</SelectItem>
      </Select>,
    );

    await user.click(screen.getByRole("button"));
    await user.click(await screen.findByRole("option", { name: "Pro" }));

    expect(onSelectionChange).toHaveBeenCalledWith("pro");
  });

  it("does not open when disabled", async () => {
    const user = userEvent.setup();
    render(
      <Select label="Plan" placeholder="Choose" isDisabled>
        <SelectItem id="free">Free</SelectItem>
      </Select>,
    );

    await user.click(screen.getByRole("button"));

    expect(screen.queryByRole("option")).not.toBeInTheDocument();
  });

  it("merges a consumer className on the wrapper via tailwind-merge", () => {
    render(
      <Select label="Plan" placeholder="Choose" className="w-full" data-testid="select-wrap">
        <SelectItem id="free">Free</SelectItem>
      </Select>,
    );
    const wrapper = screen.getByTestId("select-wrap");
    expect(wrapper.className).toMatch(/w-full/);
    expect(wrapper.className).not.toMatch(/w-\[240px\]/);
  });
});
