import React, { useState } from 'react'

/* ---------- Icons (inline SVG, no extra dependency) ---------- */

const iconProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const MailIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </svg>
)

export const LockIcon = () => (
  <svg {...iconProps}>
    <rect x="4" y="10" width="16" height="10" rx="3" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
)

export const UserIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c1.2-3.5 4-5 8-5s6.8 1.5 8 5" />
  </svg>
)

const EyeIcon = () => (
  <svg {...iconProps}>
    <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const EyeOffIcon = () => (
  <svg {...iconProps}>
    <path d="M3 3l18 18" />
    <path d="M10.6 5.6A10.4 10.4 0 0 1 12 5.5c6.4 0 10 6.5 10 6.5a17 17 0 0 1-3.2 3.9M6.5 7A16.6 16.6 0 0 0 2 12s3.6 6.5 10 6.5c1.5 0 2.8-.3 4-.9" />
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
  </svg>
)

export const CheckIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12.5 2.8 2.8L16 9.5" />
  </svg>
)

export const AlertIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5.5M12 16.5v.01" />
  </svg>
)

export const Spinner = () => (
  <svg
    className="h-5 w-5 animate-spin"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
)

/* ---------- Form field ---------- */

export const Field = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  icon,
  autoComplete,
  hint,
  autoFocus = false,
}) => {
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-zinc-300">
        {label}
      </label>

      <div className="group relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-[#31b8c6]">
          {icon}
        </span>

        <input
          id={id}
          type={isPassword && visible ? 'text' : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          required
          className={`h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900/60 pl-11 text-[15px] text-zinc-100 placeholder:text-zinc-600 outline-none transition hover:border-zinc-700 focus:border-[#31b8c6] focus:bg-zinc-900 focus:shadow-[0_0_0_4px_rgba(49,184,198,0.15)] ${
            isPassword ? 'pr-12' : 'pr-4'
          }`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            aria-pressed={visible}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#31b8c6]"
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>

      {hint}
    </div>
  )
}

/* ---------- Page layout ---------- */

const AuthLayout = ({ sideTitle, sideText, children }) => {
  return (
    <main className="grid min-h-screen bg-zinc-950 text-zinc-100 lg:grid-cols-[1.05fr_1fr]">
      {/* Left: brand panel (desktop only) */}
      <aside className="relative hidden overflow-hidden border-r border-zinc-800/80 bg-zinc-950 lg:flex lg:flex-col lg:justify-between lg:p-14">
        {/* dot grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:26px_26px]"
        />

        {/* concentric rings */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-56 -right-56 h-[46rem] w-[46rem]"
        >
          <div className="absolute inset-[30%] rounded-full bg-[#31b8c6]/25 blur-3xl" />
          <div className="absolute inset-0 rounded-full border border-[#31b8c6]/10" />
          <div className="absolute inset-[9%] rounded-full border border-[#31b8c6]/20" />
          <div className="absolute inset-[18%] rounded-full border border-[#31b8c6]/30">
            <span className="absolute -top-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#31b8c6] shadow-[0_0_18px_4px_rgba(49,184,198,0.6)]" />
          </div>
          <div className="absolute inset-[27%] rounded-full border border-[#31b8c6]/40" />
          <div className="absolute inset-[36%] rounded-full border border-[#31b8c6]/60" />
          <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#31b8c6]" />
        </div>

        {/* logo mark */}
        <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#31b8c6]/40 bg-[#31b8c6]/10">
          <span className="h-3.5 w-3.5 rounded-full bg-[#31b8c6]" />
        </div>

        {/* headline */}
        <div className="relative max-w-md">
          <h2 className="text-4xl font-semibold leading-[1.15] tracking-tight text-zinc-50 xl:text-5xl">
            {sideTitle}
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-zinc-400">
            {sideText}
          </p>
        </div>

        <div className="relative h-11" />
      </aside>

      {/* Right: form */}
      <section className="relative flex items-center justify-center px-5 py-12 sm:px-8">
        {/* soft glow on mobile only, keeps the brand feel without the side panel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#31b8c6]/15 blur-3xl lg:hidden"
        />

        <div className="relative w-full max-w-sm">
          {/* mobile logo */}
          <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl border border-[#31b8c6]/40 bg-[#31b8c6]/10 lg:hidden">
            <span className="h-3.5 w-3.5 rounded-full bg-[#31b8c6]" />
          </div>

          {children}
        </div>
      </section>
    </main>
  )
}

export default AuthLayout