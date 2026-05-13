import * as React from "react";

import { Badge } from "../Badge";
import { Icon } from "../Icon";

export type CardItemLayout = "vertical" | "horizontal";
export type CardItemDevice = "desktop" | "mobile";

export interface CardItemProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  category: string;
  layout?: CardItemLayout;
  supportedDevices?: CardItemDevice[];
  showUpdateBadge?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * CardItem 컴포넌트.
 * Figma 노드 9:580 — 게임 카드 (vertical/horizontal 레이아웃 × default/hover × update 배지).
 *
 * 토큰 매핑:
 * - 카드 배경: --background-white
 * - 타이틀: --text-primary + Type/S2Subtitle (16/20, weight 700)
 * - 카테고리: --text-secondary + Type/B5Body (12/14, weight 400, uppercase)
 * - 디바이스 아이콘 색: --icon-light-grey (#bbbbbb)
 * - 호버 그림자: --shadow-sm
 * - 패딩/갭: --spacing-lg (20px) / --spacing-sm (12px) / --spacing-xs (8px)
 *
 * 호버 효과는 CSS-only(group + group-hover)로 처리.
 * Update 배지는 Badge(variant="update")를 재사용.
 * 디바이스 아이콘은 Icon(name="desktop"|"mobile")을 재사용.
 */
const IMAGE_WIDTH_PX = 300;
const IMAGE_HEIGHT_PX = 200;
const VERTICAL_WIDTH_PX = 300;
const HORIZONTAL_WIDTH_PX = 600;
const HORIZONTAL_HEIGHT_PX = 200;
const INFO_WIDTH_PX = 300;
const DEVICE_ICON_SIZE_PX = 24;

const DEVICE_ARIA: Record<CardItemDevice, string> = {
  desktop: "데스크톱 지원",
  mobile: "모바일 지원",
};

const baseRootClass = [
  "group",
  "bg-[var(--background-white)]",
  "transition-shadow",
  "duration-150",
  "hover:shadow-[var(--shadow-sm)]",
  "font-[var(--font-family)]",
  "overflow-hidden",
].join(" ");

const verticalRootClass = "flex flex-col";
const horizontalRootClass = "flex flex-row";

const imageWrapperClass = "relative overflow-hidden flex-none";
const imageClass = [
  "block",
  "w-full",
  "h-full",
  "object-cover",
  "transition-transform",
  "duration-200",
  "group-hover:scale-110",
].join(" ");

function cn(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(" ");
}

export function CardItem({
  imageSrc,
  imageAlt,
  title,
  category,
  layout = "vertical",
  supportedDevices = ["desktop", "mobile"],
  showUpdateBadge = false,
  className,
  onClick,
}: CardItemProps) {
  const titleStyle: React.CSSProperties = {
    fontSize: "var(--type-s2-subtitle-size)",
    lineHeight: "var(--type-s2-subtitle-line-height)",
    fontWeight:
      "var(--type-s2-subtitle-weight)" as React.CSSProperties["fontWeight"],
    color: "var(--text-primary)",
    margin: 0,
  };

  const categoryStyle: React.CSSProperties = {
    fontSize: "var(--type-b5-body-size)",
    lineHeight: "var(--type-b5-body-line-height)",
    fontWeight:
      "var(--type-b5-body-weight)" as React.CSSProperties["fontWeight"],
    color: "var(--text-secondary)",
    textTransform: "uppercase",
    margin: 0,
  };

  const rootStyle: React.CSSProperties =
    layout === "horizontal"
      ? {
          width: `${HORIZONTAL_WIDTH_PX}px`,
          height: `${HORIZONTAL_HEIGHT_PX}px`,
        }
      : { width: `${VERTICAL_WIDTH_PX}px` };

  const infoSectionStyle: React.CSSProperties =
    layout === "horizontal"
      ? {
          width: `${INFO_WIDTH_PX}px`,
          padding: "var(--spacing-lg)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: "none",
        }
      : {
          padding: "var(--spacing-lg)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-lg)",
        };

  const interactiveProps: React.HTMLAttributes<HTMLElement> = onClick
    ? {
        role: "button",
        tabIndex: 0,
        onKeyDown: (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onClick();
          }
        },
      }
    : {};

  return (
    <article
      data-node-id="9:580"
      data-layout={layout}
      className={cn(
        baseRootClass,
        layout === "horizontal" ? horizontalRootClass : verticalRootClass,
        onClick && "cursor-pointer",
        className,
      )}
      style={rootStyle}
      onClick={onClick}
      {...interactiveProps}
    >
      <div
        className={imageWrapperClass}
        style={{
          width: `${IMAGE_WIDTH_PX}px`,
          height: `${IMAGE_HEIGHT_PX}px`,
        }}
      >
        <img src={imageSrc} alt={imageAlt} className={imageClass} />
      </div>

      <div style={infoSectionStyle}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-xs)",
          }}
        >
          <h3 style={titleStyle}>{title}</h3>
          <p style={categoryStyle}>{category}</p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {showUpdateBadge ? (
            <Badge variant="update" />
          ) : (
            <span aria-hidden="true" />
          )}

          <div
            style={{
              display: "flex",
              gap: "var(--spacing-sm)",
              alignItems: "center",
            }}
            data-testid="device-icons"
          >
            {supportedDevices.includes("desktop") && (
              <Icon
                name="desktop"
                size={DEVICE_ICON_SIZE_PX}
                color="var(--icon-light-grey)"
                aria-label={DEVICE_ARIA.desktop}
              />
            )}
            {supportedDevices.includes("mobile") && (
              <Icon
                name="mobile"
                size={DEVICE_ICON_SIZE_PX}
                color="var(--icon-light-grey)"
                aria-label={DEVICE_ARIA.mobile}
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
