import type { Meta, StoryObj } from "@storybook/react";

const FIGMA_URL =
  "https://www.figma.com/design/voAWXnzqW33gBNPFy3XQHp/?node-id=3-1036";

const SPACING_TOKENS = [
  { name: "spacing-none", value: "0" },
  { name: "spacing-3xs", value: "2px" },
  { name: "spacing-xxs", value: "4px" },
  { name: "spacing-xs", value: "8px" },
  { name: "spacing-sm", value: "12px" },
  { name: "spacing-md", value: "16px" },
  { name: "spacing-lg", value: "20px" },
  { name: "spacing-xl", value: "24px" },
  { name: "spacing-2xl", value: "32px" },
  { name: "spacing-3xl", value: "40px" },
] as const;

const RADIUS_TOKENS = [
  { name: "radius-none", value: "0" },
  { name: "radius-xxs", value: "2px" },
  { name: "radius-xs", value: "4px" },
  { name: "radius-sm", value: "8px" },
  { name: "radius-md", value: "12px" },
  { name: "radius-lg", value: "16px" },
  { name: "radius-xl", value: "24px" },
] as const;

function Row({
  name,
  value,
  block,
}: {
  name: string;
  value: string;
  block: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "180px 80px 1fr",
        alignItems: "center",
        gap: "var(--spacing-md)",
        padding: "var(--spacing-sm) 0",
        borderBottom: "1px solid var(--border-secondary)",
        fontFamily: "var(--font-family)",
        fontSize: "var(--font-size-14)",
      }}
    >
      <code style={{ fontWeight: "var(--font-weight-700)" }}>--{name}</code>
      <span style={{ color: "var(--text-secondary)" }}>{value}</span>
      {block}
    </div>
  );
}

const meta = {
  title: "Tokens/Spacing",
  parameters: {
    layout: "padded",
    design: { type: "figma", url: FIGMA_URL },
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SpacingScale: Story = {
  render: () => (
    <div>
      {SPACING_TOKENS.map((t) => (
        <Row
          key={t.name}
          name={t.name}
          value={t.value}
          block={
            <div
              style={{
                height: 24,
                width: `var(--${t.name})`,
                background: "var(--primary-500)",
                borderRadius: "var(--radius-xxs)",
              }}
              aria-label={t.name}
            />
          }
        />
      ))}
    </div>
  ),
};

export const RadiusScale: Story = {
  render: () => (
    <div>
      {RADIUS_TOKENS.map((t) => (
        <Row
          key={t.name}
          name={t.name}
          value={t.value}
          block={
            <div
              style={{
                width: 64,
                height: 64,
                background: "var(--primary-500)",
                borderRadius: `var(--${t.name})`,
              }}
              aria-label={t.name}
            />
          }
        />
      ))}
    </div>
  ),
};

export const PaddingExample: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-md)",
        fontFamily: "var(--font-family)",
      }}
    >
      {(["spacing-xs", "spacing-md", "spacing-xl", "spacing-3xl"] as const).map(
        (token) => (
          <div
            key={token}
            style={{
              border: "1px dashed var(--border-secondary)",
              padding: `var(--${token})`,
              borderRadius: "var(--radius-sm)",
            }}
          >
            <div
              style={{
                background: "var(--primary-100)",
                color: "var(--text-primary)",
                padding: "var(--spacing-xs)",
                borderRadius: "var(--radius-xs)",
                fontSize: "var(--font-size-13)",
              }}
            >
              padding: var(--{token})
            </div>
          </div>
        ),
      )}
    </div>
  ),
};
