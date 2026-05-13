import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";

import { FilterChip } from "./FilterChip";

const FIGMA_URL =
  "https://www.figma.com/design/voAWXnzqW33gBNPFy3XQHp/?node-id=9-150";

const meta = {
  title: "UI/FilterChip",
  component: FilterChip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
  },
  argTypes: {
    active: { control: { type: "boolean" } },
    children: { control: { type: "text" } },
    onClick: { action: "clicked" },
  },
  args: {
    active: false,
    children: "Filter",
    onClick: fn(),
  },
} satisfies Meta<typeof FilterChip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    active: false,
    children: "Filter",
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);

    await step("renders as unpressed button", async () => {
      const chip = canvas.getByRole("button", { name: /filter/i });
      await expect(chip).toHaveAttribute("aria-pressed", "false");
      await expect(chip).toHaveAttribute("data-state", "default");
    });

    await step("fires onClick when clicked", async () => {
      const chip = canvas.getByRole("button", { name: /filter/i });
      await userEvent.click(chip);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  },
};

export const Active: Story = {
  args: {
    active: true,
    children: "Filter",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByRole("button", { name: /filter/i });
    await expect(chip).toHaveAttribute("aria-pressed", "true");
    await expect(chip).toHaveAttribute("data-state", "active");
  },
};

export const Hover: Story = {
  args: {
    active: false,
    children: "Filter",
  },
  parameters: {
    pseudo: { hover: true },
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
        gap: "var(--spacing-sm)",
        alignItems: "center",
        background: "var(--background-grey)",
        padding: "var(--spacing-md)",
      }}
    >
      <FilterChip>Default</FilterChip>
      <FilterChip active>Active</FilterChip>
      <FilterChip>Hover me</FilterChip>
    </div>
  ),
};
