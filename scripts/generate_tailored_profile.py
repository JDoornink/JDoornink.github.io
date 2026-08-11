import os
import sys
import json
import time
import anthropic

def _load_dotenv():
    env_path = os.path.normpath(os.path.join(os.path.dirname(__file__), '..', '.env'))
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    k, v = line.split('=', 1)
                    os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))

_load_dotenv()


def process_job_description(target_folder):
    path_parts = os.path.normpath(target_folder).split(os.sep)
    if len(path_parts) >= 3:
        company = path_parts[-2]
        role = path_parts[-1]
    else:
        print("Error: Target folder path must follow the 'data/jobs/company/role' structure.")
        sys.exit(1)

    jd_path = os.path.join(target_folder, 'jd.txt')
    master_json_path = os.path.join('data', 'master_resume.json')
    out_json_path = os.path.join(target_folder, 'data.json')

    public_target_dir = os.path.join('public', 't', company, role)
    os.makedirs(public_target_dir, exist_ok=True)
    out_md_path = os.path.join(public_target_dir, 'resume.md')
    out_pdf_path = os.path.join(public_target_dir, 'resume.pdf')

    if not os.path.exists(jd_path):
        print(f"Error: Could not find Job Description at {jd_path}")
        sys.exit(1)

    print(f"[*] Initializing pipeline for: {company}/{role}")
    start_time = time.time()

    with open(master_json_path, 'r', encoding='utf-8') as f:
        master_data = json.load(f)
    with open(jd_path, 'r', encoding='utf-8') as f:
        jd_text = f.read()

    client = anthropic.Anthropic()

    # --- Step 1: Tailor resume JSON ---
    print("[*] Tailoring resume JSON...")
    resume_system = """You are an expert resume tailoring agent. Analyze the job description and
reorder/filter the candidate's resume JSON to best match the role.

Rules:
- Keep ALL data accurate — never fabricate or exaggerate
- Reorder work highlights to lead with the most relevant achievements for this role
- Reorder skills keywords to front-load technologies mentioned in the JD
- Reorder projects and certifications by relevance to the role
- Update basics.summary to directly address the key requirements in the JD (factual only)
- Return ONLY valid JSON matching the exact same schema as the input"""

    with client.messages.stream(
        model="claude-sonnet-4-6",
        max_tokens=8000,
        system=resume_system,
        messages=[{"role": "user", "content": f"Job Description:\n{jd_text}\n\n---\n\nMaster Resume JSON:\n{json.dumps(master_data, indent=2)}\n\n---\n\nReturn the tailored JSON only, no other text."}]
    ) as stream:
        resume_response = stream.get_final_message()

    raw = next(b.text for b in resume_response.content if b.type == "text").strip()
    if raw.startswith("```"):
        raw = raw.split("\n", 1)[1].rsplit("```", 1)[0]
    tailored_data = json.loads(raw)

    elapsed_ms = int((time.time() - start_time) * 1000)
    tailored_data['telemetry'] = {
        'generation_latency_ms': elapsed_ms,
        'input_tokens': resume_response.usage.input_tokens,
        'output_tokens': resume_response.usage.output_tokens,
        'model': 'claude-sonnet-4-6',
        'prompt_version': 'v2'
    }

    with open(out_json_path, 'w', encoding='utf-8') as f:
        json.dump(tailored_data, f, indent=2)
    print(f"[+] Tailored JSON: {out_json_path}")

    # --- Step 2: Generate resume markdown + PDF ---
    md_content = _render_resume_markdown(tailored_data)
    with open(out_md_path, 'w', encoding='utf-8') as f:
        f.write(md_content)
    print(f"[+] Resume Markdown: {out_md_path}")
    os.system(f"python convert_to_pdf.py {out_md_path} {out_pdf_path}")

    total_ms = int((time.time() - start_time) * 1000)
    print(f"\n[✔] Pipeline complete in {total_ms}ms | {resume_response.usage.input_tokens} in / {resume_response.usage.output_tokens} out tokens")
    print(f"    Preview: http://localhost:3000/t/{company}/{role}")


COMPACT_HIGHLIGHT_LIMITS = {
    'Reason Benefit AI Corporation': 4,
    'Trimble': 7,
    'Viewpoint | Onfulfillment': 3,
    'Legacy Biomechanics Research Lab': 1,
}


