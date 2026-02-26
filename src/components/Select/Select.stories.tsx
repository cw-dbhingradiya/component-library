import type { Meta, StoryObj } from "@storybook/react";
import { Select, SelectWithSearch, SelectWithTags } from "./Select";
import type { SelectOption } from "./Select";

/* ────────── Sample data ────────── */

const TEAM_MEMBERS: SelectOption[] = [
  { value: "phoenix", label: "Phoenix Baker", description: "@phoenix", avatar: "https://i.pravatar.cc/40?u=phoenix" },
  { value: "olivia", label: "Olivia Rhye", description: "@olivia", avatar: "https://i.pravatar.cc/40?u=olivia" },
  { value: "lana", label: "Lana Steiner", description: "@lana", avatar: "https://i.pravatar.cc/40?u=lana" },
  { value: "demi", label: "Demi Wilkinson", description: "@demi", avatar: "https://i.pravatar.cc/40?u=demi" },
  { value: "candice", label: "Candice Wu", description: "@candice", avatar: "https://i.pravatar.cc/40?u=candice" },
  { value: "natali", label: "Natali Craig", description: "@natali", avatar: "https://i.pravatar.cc/40?u=natali" },
  { value: "abraham", label: "Abraham Baker", description: "@abraham", avatar: "https://i.pravatar.cc/40?u=abraham" },
  { value: "adem", label: "Adem Lane", description: "@adem", avatar: "https://i.pravatar.cc/40?u=adem" },
  { value: "jackson", label: "Jackson Reed", description: "@jackson", avatar: "https://i.pravatar.cc/40?u=jackson" },
  { value: "jessie", label: "Jessie Meyton", description: "@jessie", avatar: "https://i.pravatar.cc/40?u=jessie" },
];

const PLAIN_OPTIONS: SelectOption[] = [
  { value: "phoenix", label: "Phoenix Baker", description: "@phoenix" },
  { value: "olivia", label: "Olivia Rhye", description: "@olivia" },
  { value: "lana", label: "Lana Steiner", description: "@lana" },
  { value: "demi", label: "Demi Wilkinson", description: "@demi" },
  { value: "candice", label: "Candice Wu", description: "@candice" },
  { value: "natali", label: "Natali Craig", description: "@natali" },
];

const UserIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const DOT_OPTIONS: SelectOption[] = [
  { value: "phoenix", label: "Phoenix Baker", description: "@phoenix", dot: "bg-green-500" },
  { value: "olivia", label: "Olivia Rhye", description: "@olivia", dot: "bg-green-500" },
  { value: "lana", label: "Lana Steiner", description: "@lana", dot: "bg-red-500" },
  { value: "demi", label: "Demi Wilkinson", description: "@demi", dot: "bg-amber-500" },
  { value: "candice", label: "Candice Wu", description: "@candice", dot: "bg-green-500" },
  { value: "natali", label: "Natali Craig", description: "@natali", dot: "bg-gray-400" },
];

const ICON_OPTIONS: SelectOption[] = PLAIN_OPTIONS.map((o) => ({
  ...o,
  icon: <UserIcon />,
}));

/**
 * Select components inspired by
 * [Untitled UI](https://www.untitledui.com/react/components/select).
 * Includes Select (basic), SelectWithSearch (filterable), and
 * SelectWithTags (multi-select with tag badges).
 */
const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
    isRequired: { control: "boolean" },
    isInvalid: { control: "boolean" },
    isDisabled: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm pb-72">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

/* ═══════════════════ Default ═══════════════════ */

export const Default: Story = {
  args: {
    label: "Team member",
    placeholder: "Select team member",
    hint: "This is a hint text to help user.",
    isRequired: true,
    options: PLAIN_OPTIONS,
  },
};

/* ═══════════════════ Disabled ═══════════════════ */

export const Disabled: Story = {
  args: {
    label: "Team member",
    placeholder: "Select team member",
    hint: "This is a hint text to help user.",
    isRequired: true,
    isDisabled: true,
    options: PLAIN_OPTIONS,
  },
};

/* ═══════════════════ Sizes ═══════════════════ */

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Select
        label="Team member"
        placeholder="Select team member"
        hint="This is a hint text to help user."
        isRequired
        size="sm"
        options={PLAIN_OPTIONS}
      />
      <Select
        label="Team member"
        placeholder="Select team member"
        hint="This is a hint text to help user."
        isRequired
        size="md"
        options={PLAIN_OPTIONS}
      />
    </div>
  ),
};

/* ═══════════════════ Icon Leading ═══════════════════ */

export const IconLeading: Story = {
  args: {
    label: "Team member",
    placeholder: "Select team member",
    hint: "This is a hint text to help user.",
    isRequired: true,
    options: ICON_OPTIONS,
  },
};

/* ═══════════════════ Avatar Leading ═══════════════════ */

export const AvatarLeading: Story = {
  args: {
    label: "Team member",
    placeholder: "Select team member",
    hint: "This is a hint text to help user.",
    isRequired: true,
    options: TEAM_MEMBERS,
  },
};

/* ═══════════════════ Dot Leading ═══════════════════ */

export const DotLeading: Story = {
  args: {
    label: "Team member",
    placeholder: "Select team member",
    hint: "This is a hint text to help user.",
    isRequired: true,
    options: DOT_OPTIONS,
  },
};

/* ═══════════════════ Search ═══════════════════ */

export const Search: Story = {
  render: () => (
    <SelectWithSearch
      label="Search"
      isRequired
      hint="This is a hint text to help user."
      placeholder="Select team member"
      searchPlaceholder="⌘K"
      options={TEAM_MEMBERS}
    />
  ),
};

/* ═══════════════════ Tags (multi-select) ═══════════════════ */

export const Tags: Story = {
  render: () => (
    <SelectWithTags
      label="Search"
      isRequired
      hint="This is a hint text to help user."
      options={TEAM_MEMBERS}
      defaultValue={["phoenix", "olivia"]}
    />
  ),
};

/* ═══════════════════ Playground ═══════════════════ */

export const Playground: Story = {
  args: {
    label: "Team member",
    placeholder: "Select team member",
    hint: "Hint text",
    isRequired: false,
    isInvalid: false,
    isDisabled: false,
    size: "sm",
    options: PLAIN_OPTIONS,
  },
};
