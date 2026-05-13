import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";

import { Pagination } from "./Pagination";

const FIGMA_URL =
  "https://www.figma.com/design/voAWXnzqW33gBNPFy3XQHp/?node-id=7-1158";

const meta = {
  title: "UI/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
  },
  argTypes: {
    state: {
      control: { type: "select" },
      options: ["default", "active"],
    },
    gameName: { control: { type: "text" } },
    eventName: { control: { type: "text" } },
    width: { control: { type: "text" } },
  },
  args: {
    state: "default",
    gameName: "game name",
    eventName: "event name",
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    state: "default",
  },
};

export const Active: Story = {
  args: {
    state: "active",
  },
};

export const AllStates: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "var(--spacing-md)",
        alignItems: "flex-start",
      }}
    >
      <Pagination state="default" gameName="game name" eventName="event name" />
      <Pagination state="active" gameName="game name" eventName="event name" />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("renders both default and active variants", async () => {
      const gameLabels = canvas.getAllByText("game name");
      const eventLabels = canvas.getAllByText("event name");
      await expect(gameLabels).toHaveLength(2);
      await expect(eventLabels).toHaveLength(2);
    });
  },
};
