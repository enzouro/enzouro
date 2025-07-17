import React from 'react'

const ContactMe = () => {
  return (
    <div className="z-10 relative">
      <a href="mailto:your@email.com">
        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#1e1b4b_0%,#0f172a_25%,#164e63_50%,#0c4a6e_75%,#1e1b4b_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-xl font-medium text-white backdrop-blur-3xl">
            Contact Me.
          </span>
        </button>
      </a>
    </div>
  )
}

export default ContactMe