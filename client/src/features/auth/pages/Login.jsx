// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router'
// import { useAuth } from '../hook/useAuth'
// import { useSelector } from 'react-redux'
// import { Navigate } from 'react-router'

// const Login = () => {
//     const [ email, setEmail ] = useState('')
//     const [ password, setPassword ] = useState('')

//     const user = useSelector(state => state.auth.user)
//     const loading = useSelector(state => state.auth.loading)

//     const { handleLogin } = useAuth()

//     const navigate = useNavigate()

//     const submitForm = async (event) => {
//         event.preventDefault()

//         const payload = {
//             email,
//             password,
//         }

//         await handleLogin(payload)
//         navigate("/")

//     }

//     if(!loading && user){
//         return <Navigate to="/" replace />
//     }

//     return (
//         <section className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100 sm:px-6 lg:px-8">
//             <div className="mx-auto flex min-h-[85vh] w-full max-w-5xl items-center justify-center">
//                 <div className="w-full max-w-md rounded-2xl border border-[#31b8c6]/40 bg-zinc-900/70 p-8 shadow-2xl shadow-black/50 backdrop-blur">
//                     <h1 className="text-3xl font-bold text-[#31b8c6]">
//                         Welcome Back
//                     </h1>
//                     <p className="mt-2 text-sm text-zinc-300">
//                         Sign in with your email and password.
//                     </p>

//                     <form onSubmit={submitForm} className="mt-8 space-y-5">
//                         <div>
//                             <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-200">
//                                 Email
//                             </label>
//                             <input
//                                 id="email"
//                                 type="email"
//                                 value={email}
//                                 onChange={(event) => setEmail(event.target.value)}
//                                 placeholder="you@example.com"
//                                 required
//                                 className="w-full rounded-lg border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-zinc-100 outline-none ring-0 transition focus:border-[#31b8c6] focus:shadow-[0_0_0_3px_rgba(49,184,198,0.25)]"
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-200">
//                                 Password
//                             </label>
//                             <input
//                                 id="password"
//                                 type="password"
//                                 value={password}
//                                 onChange={(event) => setPassword(event.target.value)}
//                                 placeholder="Enter your password"
//                                 required
//                                 className="w-full rounded-lg border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-zinc-100 outline-none ring-0 transition focus:border-[#31b8c6] focus:shadow-[0_0_0_3px_rgba(49,184,198,0.25)]"
//                             />
//                         </div>

//                         <button
//                             type="submit"
//                             className="w-full rounded-lg bg-[#31b8c6] px-4 py-3 font-semibold text-zinc-950 transition hover:bg-[#45c7d4] focus:outline-none focus:shadow-[0_0_0_3px_rgba(49,184,198,0.35)]"
//                         >
//                             Login
//                         </button>
//                     </form>

//                     <p className="mt-6 text-center text-sm text-zinc-300">
//                         Don&apos;t have an account?{' '}
//                         <Link to="/register" className="font-semibold text-[#31b8c6] transition hover:text-[#45c7d4]">
//                             Register
//                         </Link>
//                     </p>
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default Login


import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { useAuth } from '../hook/useAuth'

/* ---------- Shared bits (Register.jsx imports these) ---------- */

const ICONS = {
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.3 3.6-5 8-5s8 1.7 8 5" /></>,
    eye: <><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
    eyeOff: <><path d="M3 3l18 18" /><path d="M6.5 7.5C3.8 9.3 2 12 2 12s3.6 7 10 7c1.6 0 3-.4 4.2-1M10.6 5.1C11 5 11.5 5 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></>,
    alert: <><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16.5v.01" /></>,
    check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
}

