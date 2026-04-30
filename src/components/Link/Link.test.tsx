import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link } from "./Link";

describe("Link", () => {
  it("renders an anchor with children", () => {
    render(<Link href="/docs">Docs</Link>);
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/docs");
  });

  it("calls onPress when activated", async () => {
    const onPress = vi.fn();
    const user = userEvent.setup();
    render(<Link onPress={onPress}>Go</Link>);

    await user.click(screen.getByRole("link", { name: "Go" }));

    expect(onPress).toHaveBeenCalledOnce();
  });

  it("does not call onPress when disabled", async () => {
    const onPress = vi.fn();
    const user = userEvent.setup();
    render(
      <Link isDisabled onPress={onPress}>
        Go
      </Link>,
    );

    await user.click(screen.getByRole("link", { name: "Go" }));

    expect(onPress).not.toHaveBeenCalled();
  });

  it("applies the brand color class by default", () => {
    render(<Link href="#">Go</Link>);
    expect(screen.getByRole("link", { name: "Go" }).className).toMatch(/text-brand-primary/);
  });

  it("merges a consumer className via tailwind-merge", () => {
    render(
      <Link href="#" className="text-text-secondary">
        Go
      </Link>,
    );
    const link = screen.getByRole("link", { name: "Go" });
    expect(link.className).toMatch(/text-text-secondary/);
    expect(link.className).not.toMatch(/text-brand-primary[^-]/);
  });
});
