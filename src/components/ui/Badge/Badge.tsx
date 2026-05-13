import * as React from "react";

export type BadgeVariant = "pick" | "recommend" | "update";

export interface BadgeProps {
  variant: BadgeVariant;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Badge 컴포넌트.
 * Figma 노드 8:49(부모) / 8:87(pick) / 8:88(recommend) / 9:430(updateBadge) / 9:580 내부 update variant.
 *
 * 토큰 매핑:
 * - pick 배경: --background-pick (yellow-500, #ed7a27)
 * - recommend 배경: --background-recommend (blue-500, #00dbd3)
 * - update 배경: --background-update (green-500, #2cd77c)
 * - 텍스트 색상: --text-inverse (#ffffff)
 * - 좌우 padding: --spacing-xs (8px) — 너비는 hug content (텍스트 길이에 맞춤)
 * - border-radius: --radius-pill (20px) — 높이의 절반 이상이라 시각적으로 pill 형태
 * - 타이포그래피: Type/C2Caption (10/16, weight 400, letter-spacing -0.3px)
 *
 * 정적 라벨 — hover/pressed/disabled 상태는 없음.
 */
const variantBackgroundMap = {
  pick: "bg-[var(--background-pick)]",
  recommend: "bg-[var(--background-recommend)]",
  update: "bg-[var(--background-update)]",
} as const;

const variantDefaultLabel: Record<BadgeVariant, string> = {
  pick: "Pick",
  recommend: "추천",
  update: "Update",
};

const variantAriaLabel: Record<BadgeVariant, string> = {
  pick: "Pick 뱃지",
  recommend: "추천 뱃지",
  update: "업데이트 뱃지",
};

const baseClass = [
  "inline-flex",
  "items-center",
  "justify-center",
  "px-[var(--spacing-xs)]",
  "rounded-[var(--radius-pill)]",
  "text-center",
  "whitespace-nowrap",
  "text-[var(--text-inverse)]",
  "font-[var(--font-family)]",
].join(" ");

function cn(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(" ");
}

export function Badge({ variant, children, className }: BadgeProps) {
  const typographyStyle: React.CSSProperties = {
    fontSize: "var(--type-c2-caption-size)",
    lineHeight: "var(--type-c2-caption-line-height)",
    fontWeight:
      "var(--type-c2-caption-weight)" as React.CSSProperties["fontWeight"],
    letterSpacing: "var(--type-c2-caption-letter-spacing)",
  };

  return (
    <span
      role="status"
      aria-label={variantAriaLabel[variant]}
      data-variant={variant}
      className={cn(baseClass, variantBackgroundMap[variant], className)}
      style={typographyStyle}
    >
      {children ?? variantDefaultLabel[variant]}
    </span>
  );
}
