import type { Meta, StoryObj } from "@storybook/react";

const FIGMA_URL =
  "https://www.figma.com/design/voAWXnzqW33gBNPFy3XQHp/?node-id=3-1036";

type Swatch = { name: string; cssVar: string };

function SwatchGrid({ items }: { items: Swatch[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "var(--spacing-md)",
        fontFamily: "var(--font-family)",
      }}
    >
      {items.map((item) => (
        <div
          key={item.cssVar}
          style={{
            border: "1px solid var(--border-secondary)",
            borderRadius: "var(--radius-sm)",
            overflow: "hidden",
            background: "var(--background-white)",
          }}
        >
          <div
            style={{
              height: 64,
              background: `var(${item.cssVar})`,
              borderBottom: "1px solid var(--border-secondary)",
            }}
            aria-label={item.name}
          />
          <div
            style={{
              padding: "var(--spacing-xs)",
              fontSize: "var(--font-size-12)",
              lineHeight: "var(--line-height-16)",
            }}
          >
            <div style={{ fontWeight: "var(--font-weight-700)" }}>
              {item.name}
            </div>
            <code
              style={{
                color: "var(--text-secondary)",
                fontSize: "var(--font-size-11)",
              }}
            >
              {item.cssVar}
            </code>
          </div>
        </div>
      ))}
    </div>
  );
}

function range(prefix: string, steps: number[]): Swatch[] {
  return steps.map((s) => ({
    name: `${prefix}/${s}`,
    cssVar: `--${prefix}-${s}`,
  }));
}

const COLOR_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const OPACITY_STEPS = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];

const meta = {
  title: "Tokens/Colors",
  parameters: {
    layout: "padded",
    design: { type: "figma", url: FIGMA_URL },
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <SwatchGrid items={range("primary", COLOR_STEPS)} />,
};

export const Yellow: Story = {
  render: () => <SwatchGrid items={range("yellow", COLOR_STEPS)} />,
};

export const Blue: Story = {
  render: () => <SwatchGrid items={range("blue", COLOR_STEPS)} />,
};

export const Green: Story = {
  render: () => <SwatchGrid items={range("green", COLOR_STEPS)} />,
};

export const Grey: Story = {
  render: () => <SwatchGrid items={range("grey", COLOR_STEPS)} />,
};

export const WhiteOpacity: Story = {
  name: "White / Opacity",
  render: () => (
    <div
      style={{
        padding: "var(--spacing-md)",
        background: "var(--grey-800)",
        borderRadius: "var(--radius-sm)",
      }}
    >
      <SwatchGrid items={range("white", OPACITY_STEPS)} />
    </div>
  ),
};

export const BlackOpacity: Story = {
  name: "Black / Opacity",
  render: () => <SwatchGrid items={range("black", OPACITY_STEPS)} />,
};

const TEXT_TOKENS: Swatch[] = [
  { name: "text/primary", cssVar: "--text-primary" },
  { name: "text/secondary", cssVar: "--text-secondary" },
  { name: "text/grey", cssVar: "--text-grey" },
  { name: "text/inverse", cssVar: "--text-inverse" },
  { name: "text/recommend", cssVar: "--text-recommend" },
  { name: "text/footer link", cssVar: "--text-footer-link" },
  { name: "text/footer caption", cssVar: "--text-footer-caption" },
];

const BACKGROUND_TOKENS: Swatch[] = [
  { name: "background/white", cssVar: "--background-white" },
  { name: "background/grey", cssVar: "--background-grey" },
  { name: "background/active", cssVar: "--background-active" },
  { name: "background/pressed", cssVar: "--background-pressed" },
  { name: "background/recommend", cssVar: "--background-recommend" },
  { name: "background/pick", cssVar: "--background-pick" },
  { name: "background/update", cssVar: "--background-update" },
  { name: "background/primary btn", cssVar: "--background-primary-btn" },
  { name: "background/secondary btn", cssVar: "--background-secondary-btn" },
  { name: "background/footer", cssVar: "--background-footer" },
  { name: "background/divider", cssVar: "--background-divider" },
  { name: "background/pagenation", cssVar: "--background-pagenation" },
];

const BORDER_TOKENS: Swatch[] = [
  { name: "border/primary", cssVar: "--border-primary" },
  { name: "border/secondary", cssVar: "--border-secondary" },
  { name: "border/focus", cssVar: "--border-focus" },
];

const ICON_TOKENS: Swatch[] = [
  { name: "icon/grey", cssVar: "--icon-grey" },
  { name: "icon/light-grey", cssVar: "--icon-light-grey" },
];

export const SemanticText: Story = {
  render: () => <SwatchGrid items={TEXT_TOKENS} />,
};

export const SemanticBackground: Story = {
  render: () => <SwatchGrid items={BACKGROUND_TOKENS} />,
};

export const SemanticBorder: Story = {
  render: () => <SwatchGrid items={BORDER_TOKENS} />,
};

export const SemanticIcon: Story = {
  render: () => <SwatchGrid items={ICON_TOKENS} />,
};
