import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";

import thumbnailCrazyArcade from "@/assets/thumbnail-crazyarcade.png";
import thumbnailEaFcOnline from "@/assets/thumbnail-eafc-online.png";

import { CardItem } from "./CardItem";

const FIGMA_URL =
  "https://www.figma.com/design/voAWXnzqW33gBNPFy3XQHp/?node-id=9-580";

const meta = {
  title: "UI/CardItem",
  component: CardItem,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_URL },
  },
  argTypes: {
    layout: {
      control: { type: "radio" },
      options: ["vertical", "horizontal"],
    },
    supportedDevices: {
      control: { type: "check" },
      options: ["desktop", "mobile"],
    },
    showUpdateBadge: { control: { type: "boolean" } },
    title: { control: { type: "text" } },
    category: { control: { type: "text" } },
    imageAlt: { control: { type: "text" } },
  },
  args: {
    imageSrc: thumbnailCrazyArcade,
    imageAlt: "크레이지 아케이드 썸네일",
    title: "game name",
    category: "GAME CATEGORY",
    layout: "vertical",
    supportedDevices: ["desktop", "mobile"],
    showUpdateBadge: false,
  },
} satisfies Meta<typeof CardItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const VerticalDefault: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("타이틀과 카테고리가 렌더된다", async () => {
      await expect(canvas.getByText("game name")).toBeInTheDocument();
      await expect(canvas.getByText("GAME CATEGORY")).toBeInTheDocument();
    });

    await step("데스크톱/모바일 아이콘이 모두 노출된다", async () => {
      await expect(
        canvas.getByRole("img", { name: "데스크톱 지원" }),
      ).toBeInTheDocument();
      await expect(
        canvas.getByRole("img", { name: "모바일 지원" }),
      ).toBeInTheDocument();
    });
  },
};

export const VerticalWithBadge: Story = {
  args: { showUpdateBadge: true },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("Update 배지가 노출된다", async () => {
      const badge = canvas.getByRole("status", { name: "업데이트 뱃지" });
      await expect(badge).toBeInTheDocument();
      await expect(badge).toHaveTextContent("Update");
    });
  },
};

export const HorizontalDefault: Story = {
  args: {
    layout: "horizontal",
    imageSrc: thumbnailEaFcOnline,
    imageAlt: "EA SPORTS FC 온라인 썸네일",
    title: "EA SPORTS FC ONLINE",
    category: "SPORTS",
  },
};

export const HorizontalWithBadge: Story = {
  args: {
    layout: "horizontal",
    showUpdateBadge: true,
    imageSrc: thumbnailEaFcOnline,
    imageAlt: "EA SPORTS FC 온라인 썸네일",
    title: "EA SPORTS FC ONLINE",
    category: "SPORTS",
  },
};

export const DesktopOnly: Story = {
  args: { supportedDevices: ["desktop"] },
};

export const MobileOnly: Story = {
  args: { supportedDevices: ["mobile"] },
};

export const Clickable: Story = {
  args: {
    showUpdateBadge: true,
    onClick: () => {
      // Storybook actions에서 클릭 확인용 — 실제 사용 시 onClick 핸들러 전달
    },
  },
};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, max-content)",
        gap: "var(--spacing-xl)",
        alignItems: "start",
      }}
    >
      <CardItem
        imageSrc={thumbnailCrazyArcade}
        imageAlt="크레이지 아케이드 썸네일"
        title="game name"
        category="GAME CATEGORY"
        layout="vertical"
      />
      <CardItem
        imageSrc={thumbnailCrazyArcade}
        imageAlt="크레이지 아케이드 썸네일"
        title="game name"
        category="GAME CATEGORY"
        layout="vertical"
        showUpdateBadge
      />
      <CardItem
        imageSrc={thumbnailEaFcOnline}
        imageAlt="EA SPORTS FC 온라인 썸네일"
        title="EA SPORTS FC ONLINE"
        category="SPORTS"
        layout="horizontal"
      />
      <CardItem
        imageSrc={thumbnailEaFcOnline}
        imageAlt="EA SPORTS FC 온라인 썸네일"
        title="EA SPORTS FC ONLINE"
        category="SPORTS"
        layout="horizontal"
        showUpdateBadge
      />
    </div>
  ),
};
