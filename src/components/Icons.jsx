// Inline SVG icon set — no icon-font, no external request, no layout shift.
// Every icon inherits currentColor and is aria-hidden; the accessible name
// belongs on the interactive element that wraps it.

const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
}

export function GithubIcon(props) {
  return (
    <svg {...base} fill="currentColor" stroke="none" {...props}>
      <path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.47c.52.1.71-.23.71-.5v-1.96c-2.9.63-3.52-1.4-3.52-1.4-.47-1.21-1.16-1.53-1.16-1.53-.95-.65.07-.64.07-.64 1.05.08 1.6 1.08 1.6 1.08.93 1.6 2.45 1.14 3.05.87.09-.68.36-1.14.66-1.4-2.32-.27-4.75-1.16-4.75-5.16 0-1.14.4-2.07 1.07-2.8-.11-.27-.47-1.33.1-2.76 0 0 .87-.28 2.86 1.07a9.9 9.9 0 0 1 5.2 0c1.99-1.35 2.86-1.07 2.86-1.07.57 1.43.21 2.49.1 2.76.67.73 1.07 1.66 1.07 2.8 0 4.01-2.44 4.89-4.76 5.15.37.33.71.96.71 1.94v2.88c0 .28.19.61.72.5A10.5 10.5 0 0 0 12 1.5Z" />
    </svg>
  )
}

export function LinkedinIcon(props) {
  return (
    <svg {...base} fill="currentColor" stroke="none" {...props}>
      <path d="M6.94 5.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3.25 21h3.4V9.5h-3.4V21Zm6.06 0h3.4v-6.32c0-1.67.32-3.29 2.39-3.29 2.04 0 2.07 1.91 2.07 3.4V21h3.4v-6.9c0-3.4-.74-6.02-4.71-6.02-1.91 0-3.19 1.05-3.71 2.04h-.05V9.5h-3.27c.05.96.05 11.5.05 11.5Z" />
    </svg>
  )
}

export function MailIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 6.5 9 6 9-6" />
    </svg>
  )
}

export function DownloadIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v12" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M4 20h16" />
    </svg>
  )
}

export function ExternalIcon(props) {
  return (
    <svg {...base} width="15" height="15" {...props}>
      <path d="M14 4h6v6" />
      <path d="M20 4 10.5 13.5" />
      <path d="M18 14.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V7.5A1.5 1.5 0 0 1 5 6h4.5" />
    </svg>
  )
}

export function CodeIcon(props) {
  return (
    <svg {...base} width="15" height="15" {...props}>
      <path d="m8 6-5 6 5 6" />
      <path d="m16 6 5 6-5 6" />
    </svg>
  )
}

export function DocIcon(props) {
  return (
    <svg {...base} width="15" height="15" {...props}>
      <path d="M14 3v5h5" />
      <path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8l-5-5Z" />
      <path d="M8.5 13h7M8.5 16.5h4.5" />
    </svg>
  )
}

export function CloseIcon(props) {
  return (
    <svg {...base} width="20" height="20" strokeWidth="2.1" {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

export function CheckIcon(props) {
  return (
    <svg {...base} width="17" height="17" strokeWidth="2.4" {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  )
}

export function AlertIcon(props) {
  return (
    <svg {...base} width="17" height="17" strokeWidth="2.2" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16.4v.1" />
    </svg>
  )
}
