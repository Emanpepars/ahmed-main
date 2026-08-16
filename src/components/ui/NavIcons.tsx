type IconProps = { className?: string };

const base = "h-4 w-4";

export function WorkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base}>
      <rect x="3" y="7.5" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 12.5h18" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function AboutIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.2 18.2c1.1-2.4 3.2-3.7 5.8-3.7s4.7 1.3 5.8 3.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function JourneyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base}>
      <path
        d="M4 18c2.5 0 2.5-3 5-3s2.5 3 5 3 2.5-3 5-3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="6" cy="7" r="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 9v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ServicesIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base}>
      <path
        d="M12.5 3 5 13.2h5.2L11 21l7.5-10.2h-5.2L12.5 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ClientsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base}>
      <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="3.5" width="7.5" height="7.5" rx="1.6" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
      <rect x="3.5" y="13" width="7.5" height="7.5" rx="1.6" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
      <rect x="13" y="13" width="7.5" height="7.5" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function FaqIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9.6 9.5a2.4 2.4 0 1 1 3.4 2.2c-.9.4-1 1-1 1.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.7" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function ContactIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const NAV_ICONS: Record<string, (props: IconProps) => React.JSX.Element> = {
  Work: WorkIcon,
  About: AboutIcon,
  Journey: JourneyIcon,
  Services: ServicesIcon,
  Clients: ClientsIcon,
  FAQ: FaqIcon,
  Contact: ContactIcon,
};

export function CopyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base}>
      <rect x="8.5" y="8.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base}>
      <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base}>
      <path
        d="M8.2 4.5H5.6A2 2 0 0 0 3.6 6.7c.4 4 2.2 7.2 4.3 9.3s5.3 3.9 9.3 4.3a2 2 0 0 0 2.2-2v-2.6a1.4 1.4 0 0 0-1.1-1.4l-2.4-.5a1.4 1.4 0 0 0-1.4.6l-.7 1a11.6 11.6 0 0 1-4.7-4.7l1-.7a1.4 1.4 0 0 0 .6-1.4l-.5-2.4a1.4 1.4 0 0 0-1.4-1.1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DownloadIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base}>
      <path d="M12 3.5v11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7.5 10.5 12 15l4.5-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 17.5v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function XSocialIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? base}>
      <path d="M13.6 10.6 20 3.5h-1.8l-5.5 6.1-4.6-6.1H2.6l6.9 9.2-6.9 7.8h1.8l5.9-6.5 4.9 6.5h5.5l-7.1-9.4Zm-2.1 2.3-.7-.9-5.4-7.3h2.5l4.3 5.9.7.9 5.7 7.6h-2.5l-4.6-6.2Z" />
    </svg>
  );
}

export function LinkedInSocialIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? base}>
      <path d="M6.9 8.9H3.6V20h3.3V8.9ZM5.3 3.9a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.4 20h-3.3v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V20h-3.3V8.9h3.2v1.5h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5V20Z" />
    </svg>
  );
}

export function InstagramSocialIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.8" cy="7.2" r="1" fill="currentColor" />
    </svg>
  );
}

export function BehanceSocialIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? base}>
      <path
        d="M3.5 6.5h5.1c2.6 0 3.9 1.1 3.9 2.9 0 1.2-.6 1.9-1.6 2.4 1.4.4 2.1 1.4 2.1 2.9 0 2-1.5 3.1-4.1 3.1H3.5V6.5Zm2.3 4.6h2.3c1 0 1.6-.5 1.6-1.3s-.6-1.3-1.7-1.3H5.8v2.6Zm0 4.7h2.5c1.2 0 1.8-.5 1.8-1.5s-.6-1.5-1.9-1.5H5.8v3Z"
        fill="currentColor"
      />
      <path d="M14.7 8.7h4.8v1.1h-4.8z" fill="currentColor" />
      <path
        d="M19.9 14.6c0-2.4-1.5-4-3.8-4-2.2 0-3.9 1.6-3.9 4.1 0 2.5 1.6 4 4 4 1.8 0 3.1-.9 3.5-2.4h-2c-.2.5-.7.8-1.4.8-1 0-1.7-.6-1.8-1.8h5.4v-.7Zm-5.4-.7c.2-1 .8-1.6 1.7-1.6s1.5.6 1.6 1.6h-3.3Z"
        fill="currentColor"
      />
    </svg>
  );
}
