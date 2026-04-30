import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
  it("renders the title and children", () => {
    render(<Card title="Hello">World</Card>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("World")).toBeInTheDocument();
  });

  it("applies the requested variant class", () => {
    const { container } = render(
      <Card variant="elevated" title="t">
        b
      </Card>,
    );
    expect(container.firstChild).toHaveClass("shadow-md");
  });

  it("uses the default variant when none is provided", () => {
    const { container } = render(<Card title="t">b</Card>);
    expect((container.firstChild as HTMLElement).className).toMatch(/border-border-default/);
  });

  it("merges a consumer className via tailwind-merge", () => {
    const { container } = render(
      <Card variant="default" className="bg-info-bg" title="t">
        b
      </Card>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toMatch(/bg-info-bg/);
    expect(el.className).not.toMatch(/bg-bg-default/);
  });
});
