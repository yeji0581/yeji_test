import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";

import { SearchBar } from "./SearchBar";

const FIGMA_URL =
  "https://www.figma.com/design/voAWXnzqW33gBNPFy3XQHp/?node-id=9-1640";

const meta = {
  title: "UI/SearchBar",
  component: SearchBar,
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
      options: [undefined, "default", "fill", "focus"],
    },
    placeholder: { control: { type: "text" } },
    onSearch: { action: "search" },
    onChange: { action: "change" },
  },
  args: {
    placeholder: "게임명 검색",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Filled: Story = {
  args: {
    state: "fill",
    value: "메이플스토리",
  },
};

export const Focused: Story = {
  args: {
    state: "focus",
    value: "",
  },
};

export const Interactive: Story = {
  args: {
    onSearch: fn(),
    onChange: fn(),
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("searchbox");

    await step("renders placeholder", async () => {
      await expect(input).toHaveAttribute("placeholder", "게임명 검색");
    });

    await step("typing fires onChange", async () => {
      await userEvent.type(input, "메이플");
      await expect(args.onChange).toHaveBeenCalled();
    });

    await step("Enter key fires onSearch with current value", async () => {
      await userEvent.keyboard("{Enter}");
      await expect(args.onSearch).toHaveBeenCalledWith("메이플");
    });
  },
};
