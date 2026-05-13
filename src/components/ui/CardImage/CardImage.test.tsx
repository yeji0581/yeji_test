import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";

import { CardImage } from "./CardImage";

function renderCardImage(props: Parameters<typeof CardImage>[0]) {
  const { container } = render(<CardImage {...props} />);
  const root = container.firstElementChild as HTMLElement | null;
  if (!root) throw new Error("CardImage가 렌더되지 않았다");
  const img = root.querySelector("img");
  if (!img) throw new Error("img가 렌더되지 않았다");
  return { root, img };
}

describe("CardImage", () => {
  it("named export로 제공되며 함수형 컴포넌트다", () => {
    expect(typeof CardImage).toBe("function");
  });

  it("image1 variant는 nodeId 9:419와 기본 alt를 가진다", () => {
    const { root, img } = renderCardImage({ variant: "image1" });
    expect(root.getAttribute("data-node-id")).toBe("9:419");
    expect(root.getAttribute("data-variant")).toBe("image1");
    expect(img.getAttribute("alt")).toBe("크레이지 아케이드 썸네일");
  });

  it("image2 variant는 nodeId 9:418과 기본 alt를 가진다", () => {
    const { root, img } = renderCardImage({ variant: "image2" });
    expect(root.getAttribute("data-node-id")).toBe("9:418");
    expect(root.getAttribute("data-variant")).toBe("image2");
    expect(img.getAttribute("alt")).toBe("EA SPORTS FC 온라인 썸네일");
  });

  it("variant별로 다른 이미지 src를 사용한다", () => {
    const { img: img1 } = renderCardImage({ variant: "image1" });
    const { img: img2 } = renderCardImage({ variant: "image2" });
    expect(img1.getAttribute("src")).not.toBe(img2.getAttribute("src"));
  });

  it("크기는 300x200 고정이다", () => {
    const { img } = renderCardImage({ variant: "image1" });
    expect(img.getAttribute("width")).toBe("300");
    expect(img.getAttribute("height")).toBe("200");
  });

  it("aria-label로 alt를 오버라이드할 수 있다", () => {
    const { img } = renderCardImage({
      variant: "image1",
      "aria-label": "커스텀 라벨",
    });
    expect(img.getAttribute("alt")).toBe("커스텀 라벨");
  });

  it("className을 외부에서 주입할 수 있다", () => {
    const { root } = renderCardImage({
      variant: "image1",
      className: "custom-class",
    });
    expect(root.className).toContain("custom-class");
  });
});
