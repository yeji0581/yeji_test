import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";

import { Badge } from "./Badge";

const FIGMA_URL =
  "https://www.figma.com/design/voAWXnzqW33gBNPFy3XQHp/?node-id=8-49";

const meta = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["pick", "recommend", "update"],
    },
    children: { control: { type: "text" } },
  },
  args: {
    variant: "pick",
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Pick: Story = {
  args: {
    variant: "pick",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("renders default Pick label", async () => {
      const badge = canvas.getByRole("status", { name: "Pick 뱃지" });
      await expect(badge).toBeInTheDocument();
      await expect(badge).toHaveTextContent("Pick");
    });
  },
};

export const Recommend: Story = {
  args: {
    variant: "recommend",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("renders default 추천 label", async () => {
      const badge = canvas.getByRole("status", { name: "추천 뱃지" });
      await expect(badge).toBeInTheDocument();
      await expect(badge).toHaveTextContent("추천");
    });
  },
};

export const Update: Story = {
  args: {
    variant: "update",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("renders default Update label", async () => {
      const badge = canvas.getByRole("status", { name: "업데이트 뱃지" });
      await expect(badge).toBeInTheDocument();
      await expect(badge).toHaveTextContent("Update");
    });
  },
};

export const CustomLabel: Story = {
  args: {
    variant: "pick",
    children: "BEST",
  },
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "var(--spacing-md)",
        alignItems: "center",
      }}
    >
      <Badge variant="pick" />
      <Badge variant="recommend" />
      <Badge variant="update" />
      <Badge variant="pick">BEST</Badge>
    </div>
  ),
};
