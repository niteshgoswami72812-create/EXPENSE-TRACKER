const icons = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3 10h18M7 15h3" />
    </>
  ),
  budget: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v9h9" />
    </>
  ),
  analytics: (
    <>
      <path d="M4 19V9M10 19V5M16 19v-7M22 19V3" />
      <path d="M2 19h21" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19 15.2l1.4 1.4-2.8 2.8-1.4-1.4a7.7 7.7 0 0 1-2.2.9V21h-4v-2.1a7.7 7.7 0 0 1-2.2-.9l-1.4 1.4-2.8-2.8L5 15.2A7.7 7.7 0 0 1 4.1 13H2v-4h2.1A7.7 7.7 0 0 1 5 6.8L3.6 5.4l2.8-2.8L7.8 4A7.7 7.7 0 0 1 10 3.1V1h4v2.1a7.7 7.7 0 0 1 2.2.9l1.4-1.4 2.8 2.8L19 6.8a7.7 7.7 0 0 1 .9 2.2H22v4h-2.1a7.7 7.7 0 0 1-.9 2.2Z" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  wallet: (
    <>
      <path d="M4 7h15a2 2 0 0 1 2 2v10H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12" />
      <path d="M16 12h5v4h-5a2 2 0 0 1 0-4Z" />
    </>
  ),
  down: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 4 4 4-4M12 8v8" />
    </>
  ),
  up: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 4-4 4 4M12 16V8" />
    </>
  ),
  piggy: (
    <>
      <path d="M19 10c0-3-3-5-7-5S5 7 5 10c-1.5 0-2.5 1-2.5 2.5S3.5 15 5 15c.5 1 1.4 1.8 2.5 2.3V20h3v-2h4v2h3v-3c1-.8 1.5-1.8 1.5-3h2v-4h-2Z" />
      <path d="M9 8h4M16 10h.01" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  edit: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
    </>
  ),
  trash: (
    <>
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
      <path d="M5 20h14" />
    </>
  ),
  close: <path d="m6 6 12 12M18 6 6 18" />,
  check: <path d="m5 12 4 4L19 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  logout: (
    <>
      <path d="M10 17l5-5-5-5M15 12H3" />
      <path d="M14 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5" />
    </>
  ),
};
export function Icon({ name, size = 20, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}
