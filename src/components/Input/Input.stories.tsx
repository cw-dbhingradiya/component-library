import type { Meta, StoryObj } from "@storybook/react";
import { Input, InputGroup } from "./Input";

/* ────────── Helper icons ────────── */

const MailIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

/**
 * Input field components inspired by
 * [Untitled UI](https://www.untitledui.com/react/components/inputs).
 * Includes a standalone Input and an InputGroup for composite fields
 * (leading text, trailing button, dropdowns, etc.).
 */
const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
    isRequired: { control: "boolean" },
    isInvalid: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

/* ═══════════════════ Default ═══════════════════ */

export const Default: Story = {
  args: {
    label: "Email",
    placeholder: "olivia@untitledui.com",
    hint: "This is a hint text to help user.",
    isRequired: true,
  },
};

/* ═══════════════════ Disabled ═══════════════════ */

export const Disabled: Story = {
  args: {
    label: "Email",
    placeholder: "olivia@untitledui.com",
    hint: "This is a hint text to help user.",
    isRequired: true,
    disabled: true,
  },
};

/* ═══════════════════ Invalid ═══════════════════ */

export const Invalid: Story = {
  args: {
    label: "Email",
    placeholder: "olivia@untitledui.com",
    hint: "This is an error message.",
    isRequired: true,
    isInvalid: true,
    defaultValue: "invalid-email",
  },
};

/* ═══════════════════ Sizes ═══════════════════ */

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <Input
        label="Email"
        placeholder="olivia@untitledui.com"
        hint="This is a hint text to help user."
        isRequired
        size="sm"
      />
      <Input
        label="Email"
        placeholder="olivia@untitledui.com"
        hint="This is a hint text to help user."
        isRequired
        size="md"
      />
    </div>
  ),
};

/* ═══════════════════ Leading Icon ═══════════════════ */

export const LeadingIcon: Story = {
  args: {
    label: "Email",
    placeholder: "olivia@untitledui.com",
    hint: "This is a hint text to help user.",
    isRequired: true,
    icon: <MailIcon />,
  },
};

/* ═══════════════════ With Shortcut ═══════════════════ */

export const WithShortcut: Story = {
  args: {
    label: "Search",
    placeholder: "Search…",
    shortcut: true,
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
};

/* ═══════════════════ With Tooltip ═══════════════════ */

export const WithTooltip: Story = {
  args: {
    label: "API Key",
    placeholder: "sk-…",
    tooltip: "Your secret API key from the dashboard.",
    hint: "Keep this private.",
  },
};

/* ═══════════════════ Leading Text (InputGroup) ═══════════════════ */

export const LeadingText: Story = {
  render: () => (
    <div className="max-w-sm">
      <InputGroup
        label="Website"
        isRequired
        hint="This is a hint text to help user."
        leadingAddon={<span>https://</span>}
        inputProps={{ placeholder: "www.untitledui.com" }}
      />
    </div>
  ),
};

/* ═══════════════════ Trailing Button (InputGroup) ═══════════════════ */

export const TrailingButton: Story = {
  render: () => (
    <div className="max-w-sm">
      <InputGroup
        label="Website"
        isRequired
        hint="This is a hint text to help user."
        trailingAddon={
          <button
            type="button"
            className="whitespace-nowrap text-sm font-medium text-brand hover:text-brand-dark"
          >
            Copy
          </button>
        }
        inputProps={{ placeholder: "www.untitledui.com" }}
      />
    </div>
  ),
};

/* ═══════════════════ Leading Dropdown (InputGroup) ═══════════════════ */

export const LeadingDropdown: Story = {
  render: () => (
    <div className="max-w-sm">
      <InputGroup
        label="Phone number"
        isRequired
        hint="This is a hint text to help user."
        leadingAddon={
          <select className="appearance-none bg-transparent pr-1 text-sm text-gray-700 outline-none">
            <option>US</option>
            <option>CA</option>
            <option>EU</option>
          </select>
        }
        inputProps={{ placeholder: "+1 (555) 000-0000", type: "tel" }}
      />
    </div>
  ),
};

/* ═══════════════════ Trailing Dropdown (InputGroup) ═══════════════════ */

export const TrailingDropdown: Story = {
  render: () => (
    <div className="max-w-sm">
      <InputGroup
        label="Sale amount"
        isRequired
        hint="This is a hint text to help user."
        leadingAddon={<span>$</span>}
        trailingAddon={
          <select className="appearance-none bg-transparent pr-1 text-sm text-gray-700 outline-none">
            <option>USD</option>
            <option>CAD</option>
            <option>EUR</option>
          </select>
        }
        inputProps={{ placeholder: "0.00", type: "number" }}
      />
    </div>
  ),
};

/* ═══════════════════ Payment Input (InputGroup) ═══════════════════ */

export const PaymentInput: Story = {
  render: () => (
    <div className="max-w-sm">
      <InputGroup
        label="Card number"
        isRequired
        hint="This is a hint text to help user."
        leadingAddon={
          <svg
            className="size-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <rect x="1" y="4" width="22" height="16" rx="2" />
            <path d="M1 10h22" />
          </svg>
        }
        inputProps={{ placeholder: "1234 1234 1234 1234" }}
      />
    </div>
  ),
};

/* ═══════════════════ Playground ═══════════════════ */

export const Playground: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    hint: "Hint text",
    isRequired: false,
    isInvalid: false,
    disabled: false,
    size: "sm",
  },
};
