import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Banner } from "./Banner";

const IMG = "/banner-test.png";
const ALT = "테스트 배너";

describe("Banner", () => {
  it("이미지를 렌더한다", () => {
    render(<Banner imageSrc={IMG} alt={ALT} />);
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", IMG);
  });

  it("alt 텍스트를 적용한다", () => {
    render(<Banner imageSrc={IMG} alt={ALT} />);
    expect(screen.getByAltText(ALT)).toBeInTheDocument();
  });

  it("href가 있으면 anchor로 감싼다", () => {
    render(<Banner imageSrc={IMG} alt={ALT} href="https://example.com" />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toContainElement(screen.getByRole("img"));
  });

  it("href가 없으면 anchor로 감싸지 않는다", () => {
    render(<Banner imageSrc={IMG} alt={ALT} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("기본 aspect-ratio는 1920/560 이다", () => {
    const { container } = render(<Banner imageSrc={IMG} alt={ALT} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.aspectRatio).toBe("1920/560");
  });

  it("aspectRatio prop을 적용한다", () => {
    const { container } = render(
      <Banner imageSrc={IMG} alt={ALT} aspectRatio="16/9" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.aspectRatio).toBe("16/9");
  });

  it("custom className을 병합한다", () => {
    const { container } = render(
      <Banner imageSrc={IMG} alt={ALT} className="custom-extra" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain("custom-extra");
  });
});
