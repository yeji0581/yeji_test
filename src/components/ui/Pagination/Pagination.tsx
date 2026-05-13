import * as React from "react";

export interface PaginationProps {
  state?: "default" | "active";
  gameName: string;
  eventName: string;
  width?: number | string;
  className?: string;
}

/**
 * Swiper Pagenation 카드 1개.
 * Figma 노드 7:1158 의 default / active variant 를 표현.
 *
 * 토큰 매핑:
 * - default 배경: --background-pagenation (white 10%)
 * - active 배경: --background-active (primary-500)
 * - 텍스트 색상: --text-inverse
 * - 상단 라벨(gameName): Type/B4Body
 * - 하단 타이틀(eventName): Type/S1Subtitle, 1줄 ellipsis
 */
const stateBackgroundMap = {
  default: "bg-[var(--background-pagenation)]",
  active: "bg-[var(--background-active)]",
} as const;

const baseClass = [
  "flex",
  "flex-col",
  "gap-[var(--spacing-sm)]",
  "p-[var(--spacing-md)]",
  "rounded-[var(--radius-none)]",
  "text-[var(--text-inverse)]",
  "font-[var(--font-family)]",
].join(" ");

function cn(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(" ");
}

function resolveWidth(width: number | string | undefined): string {
  if (width === undefined) return "255px";
  if (typeof width === "number") return `${width}px`;
  return width;
}

export function Pagination({
  state = "default",
  gameName,
  eventName,
  width = 255,
  className,
}: PaginationProps) {
  const gameNameStyle: React.CSSProperties = {
    fontSize: "var(--type-b4-body-size)",
    lineHeight: "var(--type-b4-body-line-height)",
    fontWeight:
      "var(--type-b4-body-weight)" as React.CSSProperties["fontWeight"],
  };

  const eventNameStyle: React.CSSProperties = {
    fontSize: "var(--type-s1-subtitle-size)",
    lineHeight: "var(--type-s1-subtitle-line-height)",
    fontWeight:
      "var(--type-s1-subtitle-weight)" as React.CSSProperties["fontWeight"],
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  return (
    <div
      data-state={state}
      className={cn(baseClass, stateBackgroundMap[state], className)}
      style={{ width: resolveWidth(width) }}
    >
      <span style={gameNameStyle}>{gameName}</span>
      <span style={eventNameStyle}>{eventName}</span>
    </div>
  );
}
