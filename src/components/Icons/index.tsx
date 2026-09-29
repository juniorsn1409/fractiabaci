//  S# SEVERITY
//
//  Icons.tsx
//  Ícones SVG compartilhados
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

type IconProps = { size?: number; className?: string }

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

export const FlameIcon = ({ size = 20, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M12 2.5c1 4 5.5 5.5 5.5 10.5a5.5 5.5 0 0 1-11 0c0-2.7 1.5-4.4 2.6-5.4.3 2 1.4 3.2 2.6 3.2-.6-2.6-.9-5.3.3-8.3z" />
  </svg>
)

export const StarIcon = ({ size = 20, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />
  </svg>
)

export const MoonIcon = ({ size = 22 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...stroke}
  >
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
  </svg>
)

export const SunIcon = ({ size = 22 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...stroke}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4" />
  </svg>
)

export const MapIcon = ({ size = 26 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...stroke}
  >
    <path d="M9 4L3 6.5V20l6-2.5 6 2.5 6-2.5V4l-6 2.5z" />
    <path d="M9 4v13.5" />
    <path d="M15 6.5V20" />
  </svg>
)

export const AbacusIcon = ({ size = 26 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...stroke}
  >
    <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" />
    <path d="M9.5 3.5v17" />
    <path d="M14.5 3.5v17" />
    <circle cx="6.5" cy="15" r="1.2" />
    <circle cx="12" cy="12" r="1.2" />
    <circle cx="17.5" cy="15" r="1.2" />
  </svg>
)

export const InfoIcon = ({ size = 26 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...stroke}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5.5" />
    <path d="M12 7.5v.01" />
  </svg>
)

export const CheckIcon = ({ size = 30 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...stroke}
    strokeWidth={3}
  >
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)

export const LockIcon = ({ size = 26 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...stroke}
    strokeWidth={2.6}
  >
    <rect x="5" y="11" width="14" height="9" rx="2.5" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
)

export const TrophyIcon = ({ size = 28 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...stroke}
  >
    <path d="M8 4h8v5a4 4 0 0 1-8 0z" />
    <path d="M8 6H5a3 3 0 0 0 3 4" />
    <path d="M16 6h3a3 3 0 0 1-3 4" />
    <path d="M12 13v4" />
    <path d="M8.5 20h7" />
  </svg>
)

export const BookIcon = ({ size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...stroke}
  >
    <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
    <path d="M4 19V5" />
  </svg>
)
