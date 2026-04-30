import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders initials when no src is provided", () => {
    render(<Avatar alt="Kota Ichikawa" initials="KI" />);
    expect(screen.getByText("KI")).toBeInTheDocument();
  });

  it("derives initials from alt when not given", () => {
    render(<Avatar alt="Kota Ichikawa" />);
    expect(screen.getByText("KO")).toBeInTheDocument();
  });

  it("renders an image when src is provided", () => {
    render(<Avatar alt="Kota" src="/photo.jpg" />);
    const img = screen.getByRole("img", { name: "Kota" });
    expect(img).toBeInTheDocument();
    expect(img.querySelector("img")).toHaveAttribute("src", "/photo.jpg");
  });

  it("applies the requested size class", () => {
    render(<Avatar alt="Kota" size="lg" />);
    expect(screen.getByRole("img", { name: "Kota" }).className).toMatch(/size-14/);
  });

  it("applies square shape with size-matched radius", () => {
    render(<Avatar alt="Kota" size="md" shape="square" />);
    expect(screen.getByRole("img", { name: "Kota" }).className).toMatch(/rounded-md/);
  });

  it("merges a consumer className via tailwind-merge", () => {
    render(<Avatar alt="Kota" className="bg-neutral-bg" />);
    const el = screen.getByRole("img", { name: "Kota" });
    expect(el.className).toMatch(/bg-neutral-bg/);
    expect(el.className).not.toMatch(/bg-brand-primary/);
  });
});
