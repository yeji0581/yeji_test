import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import { Logo } from "./Logo";

const FIGMA_URL =
  "https://www.figma.com/design/voAWXnzqW33gBNPFy3XQHp/?node-id=6-1248";

const meta = {
  title: "UI/Logo",
  component: Logo,
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_URL },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
    },
    "aria-label": { control: "text" },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { size: "md" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const image = await canvas.findByRole("img", { name: "NEXON" });
    expect(image).toBeInTheDocument();
  },
};

export const Small: Story = {
  args: { size: "sm" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const OnDarkBackground: Story = {
  args: { size: "md" },
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "var(--background-footer)" }],
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "var(--spacing-2xl)",
          background: "var(--background-footer)",
          borderRadius: "var(--radius-sm)",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const CustomAriaLabel: Story = {
  args: {
    size: "md",
    "aria-label": "넥슨 홈으로 이동",
  },
};
