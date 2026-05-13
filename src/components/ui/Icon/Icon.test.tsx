import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";

import { Icon, ICON_NAMES } from "./Icon";

function renderIcon(props: Parameters<typeof Icon>[0]) {
  const { container } = render(<Icon {...props} />);
  const svg = container.querySelector("svg");
  if (!svg) throw new Error("svg가 렌더되지 않았다");
  return svg;
}

describe("Icon", () => {
  it("named export로 제공되며 함수형 컴포넌트다", () => {
    expect(typeof Icon).toBe("function");
  });

  it("ICON_NAMES는 9개 아이콘 이름을 노출한다", () => {
    expect(ICON_NAMES).toHaveLength(9);
    expect(ICON_NAMES).toContain("newpage");
    expect(ICON_NAMES).toContain("chevronLeft");
    expect(ICON_NAMES).toContain("chevronRight");
    expect(ICON_NAMES).toContain("card");
  });

  it("기본 size는 24이다", () => {
    const svg = renderIcon({ name: "search" });
    expect(svg.getAttribute("width")).toBe("24");
    expect(svg.getAttribute("height")).toBe("24");
  });

  it("size prop으로 크기를 변경할 수 있다", () => {
    const svg = renderIcon({ name: "search", size: 32 });
    expect(svg.getAttribute("width")).toBe("32");
    expect(svg.getAttribute("height")).toBe("32");
  });

  it("aria-label이 없으면 decorative (aria-hidden)로 렌더된다", () => {
    const svg = renderIcon({ name: "menu" });
    expect(svg.getAttribute("role")).toBe("presentation");
    expect(svg.getAttribute("aria-hidden")).toBe("true");
  });

  it("aria-label이 있으면 img role로 렌더된다", () => {
    const svg = renderIcon({ name: "menu", "aria-label": "메뉴 열기" });
    expect(svg.getAttribute("role")).toBe("img");
    expect(svg.getAttribute("aria-hidden")).toBeNull();
  });

  it("기본 color는 var(--icon-grey) 토큰이다", () => {
    const svg = renderIcon({ name: "menu" });
    expect(svg.style.color).toBe("var(--icon-grey)");
  });

  it("color prop으로 토큰을 오버라이드할 수 있다", () => {
    const svg = renderIcon({
      name: "menu",
      color: "var(--icon-light-grey)",
    });
    expect(svg.style.color).toBe("var(--icon-light-grey)");
  });

  it("각 아이콘은 자기 Figma nodeId를 data 속성으로 노출한다", () => {
    expect(renderIcon({ name: "newpage" }).getAttribute("data-node-id")).toBe(
      "6:1185",
    );
    expect(renderIcon({ name: "menu" }).getAttribute("data-node-id")).toBe(
      "6:1189",
    );
    expect(
      renderIcon({ name: "chevronLeft" }).getAttribute("data-node-id"),
    ).toBe("6:1186");
    expect(
      renderIcon({ name: "chevronRight" }).getAttribute("data-node-id"),
    ).toBe("6:1187");
  });

  it("data-icon-name이 prop name과 일치한다", () => {
    for (const name of ICON_NAMES) {
      const svg = renderIcon({ name });
      expect(svg.getAttribute("data-icon-name")).toBe(name);
    }
  });
});
