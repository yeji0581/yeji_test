import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { Button } from "./Button";

describe("Button", () => {
  it("renders its children", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });

  it('defaults to type="button"', () => {
    render(<Button>Default Type</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("respects explicit type prop", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Disabled
      </Button>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies primary variant classes by default", () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("bg-[var(--background-primary-btn)]");
    expect(button.className).toContain("text-[var(--text-inverse)]");
  });

  it('applies secondary variant classes when variant="secondary"', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("bg-[var(--background-secondary-btn)]");
  });

  it('applies outline variant classes when variant="outline"', () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("border-[var(--border-primary)]");
    expect(button.className).toContain("rounded-[var(--radius-xl)]");
  });

  it("applies typography inline styles based on size", () => {
    const { rerender } = render(<Button size="lg">LG</Button>);
    let button = screen.getByRole("button");
    expect(button.style.fontSize).toBe("var(--type-s2-subtitle-size)");

    rerender(<Button size="md">MD</Button>);
    button = screen.getByRole("button");
    expect(button.style.fontSize).toBe("var(--type-b1-body-size)");

    rerender(<Button size="sm">SM</Button>);
    button = screen.getByRole("button");
    expect(button.style.fontSize).toBe("var(--type-b3-body-size)");
  });

  it("applies size-specific padding classes", () => {
    const { rerender } = render(<Button size="lg">LG</Button>);
    expect(screen.getByRole("button").className).toContain(
      "px-[var(--spacing-2xl)]",
    );

    rerender(<Button size="sm">SM</Button>);
    expect(screen.getByRole("button").className).toContain(
      "px-[var(--spacing-lg)]",
    );
  });

  it("merges custom className", () => {
    render(<Button className="custom-extra">Extra</Button>);
    expect(screen.getByRole("button").className).toContain("custom-extra");
  });
});
