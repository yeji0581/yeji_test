import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Footer } from "./Footer";

describe("Footer", () => {
  it("contentinfo 랜드마크로 렌더된다", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("기본 1차/2차 링크가 렌더된다", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "이용약관" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "전체서비스" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "회사소개" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "넥슨에센셜" }),
    ).toBeInTheDocument();
  });

  it("기본 카피라이트가 렌더된다", () => {
    render(<Footer />);
    expect(
      screen.getByText("© NEXON Korea Corporation All Rights Reserved."),
    ).toBeInTheDocument();
  });

  it("href가 없으면 # 으로 기본값을 적용한다", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: "이용약관" });
    expect(link).toHaveAttribute("href", "#");
  });

  it("커스텀 링크를 적용한다", () => {
    render(
      <Footer
        primaryLinks={[
          { label: "Terms", href: "/terms" },
          { label: "Privacy", href: "/privacy" },
        ]}
        secondaryLinks={[{ label: "About", href: "/about" }]}
      />,
    );
    const terms = screen.getByRole("link", { name: "Terms" });
    expect(terms).toHaveAttribute("href", "/terms");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(
      screen.queryByRole("link", { name: "이용약관" }),
    ).not.toBeInTheDocument();
  });

  it("커스텀 copyright/companyInfo 를 적용한다", () => {
    render(
      <Footer companyInfo="회사 정보 텍스트" copyright="© 2026 Sample Co." />,
    );
    expect(screen.getByText("회사 정보 텍스트")).toBeInTheDocument();
    expect(screen.getByText("© 2026 Sample Co.")).toBeInTheDocument();
  });

  it("링크 사이에 구분자가 N-1 개 렌더된다", () => {
    render(
      <Footer
        primaryLinks={[{ label: "A" }, { label: "B" }, { label: "C" }]}
        secondaryLinks={[{ label: "D" }]}
      />,
    );
    const dividers = screen
      .getAllByRole("list")[0]!
      .querySelectorAll('[aria-hidden="true"]');
    expect(dividers).toHaveLength(2);
  });

  it("custom className 을 병합한다", () => {
    const { container } = render(<Footer className="custom-extra" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain("custom-extra");
  });
});
