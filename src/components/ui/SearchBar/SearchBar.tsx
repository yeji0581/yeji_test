import * as React from "react";

import { Icon } from "../Icon";

export type SearchBarState = "default" | "fill" | "focus";

export interface SearchBarProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "size" | "className"
> {
  /** controlled value. 미지정 시 내부 state로 uncontrolled 동작. */
  value?: string;
  /** 값 변경 콜백. */
  onChange?: (value: string) => void;
  /** 검색 실행 콜백 (검색 버튼 클릭 + Enter 키). */
  onSearch?: (value: string) => void;
  /** placeholder 텍스트. 기본값 "게임명 검색". */
  placeholder?: string;
  /** 강제로 시각 상태를 지정. 지정 시 자동 관리(focus-within/값 입력) 무시 — Storybook 시연용. */
  state?: SearchBarState;
  className?: string;
  /** 검색 버튼의 aria-label. 기본값 "검색". */
  "aria-label"?: string;
}

/**
 * 게임명 검색 입력 필드.
 * Figma 노드 9:1640 의 default / fill / focus variant 를 표현.
 *
 * 토큰 매핑:
 * - default 텍스트: --grey-400
 * - fill/focus 텍스트: --text-primary
 * - placeholder: --grey-400
 * - default/fill border: --border-secondary (bottom only)
 * - focus border: --border-focus (full)
 * - 아이콘: --icon-grey
 * - radius: --radius-xs (4px)
 * - height: 48px (h-12)
 * - 좌우 padding: --spacing-xxs
 * - 폰트: Type/B5Body (12/14/400)
 */
const stateClassMap = {
  default: [
    "border-b",
    "border-[var(--border-secondary)]",
    "text-[var(--grey-400)]",
  ].join(" "),
  fill: [
    "border-b",
    "border-[var(--border-secondary)]",
    "text-[var(--text-primary)]",
  ].join(" "),
  focus: [
    "border",
    "border-[var(--border-focus)]",
    "text-[var(--text-primary)]",
  ].join(" "),
} as const;

const baseClass = [
  "flex",
  "items-center",
  "gap-[var(--spacing-xxs)]",
  "h-12",
  "w-full",
  "px-[var(--spacing-xxs)]",
  "rounded-[var(--radius-xs)]",
  "bg-transparent",
  "font-[var(--font-family)]",
  "transition-colors",
  "duration-150",
].join(" ");

function cn(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(" ");
}

function resolveState(
  forced: SearchBarState | undefined,
  isFocused: boolean,
  hasValue: boolean,
): SearchBarState {
  if (forced) return forced;
  if (isFocused) return "focus";
  if (hasValue) return "fill";
  return "default";
}

export function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "게임명 검색",
  state: forcedState,
  className,
  style,
  "aria-label": ariaLabel = "검색",
  onKeyDown,
  onFocus,
  onBlur,
  ...rest
}: SearchBarProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);

  const currentValue = isControlled ? (value as string) : internalValue;
  const state = resolveState(forcedState, isFocused, currentValue.length > 0);

  const typographyStyle: React.CSSProperties = {
    fontSize: "var(--type-b5-body-size)",
    lineHeight: "var(--type-b5-body-line-height)",
    fontWeight:
      "var(--type-b5-body-weight)" as React.CSSProperties["fontWeight"],
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value;
    if (!isControlled) {
      setInternalValue(next);
    }
    onChange?.(next);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (event.key === "Enter") {
      onSearch?.(currentValue);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  const handleSearchClick = () => {
    onSearch?.(currentValue);
  };

  return (
    <div
      data-node-id="9-1640"
      data-state={state}
      className={cn(baseClass, stateClassMap[state], className)}
    >
      <input
        {...rest}
        type="text"
        role="searchbox"
        value={currentValue}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="flex-1 bg-transparent border-0 outline-none placeholder:text-[var(--grey-400)] text-[color:inherit]"
        style={{ ...typographyStyle, ...style }}
      />
      <button
        type="button"
        aria-label={ariaLabel}
        onClick={handleSearchClick}
        className="inline-flex items-center justify-center bg-transparent border-0 p-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--border-focus)]"
      >
        <Icon name="search" size={24} color="var(--icon-grey)" />
      </button>
    </div>
  );
}
