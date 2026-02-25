import type { ReactNode } from "react";
import { Button } from "@/components/Button";

const PlusIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    data-icon
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
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

export default function ButtonPage() {
  return (
    <div className="space-y-10">
      <Section title="Variants">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="link-color">Link Color</Button>
          <Button variant="link-gray">Link Gray</Button>
        </div>
      </Section>

      <Section title="Sizes">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button variant="primary" size="xl">XLarge</Button>
        </div>
      </Section>

      <Section title="With Icons">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" startIcon={<PlusIcon />} size="sm">
            Leading
          </Button>
          <Button variant="primary" endIcon={<PlusIcon />} size="sm">
            Trailing
          </Button>
          <Button
            variant="secondary"
            startIcon={<PlusIcon />}
            size="md"
            aria-label="Add"
          />
        </div>
      </Section>

      <Section title="Loading & Disabled">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" isLoading size="md">
            Loading
          </Button>
          <Button variant="primary" isLoading showTextWhileLoading size="md">
            Saving…
          </Button>
          <Button variant="primary" isDisabled size="md">
            Disabled
          </Button>
        </div>
      </Section>

      <Section title="Destructive">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary-destructive" size="sm">Primary</Button>
          <Button variant="secondary-destructive" size="sm">Secondary</Button>
          <Button variant="tertiary-destructive" size="sm">Tertiary</Button>
        </div>
      </Section>
    </div>
  );
}
