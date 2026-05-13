import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";

import { Button } from "./Button";

const FIGMA_URL =
  "https://www.figma.com/design/voAWXnzqW33gBNPFy3XQHp/?node-id=7-1079";

const meta = {
  title: "UI/Button",
  component: Button,
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
      options: ["primary", "secondary", "outline"],
    },
    size: {
      control: { type: "select" },
      options: ["lg", "md", "sm"],
    },
    disabled: { control: { type: "boolean" } },
    onClick: { action: "clicked" },
  },
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    onClick: fn(),
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /button/i });

    await step("renders the button with default label", async () => {
      await expect(button).toBeInTheDocument();
    });

    await step("fires onClick when clicked", async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalled();
    });
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, max-content)",
        gap: "var(--spacing-lg)",
        alignItems: "center",
      }}
    >
      <Button variant="primary" size="lg">
        Primary LG
      </Button>
      <Button variant="secondary" size="lg">
        Secondary LG
      </Button>
      <Button variant="outline" size="lg">
        Outline LG
      </Button>

      <Button variant="primary" size="md">
        Primary MD
      </Button>
      <Button variant="secondary" size="md">
        Secondary MD
      </Button>
      <Button variant="outline" size="md">
        Outline MD
      </Button>

      <Button variant="primary" size="sm">
        Primary SM
      </Button>
      <Button variant="secondary" size="sm">
        Secondary SM
      </Button>
      <Button variant="outline" size="sm">
        Outline SM
      </Button>
    </div>
  ),
};
