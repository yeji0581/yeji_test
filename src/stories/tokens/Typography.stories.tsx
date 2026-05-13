import type { Meta, StoryObj } from "@storybook/react";

const FIGMA_URL =
  "https://www.figma.com/design/voAWXnzqW33gBNPFy3XQHp/?node-id=3-1036";

const SAMPLE = "다람쥐 헌 쳇바퀴에 타고파 The quick brown fox 0123456789";

type TypeRamp = {
  name: string;
  prefix: string;
  size: string;
  lineHeight: string;
  weight: string;
  letterSpacing?: string;
};

const TYPE_RAMPS: TypeRamp[] = [
  {
    name: "Type/H1Headline",
    prefix: "type-h1-headline",
    size: "28",
    lineHeight: "32",
    weight: "700",
  },
  {
    name: "Type/H2Headline",
    prefix: "type-h2-headline",
    size: "24",
    lineHeight: "28",
    weight: "700",
  },
  {
    name: "Type/S1Subtitle",
    prefix: "type-s1-subtitle",
    size: "18",
    lineHeight: "20",
    weight: "700",
  },
  {
    name: "Type/S2Subtitle",
    prefix: "type-s2-subtitle",
    size: "16",
    lineHeight: "20",
    weight: "700",
  },
  {
    name: "Type/B1Body",
    prefix: "type-b1-body",
    size: "15",
    lineHeight: "18",
    weight: "700",
  },
  {
    name: "Type/B2Body",
    prefix: "type-b2-body",
    size: "14",
    lineHeight: "16",
    weight: "400",
  },
  {
    name: "Type/B3Body",
    prefix: "type-b3-body",
    size: "14",
    lineHeight: "16",
    weight: "700",
  },
  {
    name: "Type/B4Body",
    prefix: "type-b4-body",
    size: "13",
    lineHeight: "16",
    weight: "700",
  },
  {
    name: "Type/B5Body",
    prefix: "type-b5-body",
    size: "12",
    lineHeight: "14",
    weight: "400",
  },
  {
    name: "Type/C1Caption",
    prefix: "type-c1-caption",
    size: "11",
    lineHeight: "16",
    weight: "400",
    letterSpacing: "-0.3",
  },
  {
    name: "Type/C2Caption",
    prefix: "type-c2-caption",
    size: "10",
    lineHeight: "16",
    weight: "400",
    letterSpacing: "-0.3",
  },
];

function RampRow({ ramp }: { ramp: TypeRamp }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "200px 140px 1fr",
        alignItems: "baseline",
        gap: "var(--spacing-md)",
        padding: "var(--spacing-md) 0",
        borderBottom: "1px solid var(--border-secondary)",
      }}
    >
      <code
        style={{
          fontFamily: "var(--font-family)",
          fontSize: "var(--font-size-12)",
          color: "var(--text-secondary)",
        }}
      >
        {ramp.name}
      </code>
      <span
        style={{
          fontFamily: "var(--font-family)",
          fontSize: "var(--font-size-11)",
          color: "var(--text-grey)",
        }}
      >
        {ramp.size} / {ramp.lineHeight} / {ramp.weight}
      </span>
      <span
        style={{
          fontFamily: "var(--font-family)",
          fontSize: `var(--${ramp.prefix}-size)`,
          lineHeight: `var(--${ramp.prefix}-line-height)`,
          fontWeight: `var(--${ramp.prefix}-weight)`,
          letterSpacing: ramp.letterSpacing
            ? `var(--${ramp.prefix}-letter-spacing)`
            : undefined,
          color: "var(--text-primary)",
        }}
      >
        {SAMPLE}
      </span>
    </div>
  );
}

const meta = {
  title: "Tokens/Typography",
  parameters: {
    layout: "padded",
    design: { type: "figma", url: FIGMA_URL },
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TypeRampStory: Story = {
  name: "Type Ramp",
  render: () => (
    <div>
      {TYPE_RAMPS.map((r) => (
        <RampRow key={r.prefix} ramp={r} />
      ))}
    </div>
  ),
};

const FONT_SIZES = [10, 11, 12, 13, 14, 15, 16, 18, 24, 28];

export const FontSizes: Story = {
  render: () => (
    <div>
      {FONT_SIZES.map((s) => (
        <div
          key={s}
          style={{
            display: "grid",
            gridTemplateColumns: "160px 60px 1fr",
            alignItems: "baseline",
            gap: "var(--spacing-md)",
            padding: "var(--spacing-sm) 0",
            borderBottom: "1px solid var(--border-secondary)",
            fontFamily: "var(--font-family)",
          }}
        >
          <code
            style={{
              fontSize: "var(--font-size-12)",
              color: "var(--text-secondary)",
            }}
          >
            --font-size-{s}
          </code>
          <span
            style={{
              fontSize: "var(--font-size-12)",
              color: "var(--text-grey)",
            }}
          >
            {s}px
          </span>
          <span style={{ fontSize: `var(--font-size-${s})` }}>{SAMPLE}</span>
        </div>
      ))}
    </div>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <div style={{ fontFamily: "var(--font-family)" }}>
      {([400, 700] as const).map((w) => (
        <div
          key={w}
          style={{
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            alignItems: "baseline",
            gap: "var(--spacing-md)",
            padding: "var(--spacing-md) 0",
            borderBottom: "1px solid var(--border-secondary)",
          }}
        >
          <code
            style={{
              fontSize: "var(--font-size-12)",
              color: "var(--text-secondary)",
            }}
          >
            --font-weight-{w}
          </code>
          <span
            style={{
              fontSize: "var(--font-size-18)",
              fontWeight: `var(--font-weight-${w})`,
            }}
          >
            {SAMPLE}
          </span>
        </div>
      ))}
    </div>
  ),
};
