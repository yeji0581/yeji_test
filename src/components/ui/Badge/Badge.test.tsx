import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Badge } from "./Badge";

describe("Badge", () => {
  it('renders default "Pick" label when variant="pick" and no children', () => {
    render(<Badge variant="pick" />);
    const badge = screen.getByRole("status", { name: "Pick 뱃지" });
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Pick");
  });

  it('renders default "추천" label when variant="recommend" and no children', () => {
    render(<Badge variant="recommend" />);
    const badge = screen.getByRole("status", { name: "추천 뱃지" });
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("추천");
  });

  it('renders default "Update" label when variant="update" and no children', () => {
    render(<Badge variant="update" />);
    const badge = screen.getByRole("status", { name: "업데이트 뱃지" });
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Update");
  });

  it('applies update background token class when variant="update"', () => {
    render(<Badge variant="update" />);
    const badge = screen.getByRole("status");
    expect(badge.className).toContain("bg-[var(--background-update)]");
  });

  it("overrides default label with children when provided", () => {
    render(<Badge variant="pick">BEST</Badge>);
    const badge = screen.getByRole("status");
    expect(badge).toHaveTextContent("BEST");
    expect(badge).not.toHaveTextContent("Pick");
  });

  it('applies pick background token class when variant="pick"', () => {
    render(<Badge variant="pick" />);
    const badge = screen.getByRole("status");
    expect(badge.className).toContain("bg-[var(--background-pick)]");
  });

  it('applies recommend background token class when variant="recommend"', () => {
    render(<Badge variant="recommend" />);
    const badge = screen.getByRole("status");
    expect(badge.className).toContain("bg-[var(--background-recommend)]");
  });

  it("applies pill radius token class", () => {
    render(<Badge variant="pick" />);
    const badge = screen.getByRole("status");
    expect(badge.className).toContain("rounded-[var(--radius-pill)]");
  });

  it("applies inverse text color token class", () => {
    render(<Badge variant="pick" />);
    const badge = screen.getByRole("status");
    expect(badge.className).toContain("text-[var(--text-inverse)]");
  });

  it("applies C2 caption typography inline styles", () => {
    render(<Badge variant="pick" />);
    const badge = screen.getByRole("status");
    expect(badge.style.fontSize).toBe("var(--type-c2-caption-size)");
    expect(badge.style.lineHeight).toBe("var(--type-c2-caption-line-height)");
    expect(badge.style.letterSpacing).toBe(
      "var(--type-c2-caption-letter-spacing)",
    );
  });

  it("exposes variant via data-variant attribute", () => {
    render(<Badge variant="recommend" />);
    expect(screen.getByRole("status")).toHaveAttribute(
      "data-variant",
      "recommend",
    );
  });

  it("sets variant-specific aria-label", () => {
    const { rerender } = render(<Badge variant="pick" />);
    expect(screen.getByRole("status")).toHaveAttribute(
      "aria-label",
      "Pick 뱃지",
    );

    rerender(<Badge variant="recommend" />);
    expect(screen.getByRole("status")).toHaveAttribute(
      "aria-label",
      "추천 뱃지",
    );
  });

  it("merges custom className", () => {
    render(
      <Badge variant="pick" className="custom-extra">
        BEST
      </Badge>,
    );
    expect(screen.getByRole("status").className).toContain("custom-extra");
  });
});
