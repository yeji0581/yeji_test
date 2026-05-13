import * as React from "react";

export interface BannerProps {
  imageSrc: string;
  alt: string;
  href?: string;
  aspectRatio?: string;
  className?: string;
}

function cn(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(" ");
}

const containerClass = "relative block w-full overflow-hidden";
const imageClass =
  "absolute inset-0 h-full w-full max-w-none object-cover pointer-events-none";

export function Banner({
  imageSrc,
  alt,
  href,
  aspectRatio = "1920/560",
  className,
}: BannerProps) {
  const style: React.CSSProperties = { aspectRatio };
  const image = <img src={imageSrc} alt={alt} className={imageClass} />;

  if (href) {
    return (
      <a
        href={href}
        className={cn(containerClass, className)}
        style={style}
        data-node-id="45:328"
      >
        {image}
      </a>
    );
  }

  return (
    <figure
      className={cn(containerClass, className)}
      style={style}
      data-node-id="45:328"
    >
      {image}
    </figure>
  );
}
