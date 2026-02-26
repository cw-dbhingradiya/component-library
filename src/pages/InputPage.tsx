import type { ReactNode } from "react";
import { Input, InputGroup } from "@/components/Input";

const MailIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

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

export default function InputPage() {
  return (
    <div className="space-y-10 max-w-md">
      <Section title="Default">
        <Input
          label="Email"
          placeholder="olivia@untitledui.com"
          hint="This is a hint text to help user."
          isRequired
        />
      </Section>

      <Section title="Disabled">
        <Input
          label="Email"
          placeholder="olivia@untitledui.com"
          hint="This is a hint text to help user."
          isRequired
          disabled
        />
      </Section>

      <Section title="Invalid">
        <Input
          label="Email"
          placeholder="olivia@untitledui.com"
          hint="This is an error message."
          isRequired
          isInvalid
          defaultValue="invalid-email"
        />
      </Section>

      <Section title="Sizes">
        <div className="flex flex-col gap-4">
          <Input
            label="Email (sm)"
            placeholder="olivia@untitledui.com"
            hint="This is a hint text to help user."
            isRequired
            size="sm"
          />
          <Input
            label="Email (md)"
            placeholder="olivia@untitledui.com"
            hint="This is a hint text to help user."
            isRequired
            size="md"
          />
        </div>
      </Section>

      <Section title="Leading Icon">
        <Input
          label="Email"
          placeholder="olivia@untitledui.com"
          hint="This is a hint text to help user."
          isRequired
          icon={<MailIcon />}
        />
      </Section>

      <Section title="Leading Text (InputGroup)">
        <InputGroup
          label="Website"
          isRequired
          hint="This is a hint text to help user."
          leadingAddon={<span>https://</span>}
          inputProps={{ placeholder: "www.untitledui.com" }}
        />
      </Section>

      <Section title="Trailing Button (InputGroup)">
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
      </Section>

      <Section title="Leading Dropdown (InputGroup)">
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
      </Section>

      <Section title="Trailing Dropdown (InputGroup)">
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
      </Section>

      <Section title="Payment Input (InputGroup)">
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
      </Section>
    </div>
  );
}
