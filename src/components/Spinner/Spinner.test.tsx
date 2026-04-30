import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("renders with status role and default label", () => {
    render(<Spinner />);
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  });

  it("uses the provided label", () => {
    render(<Spinner label="Saving" />);
    expect(screen.getByRole("status", { name: "Saving" })).toBeInTheDocument();
  });

  it("applies the requested size class", () => {
    render(<Spinner size="lg" />);
    expect(screen.getByRole("status").className).toMatch(/size-8/);
  });

  it("merges a consumer className via tailwind-merge", () => {
    render(<Spinner size="md" className="size-12" />);
    const el = screen.getByRole("status");
    expect(el.className).toMatch(/size-12/);
    expect(el.className).not.toMatch(/size-6/);
  });
});
