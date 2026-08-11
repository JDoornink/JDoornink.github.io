import CollapsibleSection from './CollapsibleSection'
import SideNav from './SideNav'
import data from '../../data/master_resume.json'

const SECTIONS = [
  { id: 'projects', label: 'Featured Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'education', label: 'Education & Patents' },
  { id: 'publications', label: 'Publications' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-200 font-mono">
      <div className="max-w-3xl mx-auto px-8 md:px-16">

        {/* HEADER */}
        <header className="pt-20 md:pt-28 pb-8">
<h1 className="text-6xl md:text-7xl font-black tracking-tight text-white mb-3 leading-none">
            {data.basics.name}
          </h1>
          <p className="text-xs tracking-widest uppercase text-neutral-300 mb-10">
            {data.basics.label}
          </p>
          <p className="text-neutral-300 font-sans leading-relaxed max-w-2xl mb-10 text-[15px]">
            {data.basics.summary}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/Josef_Doornink_Resume.pdf"
              target="_blank"
              className="text-[9px] tracking-[0.2em] uppercase text-neutral-300 hover:text-white border border-neutral-500 hover:border-neutral-500 px-4 py-2.5 transition-all duration-200"
            >
              Resume PDF
            </a>
            <a
              href="https://github.com/JDoornink"
              target="_blank"
              rel="noreferrer"
              className="text-[9px] tracking-[0.2em] uppercase text-neutral-300 hover:text-white border border-neutral-500 hover:border-neutral-500 px-4 py-2.5 transition-all duration-200"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/josefdoornink/"
              target="_blank"
              rel="noreferrer"
              className="text-[9px] tracking-[0.2em] uppercase text-neutral-300 hover:text-white border border-neutral-500 hover:border-neutral-500 px-4 py-2.5 transition-all duration-200"
            >
              LinkedIn
            </a>
          </div>
        </header>

        {/* SECTIONS */}
        <SideNav sections={SECTIONS} />
        <div>

        {/* PROJECTS */}
        <CollapsibleSection id="projects" label="Featured Projects" defaultOpen={true}>
          <div className="space-y-10">
            {data.projects?.map((project: any, i: number) => (
              <div key={i}>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white font-bold hover:text-sky-400 transition-colors duration-200"
                  >
                    {project.name} <span className="text-neutral-300">↗</span>
                  </a>
                  {project.registryUrl && (
                    <a
                      href={project.registryUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[9px] tracking-widest uppercase text-sky-800 border border-sky-900/40 px-1.5 py-0.5 hover:text-sky-400 hover:border-sky-700 transition-colors"
                    >
                      MCP Registry
                    </a>
                  )}
                  {project.articleUrl && (
                    <a
                      href={project.articleUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[9px] tracking-widest uppercase text-emerald-800 border border-emerald-900/40 px-1.5 py-0.5 hover:text-emerald-400 hover:border-emerald-700 transition-colors"
                    >
                      Dev.to
                    </a>
                  )}
                  {project.pypiUrl && (
                    <a
                      href={project.pypiUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[9px] tracking-widest uppercase text-amber-800 border border-amber-900/40 px-1.5 py-0.5 hover:text-amber-400 hover:border-amber-700 transition-colors"
                    >
                      PyPI
                    </a>
                  )}
                </div>
                <p className="text-neutral-300 font-sans text-sm leading-relaxed mb-3 text-justify">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.keywords?.map((kw: string, j: number) => (
                    <span
                      key={j}
                      className="text-[9px] tracking-widest uppercase text-neutral-300 border border-neutral-500 px-2 py-0.5"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* EXPERIENCE */}
        <CollapsibleSection id="experience" label="Experience" defaultOpen={true}>
          <div className="space-y-10">
            {[...data.work]
              .sort((a: any, b: any) => (b.isStartup ? 1 : 0) - (a.isStartup ? 1 : 0))
              .map((job: any, i: number) => (
                <div key={i}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1 mb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white font-bold">{job.company}</span>
                        {job.isStartup ? (
                          <span className="text-[9px] tracking-widest uppercase text-orange-500 border border-orange-500/50 px-1.5 py-0.5">
                            Startup
                          </span>
                        ) : (
                          <span className="text-[9px] tracking-widest uppercase text-neutral-400 border border-neutral-600 px-1.5 py-0.5">
                            Traditional
                          </span>
                        )}
                      </div>
                      <div className="text-neutral-300 text-xs tracking-wide mt-0.5">{job.position}</div>
                    </div>
                    <div className="text-neutral-300 text-xs whitespace-nowrap">{job.startDate} — {job.endDate}</div>
                  </div>
                  <ul className="space-y-2">
                    {job.highlights.map((h: string, j: number) => (
                      <li key={j} className="flex gap-3 font-sans text-sm text-neutral-300 leading-relaxed">
                        <span className="text-neutral-600 mt-0.5 flex-shrink-0">—</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </CollapsibleSection>

        {/* SKILLS */}
        <CollapsibleSection id="skills" label="Skills" defaultOpen={false}>
          <div className="space-y-5">
            {data.skills.map((skill: any, i: number) => (
              <div key={i}>
                <div className="text-[9px] tracking-[0.2em] uppercase text-neutral-300 mb-2">{skill.name}</div>
                <div className="flex flex-wrap gap-1.5">
                  {skill.keywords.map((kw: string, j: number) => (
                    <span
                      key={j}
                      className="text-[10px] text-neutral-300 border border-neutral-500 px-2 py-0.5"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* CERTIFICATIONS */}
        <CollapsibleSection id="certifications" label="Certifications" defaultOpen={false}>
          <div className="space-y-4">
            {data.certifications?.map((cert: any, i: number) => (
              <div key={i} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {cert.badge && (
                    <img src={cert.badge} alt="" className="w-7 h-7 object-contain opacity-70" />
                  )}
                  <div>
                    {cert.url ? (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-neutral-300 hover:text-white transition-colors"
                      >
                        {cert.name}
                      </a>
                    ) : (
                      <span className="text-sm text-neutral-300">{cert.name}</span>
                    )}
                    <div className="text-[10px] text-neutral-300 mt-0.5">{cert.issuer}</div>
                  </div>
                </div>
                <span className="text-[10px] text-neutral-300 whitespace-nowrap">{cert.date}</span>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* EDUCATION & PATENTS */}
        <CollapsibleSection id="education" label="Education & Patents" defaultOpen={false}>
          <div className="space-y-8">
            <div className="space-y-4">
              {data.education?.map((edu: any, i: number) => (
                <div key={i}>
                  <div className="text-white font-bold text-sm">{edu.institution}</div>
                  <div className="text-neutral-300 text-xs mt-0.5">{edu.degree} · {edu.date}</div>
                </div>
              ))}
            </div>
            <div className="space-y-4 border-t border-neutral-500/50 pt-6">
              {data.patents?.map((patent: any, i: number) => (
                <div key={i}>
                  {patent.url ? (
                    <a
                      href={patent.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-neutral-300 hover:text-white transition-colors leading-relaxed block"
                    >
                      {patent.title} <span className="text-neutral-300">↗</span>
                    </a>
                  ) : (
                    <div className="text-sm text-neutral-300 leading-relaxed">{patent.title}</div>
                  )}
                  <div className="text-[10px] text-neutral-300 mt-0.5">{patent.date}</div>
                  {patent.description && (
                    <p className="text-xs text-neutral-300 font-sans mt-1 leading-relaxed">{patent.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CollapsibleSection>

        {/* PUBLICATIONS */}
        <CollapsibleSection id="publications" label="Publications" defaultOpen={false}>
          <div className="space-y-5">
            {data.publications?.map((pub: any, i: number) => (
              <div key={i} className="flex justify-between items-start gap-6">
                <div className="flex-1">
                  {pub.url ? (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-neutral-300 hover:text-white transition-colors leading-snug font-sans italic block"
                    >
                      {pub.title}
                    </a>
                  ) : (
                    <span className="text-sm text-neutral-300 leading-snug font-sans italic">{pub.title}</span>
                  )}
                  <p
                    className="text-[10px] text-neutral-300 mt-1 font-sans"
                    dangerouslySetInnerHTML={{
                      __html: pub.authors.replace(
                        'J Doornink',
                        '<strong class="text-neutral-300">J Doornink</strong>'
                      ),
                    }}
                  />
                  <div className="text-[10px] text-neutral-300 mt-0.5">{pub.journal} · {pub.date}</div>
                </div>
                <div className="text-[10px] text-neutral-300 whitespace-nowrap flex-shrink-0">
                  {pub['cited by']} citations
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        <div className="border-t border-neutral-500 py-10 text-center text-[9px] tracking-[0.3em] uppercase text-neutral-800">
          jdoornink.github.io
        </div>

        </div>

      </div>
    </div>
  )
}
