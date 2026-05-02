'use client'
import { useState, useEffect } from 'react'

type Props = {
  label: string
  children: React.ReactNode
  defaultOpen?: boolean
  id?: string
}

export default function CollapsibleSection({ label, children, defaultOpen = false, id }: Props) {
  const [open, setOpen] = useState(defaultOpen)

  useEffect(() => {
    if (!id) return
    const handler = (e: Event) => {
      if ((e as CustomEvent).detail?.id === id) setOpen(true)
    }
    window.addEventListener('open-section', handler)
    return () => window.removeEventListener('open-section', handler)
  }, [id])

  return (
    <div id={id} className="border-t border-neutral-500">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-5 group cursor-pointer"
      >
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-white transition-colors duration-200">
          {label}
        </span>
        <span className="text-neutral-500 group-hover:text-neutral-200 transition-colors duration-200 text-base leading-none select-none">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="pb-10">
          {children}
        </div>
      )}
    </div>
  )
}
