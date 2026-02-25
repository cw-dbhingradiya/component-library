import type { ReactNode } from "react";
import {
  Badge,
  BadgeWithDot,
  BadgeWithIcon,
  BadgeIcon,
  BadgeWithButton,
  BadgeWithImage,
} from "@/components/Badge";

const ArrowIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 12h14m-7-7 7 7-7 7"
    />
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

export default function BadgePage() {
  return (
    <div className="space-y-10">
      <Section title="Pill Color">
        <div className="flex flex-wrap items-center gap-2">
          <Badge type="pill-color" color="gray" size="sm">Gray</Badge>
          <Badge type="pill-color" color="brand" size="sm">Brand</Badge>
          <Badge type="pill-color" color="error" size="sm">Error</Badge>
          <Badge type="pill-color" color="warning" size="sm">Warning</Badge>
          <Badge type="pill-color" color="success" size="sm">Success</Badge>
          <Badge type="pill-color" color="blue" size="sm">Blue</Badge>
          <Badge type="pill-color" color="indigo" size="sm">Indigo</Badge>
          <Badge type="pill-color" color="purple" size="sm">Purple</Badge>
          <Badge type="pill-color" color="pink" size="sm">Pink</Badge>
          <Badge type="pill-color" color="orange" size="sm">Orange</Badge>
        </div>
      </Section>

      <Section title="Badge Color">
        <div className="flex flex-wrap items-center gap-2">
          <Badge type="badge-color" color="gray" size="md">Gray</Badge>
          <Badge type="badge-color" color="brand" size="md">Brand</Badge>
          <Badge type="badge-color" color="error" size="md">Error</Badge>
          <Badge type="badge-color" color="success" size="md">Success</Badge>
          <Badge type="badge-color" color="blue" size="md">Blue</Badge>
          <Badge type="badge-color" color="purple" size="md">Purple</Badge>
        </div>
      </Section>

      <Section title="Badge Modern">
        <div className="flex flex-wrap items-center gap-2">
          <Badge type="badge-modern" color="gray" size="sm">Small</Badge>
          <Badge type="badge-modern" color="gray" size="md">Medium</Badge>
          <Badge type="badge-modern" color="gray" size="lg">Large</Badge>
        </div>
      </Section>

      <Section title="With Dot">
        <div className="flex flex-wrap items-center gap-2">
          <BadgeWithDot type="pill-color" color="success" size="md">Active</BadgeWithDot>
          <BadgeWithDot type="pill-color" color="error" size="md">Offline</BadgeWithDot>
          <BadgeWithDot type="badge-color" color="warning" size="md">Pending</BadgeWithDot>
          <BadgeWithDot type="badge-modern" color="gray" size="md">Default</BadgeWithDot>
        </div>
      </Section>

      <Section title="With Icon">
        <div className="flex flex-wrap items-center gap-2">
          <BadgeWithIcon type="pill-color" color="brand" size="md" startIcon={<ArrowIcon />}>
            Leading
          </BadgeWithIcon>
          <BadgeWithIcon type="badge-color" color="blue" size="md" endIcon={<ArrowIcon />}>
            Trailing
          </BadgeWithIcon>
          <BadgeIcon type="pill-color" color="gray" size="md" icon={<ArrowIcon />} />
          <BadgeIcon type="badge-color" color="brand" size="md" icon={<ArrowIcon />} />
        </div>
      </Section>

      <Section title="With Close Button">
        <div className="flex flex-wrap items-center gap-2">
          <BadgeWithButton type="pill-color" color="gray" size="md" onButtonClick={() => {}}>
            Removable
          </BadgeWithButton>
          <BadgeWithButton type="badge-color" color="brand" size="md" onButtonClick={() => {}}>
            Dismiss
          </BadgeWithButton>
          <BadgeWithButton type="badge-modern" color="gray" size="md" onButtonClick={() => {}}>
            Close
          </BadgeWithButton>
        </div>
      </Section>

      <Section title="With Image">
        <div className="flex flex-wrap items-center gap-2">
          <BadgeWithImage
            type="pill-color"
            color="gray"
            size="md"
            imgSrc="https://i.pravatar.cc/40?u=a"
            imgAlt="Avatar"
          >
            Avatar
          </BadgeWithImage>
          <BadgeWithImage
            type="badge-color"
            color="brand"
            size="lg"
            imgSrc="https://i.pravatar.cc/40?u=b"
            imgAlt="Avatar"
          >
            User
          </BadgeWithImage>
        </div>
      </Section>
    </div>
  );
}
