import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import { Icon, ICON_NAMES, type IconName } from "./Icon";

const FIGMA_URL =
  "https://www.figma.com/design/voAWXnzqW33gBNPFy3XQHp/?node-id=5-1437";

const meta = {
  title: "UI/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_URL },
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: { type: "select" },
      options: ICON_NAMES as unknown as IconName[],
    },
    size: {
      control: { type: "number", min: 12, max: 96, step: 2 },
    },
    color: { control: "color" },
    "aria-label": { control: "text" },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { name: "search", "aria-label": "검색" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icon = await canvas.findByRole("img", { name: "검색" });
    expect(icon).toBeInTheDocument();
    expect(icon.getAttribute("data-icon-name")).toBe("search");
  },
};

export const AllIcons: Story = {
  args: { name: "search" },
  parameters: { layout: "padded" },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "var(--spacing-lg)",
        padding: "var(--spacing-md)",
      }}
    >
      {ICON_NAMES.map((n) => (
        <div
          key={n}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--spacing-xs)",
            padding: "var(--spacing-md)",
            background: "var(--background-white)",
            border: "1px solid var(--border-secondary)",
            borderRadius: "var(--radius-sm)",
            fontFamily: "var(--font-family)",
            fontSize: "var(--type-b5-body-size)",
            lineHeight: "var(--type-b5-body-line-height)",
            fontWeight: "var(--type-b5-body-weight)",
            color: "var(--text-secondary)",
          }}
        >
          <Icon name={n} aria-label={n} />
          <span>{n}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  args: { name: "search" },
  parameters: { layout: "padded" },
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--spacing-lg)",
        padding: "var(--spacing-md)",
      }}
    >
      <Icon name="search" size={16} aria-label="16px" />
      <Icon name="search" size={20} aria-label="20px" />
      <Icon name="search" size={24} aria-label="24px (default)" />
      <Icon name="search" size={32} aria-label="32px" />
      <Icon name="search" size={48} aria-label="48px" />
    </div>
  ),
};

export const Colors: Story = {
  args: { name: "location" },
  parameters: { layout: "padded" },
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--spacing-lg)",
        padding: "var(--spacing-md)",
      }}
    >
      <Icon name="location" aria-label="기본 (--icon-grey)" />
      <Icon
        name="location"
        color="var(--icon-light-grey)"
        aria-label="비활성"
      />
      <Icon name="location" color="var(--text-recommend)" aria-label="추천" />
      <Icon
        name="location"
        color="var(--background-active)"
        aria-label="활성"
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    name: "menu",
    color: "var(--icon-light-grey)",
    "aria-label": "비활성 메뉴",
  },
};

export const OnDarkBackground: Story = {
  args: {
    name: "menu",
    color: "var(--text-inverse)",
    "aria-label": "메뉴",
  },
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

export const Decorative: Story = {
  args: { name: "card" },
};
