'use client'
import { useState, useEffect } from 'react'

type SectionDef = { id: string; label: string }

type Props = {
  sections: SectionDef[]
}

export default function SideNav({ sections }: Props) {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )
    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sections])

  const handleClick = (id: string) => {
    window.dispatchEvent(new CustomEvent('open-section', { detail: { id } }))
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 30)
    setActive(id)
  }

  return (
    <nav className="hidden md:flex flex-col gap-0.5 fixed left-8 top-24 w-28">
      {sections.map(s => (
        <button
          key={s.id}
          onClick={() => handleClick(s.id)}
          className={`text-left text-xs font-bold tracking-[0.2em] uppercase py-1.5 transition-colors duration-200 ${
            active === s.id
              ? 'text-white'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          {s.label}
        </button>
      ))}
    </nav>
  )
}
