import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { FilterChip } from "./FilterChip";

describe("FilterChip", () => {
  it("renders children as label", () => {
    render(<FilterChip>Sale</FilterChip>);
    expect(screen.getByRole("button")).toHaveTextContent("Sale");
  });

  it("defaults to inactive (aria-pressed=false, data-state=default)", () => {
    render(<FilterChip>Sale</FilterChip>);
    const chip = screen.getByRole("button");
    expect(chip).toHaveAttribute("aria-pressed", "false");
    expect(chip).toHaveAttribute("data-state", "default");
  });

  it("reflects active=true via aria-pressed and data-state", () => {
    render(<FilterChip active>Sale</FilterChip>);
    const chip = screen.getByRole("button");
    expect(chip).toHaveAttribute("aria-pressed", "true");
    expect(chip).toHaveAttribute("data-state", "active");
  });

  it("applies active background and inverse text token classes when active", () => {
    render(<FilterChip active>Sale</FilterChip>);
    const chip = screen.getByRole("button");
    expect(chip.className).toContain("bg-[var(--background-primary-btn)]");
    expect(chip.className).toContain("text-[var(--text-inverse)]");
  });

  it("applies transparent background and secondary text token classes when inactive", () => {
    render(<FilterChip>Sale</FilterChip>);
    const chip = screen.getByRole("button");
    expect(chip.className).toContain("bg-transparent");
    expect(chip.className).toContain("text-[var(--text-secondary)]");
  });

  it("applies hover token classes only when inactive", () => {
    render(<FilterChip>Sale</FilterChip>);
    const chip = screen.getByRole("button");
    expect(chip.className).toContain("hover:bg-[var(--background-white)]");
    expect(chip.className).toContain("hover:text-[var(--background-active)]");
  });

  it("applies radius and spacing token classes", () => {
    render(<FilterChip>Sale</FilterChip>);
    const chip = screen.getByRole("button");
    expect(chip.className).toContain("rounded-[var(--radius-md)]");
    expect(chip.className).toContain("px-[var(--spacing-xs)]");
    expect(chip.className).toContain("py-[var(--spacing-xxs)]");
  });

  it("applies b5-body typography tokens via inline style", () => {
    render(<FilterChip>Sale</FilterChip>);
    const chip = screen.getByRole("button");
    expect(chip.style.fontSize).toBe("var(--type-b5-body-size)");
    expect(chip.style.lineHeight).toBe("var(--type-b5-body-line-height)");
  });

  it("uppercases the label visually via uppercase utility class", () => {
    render(<FilterChip>sale</FilterChip>);
    expect(screen.getByRole("button").className).toContain("uppercase");
  });

  it("defaults type attribute to 'button'", () => {
    render(<FilterChip>Sale</FilterChip>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("forwards onClick", () => {
    const handleClick = vi.fn();
    render(<FilterChip onClick={handleClick}>Sale</FilterChip>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("merges custom className", () => {
    render(<FilterChip className="custom-extra">Sale</FilterChip>);
    expect(screen.getByRole("button").className).toContain("custom-extra");
  });

  it("forwards additional button attributes (e.g. disabled)", () => {
    render(<FilterChip disabled>Sale</FilterChip>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
