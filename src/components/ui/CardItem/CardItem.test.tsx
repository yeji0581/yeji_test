import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { CardItem } from "./CardItem";

const baseProps = {
  imageSrc: "/thumbnail.png",
  imageAlt: "썸네일 이미지",
  title: "game name",
  category: "GAME CATEGORY",
} as const;

describe("CardItem", () => {
  it("named export로 제공되며 함수형 컴포넌트다", () => {
    expect(typeof CardItem).toBe("function");
  });

  it("타이틀과 카테고리를 렌더한다", () => {
    render(<CardItem {...baseProps} />);
    expect(screen.getByText("game name")).toBeInTheDocument();
    expect(screen.getByText("GAME CATEGORY")).toBeInTheDocument();
  });

  it("imageAlt를 img alt에 적용한다", () => {
    render(<CardItem {...baseProps} />);
    const img = screen.getByAltText("썸네일 이미지");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/thumbnail.png");
  });

  it("기본 layout은 vertical이며 data-layout에 노출된다", () => {
    const { container } = render(<CardItem {...baseProps} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.getAttribute("data-layout")).toBe("vertical");
    expect(root.getAttribute("data-node-id")).toBe("9:580");
  });

  it("layout='horizontal'일 때 data-layout이 갱신된다", () => {
    const { container } = render(
      <CardItem {...baseProps} layout="horizontal" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.getAttribute("data-layout")).toBe("horizontal");
  });

  it("기본적으로 데스크톱/모바일 아이콘이 모두 노출된다", () => {
    render(<CardItem {...baseProps} />);
    expect(
      screen.getByRole("img", { name: "데스크톱 지원" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "모바일 지원" }),
    ).toBeInTheDocument();
  });

  it("supportedDevices=['desktop']이면 모바일 아이콘이 없다", () => {
    render(<CardItem {...baseProps} supportedDevices={["desktop"]} />);
    expect(
      screen.getByRole("img", { name: "데스크톱 지원" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("img", { name: "모바일 지원" }),
    ).not.toBeInTheDocument();
  });

  it("supportedDevices=['mobile']이면 데스크톱 아이콘이 없다", () => {
    render(<CardItem {...baseProps} supportedDevices={["mobile"]} />);
    expect(
      screen.queryByRole("img", { name: "데스크톱 지원" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "모바일 지원" }),
    ).toBeInTheDocument();
  });

  it("showUpdateBadge=true이면 Badge가 렌더된다", () => {
    render(<CardItem {...baseProps} showUpdateBadge />);
    const badge = screen.getByRole("status", { name: "업데이트 뱃지" });
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Update");
  });

  it("showUpdateBadge=false(기본)이면 Badge가 렌더되지 않는다", () => {
    render(<CardItem {...baseProps} />);
    expect(
      screen.queryByRole("status", { name: "업데이트 뱃지" }),
    ).not.toBeInTheDocument();
  });

  it("onClick 미전달 시 role=button을 갖지 않는다", () => {
    const { container } = render(<CardItem {...baseProps} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.getAttribute("role")).toBeNull();
    expect(root.getAttribute("tabindex")).toBeNull();
  });

  it("onClick 전달 시 클릭/엔터키로 핸들러가 호출된다", () => {
    const handleClick = vi.fn();
    const { container } = render(
      <CardItem {...baseProps} onClick={handleClick} />,
    );
    const root = container.firstElementChild as HTMLElement;

    expect(root.getAttribute("role")).toBe("button");
    expect(root.getAttribute("tabindex")).toBe("0");

    fireEvent.click(root);
    expect(handleClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(root, { key: "Enter" });
    expect(handleClick).toHaveBeenCalledTimes(2);

    fireEvent.keyDown(root, { key: " " });
    expect(handleClick).toHaveBeenCalledTimes(3);

    fireEvent.keyDown(root, { key: "Escape" });
    expect(handleClick).toHaveBeenCalledTimes(3);
  });

  it("className을 외부에서 주입할 수 있다", () => {
    const { container } = render(
      <CardItem {...baseProps} className="custom-extra" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain("custom-extra");
  });
});