export const Icon = ({ name, className = 'h-5 w-5' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        {ICONS[name]}
    </svg>
)

export const Spinner = ({ className = 'h-4 w-4' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={`animate-spin ${className}`} aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
)

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

const Logo = ({ dark = true }) => (
    <div className="flex items-center gap-2.5">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#31b8c6]" aria-hidden="true">
            <path fill="currentColor" d="M12 2C12.6 7 13 9 15 10.5C17.2 12.1 19.3 12.4 22 12.5C19.3 12.6 17.2 12.9 15 14.5C13 16 12.6 18 12 22C11.4 18 11 16 9 14.5C6.8 12.9 4.7 12.6 2 12.5C4.7 12.4 6.8 12.1 9 10.5C11 9 11.4 7 12 2Z" />
        </svg>
        <span className={`font-display text-[24px] tracking-tight ${dark ? 'text-white' : 'text-zinc-900'}`}>Seekora</span>
    </div>
)

/* Animated demo: types a question, then ticks through the search steps */
const DEMOS = [
    { q: "Who won last night's Champions League match?", steps: [['Searching the internet', '8 results'], ['Reading the top pages', '3 kept'], ['Writing the answer', 'sources cited']] },
    { q: 'What is the latest iPhone price in India?', steps: [['Searching the internet', '12 results'], ['Comparing retailers', '4 kept'], ['Writing the answer', 'sources cited']] },
    { q: 'What changed in the newest React release?', steps: [['Searching the internet', '9 results'], ['Reading release notes', '2 kept'], ['Writing the answer', 'sources cited']] },
]
const TICK = 45 // ms per frame
const PAUSE = 10 // frames between typing and first step
const STEP = 20 // frames per step
const HOLD = 70 // frames to hold the finished answer

const useDemo = () => {
    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const [state, setState] = useState({ i: 0, t: 0 })

    useEffect(() => {
        if (reduce) return
        const id = setInterval(() => {
            setState(({ i, t }) => {
                const end = DEMOS[i].q.length + PAUSE + STEP * 3 + HOLD
                return t + 1 >= end ? { i: (i + 1) % DEMOS.length, t: 0 } : { i, t: t + 1 }
            })
        }, TICK)
        return () => clearInterval(id)
    }, [reduce])

    const demo = DEMOS[state.i]
    const chars = reduce ? demo.q.length : Math.min(state.t, demo.q.length)
    const after = state.t - demo.q.length - PAUSE
    const phase = reduce ? 4 : after < 0 ? 0 : Math.min(4, 1 + Math.floor(after / STEP))
    return { demo, chars, phase }
}

const SearchDemo = () => {
    const { demo, chars, phase } = useDemo()
    return (
        <div className="w-full max-w-md rounded-xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Live search</span>
                <span className="flex items-center gap-1.5 text-[#31b8c6]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#31b8c6]" />
                    Live
                </span>
            </div>

            <p className="mt-4 min-h-[44px] text-[15px] leading-snug text-zinc-100">
                <span className="mr-2 text-[#31b8c6]">›</span>
                {demo.q.slice(0, chars)}
                {chars < demo.q.length && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-[#31b8c6]" />}
            </p>

            <ul className="mt-4 space-y-3">
                {demo.steps.map(([label, note], k) => {
                    const status = phase > k + 1 ? 'done' : phase === k + 1 ? 'active' : 'pending'
                    return (
                        <li key={k} className={`flex items-center gap-3 text-sm transition-all duration-500 ${status === 'pending' ? 'translate-y-1 opacity-0' : 'translate-y-0 opacity-100'}`}>
                            {status === 'done'
                                ? <Icon name="check" className="h-4 w-4 shrink-0 text-[#31b8c6]" />
                                : <Spinner className="h-4 w-4 shrink-0 text-[#31b8c6]" />}
                            <span className={status === 'done' ? 'text-zinc-200' : 'text-zinc-400'}>{label}</span>
                            <span className="ml-auto tabular-nums text-zinc-500">{status === 'done' ? note : ''}</span>
                        </li>
                    )
                })}
            </ul>

            <p className={`mt-4 border-t border-white/10 pt-3 text-[13px] text-zinc-400 transition-opacity duration-500 ${phase >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                Answer ready, with sources you can open.
            </p>
        </div>
    )
}

/* Page frame: brand panel on the left (desktop), content on the right */
export const AuthShell = ({ children }) => (
    <section className="grid min-h-screen lg:grid-cols-2">
        <aside
            className="hidden flex-col justify-between bg-[#07101c] p-12 text-white lg:flex xl:p-16"
            style={{
                backgroundImage:
                    'radial-gradient(60% 50% at 85% 0%, rgba(49,184,198,0.20), transparent 70%), repeating-radial-gradient(circle at 85% 0%, transparent 0 34px, rgba(49,184,198,0.06) 34px 35px)',
            }}
        >
            <Logo />

            <div>
                <h1 className="font-display max-w-lg text-balance text-[44px] font-medium leading-[1.08] tracking-tight xl:text-5xl">
                    Ask anything. Seekora checks the live web first.
                </h1>
                <p className="mt-4 max-w-md text-[16px] leading-relaxed text-zinc-400">
                    News, prices and new releases get answers from fresh sources, not stale memory.
                </p>
                <div className="mt-10"><SearchDemo /></div>
            </div>

            <p className="text-sm text-zinc-500">Every answer shows where it came from.</p>
        </aside>

        <div className="flex items-center justify-center bg-white px-6 py-12 sm:px-10">
            <div className="w-full max-w-sm">
                <div className="mb-10 lg:hidden"><Logo dark={false} /></div>
                {children}
            </div>
        </div>
    </section>
)

export const Field = ({ id, label, icon, error, hint, right, ...props }) => (
    <div>
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-zinc-800">{label}</label>
        <div className={`flex h-12 items-center gap-2.5 rounded-lg border bg-white px-3.5 transition focus-within:ring-4 ${error ? 'border-red-400 focus-within:border-red-500 focus-within:ring-red-500/15' : 'border-zinc-300 focus-within:border-teal-600 focus-within:ring-teal-600/15'}`}>
            <Icon name={icon} className="h-[18px] w-[18px] shrink-0 text-zinc-400" />
            <input
                id={id}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-msg` : hint ? `${id}-msg` : undefined}
                className="h-full w-full min-w-0 bg-transparent text-[15px] text-zinc-900 outline-none placeholder:text-zinc-400"
                {...props}
            />
            {right}
        </div>
        {error
            ? <p id={`${id}-msg`} className="mt-1.5 text-[13px] text-red-600">{error}</p>
            : hint && <p id={`${id}-msg`} className="mt-1.5 text-[13px] text-zinc-500">{hint}</p>}
    </div>
)

export const PasswordField = ({ error, onBlur, ...props }) => {
    const [show, setShow] = useState(false)
    const [caps, setCaps] = useState(false)
    return (
        <div>
            <Field
                icon="lock"
                error={error}
                type={show ? 'text' : 'password'}
                onKeyUp={(e) => setCaps(e.getModifierState('CapsLock'))}
                onBlur={(e) => { setCaps(false); onBlur?.(e) }}
                right={
                    <button
                        type="button"
                        onClick={() => setShow((v) => !v)}
                        aria-label={show ? 'Hide password' : 'Show password'}
                        aria-pressed={show}
                        className="-mr-1.5 cursor-pointer rounded-md p-1.5 text-zinc-500 transition hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-teal-600"
                    >
                        <Icon name={show ? 'eyeOff' : 'eye'} className="h-[18px] w-[18px]" />
                    </button>
                }
                {...props}
            />
            {caps && <p className="mt-1.5 text-[13px] text-amber-700">Caps Lock is on</p>}
        </div>
    )
}

export const Alert = ({ children }) => (
    <div role="alert" className="mb-6 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-800">
        <Icon name="alert" className="mt-0.5 h-[18px] w-[18px] shrink-0" />
        <span>{children}</span>
    </div>
)

export const SubmitButton = ({ loading, loadingText, children }) => (
    <button
        type="submit"
        disabled={loading}
        className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-teal-700 text-[15px] font-semibold text-white transition hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
    >
        {loading && <Spinner />}
        {loading ? loadingText : children}
    </button>
)

/* ---------- Login page ---------- */

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [touched, setTouched] = useState({})
    const [tried, setTried] = useState(false) // pressed submit at least once
    const [sent, setSent] = useState(false) // a request actually went to the server
    const [submitting, setSubmitting] = useState(false)

    const user = useSelector((state) => state.auth.user)
    const loading = useSelector((state) => state.auth.loading)
    const serverError = useSelector((state) => state.auth.error)

    const { handleLogin } = useAuth()
    const navigate = useNavigate()

    const errors = {
        email: !email.trim() ? 'Enter your email' : !isEmail(email.trim()) ? 'Enter a valid email address' : '',
        password: !password ? 'Enter your password' : '',
    }
    const shown = (k) => ((touched[k] || tried) ? errors[k] : '')
    const touch = (k) => () => setTouched((t) => ({ ...t, [k]: true }))

    const submitForm = async (event) => {
        event.preventDefault()
        setTried(true)
        if (errors.email || errors.password) return

        setSent(true)
        setSubmitting(true)
        const result = await handleLogin({ email: email.trim(), password })
        setSubmitting(false)
        if (result?.success) navigate('/')
    }

    if (!loading && user) {
        return <Navigate to="/" replace />
    }

    return (
        <AuthShell>
            <h2 className="font-display text-[34px] font-medium leading-tight tracking-tight text-zinc-900">Welcome back</h2>
            <p className="mt-2 mb-8 text-[15px] text-zinc-600">Sign in to pick up your chats where you left them.</p>

            {sent && !submitting && serverError && <Alert>{serverError}</Alert>}

            <form onSubmit={submitForm} noValidate className="space-y-5">
                <Field
                    id="email" label="Email" icon="mail" type="email" autoComplete="email" autoFocus={window.innerWidth >= 1024}
                    placeholder="you@example.com"
                    value={email} onChange={(e) => setEmail(e.target.value)} onBlur={touch('email')}
                    error={shown('email')}
                />
                <PasswordField
                    id="password" label="Password" autoComplete="current-password"
                    placeholder="Your password"
                    value={password} onChange={(e) => setPassword(e.target.value)} onBlur={touch('password')}
                    error={shown('password')}
                />
                <div className="pt-1">
                    <SubmitButton loading={submitting} loadingText="Signing in…">Sign in</SubmitButton>
                </div>
            </form>

            <p className="mt-8 text-[15px] text-zinc-600">
                New to Seekora?{' '}
                <Link to="/register" className="font-semibold text-teal-700 underline-offset-4 hover:underline">Create an account</Link>
            </p>
        </AuthShell>
    )
}

export default Login