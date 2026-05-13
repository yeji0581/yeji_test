import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";

import { ItemThumbnail } from "./ItemThumbnail";

function renderThumbnail(props: Parameters<typeof ItemThumbnail>[0]) {
  const { container } = render(<ItemThumbnail {...props} />);
  const root = container.firstElementChild as HTMLElement | null;
  if (!root) throw new Error("ItemThumbnail이 렌더되지 않았다");
  const img = root.querySelector("img");
  if (!img) throw new Error("img가 렌더되지 않았다");
  return { root, img };
}

describe("ItemThumbnail", () => {
  it("named export로 제공되며 함수형 컴포넌트다", () => {
    expect(typeof ItemThumbnail).toBe("function");
  });

  it("image1 variant는 nodeId 8:71과 기본 alt를 가진다", () => {
    const { root, img } = renderThumbnail({ variant: "image1" });
    expect(root.getAttribute("data-node-id")).toBe("8:71");
    expect(root.getAttribute("data-variant")).toBe("image1");
    expect(img.getAttribute("alt")).toBe("크레이지 아케이드 썸네일");
  });

  it("image2 variant는 nodeId 8:70과 기본 alt를 가진다", () => {
    const { root, img } = renderThumbnail({ variant: "image2" });
    expect(root.getAttribute("data-node-id")).toBe("8:70");
    expect(root.getAttribute("data-variant")).toBe("image2");
    expect(img.getAttribute("alt")).toBe("EA SPORTS FC 온라인 썸네일");
  });

  it("variant별로 다른 이미지 src를 사용한다", () => {
    const { img: img1 } = renderThumbnail({ variant: "image1" });
    const { img: img2 } = renderThumbnail({ variant: "image2" });
    expect(img1.getAttribute("src")).not.toBe(img2.getAttribute("src"));
  });

  it("크기는 153x192 고정이다", () => {
    const { img } = renderThumbnail({ variant: "image1" });
    expect(img.getAttribute("width")).toBe("153");
    expect(img.getAttribute("height")).toBe("192");
  });

  it("aria-label로 alt를 오버라이드할 수 있다", () => {
    const { img } = renderThumbnail({
      variant: "image1",
      "aria-label": "커스텀 라벨",
    });
    expect(img.getAttribute("alt")).toBe("커스텀 라벨");
  });

  it("className을 외부에서 주입할 수 있다", () => {
    const { root } = renderThumbnail({
      variant: "image1",
      className: "custom-class",
    });
    expect(root.className).toContain("custom-class");
  });
});
