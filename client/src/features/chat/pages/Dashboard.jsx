// import React, { useEffect, useState } from 'react'
// import ReactMarkdown from 'react-markdown'
// import { useSelector } from 'react-redux'
// import { useChat } from '../hooks/useChat'
// import remarkGfm from 'remark-gfm'


// const Dashboard = () => {
//   const chat = useChat()
//   const [ chatInput, setChatInput ] = useState('')
//   const chats = useSelector((state) => state.chat.chats)
//   const currentChatId = useSelector((state) => state.chat.currentChatId)

//   useEffect(() => {
//     chat.initializeSocketConnection()
//     chat.handleGetChats()
//   }, [])

//   const handleSubmitMessage = (event) => {
//     event.preventDefault()

//     const trimmedMessage = chatInput.trim()
//     if (!trimmedMessage) {
//       return
//     }

//     chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
//     setChatInput('')
//   }

//   const openChat = (chatId) => {
//     chat.handleOpenChat(chatId,chats)
//   }

//   return (
//     <main className='min-h-screen w-full bg-[#07090f] p-3 text-white md:p-5'>
//       <section className='mx-auto flex h-[calc(100vh-1.5rem)] w-full gap-4 rounded-3xl border   p-1 md:h-[calc(100vh-2.5rem)] md:gap-6 md:p-1 border-none'>
//         <aside className='hidden h-full w-72 shrink-0 rounded-3xl border  bg-[#080b12] p-4 md:flex md:flex-col'>
//           <h1 className='mb-5 text-3xl font-semibold tracking-tight'>Perplexity</h1>

//           <div className='space-y-2'>
//             {Object.values(chats).map((chat,index) => (
//               <button
//                 onClick={()=>{openChat(chat.id)}}
//                 key={index}
//                 type='button'
//                 className='w-full cursor-pointer rounded-xl border border-white/60 bg-transparent px-3 py-2 text-left text-base font-medium text-white/90 transition hover:border-white hover:text-white'
//               >
//                 {chat.title}
//               </button>
//             ))}
//           </div>
//         </aside>

//         <section className='relative max-w-3/5 mx-auto flex h-full min-w-0 flex-1 flex-col gap-4'>

//           <div className='messages flex-1 space-y-3 overflow-y-auto pr-1 pb-30'>
//             {chats[ currentChatId ]?.messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`max-w-[82%] w-fit rounded-2xl px-4 py-3 text-sm md:text-base ${message.role === 'user'
//                     ? 'ml-auto rounded-br-none bg-white/12 text-white'
//                     : 'mr-auto border-none text-white/90'
//                   }`}
//               >
//                 {message.role === 'user' ? (
//                   <p>{message.content}</p>
//                 ) : (
//                   <ReactMarkdown
//                     components={{
//                       p: ({ children }) => <p className='mb-2 last:mb-0'>{children}</p>,
//                       ul: ({ children }) => <ul className='mb-2 list-disc pl-5'>{children}</ul>,
//                       ol: ({ children }) => <ol className='mb-2 list-decimal pl-5'>{children}</ol>,
//                       code: ({ children }) => <code className='rounded bg-white/10 px-1 py-0.5'>{children}</code>,
//                       pre: ({ children }) => <pre className='mb-2 overflow-x-auto rounded-xl bg-black/30 p-3'>{children}</pre>
//                     }}
//                     remarkPlugins={[remarkGfm]}
//                   >
//                     {message.content}
//                   </ReactMarkdown>
//                 )}
//               </div>
//             ))}
//           </div>

//           <footer className='rounded-3xl w-full absolute bottom-2 border border-white/60 bg-[#080b12] p-4 md:p-5'>
//             <form onSubmit={handleSubmitMessage} className='flex flex-col gap-3 md:flex-row'>
//               <input
//                 type='text'
//                 value={chatInput}
//                 onChange={(event) => setChatInput(event.target.value)}
//                 placeholder='Type your message...'
//                 className='w-full rounded-2xl border border-white/50 bg-transparent px-4 py-3 text-lg text-white outline-none transition placeholder:text-white/45 focus:border-white/90'
//               />
//               <button
//                 type='submit'
//                 disabled={!chatInput.trim()}
//                 className='rounded-2xl border border-white/60 px-6 py-3 text-lg font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50'
//               >
//                 Send
//               </button>
//             </form>
//           </footer>
//         </section>
//       </section>
//     </main>
//   )
// }

// export default Dashboard


import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useDispatch, useSelector } from 'react-redux'
import remarkGfm from 'remark-gfm'
import { useChat } from '../hooks/useChat'
import { useAuth } from '../../auth/hook/useAuth'
import { setCurrentChatId } from '../chat.slice'

