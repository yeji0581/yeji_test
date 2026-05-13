import * as React from "react";

export interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> {
  variant?: "primary" | "secondary" | "outline";
  size?: "lg" | "md" | "sm";
  children: React.ReactNode;
  className?: string;
}

/**
 * Size별 padding 매핑.
 * primary/secondary와 outline의 padding이 다르므로 분리.
 */
const sizePaddingByVariant = {
  primary: {
    lg: "px-[var(--spacing-2xl)] py-[var(--spacing-lg)]",
    md: "px-[var(--spacing-xl)] py-[var(--spacing-md)]",
    sm: "px-[var(--spacing-lg)] py-[var(--spacing-sm)]",
  },
  secondary: {
    lg: "px-[var(--spacing-2xl)] py-[var(--spacing-lg)]",
    md: "px-[var(--spacing-xl)] py-[var(--spacing-md)]",
    sm: "px-[var(--spacing-lg)] py-[var(--spacing-sm)]",
  },
  outline: {
    lg: "px-[var(--spacing-xl)] py-[var(--spacing-sm)]",
    md: "px-[var(--spacing-lg)] py-[var(--spacing-xs)]",
    sm: "px-[var(--spacing-sm)] py-[var(--spacing-xxs)]",
  },
} as const;

/**
 * Size별 타이포그래피 prefix.
 * --type-{prefix}-size, --type-{prefix}-line-height, --type-{prefix}-weight를 사용.
 */
const typographyPrefixBySize = {
  lg: "s2-subtitle",
  md: "b1-body",
  sm: "b3-body",
} as const;

/**
 * Variant별 시각 스타일.
 * - primary/secondary: solid 배경, hover/active 시 배경 변경, 텍스트는 inverse 고정.
 * - outline: 투명 배경 + 2px border, hover/active 시 배경 채우고 border 투명화 + 텍스트 inverse.
 * - disabled: opacity-40 + hover/active 무효화.
 */
const variantClassMap = {
  primary: [
    "rounded-[var(--radius-none)]",
    "bg-[var(--background-primary-btn)]",
    "text-[var(--text-inverse)]",
    "border-0",
    "hover:bg-[var(--background-active)]",
    "active:bg-[var(--background-pressed)]",
    "disabled:hover:bg-[var(--background-primary-btn)]",
    "disabled:active:bg-[var(--background-primary-btn)]",
  ].join(" "),
  secondary: [
    "rounded-[var(--radius-none)]",
    "bg-[var(--background-secondary-btn)]",
    "text-[var(--text-inverse)]",
    "border-0",
    "hover:bg-[var(--background-active)]",
    "active:bg-[var(--background-pressed)]",
    "disabled:hover:bg-[var(--background-secondary-btn)]",
    "disabled:active:bg-[var(--background-secondary-btn)]",
  ].join(" "),
  outline: [
    "rounded-[var(--radius-xl)]",
    "bg-transparent",
    "text-[var(--text-primary)]",
    "border-2",
    "border-[var(--border-primary)]",
    "hover:bg-[var(--background-active)]",
    "hover:text-[var(--text-inverse)]",
    "hover:border-transparent",
    "active:bg-[var(--background-pressed)]",
    "active:text-[var(--text-inverse)]",
    "active:border-transparent",
    "disabled:hover:bg-transparent",
    "disabled:hover:text-[var(--text-primary)]",
    "disabled:hover:border-[var(--border-primary)]",
    "disabled:active:bg-transparent",
    "disabled:active:text-[var(--text-primary)]",
    "disabled:active:border-[var(--border-primary)]",
  ].join(" "),
} as const;

const baseClass = [
  "inline-flex",
  "items-center",
  "justify-center",
  "font-[var(--font-family)]",
  "transition-colors",
  "duration-150",
  "focus-visible:outline-2",
  "focus-visible:outline-offset-2",
  "focus-visible:outline-[var(--border-focus)]",
  "disabled:opacity-40",
  "disabled:cursor-not-allowed",
].join(" ");

function cn(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(" ");
}

export function Button({
  variant = "primary",
  size = "md",
  type,
  children,
  className,
  style,
  ...rest
}: ButtonProps) {
  const typoPrefix = typographyPrefixBySize[size];
  const typographyStyle: React.CSSProperties = {
    fontSize: `var(--type-${typoPrefix}-size)`,
    lineHeight: `var(--type-${typoPrefix}-line-height)`,
    fontWeight:
      `var(--type-${typoPrefix}-weight)` as React.CSSProperties["fontWeight"],
  };

  return (
    <button
      type={type ?? "button"}
      className={cn(
        baseClass,
        sizePaddingByVariant[variant][size],
        variantClassMap[variant],
        className,
      )}
      style={{ ...typographyStyle, ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}
