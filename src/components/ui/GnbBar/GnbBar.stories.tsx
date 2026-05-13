import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, within } from "@storybook/test";

import { GnbBar } from "./GnbBar";

const FIGMA_URL =
  "https://www.figma.com/design/voAWXnzqW33gBNPFy3XQHp/?node-id=7-1156";

const meta = {
  title: "UI/GnbBar",
  component: GnbBar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
  },
  argTypes: {
    menuLabel: { control: { type: "text" } },
    signupLabel: { control: { type: "text" } },
    loginLabel: { control: { type: "text" } },
    onMenuClick: { action: "menu" },
    onCardClick: { action: "card" },
    onLocationClick: { action: "location" },
    onSignupClick: { action: "signup" },
    onLoginClick: { action: "login" },
  },
  args: {
    menuLabel: "메뉴",
    signupLabel: "회원가입",
    loginLabel: "로그인",
  },
} satisfies Meta<typeof GnbBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FigmaWidth: Story = {
  name: "Figma Width (1280px)",
  parameters: {
    layout: "centered",
  },
  render: (args) => (
    <div style={{ width: 1280 }}>
      <GnbBar {...args} />
    </div>
  ),
};

export const CustomLabels: Story = {
  args: {
    menuLabel: "Menu",
    signupLabel: "Sign up",
    loginLabel: "Log in",
  },
};

export const Interactions: Story = {
  args: {
    onMenuClick: fn(),
    onLoginClick: fn(),
    onSignupClick: fn(),
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("renders all labels", async () => {
      await expect(canvas.getByText("메뉴")).toBeInTheDocument();
      await expect(canvas.getByText("회원가입")).toBeInTheDocument();
      await expect(canvas.getByText("로그인")).toBeInTheDocument();
    });

    await step("menu button is clickable", async () => {
      const menuBtn = canvas.getByRole("button", { name: "메뉴" });
      menuBtn.click();
      await expect(args.onMenuClick).toHaveBeenCalledTimes(1);
    });

    await step("login button is clickable", async () => {
      const loginBtn = canvas.getByRole("button", { name: "로그인" });
      loginBtn.click();
      await expect(args.onLoginClick).toHaveBeenCalledTimes(1);
    });
  },
};
