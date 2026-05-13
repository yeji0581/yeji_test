import thumbnailCrazyArcade from "@/assets/thumbnail-crazyarcade.png";
import thumbnailEaFcOnline from "@/assets/thumbnail-eafc-online.png";

export type CardImageVariant = "image1" | "image2";

export interface CardImageProps {
  variant: CardImageVariant;
  className?: string;
  "aria-label"?: string;
}

const VARIANT_SRC: Record<CardImageVariant, string> = {
  image1: thumbnailCrazyArcade,
  image2: thumbnailEaFcOnline,
};

const VARIANT_DEFAULT_LABEL: Record<CardImageVariant, string> = {
  image1: "크레이지 아케이드 썸네일",
  image2: "EA SPORTS FC 온라인 썸네일",
};

const VARIANT_NODE_ID: Record<CardImageVariant, string> = {
  image1: "9:419",
  image2: "9:418",
};

const WIDTH_PX = 300;
const HEIGHT_PX = 200;

export function CardImage({
  variant,
  className,
  "aria-label": ariaLabel,
}: CardImageProps) {
  return (
    <div
      className={className}
      style={{
        width: `${WIDTH_PX}px`,
        height: `${HEIGHT_PX}px`,
        position: "relative",
        overflow: "hidden",
      }}
      data-node-id={VARIANT_NODE_ID[variant]}
      data-variant={variant}
    >
      <img
        src={VARIANT_SRC[variant]}
        alt={ariaLabel ?? VARIANT_DEFAULT_LABEL[variant]}
        width={WIDTH_PX}
        height={HEIGHT_PX}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
