import { describe, it, expect } from "vitest";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("named export로 제공되며 함수형 컴포넌트다", () => {
    expect(typeof Logo).toBe("function");
  });

  it("기본 alt 텍스트는 NEXON이다", () => {
    const element = Logo({});
    expect(element.props.alt).toBe("NEXON");
  });

  it("size prop에 따라 width가 달라진다", () => {
    const sm = Logo({ size: "sm" });
    const md = Logo({ size: "md" });
    const lg = Logo({ size: "lg" });
    expect(sm.props.width).toBe(66);
    expect(md.props.width).toBe(99.645);
    expect(lg.props.width).toBe(140);
  });

  it("aria-label을 커스터마이즈할 수 있다", () => {
    const element = Logo({ "aria-label": "넥슨 홈" });
    expect(element.props.alt).toBe("넥슨 홈");
  });
});
