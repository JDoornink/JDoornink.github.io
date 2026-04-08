"use client";

import React from 'react';

export default function ClientNav() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  const sections = [
    { id: 'certifications', label: 'Certifications', bg: 'bg-emerald-900/20', border: 'border-emerald-500/50', text: 'text-emerald-300', hover: 'hover:bg-emerald-900/40' },
    { id: 'projects', label: 'Projects', bg: 'bg-purple-900/20', border: 'border-purple-500/50', text: 'text-purple-300', hover: 'hover:bg-purple-900/40' },
    { id: 'skills', label: 'Skills', bg: 'bg-blue-900/20', border: 'border-blue-500/50', text: 'text-blue-300', hover: 'hover:bg-blue-900/40' },
    { id: 'experience', label: 'Experience', bg: 'bg-amber-900/20', border: 'border-amber-500/50', text: 'text-amber-300', hover: 'hover:bg-amber-900/40' },
    { id: 'publications', label: 'Publications', bg: 'bg-rose-900/20', border: 'border-rose-500/50', text: 'text-rose-300', hover: 'hover:bg-rose-900/40' },
    { id: 'credentials', label: 'Education & Patents', bg: 'bg-yellow-900/20', border: 'border-yellow-500/50', text: 'text-yellow-300', hover: 'hover:bg-yellow-900/40' },
  ];

  return (
    <>
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          onClick={(e) => handleScroll(e, s.id)}
          className={`inline-flex items-center justify-center whitespace-nowrap px-3 py-2 ${s.bg} border ${s.border} ${s.text} rounded ${s.hover} transition-colors`}
        >
          {s.label}
        </a>
      ))}
    </>
  );
}
