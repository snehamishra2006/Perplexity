
// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router'
// import { useSelector } from 'react-redux'
// import { useAuth } from '../hook/useAuth'

// const Register = () => {
//   const [username, setUsername] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [statusMessage, setStatusMessage] = useState('')

//   const { handleRegister } = useAuth()
//   const navigate = useNavigate()
//   const error = useSelector((state) => state.auth.error)

//   const submitForm = async (event) => {
//     event.preventDefault()

//     const result = await handleRegister({ username, email, password })

//     if (result?.success) {
//       setStatusMessage('Registered! Please check your email to verify your account.')
//       setTimeout(() => navigate('/login'), 2000)
//     }
//   }

//   return (
//     <section className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100 sm:px-6 lg:px-8">
//       <div className="mx-auto flex min-h-[85vh] w-full max-w-5xl items-center justify-center">
//         <div className="w-full max-w-md rounded-2xl border border-[#31b8c6]/40 bg-zinc-900/70 p-8 shadow-2xl shadow-black/50 backdrop-blur">
//           <h1 className="text-3xl font-bold text-[#31b8c6]">
//             Create Account
//           </h1>
//           <p className="mt-2 text-sm text-zinc-300">
//             Register with your username, email, and password.
//           </p>

//           {statusMessage && (
//             <p className="mt-4 rounded-lg bg-[#31b8c6]/10 px-4 py-2 text-sm text-[#31b8c6]">
//               {statusMessage}
//             </p>
//           )}

//           {error && (
//             <p className="mt-4 rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">
//               {error}
//             </p>
//           )}

//           <form onSubmit={submitForm} className="mt-8 space-y-5">
//             <div>
//               <label htmlFor="username" className="mb-2 block text-sm font-medium text-zinc-200">
//                 Username
//               </label>
//               <input
//                 id="username"
//                 type="text"
//                 value={username}
//                 onChange={(event) => setUsername(event.target.value)}
//                 placeholder="Choose a username"
//                 required
//                 className="w-full rounded-lg border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-zinc-100 outline-none ring-0 transition focus:border-[#31b8c6] focus:shadow-[0_0_0_3px_rgba(49,184,198,0.25)]"
//               />
//             </div>

//             <div>
//               <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-200">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(event) => setEmail(event.target.value)}
//                 placeholder="you@example.com"
//                 required
//                 className="w-full rounded-lg border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-zinc-100 outline-none ring-0 transition focus:border-[#31b8c6] focus:shadow-[0_0_0_3px_rgba(49,184,198,0.25)]"
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-200">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(event) => setPassword(event.target.value)}
//                 placeholder="Create a password"
//                 required
//                 className="w-full rounded-lg border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-zinc-100 outline-none ring-0 transition focus:border-[#31b8c6] focus:shadow-[0_0_0_3px_rgba(49,184,198,0.25)]"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full rounded-lg bg-[#31b8c6] px-4 py-3 font-semibold text-zinc-950 transition hover:bg-[#45c7d4] focus:outline-none focus:shadow-[0_0_0_3px_rgba(49,184,198,0.35)]"
//             >
//               Register
//             </button>
//           </form>

//           <p className="mt-6 text-center text-sm text-zinc-300">
//             Already have an account?{' '}
//             <Link to="/login" className="font-semibold text-[#31b8c6] transition hover:text-[#45c7d4]">
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Register



import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { useAuth } from '../hook/useAuth'
import { AuthShell, Field, PasswordField, Alert, SubmitButton, Icon, isEmail } from './Login'

// Same rules the server enforces (see auth.validator.js)
const validate = ({ username, email, password }) => ({
  username: !username.trim()
    ? 'Pick a username'
    : username.trim().length < 3 || username.trim().length > 30
      ? 'Use 3 to 30 characters'
      : !/^[a-zA-Z0-9_]+$/.test(username.trim())
        ? 'Only letters, numbers and underscores'
        : '',
  email: !email.trim() ? 'Enter your email' : !isEmail(email.trim()) ? 'Enter a valid email address' : '',
  password: !password ? 'Create a password' : password.length < 6 ? 'Use at least 6 characters' : '',
})