const SparkMark = ({ className = '' }) => (
  <svg viewBox='0 0 24 24' fill='none' className={className}>
    <path
      d='M12 2C12.6 7 13 9 15 10.5C17.2 12.1 19.3 12.4 22 12.5C19.3 12.6 17.2 12.9 15 14.5C13 16 12.6 18 12 22C11.4 18 11 16 9 14.5C6.8 12.9 4.7 12.6 2 12.5C4.7 12.4 6.8 12.1 9 10.5C11 9 11.4 7 12 2Z'
      fill='currentColor'
    />
  </svg>
)

const SendIcon = () => (
  <svg viewBox='0 0 24 24' fill='none' className='h-4 w-4'>
    <path
      d='M4 12L20 4L13 20L11 13L4 12Z'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinejoin='round'
      strokeLinecap='round'
    />
  </svg>
)

const STARTER_PROMPTS = [
  'Explain how Docker containers differ from virtual machines',
  'Compare REST and GraphQL for a mobile app backend',
  'Draft a short cover letter for a frontend role',
  'Walk me through the CAP theorem with an example',
]

function groupThreads(chats) {
  const list = Object.values(chats)
  const dayMs = 24 * 60 * 60 * 1000
  const now = Date.now()

  const today = []
  const earlier = []

  list
    .slice()
    .sort((a, b) => new Date(b.lastUpdated || b.lastUpdate || 0) - new Date(a.lastUpdated || a.lastUpdate || 0))
    .forEach((c) => {
      const ts = new Date(c.lastUpdated || c.lastUpdate || 0).getTime()
      if (now - ts < dayMs) today.push(c)
      else earlier.push(c)
    })

  return { today, earlier }
}

