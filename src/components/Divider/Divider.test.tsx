import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Divider } from "./Divider";

describe("Divider", () => {
  it("renders with the separator role", () => {
    render(<Divider />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("applies horizontal classes by default", () => {
    render(<Divider />);
    expect(screen.getByRole("separator").className).toMatch(/h-px/);
  });

  it("applies vertical classes when orientation=vertical", () => {
    render(<Divider orientation="vertical" />);
    const sep = screen.getByRole("separator", { hidden: true });
    expect(sep.className).toMatch(/w-px/);
  });

  it("merges a consumer className via tailwind-merge", () => {
    render(<Divider className="bg-brand-primary" />);
    const sep = screen.getByRole("separator");
    expect(sep.className).toMatch(/bg-brand-primary/);
    expect(sep.className).not.toMatch(/bg-border-default/);
  });
});
