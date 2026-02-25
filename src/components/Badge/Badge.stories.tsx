import type { Meta, StoryObj } from "@storybook/react";
import {
  Badge,
  BadgeWithDot,
  BadgeWithIcon,
  BadgeIcon,
  BadgeWithButton,
  BadgeWithImage,
  type BadgeColor,
  type BadgeType,
} from "./Badge";

/**
 * Badge components inspired by [Untitled UI](https://www.untitledui.com/react/components/badges).
 * Supports pill-color, badge-color, and badge-modern types across 12 color
 * palettes. Compose with dots, icons, avatars, close buttons, or use icon-only.
 */
const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["pill-color", "badge-color", "badge-modern"],
    },
    color: {
      control: "select",
      options: [
        "gray",
        "brand",
        "error",
        "warning",
        "success",
        "gray-blue",
        "blue-light",
        "blue",
        "indigo",
        "purple",
        "pink",
        "orange",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

const ALL_COLORS: BadgeColor[] = [
  "gray",
  "brand",
  "error",
  "warning",
  "success",
  "gray-blue",
  "blue-light",
  "blue",
  "indigo",
  "purple",
  "pink",
  "orange",
];

const SIZES = ["sm", "md", "lg"] as const;

/* ────────── Helper icon: simple arrow ────────── */
const ArrowIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 12h14m-7-7 7 7-7 7"
    />
  </svg>
);

/* ────────── Helper: renders a row of 3 sizes for a given component ────────── */
function SizeRow({
  color,
  type,
  Component,
  extraProps,
}: {
  color: BadgeColor;
  type: BadgeType;
  Component: typeof Badge;
  extraProps?: Record<string, unknown>;
}) {
  return (
    <div className="flex items-center gap-2">
      {SIZES.map((s) => (
        <Component key={s} type={type} color={color} size={s} {...extraProps}>
          Label
        </Component>
      ))}
    </div>
  );
}

/* ═══════════════════ Pill Color ═══════════════════ */

export const PillColor: Story = {
  name: "Pill Color",
  render: () => (
    <div className="flex flex-col gap-3">
      {ALL_COLORS.map((c) => (
        <SizeRow key={c} color={c} type="pill-color" Component={Badge} />
      ))}
    </div>
  ),
};

/* ═══════════════════ Badge Color ═══════════════════ */

export const Color: Story = {
  name: "Color",
  render: () => (
    <div className="flex flex-col gap-3">
      {ALL_COLORS.map((c) => (
        <SizeRow key={c} color={c} type="badge-color" Component={Badge} />
      ))}
    </div>
  ),
};

/* ═══════════════════ Modern ═══════════════════ */

export const Modern: Story = {
  name: "Modern",
  render: () => (
    <div className="flex items-center gap-2">
      {SIZES.map((s) => (
        <Badge key={s} type="badge-modern" color="gray" size={s}>
          Label
        </Badge>
      ))}
    </div>
  ),
};

/* ═══════════════════ With Dot ═══════════════════ */

export const WithDot: Story = {
  name: "With Dot",
  render: () => (
    <div className="flex flex-col gap-3">
      {ALL_COLORS.map((c) => (
        <div key={c} className="flex items-center gap-2">
          {SIZES.map((s) => (
            <BadgeWithDot key={s} type="pill-color" color={c} size={s}>
              Label
            </BadgeWithDot>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const WithDotBadgeColor: Story = {
  name: "With Dot Badge Color",
  render: () => (
    <div className="flex flex-col gap-3">
      {ALL_COLORS.map((c) => (
        <div key={c} className="flex items-center gap-2">
          {SIZES.map((s) => (
            <BadgeWithDot key={s} type="badge-color" color={c} size={s}>
              Label
            </BadgeWithDot>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const WithDotBadgeModern: Story = {
  name: "With Dot Badge Modern",
  render: () => (
    <div className="flex flex-col gap-3">
      {ALL_COLORS.map((c) => (
        <div key={c} className="flex items-center gap-2">
          {SIZES.map((s) => (
            <BadgeWithDot key={s} type="badge-modern" color={c} size={s}>
              Label
            </BadgeWithDot>
          ))}
        </div>
      ))}
    </div>
  ),
};

/* ═══════════════════ With Icon Leading ═══════════════════ */

export const WithIconLeading: Story = {
  name: "With Icon Leading",
  render: () => (
    <div className="flex flex-col gap-3">
      {ALL_COLORS.map((c) => (
        <div key={c} className="flex items-center gap-2">
          {SIZES.map((s) => (
            <BadgeWithIcon
              key={s}
              type="pill-color"
              color={c}
              size={s}
              startIcon={<ArrowIcon />}
            >
              Label
            </BadgeWithIcon>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const ColorWithIconLeading: Story = {
  name: "Color with Icon Leading",
  render: () => (
    <div className="flex flex-col gap-3">
      {ALL_COLORS.map((c) => (
        <div key={c} className="flex items-center gap-2">
          {SIZES.map((s) => (
            <BadgeWithIcon
              key={s}
              type="badge-color"
              color={c}
              size={s}
              startIcon={<ArrowIcon />}
            >
              Label
            </BadgeWithIcon>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const ModernWithIconLeading: Story = {
  name: "Modern with Icon Leading",
  render: () => (
    <div className="flex flex-col gap-3">
      {ALL_COLORS.map((c) => (
        <div key={c} className="flex items-center gap-2">
          {SIZES.map((s) => (
            <BadgeWithIcon
              key={s}
              type="badge-modern"
              color={c}
              size={s}
              startIcon={<ArrowIcon />}
            >
              Label
            </BadgeWithIcon>
          ))}
        </div>
      ))}
    </div>
  ),
};

/* ═══════════════════ With Icon Trailing ═══════════════════ */

export const WithIconTrailing: Story = {
  name: "With Icon Trailing",
  render: () => (
    <div className="flex flex-col gap-3">
      {ALL_COLORS.map((c) => (
        <div key={c} className="flex items-center gap-2">
          {SIZES.map((s) => (
            <BadgeWithIcon
              key={s}
              type="pill-color"
              color={c}
              size={s}
              endIcon={<ArrowIcon />}
            >
              Label
            </BadgeWithIcon>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const ColorWithIconTrailing: Story = {
  name: "Color with Icon Trailing",
  render: () => (
    <div className="flex flex-col gap-3">
      {ALL_COLORS.map((c) => (
        <div key={c} className="flex items-center gap-2">
          {SIZES.map((s) => (
            <BadgeWithIcon
              key={s}
              type="badge-color"
              color={c}
              size={s}
              endIcon={<ArrowIcon />}
            >
              Label
            </BadgeWithIcon>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const ModernWithIconTrailing: Story = {
  name: "Modern with Icon Trailing",
  render: () => (
    <div className="flex items-center gap-2">
      {SIZES.map((s) => (
        <BadgeWithIcon
          key={s}
          type="badge-modern"
          color="gray"
          size={s}
          endIcon={<ArrowIcon />}
        >
          Label
        </BadgeWithIcon>
      ))}
    </div>
  ),
};

/* ═══════════════════ Icon Only ═══════════════════ */

export const WithIconOnly: Story = {
  name: "With Icon Only",
  render: () => (
    <div className="flex items-center gap-2">
      {SIZES.map((s) => (
        <BadgeIcon
          key={s}
          type="pill-color"
          color="gray"
          size={s}
          icon={<ArrowIcon />}
        />
      ))}
    </div>
  ),
};

export const ColorWithIconOnly: Story = {
  name: "Color with Icon Only",
  render: () => (
    <div className="flex items-center gap-2">
      {SIZES.map((s) => (
        <BadgeIcon
          key={s}
          type="badge-color"
          color="brand"
          size={s}
          icon={<ArrowIcon />}
        />
      ))}
    </div>
  ),
};

export const ModernWithIconOnly: Story = {
  name: "Modern with Icon Only",
  render: () => (
    <div className="flex items-center gap-2">
      {SIZES.map((s) => (
        <BadgeIcon
          key={s}
          type="badge-modern"
          color="gray"
          size={s}
          icon={<ArrowIcon />}
        />
      ))}
    </div>
  ),
};

/* ═══════════════════ With Close X ═══════════════════ */

export const WithCloseX: Story = {
  name: "With Close X",
  render: () => (
    <div className="flex flex-col gap-3">
      {ALL_COLORS.map((c) => (
        <div key={c} className="flex items-center gap-2">
          {SIZES.map((s) => (
            <BadgeWithButton
              key={s}
              type="pill-color"
              color={c}
              size={s}
              onButtonClick={() => {}}
            >
              Label
            </BadgeWithButton>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const WithCloseXBadgeColor: Story = {
  name: "With Close X Badge Color",
  render: () => (
    <div className="flex flex-col gap-3">
      {ALL_COLORS.map((c) => (
        <div key={c} className="flex items-center gap-2">
          {SIZES.map((s) => (
            <BadgeWithButton
              key={s}
              type="badge-color"
              color={c}
              size={s}
              onButtonClick={() => {}}
            >
              Label
            </BadgeWithButton>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const WithCloseXBadgeModern: Story = {
  name: "With Close X Badge Modern",
  render: () => (
    <div className="flex items-center gap-2">
      {SIZES.map((s) => (
        <BadgeWithButton
          key={s}
          type="badge-modern"
          color="gray"
          size={s}
          onButtonClick={() => {}}
        >
          Label
        </BadgeWithButton>
      ))}
    </div>
  ),
};

/* ═══════════════════ With Avatar ═══════════════════ */

const AVATAR_URL = "https://i.pravatar.cc/40";

export const WithAvatar: Story = {
  name: "With Avatar",
  render: () => (
    <div className="flex flex-col gap-3">
      {ALL_COLORS.map((c) => (
        <div key={c} className="flex items-center gap-2">
          {SIZES.map((s) => (
            <BadgeWithImage
              key={s}
              type="pill-color"
              color={c}
              size={s}
              imgSrc={AVATAR_URL}
              imgAlt="Avatar"
            >
              Label
            </BadgeWithImage>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const WithAvatarBadgeColor: Story = {
  name: "With Avatar Badge Color",
  render: () => (
    <div className="flex flex-col gap-3">
      {ALL_COLORS.map((c) => (
        <div key={c} className="flex items-center gap-2">
          {SIZES.map((s) => (
            <BadgeWithImage
              key={s}
              type="badge-color"
              color={c}
              size={s}
              imgSrc={AVATAR_URL}
              imgAlt="Avatar"
            >
              Label
            </BadgeWithImage>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const WithAvatarBadgeModern: Story = {
  name: "With Avatar Badge Modern",
  render: () => (
    <div className="flex items-center gap-2">
      {SIZES.map((s) => (
        <BadgeWithImage
          key={s}
          type="badge-modern"
          color="gray"
          size={s}
          imgSrc={AVATAR_URL}
          imgAlt="Avatar"
        >
          Label
        </BadgeWithImage>
      ))}
    </div>
  ),
};

/* ═══════════════════ Playground ═══════════════════ */

export const Playground: Story = {
  args: {
    children: "Label",
    type: "pill-color",
    color: "gray",
    size: "md",
  },
};
