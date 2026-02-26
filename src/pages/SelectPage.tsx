import type { ReactNode } from "react";
import { Select, SelectWithSearch, SelectWithTags } from "@/components/Select";
import type { SelectOption } from "@/components/Select";

const UserIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
    />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const TEAM_MEMBERS: SelectOption[] = [
  {
    value: "phoenix",
    label: "Phoenix Baker",
    description: "@phoenix",
    avatar: "https://i.pravatar.cc/40?u=phoenix",
  },
  {
    value: "olivia",
    label: "Olivia Rhye",
    description: "@olivia",
    avatar: "https://i.pravatar.cc/40?u=olivia",
  },
  {
    value: "lana",
    label: "Lana Steiner",
    description: "@lana",
    avatar: "https://i.pravatar.cc/40?u=lana",
  },
  {
    value: "demi",
    label: "Demi Wilkinson",
    description: "@demi",
    avatar: "https://i.pravatar.cc/40?u=demi",
  },
  {
    value: "candice",
    label: "Candice Wu",
    description: "@candice",
    avatar: "https://i.pravatar.cc/40?u=candice",
  },
  {
    value: "natali",
    label: "Natali Craig",
    description: "@natali",
    avatar: "https://i.pravatar.cc/40?u=natali",
  },
];

const PLAIN_OPTIONS: SelectOption[] = TEAM_MEMBERS.map(({ ...o }) => o);

const DOT_OPTIONS: SelectOption[] = [
  {
    value: "phoenix",
    label: "Phoenix Baker",
    description: "@phoenix",
    dot: "bg-green-500",
  },
  {
    value: "olivia",
    label: "Olivia Rhye",
    description: "@olivia",
    dot: "bg-green-500",
  },
  {
    value: "lana",
    label: "Lana Steiner",
    description: "@lana",
    dot: "bg-red-500",
  },
  {
    value: "demi",
    label: "Demi Wilkinson",
    description: "@demi",
    dot: "bg-amber-500",
  },
];

const ICON_OPTIONS: SelectOption[] = PLAIN_OPTIONS.map((o) => ({
  ...o,
  icon: <UserIcon />,
}));

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function SelectPage() {
  return (
    <div className="space-y-10 max-w-sm">
      <Section title="Default">
        <Select
          label="Team member"
          placeholder="Select team member"
          hint="This is a hint text to help user."
          isRequired
          options={PLAIN_OPTIONS}
        />
      </Section>

      <Section title="Disabled">
        <Select
          label="Team member"
          placeholder="Select team member"
          hint="This is a hint text to help user."
          isRequired
          isDisabled
          options={PLAIN_OPTIONS}
        />
      </Section>

      <Section title="Sizes">
        <div className="flex flex-col gap-4">
          <Select
            label="Team member (sm)"
            placeholder="Select team member"
            hint="This is a hint text to help user."
            isRequired
            size="sm"
            options={PLAIN_OPTIONS}
          />
          <Select
            label="Team member (md)"
            placeholder="Select team member"
            hint="This is a hint text to help user."
            isRequired
            size="md"
            options={PLAIN_OPTIONS}
          />
        </div>
      </Section>

      <Section title="Icon Leading">
        <Select
          label="Team member"
          placeholder="Select team member"
          hint="This is a hint text to help user."
          isRequired
          options={ICON_OPTIONS}
        />
      </Section>

      <Section title="Avatar Leading">
        <Select
          label="Team member"
          placeholder="Select team member"
          hint="This is a hint text to help user."
          isRequired
          options={TEAM_MEMBERS}
        />
      </Section>

      <Section title="Dot Leading">
        <Select
          label="Team member"
          placeholder="Select team member"
          hint="This is a hint text to help user."
          isRequired
          options={DOT_OPTIONS}
        />
      </Section>

      <Section title="Search">
        <SelectWithSearch
          label="Search"
          isRequired
          hint="This is a hint text to help user."
          placeholder="Select team member"
          searchPlaceholder="⌘K"
          options={TEAM_MEMBERS}
        />
      </Section>

      <Section title="Tags (Multi-select)">
        <SelectWithTags
          label="Search"
          isRequired
          hint="This is a hint text to help user."
          options={TEAM_MEMBERS}
          defaultValue={["phoenix", "olivia"]}
        />
      </Section>
    </div>
  );
}
