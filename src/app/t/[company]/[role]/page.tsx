import fs from 'fs';
import path from 'path';
import ClientNav from '../../../ClientNav';
import Link from 'next/link';

type Props = {
  params: Promise<{ company: string; role: string }>;
};

// SSG Generation mapping
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
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-red-500">404 - Tailored Profile Not Found</h1>
          <p className="text-gray-400">The agent output for {company}/{role} could not be located.</p>
        </div>
      </div>
    );
  }

  const rawData = fs.readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(rawData);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 font-mono p-8 md:p-16">

      {/* SRE FinOps Telemetry Badge - Radical Transparency */}
      {data.telemetry && (
        <div className="absolute top-4 right-4 bg-gray-900 border border-neutral-800 rounded-lg p-4 text-xs shadow-xl max-w-sm">
          <div className="flex items-center space-x-2 text-emerald-400 mb-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Agentic Generation Telemetry</span>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-400">
            <div>Prompt Version:</div><div className="text-white">{data.telemetry.prompt_version}</div>
            <div>Latency (ms):</div><div className="text-white">{data.telemetry.generation_latency_ms}</div>
            <div>Tokens Used:</div><div className="text-white">{data.telemetry.tokens_used}</div>
            <div>Inference Cost:</div><div className="text-white">${data.telemetry.cost_usd}</div>
            <div>Schema Strictness:</div><div className="text-green-500">{data.telemetry.strict_schema_eval_score}</div>
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-800 flex justify-between items-center">
            <span className="text-[10px] uppercase tracking-wider text-gray-500">Radical SRE Transparency</span>
            <button className="px-3 py-1 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors">
              View Master Diff
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-12 pt-12">

        <header className="space-y-4 border-b border-gray-800 pb-8">
          <div className="text-sm font-bold text-blue-400 tracking-widest uppercase flex items-center space-x-2">
            <span>[ Target TargetLock ]</span>
            <span>{"->"}</span>
            <span className="text-white">{company} : {role}</span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-white mb-2">{data.basics.name}</h1>
          <h2 className="text-xl text-gray-400">{data.basics.label}</h2>

          <p className="w-full text-gray-300 leading-relaxed pt-4 font-sans text-lg text-justify">
            {data.basics.summary}
          </p>

          <div className="flex justify-between gap-2 pt-4 text-[13px] md:text-sm overflow-x-auto pb-2 whitespace-nowrap w-full no-scrollbar">
            <a href="https://github.com/JDoornink" target="_blank" rel="noreferrer" className="flex-1 text-center px-3 py-1.5 bg-neutral-800 border border-neutral-700 text-neutral-300 rounded hover:bg-neutral-700 transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/josefdoornink/" target="_blank" rel="noreferrer" className="flex-1 text-center px-3 py-1.5 bg-[#0a66c2]/20 border border-[#0a66c2]/50 text-blue-300 rounded hover:bg-[#0a66c2]/40 transition-colors">LinkedIn</a>
            <ClientNav />
            <a href={`/t/${company}/${role}/resume.pdf`} target="_blank" className="flex-1 text-center px-3 py-1.5 bg-blue-900/20 border border-blue-500/50 text-blue-300 rounded hover:bg-blue-900/40 transition-colors">Resume</a>
          </div>
        </header>

        <section id="certifications" className="space-y-6 pt-2">
          <h3 className="text-2xl font-bold border-l-4 border-emerald-500 pl-4 text-white">CERTS/COURSES</h3>
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

        {/* Full-Width Section for Targeted Skills */}
        <section className="grid grid-cols-1 gap-8 pt-4">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold border-l-4 border-emerald-500 pl-4 text-white">Targeted Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.skills.map((skill: any, i: number) => (
                <div key={i} className="bg-gray-900 border border-neutral-800 p-4 rounded-lg">
                  <div className="text-sm text-emerald-400 mb-2 font-bold uppercase tracking-wider">{skill.name}</div>
                  <div className="flex flex-wrap gap-2">
                    {skill.keywords.map((kw: string, j: number) => (
                      <span key={j} className="px-2 py-1 bg-black border border-neutral-700 rounded text-xs text-gray-300">{kw}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-2xl font-bold border-l-4 border-blue-500 pl-4 text-white">Experience (Tailored to JD)</h3>
          {data.work.map((job: any, i: number) => (
            <div key={i} className="bg-gray-900 border border-neutral-800 p-6 rounded-lg relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50 group-hover:bg-blue-400 transition-colors"></div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-bold text-white">{job.company}</h4>
                  <div className="text-blue-400 font-semibold">{job.position}</div>
                </div>
                <div className="text-gray-500 text-sm whitespace-nowrap">{job.startDate} — {job.endDate}</div>
              </div>
              <ul className="list-disc list-outside ml-4 space-y-2 text-gray-300 font-sans">
                {job.highlights.map((hlt: string, j: number) => (
                  <li key={j} className="text-gray-400 hover:text-gray-200 transition-colors leading-relaxed text-justify">{hlt}</li>
                ))}
              </ul>
            </div>
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

        {/* Multi-Column Section for Education & Patents */}
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
              {data.patents?.map((patent: any, i: number) => (
                <div key={i} className="bg-gray-900 border border-neutral-800 p-6 rounded-lg hover:border-purple-500/30 transition-colors relative group">
                  {patent.url ? (
                    <a href={patent.url} target="_blank" rel="noreferrer" className="block outline-none">
                      <h4 className="text-white font-bold mb-2 group-hover:text-purple-400 transition-colors underline decoration-purple-500/30 underline-offset-4">{patent.title}</h4>
                      <p className="text-gray-400 text-xs mb-3 uppercase tracking-wider">Issued: {patent.date}</p>
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
