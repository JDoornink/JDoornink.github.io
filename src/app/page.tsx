import fs from 'fs';
import path from 'path';
import ClientNav from './ClientNav';
import { Fragment } from 'react';

export default function Home() {
  const dataPath = path.join(process.cwd(), 'data', 'master_resume.json');

  const rawData = fs.readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(rawData);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 font-mono p-8 md:p-16 relative">

      {/* Generic Telemetry Overlay - Command Center style */}
      <div className="absolute top-4 right-4 bg-gray-900 border border-neutral-800 rounded-lg p-4 text-xs shadow-xl hidden md:block z-10 w-64">
        <div className="flex items-center space-x-2 text-blue-400 mb-2 font-bold">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          <span>Global Infrastructure Health</span>
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-gray-400">
          <div>System State:</div><div className="text-emerald-400 text-right">NOMINAL</div>
          <div>Uptime:</div><div className="text-white text-right">99.999%</div>
          <div>Deploy Method:</div><div className="text-white text-right">GitOps SSG</div>
          <div>RAG Agent:</div><div className="text-blue-500 text-right">STANDBY</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-12 pt-8">
        <header className="space-y-4 border-b border-gray-800 pb-8">
          <div className="text-sm font-bold text-emerald-400 tracking-widest uppercase mb-2">
            [ Master Profile / Non-Targeted ]
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-2">{data.basics.name}</h1>
          <h2 className="text-xl md:text-2xl text-blue-400 font-semibold">{data.basics.label}</h2>

          <p className="w-full text-gray-300 leading-relaxed pt-4 font-sans text-lg text-justify">
            {data.basics.summary}
          </p>

          <div className="flex justify-between gap-2 pt-4 text-[13px] md:text-sm overflow-x-auto pb-2 whitespace-nowrap w-full no-scrollbar">
            <a href="https://github.com/JDoornink" target="_blank" rel="noreferrer" className="flex-1 text-center px-3 py-1.5 bg-neutral-800 border border-neutral-700 text-neutral-300 rounded hover:bg-neutral-700 transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/josefdoornink/" target="_blank" rel="noreferrer" className="flex-1 text-center px-3 py-1.5 bg-[#0a66c2]/20 border border-[#0a66c2]/50 text-blue-300 rounded hover:bg-[#0a66c2]/40 transition-colors">LinkedIn</a>
            <a href="/Josef_Doornink_Resume.pdf" target="_blank" className="flex-1 text-center px-3 py-1.5 bg-blue-900/20 border border-blue-500/50 text-blue-300 rounded hover:bg-blue-900/40 transition-colors">Resume PDF</a>
            <ClientNav />
          </div>
        </header>

        <section id="certifications" className="space-y-6 pt-2">
          <h3 className="text-2xl font-bold border-l-4 border-emerald-500 pl-4 text-white">Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.certifications?.map((cert: any, i: number) => (
              <div key={i} className="bg-gray-900 border border-neutral-800 p-4 rounded-lg hover:border-emerald-500/30 transition-colors flex items-center space-x-6">
                {cert.badge && (
                  <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center">
                    <img src={cert.badge} alt={cert.name} className="max-w-full max-h-full object-contain filter drop-shadow-lg" />
                  </div>
                )}
                <div>
                  {cert.url ? (
                    <a href={cert.url} target="_blank" rel="noreferrer" className="text-white font-bold leading-tight hover:text-emerald-400 hover:underline decoration-emerald-500/50 underline-offset-4 transition-colors outline-none block mb-1">
                      {cert.name}
                    </a>
                  ) : (
                    <h4 className="text-white font-bold leading-tight mb-1">{cert.name}</h4>
                  )}
                  <div className="text-gray-400 text-sm">{cert.issuer} • {cert.date}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="space-y-6 pt-2">
          <h3 className="text-2xl font-bold border-l-4 border-purple-500 pl-4 text-white">Featured Architecture & Tooling</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.projects?.map((project: any, i: number) => (
              <a key={i} href={project.url} target="_blank" rel="noreferrer" className="block bg-gray-900 border border-neutral-800 p-6 rounded-lg hover:border-purple-500/30 transition-colors group relative flex flex-col h-full">
                <h4 className="text-white font-bold leading-tight mb-2 group-hover:text-purple-400 transition-colors underline decoration-purple-500/30 underline-offset-4">{project.name}</h4>
                <p className="text-gray-400 font-sans text-sm leading-relaxed mb-4 flex-grow">{project.description}</p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.keywords?.map((kw: string, j: number) => (
                    <span key={j} className="px-2 py-1 bg-neutral-950 border border-neutral-700/50 rounded text-[10px] uppercase tracking-wider text-gray-300 group-hover:border-purple-900 transition-colors">{kw}</span>
                  ))}
                </div>

                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400">
                  ↗
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-8 pt-4">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold border-l-4 border-blue-500 pl-4 text-white">Aggregated Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.skills.map((skill: any, i: number) => (
                <div key={i} className="bg-gray-900 border border-neutral-800 p-4 rounded-lg hover:border-blue-500/30 transition-colors">
                  <div className="text-sm text-blue-400 mb-2 font-bold uppercase tracking-wider">{skill.name}</div>
                  <div className="flex flex-wrap gap-2 cursor-default">
                    {skill.keywords.map((kw: string, j: number) => (
                      <span key={j} className="px-2 py-1 bg-black border border-neutral-700 rounded text-xs text-gray-300 hover:border-neutral-500 transition-colors">{kw}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-2xl font-bold border-l-4 border-emerald-500 pl-4 text-white">Professional Experience - Startup</h3>
          {data.work.map((job: any, i: number) => (
            <Fragment key={i}>
              {i === 1 && (
                <h3 className="text-2xl font-bold border-l-4 border-emerald-500 pl-4 text-white pt-4">Professional Experience</h3>
              )}
              <div className="bg-gray-900 border border-neutral-800 p-6 rounded-lg relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/50 group-hover:bg-emerald-400 transition-colors"></div>
                <div className="flex flex-col md:flex-row justify-between md:items-start mb-4 gap-2">
                  <div>
                    <h4 className="text-xl font-bold text-white">{job.company}</h4>
                    <div className="text-emerald-400 font-semibold">{job.position}</div>
                  </div>
                  <div className="text-gray-500 text-sm whitespace-nowrap">{job.startDate} — {job.endDate}</div>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-2 text-gray-300 font-sans">
                  {job.highlights.map((hlt: string, j: number) => (
                    <li key={j} className="hover:text-gray-100 transition-colors leading-relaxed text-justify">{hlt}</li>
                  ))}
                </ul>
              </div>
            </Fragment>
          ))}
        </section>



        <section className="grid grid-cols-1 gap-8">
          <div id="publications" className="space-y-6">
            <h3 className="text-2xl font-bold border-l-4 border-rose-500 pl-4 text-white">Publications (Subset of 11)</h3>
            <div className="bg-gray-900 border border-neutral-800 rounded-lg p-6 space-y-6">
              {data.publications?.map((pub: any, i: number) => (
                <div key={i} className={`relative flex flex-col justify-between ${i !== data.publications.length - 1 ? 'border-b border-neutral-800 pb-6' : 'pb-0'}`}>

                  <div>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-2">
                      <h4 className="text-white font-bold text-sm leading-snug">{pub.title}</h4>

                      {/* Citation Badge */}
                      <div className="flex-shrink-0 bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded border border-gray-700 flex items-center space-x-1 cursor-default whitespace-nowrap" title="Google Scholar Citations">
                        <span>Citations:</span>
                        <span className="font-bold text-rose-400">{pub.citations}</span>
                      </div>
                    </div>

                    <div className="text-rose-400 font-semibold text-xs mb-2">{pub.journal} {pub.date && `• ${pub.date}`}</div>
                    <p
                      className="text-gray-500 font-sans italic text-xs mb-4"
                      dangerouslySetInnerHTML={{ __html: pub.authors.replace('J Doornink', '<strong class="text-white font-bold underline decoration-rose-500/50 underline-offset-2">J Doornink</strong>') }}
                    />
                  </div>

                  {pub.isFirstAuthor && (
                    <div className="self-start inline-block bg-rose-900/40 text-rose-300 text-[10px] px-2 py-1 uppercase tracking-widest rounded border border-rose-500/30">
                      ★ First Author
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-16">

          <div className="space-y-6">
            <h3 className="text-2xl font-bold border-l-4 border-yellow-500 pl-4 text-white">Education</h3>
            <div className="space-y-4">
              {data.education?.map((edu: any, i: number) => (
                <div key={i} className="bg-gray-900 border border-neutral-800 p-4 rounded-lg hover:border-yellow-500/30 transition-colors">
                  <h4 className="text-white font-bold">{edu.institution}</h4>
                  <div className="text-yellow-400 font-semibold text-sm mt-1">{edu.degree}</div>
                  <div className="text-gray-500 text-xs mt-1 uppercase tracking-wider">Class of {edu.date}</div>
                </div>
              ))}
            </div>
          </div>

          <div id="patents" className="space-y-6">
            <h3 className="text-2xl font-bold border-l-4 border-purple-500 pl-4 text-white">Patents & Awards</h3>
            <div className="space-y-4">
              {data.patents.map((patent: any, i: number) => (
                <div key={i} className="bg-gray-900 border border-neutral-800 p-6 rounded-lg hover:border-purple-500/30 transition-colors relative group">
                  {patent.url ? (
                    <a href={patent.url} target="_blank" rel="noreferrer" className="block outline-none">
                      <h4 className="text-white font-bold mb-2 group-hover:text-purple-400 transition-colors underline decoration-purple-500/30 underline-offset-4">{patent.title}</h4>
                      <p className="text-gray-400 text-xs mb-3 uppercase tracking-wider">{patent.date}</p>
                      <p className="text-gray-300 font-sans leading-relaxed text-justify text-sm">{patent.description}</p>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400">
                        ↗
                      </div>
                    </a>
                  ) : (
                    <div className="block outline-none">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-yellow-400 text-lg">🏆</span>
                        <h4 className="text-white font-bold group-hover:text-purple-400 transition-colors">{patent.title}</h4>
                      </div>
                      <p className="text-gray-400 text-xs mb-3 uppercase tracking-wider">{patent.date}</p>
                      <p className="text-gray-300 font-sans leading-relaxed text-justify text-sm">{patent.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}