const strengthOf = (pw) => {
  let s = 0
  if (pw.length >= 6) s++
  if (pw.length >= 10) s++
  if (/[a-zA-Z]/.test(pw) && /\d/.test(pw)) s++
  if (/[^a-zA-Z0-9]/.test(pw) || (/[a-z]/.test(pw) && /[A-Z]/.test(pw))) s++
  return s
}
const LABELS = ['', 'Weak', 'Okay', 'Good', 'Strong']
const COLORS = ['#e4e4e7', '#ef4444', '#f59e0b', '#16a34a', '#16a34a']

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState({})
  const [tried, setTried] = useState(false)
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const { handleRegister } = useAuth()
  const navigate = useNavigate()
  const serverError = useSelector((state) => state.auth.error)

  const errors = validate({ username, email, password })
  const shown = (k) => ((touched[k] || tried) ? errors[k] : '')
  const touch = (k) => () => setTouched((t) => ({ ...t, [k]: true }))
  const strength = password ? strengthOf(password) : 0

  const submitForm = async (event) => {
    event.preventDefault()
    setTried(true)
    if (errors.username || errors.email || errors.password) return

    setSent(true)
    setSubmitting(true)
    const result = await handleRegister({ username: username.trim(), email: email.trim(), password })
    setSubmitting(false)
    if (result?.success) setDone(true)
  }

  // After signing up: tell the user exactly what to do next
  if (done) {
    return (
      <AuthShell>
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-700">
          <Icon name="mail" className="h-7 w-7" />
        </div>
        <h2 className="font-display text-[34px] font-medium leading-tight tracking-tight text-zinc-900">Check your inbox</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-zinc-600">
          We sent a verification link to{' '}
          <span className="break-all font-medium text-zinc-900">{email.trim()}</span>.
          Open it to activate your account, then sign in.
        </p>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="mt-8 flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-teal-700 text-[15px] font-semibold text-white transition hover:bg-teal-800"
        >
          Go to sign in
        </button>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="mt-4 w-full cursor-pointer text-center text-sm text-zinc-600 underline-offset-4 hover:underline"
        >
          Used the wrong email? Go back
        </button>
      </AuthShell>
    )
  }

  return (
    <AuthShell>
      <h2 className="font-display text-[34px] font-medium leading-tight tracking-tight text-zinc-900">Create your account</h2>
      <p className="mt-2 mb-8 text-[15px] text-zinc-600">It takes a minute. Then ask Seekora your first question.</p>

      {sent && !submitting && serverError && <Alert>{serverError}</Alert>}

      <form onSubmit={submitForm} noValidate className="space-y-5">
        <Field
          id="username" label="Username" icon="user" type="text" autoComplete="username" autoFocus={window.innerWidth >= 1024}
          placeholder="Pick a username" hint="Letters, numbers and underscores"
          value={username} onChange={(e) => setUsername(e.target.value)} onBlur={touch('username')}
          error={shown('username')}
        />
        <Field
          id="email" label="Email" icon="mail" type="email" autoComplete="email"
          placeholder="you@example.com"
          value={email} onChange={(e) => setEmail(e.target.value)} onBlur={touch('email')}
          error={shown('email')}
        />

        <div>
          <PasswordField
            id="password" label="Password" autoComplete="new-password"
            placeholder="At least 6 characters"
            value={password} onChange={(e) => setPassword(e.target.value)} onBlur={touch('password')}
            error={shown('password')}
          />
          <div className="mt-2.5 flex items-center gap-3">
            <div className="flex flex-1 gap-1.5" aria-hidden="true">
              {[1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="h-1 flex-1 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: i <= strength ? COLORS[strength] : COLORS[0] }}
                />
              ))}
            </div>
            <span aria-live="polite" className="w-12 text-right text-[12.5px] text-zinc-500">{LABELS[strength]}</span>
          </div>
        </div>

        <div className="pt-1">
          <SubmitButton loading={submitting} loadingText="Creating account…">Create account</SubmitButton>
        </div>
      </form>

      <p className="mt-8 text-[15px] text-zinc-600">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-teal-700 underline-offset-4 hover:underline">Sign in</Link>
      </p>
    </AuthShell>
  )
}

export default Register