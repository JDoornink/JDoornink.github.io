import fs from 'fs';
import path from 'path';
import CollapsibleSection from '../../../CollapsibleSection';

type Props = {
  params: Promise<{ company: string; role: string }>;
};

export async function generateStaticParams() {
  const jobsDir = path.join(process.cwd(), 'data', 'jobs');
  if (!fs.existsSync(jobsDir)) return [];

  const paths: { company: string; role: string }[] = [];
  const companies = fs.readdirSync(jobsDir);
  for (const company of companies) {
    const companyPath = path.join(jobsDir, company);
    if (!fs.statSync(companyPath).isDirectory()) continue;
    const roles = fs.readdirSync(companyPath);
    for (const role of roles) {
      if (fs.statSync(path.join(companyPath, role)).isDirectory()) {
        paths.push({ company, role });
      }
    }
  }
  return paths;
}

export default async function TailoredJobPage({ params }: Props) {
  const { company, role } = await params;
  const dataPath = path.join(process.cwd(), 'data', 'jobs', company, role, 'data.json');

  if (!fs.existsSync(dataPath)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white font-mono">
        <div className="text-center space-y-3">
          <div className="text-xs tracking-widest uppercase text-neutral-600">404</div>
          <h1 className="text-2xl font-bold text-white">Profile Not Found</h1>
          <p className="text-neutral-600 text-sm">{company}/{role}</p>
        </div>
      </div>
    );
  }

  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-200 font-mono">
      <div className="max-w-3xl mx-auto px-8 md:px-16">

        {/* HEADER */}
        <header className="py-20 md:py-28">
          <div className="text-[9px] tracking-[0.35em] uppercase text-neutral-700 mb-8">
            <span className="text-sky-900">{company}</span>
            <span className="text-neutral-800 mx-2">→</span>
            <span className="text-neutral-600">{role}</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black tracking-tight text-white mb-3 leading-none">
            {data.basics.name}
          </h1>
          <p className="text-xs tracking-widest uppercase text-neutral-600 mb-10">
            {data.basics.label}
          </p>
          <p className="text-neutral-400 font-sans leading-relaxed max-w-2xl mb-10 text-[15px]">
            {data.basics.summary}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`/t/${company}/${role}/resume.pdf`}
              target="_blank"
              className="text-[9px] tracking-[0.2em] uppercase text-neutral-500 hover:text-white border border-neutral-800 hover:border-neutral-500 px-4 py-2.5 transition-all duration-200"
            >
              Resume PDF
            </a>
            <a
              href="https://github.com/JDoornink"
              target="_blank"
              rel="noreferrer"
              className="text-[9px] tracking-[0.2em] uppercase text-neutral-500 hover:text-white border border-neutral-800 hover:border-neutral-500 px-4 py-2.5 transition-all duration-200"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/josefdoornink/"
              target="_blank"
              rel="noreferrer"
              className="text-[9px] tracking-[0.2em] uppercase text-neutral-500 hover:text-white border border-neutral-800 hover:border-neutral-500 px-4 py-2.5 transition-all duration-200"
            >
              LinkedIn
            </a>
          </div>
        </header>

        {/* PROJECTS */}
        <CollapsibleSection label="Featured Projects" defaultOpen={true}>
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
                    {project.name} <span className="text-neutral-700">↗</span>
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
                <p className="text-neutral-500 font-sans text-sm leading-relaxed mb-3 text-justify">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.keywords?.map((kw: string, j: number) => (
                    <span
                      key={j}
                      className="text-[9px] tracking-widest uppercase text-neutral-700 border border-neutral-800 px-2 py-0.5"
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
        <CollapsibleSection label="Experience" defaultOpen={true}>
          <div className="space-y-10">
            {[...data.work]
              .sort((a: any, b: any) => (b.isStartup ? 1 : 0) - (a.isStartup ? 1 : 0))
              .map((job: any, i: number) => (
                <div key={i}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1 mb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white font-bold">{job.company}</span>
                        {job.isStartup && (
                          <span className="text-[9px] tracking-widest uppercase text-amber-800 border border-amber-900/40 px-1.5 py-0.5">
                            Startup
                          </span>
                        )}
                      </div>
                      <div className="text-neutral-600 text-xs tracking-wide mt-0.5">{job.position}</div>
                    </div>
                    <div className="text-neutral-700 text-xs whitespace-nowrap">{job.startDate} — {job.endDate}</div>
                  </div>
                  <ul className="space-y-2">
                    {job.highlights.map((h: string, j: number) => (
                      <li key={j} className="flex gap-3 font-sans text-sm text-neutral-500 leading-relaxed">
                        <span className="text-neutral-800 mt-0.5 flex-shrink-0">—</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </CollapsibleSection>

        {/* SKILLS */}
        <CollapsibleSection label="Targeted Skills" defaultOpen={false}>
          <div className="space-y-5">
            {data.skills.map((skill: any, i: number) => (
              <div key={i}>
                <div className="text-[9px] tracking-[0.2em] uppercase text-neutral-700 mb-2">{skill.name}</div>
                <div className="flex flex-wrap gap-1.5">
                  {skill.keywords.map((kw: string, j: number) => (
                    <span
                      key={j}
                      className="text-[10px] text-neutral-500 border border-neutral-800 px-2 py-0.5"
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
        {data.certifications?.length > 0 && (
          <CollapsibleSection label="Certifications" defaultOpen={false}>
            <div className="space-y-4">
              {data.certifications.map((cert: any, i: number) => (
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
                          className="text-sm text-neutral-400 hover:text-white transition-colors"
                        >
                          {cert.name}
                        </a>
                      ) : (
                        <span className="text-sm text-neutral-400">{cert.name}</span>
                      )}
                      <div className="text-[10px] text-neutral-700 mt-0.5">{cert.issuer}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-neutral-700 whitespace-nowrap">{cert.date}</span>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* EDUCATION & PATENTS */}
        <CollapsibleSection label="Education & Patents" defaultOpen={false}>
          <div className="space-y-8">
            <div className="space-y-4">
              {data.education?.map((edu: any, i: number) => (
                <div key={i}>
                  <div className="text-white font-bold text-sm">{edu.institution}</div>
                  <div className="text-neutral-600 text-xs mt-0.5">{edu.degree} · {edu.date}</div>
                </div>
              ))}
            </div>
            <div className="space-y-4 border-t border-neutral-800/50 pt-6">
              {data.patents?.map((patent: any, i: number) => (
                <div key={i}>
                  {patent.url ? (
                    <a
                      href={patent.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-neutral-500 hover:text-white transition-colors leading-relaxed block"
                    >
                      {patent.title} <span className="text-neutral-700">↗</span>
                    </a>
                  ) : (
                    <div className="text-sm text-neutral-500 leading-relaxed">{patent.title}</div>
                  )}
                  <div className="text-[10px] text-neutral-700 mt-0.5">{patent.date}</div>
                </div>
              ))}
            </div>
          </div>
        </CollapsibleSection>

        {/* PUBLICATIONS */}
        {data.publications?.length > 0 && (
          <CollapsibleSection label="Publications" defaultOpen={false}>
            <div className="space-y-5">
              {data.publications.map((pub: any, i: number) => (
                <div key={i} className="flex justify-between items-start gap-6">
                  <div className="flex-1">
                    {pub.url ? (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-neutral-400 hover:text-white transition-colors leading-snug font-sans italic block"
                      >
                        {pub.title}
                      </a>
                    ) : (
                      <span className="text-sm text-neutral-400 leading-snug font-sans italic">{pub.title}</span>
                    )}
                    <p
                      className="text-[10px] text-neutral-700 mt-1 font-sans"
                      dangerouslySetInnerHTML={{
                        __html: pub.authors.replace(
                          'J Doornink',
                          '<strong class="text-neutral-500">J Doornink</strong>'
                        ),
                      }}
                    />
                    <div className="text-[10px] text-neutral-700 mt-0.5">{pub.journal} · {pub.date}</div>
                  </div>
                  <div className="text-[10px] text-neutral-700 whitespace-nowrap flex-shrink-0">
                    {pub['cited by']} citations
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        <div className="border-t border-neutral-800 py-10 text-center text-[9px] tracking-[0.3em] uppercase text-neutral-800">
          jdoornink.github.io
        </div>

      </div>
    </div>
  );
}
