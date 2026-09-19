
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

const Field = ({ id, label, right, ...props }) => (
  <div className="grid grid-cols-[76px_1fr] items-end gap-x-3 border-b border-zinc-300 pb-2 focus-within:border-zinc-900">
    <label htmlFor={id} className="pb-[3px] text-[13px] font-medium text-zinc-600">{label}</label>
    <div className="flex items-center gap-3">
      <input
        id={id}
        required
        className="w-full min-w-0 bg-transparent py-1 text-[15px] text-zinc-900 outline-none placeholder:text-zinc-400"
        {...props}
      />
      {right}
    </div>
  </div>
)

// Simple 0-4 strength score for the meter
const strengthOf = (pw) => {
  let s = 0
  if (pw.length >= 6) s++
  if (pw.length >= 10) s++
  if (/[a-zA-Z]/.test(pw) && /\d/.test(pw)) s++
  if (/[^a-zA-Z0-9]/.test(pw) || (/[a-z]/.test(pw) && /[A-Z]/.test(pw))) s++
  return s
}
const labels = ['Use 6+ characters', 'Weak', 'Okay', 'Good', 'Strong']
const colors = ['#d4d4d8', '#ef4444', '#f59e0b', '#16a34a', '#16a34a']

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  const { handleRegister } = useAuth()
  const navigate = useNavigate()
  const error = useSelector((state) => state.auth.error)

  const strength = password ? strengthOf(password) : 0

  const submitForm = async (event) => {
    event.preventDefault()
    setSubmitted(true)
    setSubmitting(true)
    const result = await handleRegister({ username, email, password })
    setSubmitting(false)

    if (result?.success) {
      setStatusMessage('Account created. Check your email to verify it, then sign in.')
      setTimeout(() => navigate('/login'), 2500)
    }
  }

  return (
    <section className="grid min-h-screen lg:grid-cols-2">
      {/* Left: brand panel (desktop only) */}
      <aside
        className="hidden flex-col justify-between bg-[#0b1220] p-12 text-zinc-100 lg:flex"
        style={{ backgroundImage: 'repeating-radial-gradient(circle at 85% 10%, transparent 0 34px, rgba(49,184,198,0.08) 34px 35px)' }}
      >
        <span className="font-display text-2xl text-[#31b8c6]">Seekora</span>

        <div>
          <h1 className="font-display text-5xl font-medium leading-tight">
            Ask anything.<br />Seekora checks the live web first.
          </h1>
          <p className="mt-4 max-w-md text-zinc-400">
            News, prices and new releases get answers from fresh sources, not stale memory.
          </p>

          <div className="mt-10 max-w-md border border-zinc-700/70 bg-black/20 p-5 text-sm">
            <p className="text-zinc-100"><span className="mr-2 text-[#31b8c6]">&gt;</span>Who won last night&apos;s match?</p>
            <ul className="mt-4 space-y-2 text-zinc-300">
              <li className="flex justify-between"><span>✓ Searching the internet</span><span className="text-zinc-500">8 results</span></li>
              <li className="flex justify-between"><span>✓ Reading the top pages</span><span className="text-zinc-500">3 kept</span></li>
              <li className="flex justify-between"><span>✓ Writing the answer</span><span className="text-zinc-500">sources cited</span></li>
            </ul>
          </div>
        </div>

        <p className="text-sm text-zinc-500">Every answer shows where it came from.</p>
      </aside>

      {/* Right: form */}
      <div className="flex items-center justify-center bg-slate-100 px-4 py-10">
        <div className="w-full max-w-md border border-zinc-200 bg-white p-8 sm:p-10">
          <h2 className="font-display text-3xl font-medium text-zinc-900">Create your account</h2>
          <p className="mt-2 text-sm text-zinc-600">It takes a minute. Then ask Seekora your first question.</p>

          {statusMessage && (
            <p role="status" className="mt-5 border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700">{statusMessage}</p>
          )}
          {submitted && error && !statusMessage && (
            <p role="alert" className="mt-5 border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
          )}

          <form onSubmit={submitForm} className="mt-8 space-y-7">
            <Field
              id="username" label="Username" type="text" autoComplete="username"
              value={username} onChange={(e) => setUsername(e.target.value)}
              placeholder="Pick a username"
            />
            <Field
              id="email" label="Email" type="email" autoComplete="email"
              value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />

            <div>
              <Field
                id="password" label="Password" autoComplete="new-password" minLength={6}
                type={show ? 'text' : 'password'}
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                right={
                  <button type="button" onClick={() => setShow((v) => !v)} className="cursor-pointer text-[13px] font-medium text-blue-700 hover:underline">
                    {show ? 'Hide' : 'Show'}
                  </button>
                }
              />
              <div className="mt-2.5 flex items-center gap-3">
                <div className="flex flex-1 gap-1.5" aria-hidden="true">
                  {[1, 2, 3, 4].map((i) => (
                    <span key={i} className="h-[3px] flex-1" style={{ backgroundColor: i <= strength ? colors[strength] : '#e4e4e7' }} />
                  ))}
                </div>
                <span aria-live="polite" className="shrink-0 whitespace-nowrap text-[12.5px] text-zinc-500">{labels[strength]}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || !!statusMessage}
              className="w-full cursor-pointer bg-zinc-900 px-4 py-3.5 font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-60"
            >
              {submitting ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="mt-8 border-t border-dashed border-zinc-300 pt-6 text-sm text-zinc-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-blue-700 underline underline-offset-4">Sign in</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Register