const Dashboard = () => {
  const chat = useChat()
  const dispatch = useDispatch()
  const { handleLogout } = useAuth()
  const [chatInput, setChatInput] = useState('')
  const [search, setSearch] = useState('')
  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)
  const isLoading = useSelector((state) => state.chat.isLoading)
  const feedEndRef = useRef(null)

  useEffect(() => {
    chat.initializeSocketConnection()
    chat.handleGetChats()
  }, [])

  const activeChat = chats[currentChatId]
  const messages = activeChat?.messages ?? []

  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages.length, isLoading])

  const { today, earlier } = useMemo(() => groupThreads(chats), [chats])
  const filterThread = (c) => c.title?.toLowerCase().includes(search.trim().toLowerCase())

  const sendMessage = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    chat.handleSendMessage({ message: trimmed, chatId: currentChatId })
    setChatInput('')
  }

  const handleSubmitMessage = (event) => {
    event.preventDefault()
    sendMessage(chatInput)
  }

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats)
  }

  const startNewThread = () => {
    dispatch(setCurrentChatId(null))
  }

  const renderThreadRow = (c) => {
    const isActive = c.id === currentChatId
    return (
      <button
        key={c.id}
        onClick={() => openChat(c.id)}
        type='button'
        className={`group flex w-full items-center gap-2 rounded-md border-l-2 px-3 py-2 text-left text-[13.5px] leading-snug transition ${
          isActive
            ? 'border-l-[#e8a94c] bg-white/[0.06] text-[#ECEDF0]'
            : 'border-l-transparent text-[#868C97] hover:border-l-[#3a4048] hover:bg-white/[0.03] hover:text-[#ECEDF0]'
        }`}
      >
        <span className='truncate'>{c.title || 'Untitled thread'}</span>
      </button>
    )
  }

  return (
    <main className='flex h-screen w-full overflow-hidden bg-[#0F1115] font-sans text-[#ECEDF0]'>
      {/* Sidebar */}
      <aside className='hidden h-full w-[272px] shrink-0 flex-col border-r border-[#20242c] bg-[#0C0E12] md:flex'>
        <div className='flex items-center justify-between gap-2 px-4 pb-4 pt-5'>
          <div className='flex items-center gap-2'>
            <SparkMark className='h-5 w-5 text-[#e8a94c]' />
            <span className='font-display text-[19px] tracking-tight text-[#ECEDF0]'>Seekora</span>
          </div>
          <button
            onClick={handleLogout}
            type='button'
            className='cursor-pointer text-xs text-[#868C97] transition hover:text-[#ECEDF0]'
          >
            Log out
          </button>
        </div>

        <div className='px-3'>
          <button
            onClick={startNewThread}
            type='button'
            className='mb-3 flex w-full cursor-pointer items-center gap-2 rounded-md border border-[#262A32] px-3 py-2 text-[13.5px] text-[#ECEDF0] transition hover:border-[#3a4048] hover:bg-white/[0.03]'
          >
            <span className='text-base leading-none text-[#e8a94c]'>+</span>
            New Chat
          </button>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type='text'
            placeholder='Search threads'
            className='mb-4 w-full rounded-md border border-[#20242c] bg-[#14171c] px-3 py-2 text-[13px] text-[#ECEDF0] outline-none transition placeholder:text-[#5b616b] focus:border-[#3a4048]'
          />
        </div>

        <div className='flex-1 space-y-4 overflow-y-auto px-3 pb-4'>
          {today.filter(filterThread).length > 0 && (
            <div>
              <p className='mb-1 px-3 text-[11px] text-[#5b616b]'>Today</p>
              <div className='space-y-0.5'>{today.filter(filterThread).map(renderThreadRow)}</div>
            </div>
          )}
          {earlier.filter(filterThread).length > 0 && (
            <div>
              <p className='mb-1 px-3 text-[11px] text-[#5b616b]'>Earlier</p>
              <div className='space-y-0.5'>{earlier.filter(filterThread).map(renderThreadRow)}</div>
            </div>
          )}
          {Object.values(chats).length === 0 && (
            <p className='px-3 text-[13px] text-[#5b616b]'>Your threads will appear here.</p>
          )}
        </div>
      </aside>

      {/* Main */}
      <section className='relative flex h-full min-w-0 flex-1 flex-col'>
        <header className='flex h-14 shrink-0 items-center border-b border-[#20242c] px-6'>
          <h2 className='truncate font-display text-[16px] text-[#ECEDF0]'>
            {activeChat?.title || 'New Chat'}
          </h2>
        </header>

        <div className='flex-1 overflow-y-auto'>
          <div className='mx-auto flex h-full w-full max-w-[720px] flex-col px-6'>
            {messages.length === 0 ? (
              <div className='flex flex-1 flex-col items-center justify-center gap-6 py-16 text-center'>
                <h1 className='font-display text-[32px] leading-tight text-[#ECEDF0]'>
                  Ask anything.
                </h1>
                <p className='max-w-[38ch] text-[14px] text-[#868C97]'>
                  Questions get considered, sourced-feeling answers — not just replies.
                </p>
                <div className='flex flex-wrap justify-center gap-2 pt-2'>
                  {STARTER_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type='button'
                      onClick={() => sendMessage(prompt)}
                      className='cursor-pointer rounded-full border border-[#262A32] px-3.5 py-1.5 text-[12.5px] text-[#868C97] transition hover:border-[#3a4048] hover:text-[#ECEDF0]'
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className='flex-1 space-y-8 py-8'>
                {messages.map((message, i) =>
                  message.role === 'user' ? (
                    <div key={message.id ?? i} className='flex justify-end'>
                      <p className='max-w-[80%] rounded-2xl rounded-br-sm bg-[#1D2530] px-4 py-2.5 text-[14.5px] leading-relaxed text-[#ECEDF0]'>
                        {message.content}
                      </p>
                    </div>
                  ) : (
                    <div key={message.id ?? i} className='flex gap-3'>
                      <SparkMark className='mt-1.5 h-3.5 w-3.5 shrink-0 text-[#e8a94c]' />
                      <div className='min-w-0 flex-1 border-l border-[#20242c] pl-4 text-[14.5px] leading-relaxed text-[#d7dae0]'>
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <p className='mb-3 last:mb-0'>{children}</p>,
                            ul: ({ children }) => <ul className='mb-3 list-disc space-y-1 pl-5'>{children}</ul>,
                            ol: ({ children }) => <ol className='mb-3 list-decimal space-y-1 pl-5'>{children}</ol>,
                            code: ({ children }) => (
                              <code className='rounded bg-white/[0.06] px-1.5 py-0.5 text-[13px] text-[#e8a94c]'>
                                {children}
                              </code>
                            ),
                            pre: ({ children }) => (
                              <pre className='mb-3 overflow-x-auto rounded-lg border border-[#20242c] bg-[#0C0E12] p-3 text-[13px]'>
                                {children}
                              </pre>
                            ),
                          }}
                          remarkPlugins={[remarkGfm]}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )
                )}

                {isLoading && (
                  <div className='flex gap-3'>
                    <SparkMark className='mt-1.5 h-3.5 w-3.5 shrink-0 animate-pulse text-[#e8a94c]' />
                    <div className='border-l border-[#20242c] pl-4 text-[14.5px] text-[#5b616b]'>
                      Thinking…
                    </div>
                  </div>
                )}
                <div ref={feedEndRef} />
              </div>
            )}
          </div>
        </div>

        <div className='shrink-0 border-t border-[#20242c] bg-[#0F1115] px-6 py-4'>
          <form
            onSubmit={handleSubmitMessage}
            className='mx-auto flex w-full max-w-[720px] items-center gap-2 rounded-2xl border border-[#262A32] bg-[#14171c] px-4 py-2.5 transition focus-within:border-[#e8a94c]/60 focus-within:shadow-[0_0_0_3px_rgba(232,169,76,0.12)]'
          >
            <input
              type='text'
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              placeholder='Ask anything…'
              className='w-full bg-transparent text-[14.5px] text-[#ECEDF0] outline-none placeholder:text-[#5b616b]'
            />
            <button
              type='submit'
              disabled={!chatInput.trim()}
              className='flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#e8a94c] text-[#0F1115] transition hover:bg-[#f0b862] disabled:cursor-not-allowed disabled:bg-[#262A32] disabled:text-[#5b616b]'
            >
              <SendIcon />
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Dashboard         


