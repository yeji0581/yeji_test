import * as React from "react";

export interface FilterChipProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> {
  active?: boolean;
  children: React.ReactNode;
  className?: string;
}

const baseClass = [
  "inline-flex",
  "items-center",
  "justify-center",
  "uppercase",
  "whitespace-nowrap",
  "cursor-pointer",
  "px-[var(--spacing-xs)]",
  "py-[var(--spacing-xxs)]",
  "rounded-[var(--radius-md)]",
  "font-[var(--font-family)]",
  "border-0",
  "transition-colors",
  "duration-150",
  "focus-visible:outline-2",
  "focus-visible:outline-offset-2",
  "focus-visible:outline-[var(--border-focus)]",
].join(" ");

const defaultStateClass = [
  "bg-transparent",
  "text-[var(--text-secondary)]",
  "hover:bg-[var(--background-white)]",
  "hover:text-[var(--background-active)]",
].join(" ");

const activeStateClass = [
  "bg-[var(--background-primary-btn)]",
  "text-[var(--text-inverse)]",
].join(" ");

function cn(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(" ");
}

export function FilterChip({
  active = false,
  type,
  children,
  className,
  style,
  ...rest
}: FilterChipProps) {
  const typographyStyle: React.CSSProperties = {
    fontSize: "var(--type-b5-body-size)",
    lineHeight: "var(--type-b5-body-line-height)",
    fontWeight:
      "var(--type-b5-body-weight)" as React.CSSProperties["fontWeight"],
  };

  return (
    <button
      type={type ?? "button"}
      aria-pressed={active}
      data-state={active ? "active" : "default"}
      className={cn(
        baseClass,
        active ? activeStateClass : defaultStateClass,
        className,
      )}
      style={{ ...typographyStyle, ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}
