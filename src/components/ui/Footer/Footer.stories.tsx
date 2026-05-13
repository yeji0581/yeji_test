import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";

import { Footer } from "./Footer";

const FIGMA_URL =
  "https://www.figma.com/design/voAWXnzqW33gBNPFy3XQHp/?node-id=17-289";

const meta = {
  title: "UI/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
  },
  argTypes: {
    primaryLinks: { control: { type: "object" } },
    secondaryLinks: { control: { type: "object" } },
    companyInfo: { control: false },
    copyright: { control: { type: "text" } },
    className: { control: { type: "text" } },
  },
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("기본 1차 링크가 렌더된다", async () => {
      await expect(
        canvas.getByRole("link", { name: "이용약관" }),
      ).toBeInTheDocument();
      await expect(
        canvas.getByRole("link", { name: "전체서비스" }),
      ).toBeInTheDocument();
    });

    await step("기본 2차 링크가 렌더된다", async () => {
      await expect(
        canvas.getByRole("link", { name: "회사소개" }),
      ).toBeInTheDocument();
      await expect(
        canvas.getByRole("link", { name: "넥슨에센셜" }),
      ).toBeInTheDocument();
    });

    await step("카피라이트가 렌더된다", async () => {
      await expect(
        canvas.getByText("© NEXON Korea Corporation All Rights Reserved."),
      ).toBeInTheDocument();
    });
  },
};

export const CustomLinks: Story = {
  args: {
    primaryLinks: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
      { label: "Support", href: "/support" },
    ],
    secondaryLinks: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
    ],
    companyInfo: "Custom company info goes here.",
    copyright: "© 2026 Sample Co.",
  },
};

export const MinimalLinks: Story = {
  args: {
    primaryLinks: [{ label: "이용약관" }, { label: "개인정보처리방침" }],
    secondaryLinks: [{ label: "회사소개" }],
  },
};
