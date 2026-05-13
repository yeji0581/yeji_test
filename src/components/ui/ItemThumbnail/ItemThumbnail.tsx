import thumbnailCrazyArcade from "@/assets/thumbnail-crazyarcade.png";
import thumbnailEaFcOnline from "@/assets/thumbnail-eafc-online.png";

export type ItemThumbnailVariant = "image1" | "image2";

export interface ItemThumbnailProps {
  variant: ItemThumbnailVariant;
  className?: string;
  "aria-label"?: string;
}

const VARIANT_SRC: Record<ItemThumbnailVariant, string> = {
  image1: thumbnailCrazyArcade,
  image2: thumbnailEaFcOnline,
};

const VARIANT_DEFAULT_LABEL: Record<ItemThumbnailVariant, string> = {
  image1: "크레이지 아케이드 썸네일",
  image2: "EA SPORTS FC 온라인 썸네일",
};

const VARIANT_NODE_ID: Record<ItemThumbnailVariant, string> = {
  image1: "8:71",
  image2: "8:70",
};

const WIDTH_PX = 153;
const HEIGHT_PX = 192;

export function ItemThumbnail({
  variant,
  className,
  "aria-label": ariaLabel,
}: ItemThumbnailProps) {
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
