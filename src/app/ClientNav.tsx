"use client";

import React from 'react';

export default function ClientNav() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Clean up the URL hash dynamically without triggering a reload
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  return (
    <>
      <a href="#certifications" onClick={(e) => handleScroll(e, 'certifications')} className="flex-1 text-center px-3 py-1.5 bg-emerald-900/20 border border-emerald-500/50 text-emerald-300 rounded hover:bg-emerald-900/40 transition-colors">Cert/Courses</a>
      <a href="#patents" onClick={(e) => handleScroll(e, 'patents')} className="flex-1 text-center px-3 py-1.5 bg-purple-900/20 border border-purple-500/50 text-purple-300 rounded hover:bg-purple-900/40 transition-colors">Patents</a>
      <a href="#publications" onClick={(e) => handleScroll(e, 'publications')} className="flex-1 text-center px-3 py-1.5 bg-rose-900/20 border border-rose-500/50 text-rose-300 rounded hover:bg-rose-900/40 transition-colors">Publications</a>
    </>
  );
}
