import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("renders the label and helper text", () => {
    render(<Textarea label="Message" helperText="Up to 500 chars" />);
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByText("Up to 500 chars")).toBeInTheDocument();
  });

  it("calls onChange when the user types", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Textarea label="Message" onChange={onChange} />);

    await user.type(screen.getByLabelText("Message"), "a");

    expect(onChange).toHaveBeenCalledWith("a");
  });

  it("does not call onChange when disabled", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Textarea label="Message" isDisabled onChange={onChange} />);

    await user.type(screen.getByLabelText("Message"), "a");

    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders the error message on invalid", () => {
    render(<Textarea label="Message" isInvalid errorMessage="Required" />);
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("merges a consumer className on the wrapper via tailwind-merge", () => {
    const { container } = render(<Textarea label="Message" className="w-full" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toMatch(/w-full/);
    expect(wrapper.className).not.toMatch(/w-\[240px\]/);
  });
});
