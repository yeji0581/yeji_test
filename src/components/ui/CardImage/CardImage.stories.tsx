import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import { CardImage } from "./CardImage";

const FIGMA_URL =
  "https://www.figma.com/design/voAWXnzqW33gBNPFy3XQHp/?node-id=9-420";

const meta = {
  title: "UI/CardImage",
  component: CardImage,
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
} satisfies Meta<typeof CardImage>;

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
    expect(image).toHaveAttribute("width", "300");
    expect(image).toHaveAttribute("height", "200");
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
          "Figma 노드 9:420 — 두 variant를 25px 간격으로 나란히 보여주는 쇼케이스 (디자인 원본 레이아웃).",
      },
    },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "25px",
        padding: "20px",
      }}
    >
      <CardImage variant="image1" />
      <CardImage variant="image2" />
    </div>
  ),
};

export const CustomAriaLabel: Story = {
  args: {
    variant: "image1",
    "aria-label": "게임 카드 이미지",
  },
};
