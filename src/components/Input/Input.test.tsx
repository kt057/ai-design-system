import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input", () => {
  it("renders the label and helper text", () => {
    render(<Input label="Email" helperText="We never share it." />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByText("We never share it.")).toBeInTheDocument();
  });

  it("calls onChange when the user types", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Input label="Email" onChange={onChange} />);

    await user.type(screen.getByLabelText("Email"), "a");

    expect(onChange).toHaveBeenCalledWith("a");
  });

  it("does not call onChange when disabled", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Input label="Email" isDisabled onChange={onChange} />);

    await user.type(screen.getByLabelText("Email"), "a");

    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders the error message and applies error border on invalid", () => {
    const { container } = render(<Input label="Email" isInvalid errorMessage="Invalid" />);
    expect(screen.getByText("Invalid")).toBeInTheDocument();
    const field = container.querySelector("[class*='border-border-error']");
    expect(field).not.toBeNull();
  });

  it("merges a consumer className on the wrapper via tailwind-merge", () => {
    const { container } = render(<Input label="Email" className="w-full" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toMatch(/w-full/);
    expect(wrapper.className).not.toMatch(/w-\[240px\]/);
  });
});
