import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("renders title and body inside an alert role", () => {
    render(<Alert title="Hello">World</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("World")).toBeInTheDocument();
  });

  it("applies the requested variant class", () => {
    render(
      <Alert variant="error" title="t">
        b
      </Alert>,
    );
    expect(screen.getByRole("alert").className).toMatch(/bg-error-bg/);
  });

  it("uses the info variant by default", () => {
    render(<Alert title="t">b</Alert>);
    expect(screen.getByRole("alert").className).toMatch(/bg-info-bg/);
  });

  it("merges a consumer className via tailwind-merge", () => {
    render(
      <Alert variant="info" className="bg-neutral-bg" title="t">
        b
      </Alert>,
    );
    const el = screen.getByRole("alert");
    expect(el.className).toMatch(/bg-neutral-bg/);
    expect(el.className).not.toMatch(/bg-info-bg/);
  });
});
