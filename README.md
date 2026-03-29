# Agentic SRE Portfolio & Tailoring Pipeline

This repository is a fully autonomous, data-driven Next.js application that acts as a centralized "Command Center" for a Lead Site Reliability Engineer. 

It does **not** hard-code static HTML. Instead, it leverages a Python Agentic Pipeline and explicit JSON data-schemas to mathematically generate a gorgeous master profile, while simultaneously executing Static Site Generation (SSG) to dynamically spin up targeted, heavily customized resume endpoints engineered specifically for individual job applications.

## 🏗️ Architecture Stack
* **Frontend:** Next.js (React), App Router, TailwindCSS 
* **Backend Pipeline:** Python 3, Markdown Parser, LLM Agent Emulator
* **Data Layer:** Strict JSON Payloads (`data/master_resume.json` + `data/jobs/**/*.json`)
* **Infrastructure:** GitHub Actions CI/CD (Pending), GitHub Pages (SSG)

---

## 🚀 The Tailoring Pipeline (SRE Runbook)

When applying for a new Lead/Staff SRE role, you do not want to send a generic resume. You want to send them a targeted endpoint (e.g., `jdoornink.github.io/t/google/staff-mle`) that highlights the exact skills requested in their Job Description.

This portfolio uses a Python agent to read a raw Job Description, restructure your master JSON to highlight the requested skills organically, and output a targeted route.

### Step 1: Initialize the Target Payload
Create a new nested folder structure inside of `data/jobs/` using the Company name and the Role title.
```bash
mkdir -p data/jobs/anthropic/sre-lead
```

### Step 2: Drop in the Job Description (JD)
Create a raw text file named `jd.txt` inside that folder and paste the raw text of the job description into it:
```bash
touch data/jobs/anthropic/sre-lead/jd.txt
# (Paste the full job posting into jd.txt)
```

### Step 3: Execute the Python Agent
Trigger the automation agent, pointing it directly to your newly created folder path:
```bash
python scripts/generate_tailored_profile.py data/jobs/anthropic/sre-lead
```
**What the Agent does in the background:**
1. Parses the raw text of `jd.txt`.
2. Cross-references it against your master SRE skills in `master_resume.json`.
3. Outputs a tailored, highly-targeted `data.json` directly into the folder.
4. Generates a custom Markdown (`resume.md`) and perfectly formatted PDF (`resume.pdf`) inside the folder.

### Step 4: Validate the Vercel/Next.js Target Output
Because Next.js uses dynamic `/t/[company]/[role]` routing, your new page is already live! 
Open your browser and navigate to the newly generated endpoint to review the UI before sharing:

```text
http://localhost:3000/t/anthropic/sre-lead
```

---

## 🛠️ Local Development

If you want to edit the overarching UI, Tailwind styling, or data mappings:

1. Validate your dependencies are installed:
```bash
npm install
pip install markdown reportlab
```
2. Start the hot-reload React Server:
```bash
npm run dev
```

The master profile natively rests at `http://localhost:3000`.

---
*Built with strict SRE principles. No raw HTML duplication. Absolute Single Source of Truth.*
