import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders its children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies the requested variant class", () => {
    render(<Badge variant="success">Done</Badge>);
    expect(screen.getByText("Done").className).toMatch(/bg-success-bg/);
  });

  it("uses the info variant by default", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New").className).toMatch(/bg-info-bg/);
  });

  it("merges a consumer className via tailwind-merge", () => {
    render(
      <Badge variant="info" className="bg-neutral-bg">
        New
      </Badge>,
    );
    expect(screen.getByText("New").className).toMatch(/bg-neutral-bg/);
    expect(screen.getByText("New").className).not.toMatch(/bg-info-bg/);
  });
});
