import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("renders default placeholder and a searchbox role", () => {
    render(<SearchBar />);
    const input = screen.getByRole("searchbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "게임명 검색");
  });

  it("renders a custom placeholder", () => {
    render(<SearchBar placeholder="검색어를 입력하세요" />);
    expect(screen.getByRole("searchbox")).toHaveAttribute(
      "placeholder",
      "검색어를 입력하세요",
    );
  });

  it("calls onChange when user types (uncontrolled)", () => {
    const onChange = vi.fn();
    render(<SearchBar onChange={onChange} />);
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "메이플" } });
    expect(onChange).toHaveBeenCalledWith("메이플");
    expect((input as HTMLInputElement).value).toBe("메이플");
  });

  it("calls onSearch when the search button is clicked", () => {
    const onSearch = vi.fn();
    render(
      <SearchBar value="메이플" onChange={() => {}} onSearch={onSearch} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "검색" }));
    expect(onSearch).toHaveBeenCalledWith("메이플");
  });

  it("calls onSearch when Enter is pressed", () => {
    const onSearch = vi.fn();
    render(<SearchBar value="던파" onChange={() => {}} onSearch={onSearch} />);
    fireEvent.keyDown(screen.getByRole("searchbox"), {
      key: "Enter",
      code: "Enter",
    });
    expect(onSearch).toHaveBeenCalledWith("던파");
  });

  it('reflects forced state="focus" via data-state', () => {
    const { container } = render(<SearchBar state="focus" />);
    const wrapper = container.querySelector('[data-node-id="9-1640"]');
    expect(wrapper).not.toBeNull();
    expect(wrapper).toHaveAttribute("data-state", "focus");
    expect(wrapper?.className).toContain("border-[var(--border-focus)]");
  });

  it("uses a custom aria-label on the search button", () => {
    render(<SearchBar aria-label="Search games" />);
    expect(
      screen.getByRole("button", { name: "Search games" }),
    ).toBeInTheDocument();
  });
});
