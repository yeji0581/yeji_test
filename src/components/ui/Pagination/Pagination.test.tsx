import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renders gameName and eventName", () => {
    render(<Pagination gameName="game name" eventName="event name" />);
    expect(screen.getByText("game name")).toBeInTheDocument();
    expect(screen.getByText("event name")).toBeInTheDocument();
  });

  it("uses default state when state prop is omitted", () => {
    const { container } = render(<Pagination gameName="g" eventName="e" />);
    const root = container.firstChild as HTMLElement;
    expect(root.getAttribute("data-state")).toBe("default");
    expect(root.className).toContain("bg-[var(--background-pagenation)]");
  });

  it('applies active background when state="active"', () => {
    const { container } = render(
      <Pagination state="active" gameName="g" eventName="e" />,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.getAttribute("data-state")).toBe("active");
    expect(root.className).toContain("bg-[var(--background-active)]");
  });

  it("merges custom className", () => {
    const { container } = render(
      <Pagination gameName="g" eventName="e" className="custom-extra" />,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain("custom-extra");
  });

  it("applies default width of 255px when width prop is omitted", () => {
    const { container } = render(<Pagination gameName="g" eventName="e" />);
    const root = container.firstChild as HTMLElement;
    expect(root.style.width).toBe("255px");
  });

  it("applies number width prop as px", () => {
    const { container } = render(
      <Pagination gameName="g" eventName="e" width={320} />,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.style.width).toBe("320px");
  });

  it("applies string width prop as-is", () => {
    const { container } = render(
      <Pagination gameName="g" eventName="e" width="100%" />,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.style.width).toBe("100%");
  });

  it("applies typography inline styles for gameName (B4Body) and eventName (S1Subtitle)", () => {
    render(<Pagination gameName="game name" eventName="event name" />);
    const gameSpan = screen.getByText("game name");
    const eventSpan = screen.getByText("event name");

    expect(gameSpan.style.fontSize).toBe("var(--type-b4-body-size)");
    expect(gameSpan.style.lineHeight).toBe("var(--type-b4-body-line-height)");

    expect(eventSpan.style.fontSize).toBe("var(--type-s1-subtitle-size)");
    expect(eventSpan.style.lineHeight).toBe(
      "var(--type-s1-subtitle-line-height)",
    );
  });

  it("applies single-line ellipsis style on eventName", () => {
    render(<Pagination gameName="g" eventName="long event name" />);
    const eventSpan = screen.getByText("long event name");
    expect(eventSpan.style.overflow).toBe("hidden");
    expect(eventSpan.style.textOverflow).toBe("ellipsis");
    expect(eventSpan.style.whiteSpace).toBe("nowrap");
  });
});
