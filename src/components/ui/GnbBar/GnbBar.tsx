import * as React from "react";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";

export interface GnbBarProps {
  onMenuClick?: () => void;
  onCardClick?: () => void;
  onLocationClick?: () => void;
  onSignupClick?: () => void;
  onLoginClick?: () => void;
  menuLabel?: string;
  signupLabel?: string;
  loginLabel?: string;
  className?: string;
}

const menuTextStyle: React.CSSProperties = {
  fontFamily: "var(--font-family)",
  fontSize: "var(--type-s2-subtitle-size)",
  lineHeight: "var(--type-s2-subtitle-line-height)",
  fontWeight:
    "var(--type-s2-subtitle-weight)" as React.CSSProperties["fontWeight"],
};

const signupTextStyle: React.CSSProperties = {
  fontFamily: "var(--font-family)",
  fontSize: "var(--type-b3-body-size)",
  lineHeight: "var(--type-b3-body-line-height)",
  fontWeight: "var(--type-b3-body-weight)" as React.CSSProperties["fontWeight"],
};

const iconButtonClass = [
  "inline-flex",
  "items-center",
  "justify-center",
  "shrink-0",
  "bg-transparent",
  "border-0",
  "p-0",
  "cursor-pointer",
  "focus-visible:outline-2",
  "focus-visible:outline-offset-2",
  "focus-visible:outline-[var(--border-focus)]",
].join(" ");

const textButtonClass = [
  ...iconButtonClass.split(" "),
  "text-[var(--text-primary)]",
  "whitespace-nowrap",
].join(" ");

function cn(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(" ");
}

export function GnbBar({
  onMenuClick,
  onCardClick,
  onLocationClick,
  onSignupClick,
  onLoginClick,
  menuLabel = "메뉴",
  signupLabel = "회원가입",
  loginLabel = "로그인",
  className,
}: GnbBarProps) {
  return (
    <header
      data-node-id="7:1156"
      data-name="gnbBar"
      className={cn(
        "flex w-full items-center justify-center bg-[var(--background-white)] p-[var(--spacing-md)]",
        className,
      )}
    >
      <nav
        aria-label="Primary"
        className="flex flex-1 items-center gap-[var(--spacing-sm)] min-w-0"
        data-node-id="6:1202"
        data-name="gnbBarleft"
      >
        <button
          type="button"
          onClick={onMenuClick}
          className={cn(textButtonClass, "gap-[var(--spacing-sm)]")}
          aria-label={menuLabel}
        >
          <Icon name="menu" size={24} />
          <span style={menuTextStyle}>{menuLabel}</span>
        </button>
      </nav>

      <Logo size="md" className="shrink-0" />

      <div
        className="flex flex-1 items-center justify-end gap-[var(--spacing-sm)] min-w-0"
        data-node-id="7:1151"
        data-name="gnbBarRight"
      >
        <button
          type="button"
          onClick={onCardClick}
          className={iconButtonClass}
          aria-label="card"
        >
          <Icon name="card" size={24} />
        </button>
        <button
          type="button"
          onClick={onLocationClick}
          className={iconButtonClass}
          aria-label="location"
        >
          <Icon name="location" size={24} />
        </button>
        <button
          type="button"
          onClick={onSignupClick}
          className={textButtonClass}
          style={signupTextStyle}
        >
          {signupLabel}
        </button>
        <Button variant="outline" size="md" onClick={onLoginClick}>
          {loginLabel}
        </Button>
      </div>
    </header>
  );
}
