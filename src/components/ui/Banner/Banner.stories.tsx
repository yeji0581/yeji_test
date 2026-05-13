import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";

import { Banner } from "./Banner";
import bannerMabinogiWolf from "../../../assets/banner-mabinogi-wolf.png";

const FIGMA_URL =
  "https://www.figma.com/design/voAWXnzqW33gBNPFy3XQHp/?node-id=45-328";

const MABINOGI_ALT =
  "마비노기 모바일 - 달밤의 늑대인간 카카오톡 이모티콘 신규출시";

const meta = {
  title: "UI/Banner",
  component: Banner,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
  },
  argTypes: {
    imageSrc: { control: { type: "text" } },
    alt: { control: { type: "text" } },
    href: { control: { type: "text" } },
    aspectRatio: { control: { type: "text" } },
    className: { control: { type: "text" } },
  },
  args: {
    imageSrc: bannerMabinogiWolf,
    alt: MABINOGI_ALT,
  },
} satisfies Meta<typeof Banner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageSrc: bannerMabinogiWolf,
    alt: MABINOGI_ALT,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("이미지가 alt 텍스트와 함께 렌더된다", async () => {
      const image = canvas.getByAltText(MABINOGI_ALT);
      await expect(image).toBeInTheDocument();
    });
  },
};

export const WithLink: Story = {
  args: {
    imageSrc: bannerMabinogiWolf,
    alt: MABINOGI_ALT,
    href: "https://mabinogimobile.nexon.com",
  },
};

export const CustomAspectRatio: Story = {
  args: {
    imageSrc: bannerMabinogiWolf,
    alt: MABINOGI_ALT,
    aspectRatio: "16/9",
  },
};
