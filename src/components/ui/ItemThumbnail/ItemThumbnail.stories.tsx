import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import { ItemThumbnail } from "./ItemThumbnail";

const FIGMA_URL =
  "https://www.figma.com/design/voAWXnzqW33gBNPFy3XQHp/?node-id=8-72";

const meta = {
  title: "UI/ItemThumbnail",
  component: ItemThumbnail,
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_URL },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["image1", "image2"],
    },
    "aria-label": { control: "text" },
  },
} satisfies Meta<typeof ItemThumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Image1: Story = {
  args: { variant: "image1" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const image = await canvas.findByRole("img", {
      name: "크레이지 아케이드 썸네일",
    });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("width", "153");
    expect(image).toHaveAttribute("height", "192");
  },
};

export const Image2: Story = {
  args: { variant: "image2" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const image = await canvas.findByRole("img", {
      name: "EA SPORTS FC 온라인 썸네일",
    });
    expect(image).toBeInTheDocument();
  },
};

export const Showcase: Story = {
  args: { variant: "image1" },
  parameters: {
    docs: {
      description: {
        story:
          "Figma 노드 8:72 — 두 variant를 나란히 보여주는 쇼케이스 (디자인 원본 레이아웃).",
      },
    },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "var(--spacing-xl)",
        padding: "var(--spacing-lg)",
      }}
    >
      <ItemThumbnail variant="image1" />
      <ItemThumbnail variant="image2" />
    </div>
  ),
};

export const CustomAriaLabel: Story = {
  args: {
    variant: "image1",
    "aria-label": "게임 카드 이미지",
  },
};
