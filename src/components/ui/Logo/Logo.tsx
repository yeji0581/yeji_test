import logoSrc from "@/assets/logo-nexon.png";

export interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  "aria-label"?: string;
}

const SIZE_PX: Record<NonNullable<LogoProps["size"]>, number> = {
  sm: 66,
  md: 99.645,
  lg: 140,
};

const ASPECT_RATIO = 99.645 / 23.493;

export function Logo({
  size = "md",
  className,
  "aria-label": ariaLabel = "NEXON",
}: LogoProps) {
  const width = SIZE_PX[size];
  const height = width / ASPECT_RATIO;

  return (
    <img
      src={logoSrc}
      alt={ariaLabel}
      width={width}
      height={height}
      className={className}
      data-node-id="5:1916"
    />
  );
}