def _render_resume_markdown(data, compact=False):
    basics = data['basics']
    profiles = {p['network']: p['url'] for p in basics.get('profiles', [])}

    lines = [
        f"# {basics['name'].upper()}",
        "",
        f"**{basics['label']}**",
        "",
        f"{basics['email']}"
        + (f" | [LinkedIn]({profiles['LinkedIn']})" if 'LinkedIn' in profiles else "")
        + (f" | [GitHub]({profiles['GitHub']})" if 'GitHub' in profiles else "")
        + (f" | [Portfolio]({basics.get('url', '')})" if basics.get('url') else ""),
        "",
        "---", "",
        "## PROFESSIONAL SUMMARY", "",
        basics['summary'], "",
        "---", "",
        "## TECHNICAL SKILLS", "",
    ]

    for skill in data.get('skills', []):
        lines.append(f"**{skill['name']}:** {' | '.join(skill['keywords'])}")
        lines.append("")

    lines += ["---", "", "## PROJECTS", ""]
    projects = data.get('projects', [])
    for proj in projects:
        url = proj.get('url', '')
        name_part = f"[{proj['name']}]({url})" if url else proj['name']
        lines.append(f"**{name_part}** — {proj['description']}")
        if proj.get('registryUrl'):
            lines.append(f"*Listed on the official [MCP Registry]({proj['registryUrl']}).*")
        if proj.get('pypiUrl'):
            lines.append(f"*Published on [PyPI]({proj['pypiUrl']}) as Agent-Lint-CLI.*")
        if proj.get('articleUrl'):
            lines.append(f"*Article series published on [Dev.to]({proj['articleUrl']}).*")
        lines.append("")

    if data.get('certifications'):
        lines += ["---", "", "## CERTS/COURSES", ""]
        certs = data['certifications']
        for cert in certs:
            lines.append(f"- **{cert['name']}** | {cert['issuer']} | {cert['date']}")
        lines.append("")

    lines += ["---", ""]

    startup_written = False
    professional_written = False

    for job in sorted(data.get('work', []), key=lambda j: (0 if j.get('isStartup') else 1)):
        is_startup = job.get('isStartup', False)
        if is_startup and not startup_written:
            lines += ["## PROFESSIONAL EXPERIENCE - STARTUP (Nights & Weekends)", ""]
            startup_written = True
        elif not is_startup and not professional_written:
            lines += ["## PROFESSIONAL EXPERIENCE - TRADITIONAL", ""]
            professional_written = True
        lines.append(f"### {job['position']}")
        lines.append(f"{job['company']} | {job['startDate']} - {job['endDate']}")
        lines.append("")
        highlights = job.get('highlights', [])
        if compact:
            limit = COMPACT_HIGHLIGHT_LIMITS.get(job['company'], 3)
            highlights = highlights[:limit]
        for h in highlights:
            lines.append(f"- {h}")
        lines.append("")

    if data.get('education'):
        lines += ["---", "", "## EDUCATION", ""]
        for edu in data['education']:
            lines.append(f"**{edu['degree']}** — {edu['institution']} | {edu['date']}")
            lines.append("")

    if data.get('patents'):
        if compact:
            remaining = len(data['patents']) - 1
            heading = "## PATENTS & AWARDS"
            if remaining > 0:
                heading += f" *(Plus {remaining} additional patents. Full list at jdoornink.github.io.)*"
            lines += ["---", "", heading, ""]
            pat = data['patents'][0]
            url = pat.get('url', '')
            title_part = f"[{pat['title']}]({url})" if url else pat['title']
            lines.append(f"**{title_part}**")
            lines.append("")
        else:
            lines += ["---", "", "## PATENTS & AWARDS", ""]
            for pat in data['patents']:
                url = pat.get('url', '')
                title_part = f"[{pat['title']}]({url})" if url else pat['title']
                lines.append(f"**{title_part}**")
                if pat.get('description'):
                    lines.append(f"- {pat['description']}")
                lines.append("")

    if data.get('publications'):
        if compact:
            count = len(data['publications'])
            lines += [
                "---", "",
                f"## PUBLICATIONS *({count - 3} additional publications. Full list at jdoornink.github.io.)*",
                "",
            ]
            for pub in data['publications'][:3]:
                authors = pub['authors'].replace('J Doornink', '**J Doornink**')
                lines.append(f"- {authors}. *{pub['title']}.* {pub['journal']}, {pub['date']}")
            lines.append("")
        else:
            lines += ["---", "", "## PUBLICATIONS", ""]
            for pub in data['publications']:
                authors = pub['authors'].replace('J Doornink', '**J Doornink**')
                lines.append(f"- {authors}. *{pub['title']}.* {pub['journal']}, {pub['date']}")
            lines.append("")

    return "\n".join(lines)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python generate_tailored_profile.py <target_folder>")
        print("Example: python generate_tailored_profile.py data/jobs/google/senior-sre")
        sys.exit(1)
    process_job_description(sys.argv[1])
