import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { GnbBar } from "./GnbBar";

describe("GnbBar", () => {
  it("renders default labels", () => {
    render(<GnbBar />);
    expect(screen.getByText("메뉴")).toBeInTheDocument();
    expect(screen.getByText("회원가입")).toBeInTheDocument();
    expect(screen.getByText("로그인")).toBeInTheDocument();
  });

  it("renders custom labels", () => {
    render(
      <GnbBar menuLabel="Menu" signupLabel="Sign up" loginLabel="Log in" />,
    );
    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
    expect(screen.getByText("Log in")).toBeInTheDocument();
  });

  it("uses semantic header element with white background token", () => {
    const { container } = render(<GnbBar />);
    const root = container.firstChild as HTMLElement;
    expect(root.tagName).toBe("HEADER");
    expect(root.className).toContain("bg-[var(--background-white)]");
    expect(root.getAttribute("data-node-id")).toBe("7:1156");
  });

  it("invokes onMenuClick when menu button is clicked", async () => {
    const user = userEvent.setup();
    const onMenuClick = vi.fn();
    render(<GnbBar onMenuClick={onMenuClick} />);

    await user.click(screen.getByRole("button", { name: "메뉴" }));
    expect(onMenuClick).toHaveBeenCalledTimes(1);
  });

  it("invokes onCardClick when card icon is clicked", async () => {
    const user = userEvent.setup();
    const onCardClick = vi.fn();
    render(<GnbBar onCardClick={onCardClick} />);

    await user.click(screen.getByRole("button", { name: "card" }));
    expect(onCardClick).toHaveBeenCalledTimes(1);
  });

  it("invokes onLocationClick when location icon is clicked", async () => {
    const user = userEvent.setup();
    const onLocationClick = vi.fn();
    render(<GnbBar onLocationClick={onLocationClick} />);

    await user.click(screen.getByRole("button", { name: "location" }));
    expect(onLocationClick).toHaveBeenCalledTimes(1);
  });

  it("invokes onSignupClick when signup text is clicked", async () => {
    const user = userEvent.setup();
    const onSignupClick = vi.fn();
    render(<GnbBar onSignupClick={onSignupClick} />);

    await user.click(screen.getByRole("button", { name: "회원가입" }));
    expect(onSignupClick).toHaveBeenCalledTimes(1);
  });

  it("invokes onLoginClick when login button is clicked", async () => {
    const user = userEvent.setup();
    const onLoginClick = vi.fn();
    render(<GnbBar onLoginClick={onLoginClick} />);

    await user.click(screen.getByRole("button", { name: "로그인" }));
    expect(onLoginClick).toHaveBeenCalledTimes(1);
  });

  it("applies typography tokens (S2Subtitle on menu, B3Body on signup)", () => {
    render(<GnbBar />);
    const menuSpan = screen.getByText("메뉴");
    const signupSpan = screen.getByText("회원가입");

    expect(menuSpan.style.fontSize).toBe("var(--type-s2-subtitle-size)");
    expect(menuSpan.style.lineHeight).toBe(
      "var(--type-s2-subtitle-line-height)",
    );

    expect(signupSpan.style.fontSize).toBe("var(--type-b3-body-size)");
    expect(signupSpan.style.lineHeight).toBe("var(--type-b3-body-line-height)");
  });

  it("merges custom className on root", () => {
    const { container } = render(<GnbBar className="custom-extra" />);
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain("custom-extra");
  });
});
