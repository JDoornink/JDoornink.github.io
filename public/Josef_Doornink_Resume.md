# JOSEF DOORNINK

**Senior SRE and AI Infrastructure Engineer**

jdoorarg@gmail.com | 1.503.927.0358 | [LinkedIn](https://www.linkedin.com/in/josefdoornink/) | [GitHub](https://github.com/JDoornink) | [Portfolio](https://jdoornink.github.io/)

---

## PROFESSIONAL SUMMARY

Infrastructure engineer with 7+ years in SRE and MLOps, now building safety and reliability tooling for autonomous AI systems. CKS/CKA certified, preceded by a decade in FDA-cleared medical hardware where reliability meant patient safety, 10 peer-reviewed papers and 2 US patents. Focused on providing visibility and reliability in non-deterministic systems.

---

## TECHNICAL SKILLS

**AI Safety & Agent Infrastructure:** MCP Servers | OPA Gatekeeper | Human-in-the-Loop Gating | Agentic Workflows | LLM-Powered RCA | Eval Infrastructure | Drift Detection

**GPU Infrastructure & LLM Serving:** vLLM | GPU Sizing & Capacity Planning | KV Cache Tuning | Model Quantization (AWQ) | KEDA / HPA Autoscaling | Inference Load Testing | GPU Node Pools (AKS)

**MLOps & Distributed Training:** LLM Model Serving | ML Pipelines | Distributed Training Systems | Azure Machine Learning | Vertex AI | Model Finetuning Systems

**Observability & Reliability:** New Relic | Azure Monitor | Distributed Tracing | CI/CD Pipelines | GitHub Actions | Performance Profiling | Incident Response | Prometheus | Grafana | Azure DevOps

**Core Technologies:** Kubernetes (AKS) | Docker | Terraform | Azure | AWS | GCP | Helm | YAML | Python | Go/Golang | Bash | C# | SQL | Kafka | Redis

---

## PROJECTS

**[vLLM on Kubernetes: GPU Sizing & Autoscaling](https://github.com/JDoornink/vLLM_on_K8s)** — A 3-part guide to serving LLMs on a GPU-accelerated Kubernetes cluster in the cloud using KEDA for auto-scaling and Prometheus/Grafana for visibility. Describes how to: (1) correctly choose a GPU from first principles (weight memory vs. KV cache headroom, derived to concurrent-request capacity), (2) step-by-step guide on how to deploy an inference model on GPU chips in the cloud, and (3) handle unexpected flapping behavior associated with event-driven autoscaling with vLLM. An article series backed by a reproducible deployment of Qwen2.5-7B-Instruct-AWQ on vLLM across A10 nodes.
*Article series published on [Dev.to](https://dev.to/josef_doornink_930b2caf1c/your-vllm-autoscaler-is-flapping-because-you-picked-the-wrong-signal-not-the-wrong-number-24lf).*

**[K8gentS](https://github.com/JDoornink/K8gentS)** — How to implement a non-deterministic reasoning engine in a system that requires guarantees? K8gents answers through guardrails-as-code: an autonomous Kubernetes root cause analysis (RCA) agent that routes cluster failures through Gemini-powered analysis, but constrains remediation with code-enforced policies—human approval gates paired with OPA Gatekeeper rules create hard boundaries around AI decisions. Diagnostics are exposed via an MCP server (io.github.JDoornink/k8gents on the official registry); see the README for a discussion of failure modes and confidence calibration tradeoffs.
*Listed on the official [MCP Registry](https://registry.modelcontextprotocol.io/?search=k8gents).*

**[OmniSight-Core](https://github.com/JDoornink/OmniSight-Core)** — A self-healing multimodal search engine putting an agent in the reliability loop of an ML system. CLIP embeddings and Qdrant power semantic video search ("find a red truck at night"); Prometheus and Evidently AI surface drift; an LLM agent reads those signals and triggers retraining via GitHub Actions. Companion to K8gentS - same thesis, different domain.

**[Agent-Lint-CLI](https://github.com/JDoornink/agent-lint)** — Static analysis for the agent supply chain. A published Python CLI tool that validates MCP servers and scans AI agent implementations for security vulnerabilities — configurable security levels, CI/CD integration with threshold-based failure conditions, and SARIF output for integration with existing security tooling.
*Published on [PyPI](https://pypi.org/project/agent-lint-cli/) as Agent-Lint-CLI.*

---

## CERTS/COURSES

- **CNCF Certified Kubernetes Security Specialist (CKS)** | CNCF | March 2024
- **CNCF Certified Kubernetes Administrator (CKA)** | CNCF | June 2021
- **Machine Learning Specialization** | Stanford / Coursera | September 2025
- **HashiCorp Certified Terraform Associate** | HashiCorp | July 2022
- **Microsoft Certified Azure Developer Associate** | Microsoft | August 2019
- **Production Machine Learning Systems** | Google Cloud / Coursera | April 2026

---

## PROFESSIONAL EXPERIENCE - STARTUP (Nights & Weekends)

### Lead MLOps Engineer
Reason Benefit AI Corporation | October 2025 - February 2026

- Designing and building the AKS-based ML training and inference platform — making the foundational architecture decisions for an early-stage AI company before production traffic.
- Establishing patterns for distributed training resource management on Azure, balancing cost and iteration speed for research workloads.
- Translating research-team requirements into cloud architectures, working iteratively as the platform and the model strategy co-evolve.
- Standing up the distributed training pipeline from scratch — automated pipeline scripts, validation steps, and the reliability scaffolding research teams need to move fast.

## PROFESSIONAL EXPERIENCE - TRADITIONAL

### Lead Site Reliability Engineer (SRE) I -> II -> III
Trimble | January 2019 - Present

- Implemented New Relic observability stack with distributed tracing, cutting MTTR by 50%.
- Built automation tooling in Python and Go eliminating 80+ hours/month of toil and accelerating deployment velocity 3x.
- Architected AKS production environments handling 14K+ requests/day across 30+ microservices at 99.9% uptime SLA.
- Built and maintained Human Resources Information management system, responsible for over $8.3M+ in ARR and 43% YoY growth rate.
- Led Kubernetes capacity planning and strategies supporting 200% traffic growth.
- Built CI/CD pipelines (GitHub Actions, Azure DevOps) with automated testing and rollback mechanisms.
- Managed 100+ cloud resources via Terraform IaC; implemented CKS security controls for SOC2 compliance.

### Software Developer I -> II
Trimble | March 2018 - January 2019

- Developed cloud-based SaaS applications using .NET and Angular, migrating on-premise software solutions to Azure cloud platform.
- Built RESTful APIs for multi-tenant applications serving thousands of users with focus on performance and scalability.

### Software Developer I
Onfulfillment | March 2014 - March 2018

- Engineered multi-tenant e-commerce platform using Microsoft Stack (.NET, C#, SQL Server) integrated with third-party SaaS APIs.
-  Led 'uplift' initiative migrating legacy codebase to modern greenfield platform, improving response times by 40% measured through New Relic APM.

### Biomechanical Research Engineer II
Legacy Biomechanics Research Lab | 2007 - 2013

- Lead Test and Development Engineer for NIH-funded multimillion-dollar research project focused on bone fixation solutions.

### Quality Assurance Associate
Google | September 2006 - November 2007

- Evaluated search result accuracy and web layout effectiveness for web advertising, working remotely with interdisciplinary web development teams.

---

## EDUCATION

**Master of Science, Biomedical Engineering** — University of California, Davis | 2006

**Bachelor of Science, Mechanical Engineering** — California State University, Chico | 2003

---

## PATENTS & AWARDS *(Plus 3 additional patents. Full list at jdoornink.github.io.)*

**[Bone screw with multiple thread profiles for far cortical locking and flexible engagement to a bone (US10918430B2)](https://patents.google.com/patent/US10918430B2/en)**

---

## PUBLICATIONS *(7 additional publications. Full list at jdoornink.github.io.)*

- M Bottlang, **J Doornink**, DC Fitzpatrick, SM Madey. *Far cortical locking can reduce stiffness of locked plating constructs while retaining construct strength.* The Journal of Bone and Joint Surgery (JBJS), 2009
- M Bottlang, **J Doornink**, GD Byrd, DC Fitzpatrick, SM Madey. *A nonlocking end screw can decrease fracture risk caused by locked plating in the osteoporotic diaphysis.* The Journal of Bone and Joint Surgery (JBJS), 2009
- DC Fitzpatrick, **J Doornink**, SM Madey, M Bottlang. *Relative stability of conventional and locked plating fixation in a model of the osteoporotic femoral diaphysis.* Clinical Biomechanics, 2009
