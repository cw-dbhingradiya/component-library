import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

/**
 * Button component inspired by [Untitled UI](https://www.untitledui.com/react/components/buttons).
 * Supports primary, secondary, tertiary, link-style, and destructive variants;
 * sizes sm/md/lg/xl; leading/trailing icons; loading and disabled states;
 * and optional `href` to render as a link.
 */
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "link-color",
        "link-gray",
        "primary-destructive",
        "secondary-destructive",
        "tertiary-destructive",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
    isDisabled: { control: "boolean" },
    isLoading: { control: "boolean" },
    showTextWhileLoading: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Button",
    variant: "primary",
  },
};

export const PrimarySizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary" size="sm">
        Button sm
      </Button>
      <Button variant="primary" size="md">
        Button md
      </Button>
      <Button variant="primary" size="lg">
        Button lg
      </Button>
      <Button variant="primary" size="xl">
        Button xl
      </Button>
    </div>
  ),
};

export const Secondary: Story = {
  args: {
    children: "Button",
    variant: "secondary",
  },
};

export const SecondarySizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="secondary" size="sm">
        Button sm
      </Button>
      <Button variant="secondary" size="md">
        Button md
      </Button>
      <Button variant="secondary" size="lg">
        Button lg
      </Button>
      <Button variant="secondary" size="xl">
        Button xl
      </Button>
    </div>
  ),
};

export const Tertiary: Story = {
  args: {
    children: "Button",
    variant: "tertiary",
  },
};

export const TertiarySizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="tertiary" size="sm">
        Button sm
      </Button>
      <Button variant="tertiary" size="md">
        Button md
      </Button>
      <Button variant="tertiary" size="lg">
        Button lg
      </Button>
      <Button variant="tertiary" size="xl">
        Button xl
      </Button>
    </div>
  ),
};

export const LinkColor: Story = {
  args: {
    children: "Button",
    variant: "link-color",
  },
};

export const LinkGray: Story = {
  args: {
    children: "Button",
    variant: "link-gray",
  },
};

const PlaceholderIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    data-icon
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

export const IconLeading: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary" startIcon={<PlaceholderIcon />} size="sm">
        Button sm
      </Button>
      <Button variant="primary" startIcon={<PlaceholderIcon />} size="md">
        Button md
      </Button>
      <Button variant="primary" startIcon={<PlaceholderIcon />} size="lg">
        Button lg
      </Button>
      <Button variant="primary" startIcon={<PlaceholderIcon />} size="xl">
        Button xl
      </Button>
    </div>
  ),
};

export const IconTrailing: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary" endIcon={<PlaceholderIcon />} size="sm">
        Button sm
      </Button>
      <Button variant="primary" endIcon={<PlaceholderIcon />} size="md">
        Button md
      </Button>
      <Button variant="primary" endIcon={<PlaceholderIcon />} size="lg">
        Button lg
      </Button>
      <Button variant="primary" endIcon={<PlaceholderIcon />} size="xl">
        Button xl
      </Button>
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        variant="primary"
        startIcon={<PlaceholderIcon />}
        size="sm"
        aria-label="Add"
      />
      <Button
        variant="primary"
        startIcon={<PlaceholderIcon />}
        size="md"
        aria-label="Add"
      />
      <Button
        variant="primary"
        startIcon={<PlaceholderIcon />}
        size="lg"
        aria-label="Add"
      />
      <Button
        variant="primary"
        startIcon={<PlaceholderIcon />}
        size="xl"
        aria-label="Add"
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary" isLoading size="sm">
        Button sm
      </Button>
      <Button variant="primary" isLoading size="md">
        Button md
      </Button>
      <Button variant="primary" isLoading showTextWhileLoading size="lg">
        Button lg
      </Button>
      <Button variant="primary" isLoading showTextWhileLoading size="xl">
        Button xl
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary" isDisabled size="sm">
        Button sm
      </Button>
      <Button variant="secondary" isDisabled size="md">
        Button md
      </Button>
      <Button variant="tertiary" isDisabled size="lg">
        Button lg
      </Button>
    </div>
  ),
};

export const PrimaryDestructive: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary-destructive" size="sm">
        Button sm
      </Button>
      <Button variant="primary-destructive" size="md">
        Button md
      </Button>
      <Button variant="primary-destructive" size="lg">
        Button lg
      </Button>
      <Button variant="primary-destructive" size="xl">
        Button xl
      </Button>
    </div>
  ),
};

export const SecondaryDestructive: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="secondary-destructive" size="sm">
        Button sm
      </Button>
      <Button variant="secondary-destructive" size="md">
        Button md
      </Button>
    </div>
  ),
};

export const TertiaryDestructive: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="tertiary-destructive" size="sm">
        Button sm
      </Button>
      <Button variant="tertiary-destructive" size="md">
        Button md
      </Button>
    </div>
  ),
};

export const AsLink: Story = {
  args: {
    children: "Go to docs",
    href: "#",
    variant: "primary",
  },
};
