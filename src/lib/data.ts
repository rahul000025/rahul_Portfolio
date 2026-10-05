import { Project, TimelineItem, TechItem, BlogPost, Testimonial, SocialIntegration } from './types';

export const PERSONAL_INFO = {
  name: "RAHUL THAKUR",
  preferredName: "Rahul",
  title: "Software Engineer • AI/ML • Full-Stack Developer",
  status: "Available for opportunities",
  availabilityStatus: "available", // available | busy | open_to_consulting
  location: "Bangalore, India",
  email: "rahul.thakur.dev@gmail.com",
  phone: "+91 98765 43210",
  bioHeadline: "I build intelligent, scalable and beautifully engineered digital experiences.",
  aboutDetailed: `I am an ambitious Software Engineer and AI/ML practitioner dedicated to architecting fault-tolerant, high-concurrency systems and intelligent user-centric products. Blending modern frontend craftsmanship with rigorous backend distributed architectures and applied machine learning models, I translate complex technical problems into elegant, production-grade solutions.`,
  socialLinks: {
    github: "https://github.com/rahulthakur-dev",
    linkedin: "https://www.linkedin.com/in/errahulkumar0025?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    facebook: "https://www.facebook.com/share/19JVLuEdDk/",
    twitter: "https://x.com/rahulkr568579",
    instagram: "https://www.instagram.com/rahul__thakur0025?stkn=MWV2NjJkdXFsZXlmaA==",
  },
  stats: [
    { label: "Projects Completed", value: 28, suffix: "+" },
    { label: "Technologies", value: 22, suffix: "+" },
    { label: "Years Learning & Practice", value: 4, suffix: "+" },
    { label: "Certifications", value: 8, suffix: "+" },
  ],
  interests: [
    { name: "AI / Machine Learning", icon: "Brain", desc: "Large Language Models, Deep Neural Nets, Predictive Analytics & Autonomous Agents" },
    { name: "Full-Stack Development", icon: "Layers", desc: "Reactive Frontends, High-Speed APIs & Serverless Microservices" },
    { name: "Cybersecurity", icon: "Shield", desc: "Zero-Trust Architecture, Cryptography, Identity Governance & Threat Analysis" },
    { name: "Cloud & DevOps", icon: "Cloud", desc: "Kubernetes, Docker, CI/CD Automations & Cloud Infrastructure as Code" },
    { name: "Problem Solving", icon: "Cpu", desc: "Algorithmic Optimization, Distributed Consensus & Low-Latency Processing" },
  ]
};

export const TECH_STACK: TechItem[] = [
  // Frontend
  { name: "React", category: "Frontend", level: 95, experience: "Advanced Knowledge", icon: "Atom", color: "#61DAFB", description: "Modern functional components, hooks, concurrent rendering & custom state management." },
  { name: "Next.js", category: "Frontend", level: 92, experience: "In-Depth Mastery", icon: "Globe", color: "#FFFFFF", description: "App Router, SSR, Server Components, Streaming & edge rendering." },
  { name: "TypeScript", category: "Frontend", level: 90, experience: "Type-Safe Architecture", icon: "FileCode2", color: "#3178C6", description: "Type-safe architectures, generic utility types, strict interfaces & compile-time safety." },
  { name: "JavaScript", category: "Frontend", level: 96, experience: "Core ESNext", icon: "Code", color: "#F7DF1E", description: "ESNext standards, event loops, async patterns, closures & DOM optimization." },
  { name: "HTML5", category: "Frontend", level: 98, experience: "Semantic & a11y", icon: "Layout", color: "#E34F26", description: "Semantic markup, modern Web APIs, accessibility (a11y) & SEO compliance." },
  { name: "CSS3 / Tailwind", category: "Frontend", level: 95, experience: "Design Systems", icon: "Palette", color: "#38BDF8", description: "Responsive layouts, fluid grids, keyframe animations, glassmorphism & design systems." },

  // Backend
  { name: "Python", category: "Backend", level: 94, experience: "Advanced Systems", icon: "Terminal", color: "#3776AB", description: "Advanced data manipulation, object-oriented design, async IO & systems automation." },
  { name: "Node.js", category: "Backend", level: 90, experience: "Async Microservices", icon: "Server", color: "#5FA04E", description: "Event-driven asynchronous services, Express, worker threads & streaming architectures." },
  { name: "FastAPI", category: "Backend", level: 88, experience: "High-Speed APIs", icon: "Zap", color: "#009688", description: "Pydantic validation, asynchronous endpoints, auto-generated OpenAPI & high speed." },
  { name: "REST APIs", category: "Backend", level: 95, experience: "Architectural Standards", icon: "Network", color: "#EC4899", description: "Idempotent resource modeling, JWT authentication, rate limiting & cache control." },

  // AI / ML
  { name: "Machine Learning", category: "AI/ML", level: 88, experience: "Algorithms & Training", icon: "Sparkles", color: "#8B5CF6", description: "Scikit-Learn, regression, random forests, feature engineering & model validation." },
  { name: "Deep Learning", category: "AI/ML", level: 85, experience: "PyTorch & Transformers", icon: "BrainCircuit", color: "#F59E0B", description: "Neural networks, PyTorch, computer vision, NLP & transfer learning." },
  { name: "AI APIs & LLMs", category: "AI/ML", level: 92, experience: "RAG & Agents", icon: "Bot", color: "#10B981", description: "Gemini API, OpenAI SDK, RAG pipelines, LangChain, embeddings & semantic vector search." },
  { name: "Python for Data", category: "AI/ML", level: 92, experience: "NumPy & Dataflow", icon: "Binary", color: "#4B8BBE", description: "NumPy, Pandas, Matplotlib, exploratory data analysis & vectorized computation." },

  // Database
  { name: "PostgreSQL", category: "Database", level: 89, experience: "Relational Modeling", icon: "Database", color: "#336791", description: "Relational modeling, indexing strategies, CTEs, transactions & ACID compliance." },
  { name: "MongoDB", category: "Database", level: 91, experience: "NoSQL Aggregations", icon: "Boxes", color: "#47A248", description: "Document schemas, aggregation pipelines, replica sets & high-speed indexing." },
  { name: "MySQL", category: "Database", level: 86, experience: "Relational Queries", icon: "DatabaseZap", color: "#00758F", description: "Structured query optimization, stored procedures, joins & normalization." },

  // Tools
  { name: "Git", category: "Tools", level: 94, experience: "Branching Workflows", icon: "GitBranch", color: "#F05032", description: "Branching workflows, interactive rebasing, merge conflict resolution & bisect." },
  { name: "GitHub", category: "Tools", level: 93, experience: "Actions CI/CD", icon: "Github", color: "#E6EDF3", description: "GitHub Actions CI/CD pipelines, release management, pull requests & code reviews." },
  { name: "Docker", category: "Tools", level: 86, experience: "Containerization", icon: "Box", color: "#2496ED", description: "Containerization, multi-stage builds, docker-compose & environment parity." },
  { name: "VS Code", category: "Tools", level: 96, experience: "Tooling & Extensions", icon: "Laptop", color: "#007ACC", description: "Custom extensions, remote SSH development, debugging & terminal automation." },
  { name: "Linux", category: "Tools", level: 90, experience: "Shell & Environment", icon: "HardDrive", color: "#FCC624", description: "Bash scripting, systemd, SSH, process monitoring & permissions management." },
];

export const PROJECTS: Project[] = [
  {
    id: "neurovision-ai",
    title: "NeuroVision AI",
    tagline: "Autonomous Multi-Modal Medical & Diagnostic Inference Engine",
    category: "AI/ML",
    description: "An enterprise-grade computer vision and NLP diagnostic platform designed to process high-resolution medical imaging scans and multi-modal clinical notes with 99.1% classification precision.",
    problem: "Healthcare specialists face diagnostic backlogs and fragmented clinical record reviews, leading to critical delay in early anomaly detection.",
    solution: "Developed an asynchronous inference pipeline integrating fine-tuned vision transformers with Google Gemini multimodal models, delivering sub-second anomaly heatmaps and structured summaries.",
    architecture: "Next.js 15 client communicates via WebSockets with a FastAPI microservice backed by PyTorch CUDA GPU cluster, Qdrant vector database, and PostgreSQL for audit trails.",
    technologies: ["Python", "PyTorch", "FastAPI", "React", "Next.js", "Docker", "Gemini API", "PostgreSQL"],
    features: [
      "Real-time DICOM image segmentation and heatmap overlay",
      "Automated clinical reporting with strict medical grounding",
      "Sub-800ms inference response with GPU batch queuing",
      "HIPAA-compliant end-to-end payload encryption"
    ],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/rahulthakur-dev/neurovision-ai",
    liveUrl: "https://neurovision-ai-demo.vercel.app",
    stats: { metric: "99.1%", label: "Model Accuracy" },
    featured: true,
  },
  {
    id: "aegisshield-security",
    title: "AegisShield Cloud",
    tagline: "Zero-Trust Cloud Threat Intelligence & Anomaly Detection",
    category: "Cybersecurity",
    description: "A continuous security posture management (CSPM) and zero-trust perimeter enforcement engine that flags suspicious API payloads, token exfiltration, and anomalous network egress.",
    problem: "Modern microservices environments are susceptible to credential stuffing, API authorization bypasses, and distributed lateral movement.",
    solution: "Engineered an eBPF-inspired network probe and behavioral ML detector that intercepts anomalous API calls, scoring zero-trust risk dynamically and executing instant automated IP isolation.",
    architecture: "Distributed Node.js and Go daemon agents feeding telemetry through Redis Pub/Sub into a streaming Python classification worker, with React real-time SOC dashboard.",
    technologies: ["Python", "Node.js", "FastAPI", "Next.js", "TypeScript", "Redis", "Docker", "Linux"],
    features: [
      "Dynamic Zero-Trust behavioral risk scoring engine",
      "Sub-millisecond packet telemetry filtering",
      "Automated firewall rule synthesis upon exploit detection",
      "SOC-ready audit logging and SIEM integration exports"
    ],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/rahulthakur-dev/aegisshield-security",
    liveUrl: "https://aegisshield-security.vercel.app",
    stats: { metric: "< 5ms", label: "Threat Response" },
    featured: true,
  },
  {
    id: "omnistack-nexus",
    title: "OmniStack Nexus",
    tagline: "High-Throughput Microservices Orchestration & Event Mesh",
    category: "Software Engineering",
    description: "A distributed job scheduler and fault-tolerant service mesh managing background workflows, task prioritization, and dead-letter queue replaying across hybrid clouds.",
    problem: "Complex distributed microservices experience cascade failures during traffic surges due to uncoordinated asynchronous task execution.",
    solution: "Built a resilient event mesh utilizing Raft-based consensus, adaptive backoff rate-limiters, and self-healing circuit breakers to maintain 99.99% uptime.",
    architecture: "FastAPI REST/gRPC gateway, Redis distributed lock manager, PostgreSQL durable event store, and React visual cluster administration dashboard.",
    technologies: ["Python", "Node.js", "PostgreSQL", "Docker", "Git", "REST APIs", "TypeScript"],
    features: [
      "Dynamic worker autoscaling based on queue latency",
      "Visual DAG workflow builder with dependency graphs",
      "Automated circuit-breaking with exponential retry jitter",
      "Comprehensive telemetry tracing with OpenTelemetry"
    ],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/rahulthakur-dev/omnistack-nexus",
    liveUrl: "https://omnistack-nexus.vercel.app",
    stats: { metric: "50k/sec", label: "Message Throughput" },
    featured: true,
  },
  {
    id: "hyperflow-workspace",
    title: "HyperFlow Studio",
    tagline: "Real-Time Collaborative Developer Workspace & Visual Canvas",
    category: "Web Development",
    description: "A lightning-fast collaborative web whiteboard and IDE platform supporting live multiplayer code execution, bidirectional drawing synchronization, and integrated markdown documentation.",
    problem: "Engineering teams struggle with context switching between visual architecture diagrams, design wireframes, and live executable code repositories.",
    solution: "Constructed an infinite 60FPS canvas leveraging HTML5 Canvas, WebSockets CRDTs (Conflict-free Replicated Data Types), and Next.js App Router for zero-latency multiplayer sync.",
    architecture: "Next.js 15 frontend, Tailwind CSS, WebSockets node cluster, Monaco Editor integration, and MongoDB for document persistence.",
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind", "MongoDB", "WebSockets"],
    features: [
      "Sub-20ms multiplayer cursor and drawing synchronization",
      "Integrated multi-language sandbox code runner",
      "Infinite spatial canvas with hardware-accelerated rendering",
      "Instant shareable session links with role permissions"
    ],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/rahulthakur-dev/hyperflow-studio",
    liveUrl: "https://hyperflow-studio.vercel.app",
    stats: { metric: "60 FPS", label: "Canvas Engine" },
    featured: true,
  },
  {
    id: "quantumsense-analytics",
    title: "QuantumSense AI",
    tagline: "Predictive Time-Series Analytics & Financial Modeling Engine",
    category: "AI/ML",
    description: "An advanced algorithmic engine forecasting market trends, detecting statistical anomalies, and synthesizing macroeconomic indicators using hybrid LSTM and attention architectures.",
    problem: "High-frequency financial time-series data contains severe noise and non-stationary patterns that deceive classical statistical regressions.",
    solution: "Designed a multi-head temporal attention neural network trained on multi-decade financial matrices, generating high-confidence interval forecasts with calibrated risk bounds.",
    architecture: "Python ML core, NumPy, Pandas, FastAPI, PostgreSQL time-scale database, and a responsive Tailwind/React analytical terminal interface.",
    technologies: ["Python", "Machine Learning", "Deep Learning", "FastAPI", "PostgreSQL", "React", "Docker"],
    features: [
      "Multi-horizon probabilistic forecasting intervals",
      "Real-time anomaly identification across 500+ metrics",
      "Monte Carlo risk simulation pipeline",
      "Automated data cleaning and missing-value imputation"
    ],
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/rahulthakur-dev/quantumsense-ai",
    liveUrl: "https://quantumsense-ai.vercel.app",
    stats: { metric: "94.6%", label: "Trend Precision" },
    featured: false,
  },
  {
    id: "ciphervault-secrets",
    title: "CipherVault Pro",
    tagline: "Post-Quantum Encrypted Credential & API Secret Manager",
    category: "Cybersecurity",
    description: "A hardened self-hosted secret management vault featuring lattice-based post-quantum cryptography, hardware key authentication, and granular ephemeral access tokens.",
    problem: "Developers frequently expose production API credentials in local files or CI configs, causing high-severity credential leaks.",
    solution: "Engineered a zero-knowledge encrypted vault where secret payloads are decrypted exclusively client-side via WebAssembly cryptography modules.",
    architecture: "Next.js TypeScript interface, Rust-compiled WebAssembly crypto core, Node.js API, and encrypted PostgreSQL store.",
    technologies: ["TypeScript", "Node.js", "Cybersecurity", "React", "PostgreSQL", "Docker", "Linux"],
    features: [
      "Client-side zero-knowledge AES-256-GCM + Kyber encryption",
      "Time-restricted ephemeral API tokens with auto-destruction",
      "Automated Git repository pre-commit secret leak scanner",
      "Multi-factor FIDO2 WebAuthn biometric security"
    ],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/rahulthakur-dev/ciphervault-pro",
    liveUrl: "https://ciphervault-pro.vercel.app",
    stats: { metric: "Zero", label: "Knowledge Leak" },
    featured: false,
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    id: "time-1",
    year: "2025 - 2026",
    title: "Applied AI & Autonomous Agent Architecture",
    subtitle: "Deep Knowledge in LLM Inference, RAG & Neural Workflows",
    organization: "Advanced Systems Exploration & Production Projects",
    category: "Knowledge",
    description: "Developed deep theoretical and practical knowledge in modern Generative AI: continuous batching (vLLM concepts), vector databases (Qdrant), speculative decoding, and multimodal diagnostic models with Google Gemini API and PyTorch.",
    skills: ["LLM Inference", "RAG Pipelines", "FastAPI", "PyTorch", "Next.js", "System Architecture"],
    icon: "Brain",
    badge: "Advanced Knowledge",
  },
  {
    id: "time-2",
    year: "2024 - 2025",
    title: "Full-Stack Web & Distributed Systems Engineering",
    subtitle: "Modern Web Frameworks & High-Speed API Design",
    organization: "Hands-on Project Architecture & Real-Time Sync",
    category: "Projects",
    description: "Mastered end-to-end full-stack architectures: Next.js 15 App Router, React 19, TypeScript type systems, asynchronous FastAPI endpoints, Redis event queues, and PostgreSQL indexing strategies.",
    skills: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "WebSockets"],
    icon: "Code",
    badge: "Core Mastery",
  },
  {
    id: "time-3",
    year: "2024",
    title: "Zero-Trust Cybersecurity & Network Telemetry",
    subtitle: "Application Security, Cryptography & Threat Modeling",
    organization: "Specialized Security Research & Hardening",
    category: "Research",
    description: "Conducted deep technical studies into kernel-level network observability with eBPF, mutual TLS identity attestation, post-quantum cryptographic primitives (Kyber), and zero-knowledge client encryption.",
    skills: ["Cybersecurity", "Zero-Trust", "Cryptography", "eBPF", "Linux Security"],
    icon: "Shield",
    badge: "Security Research",
  },
  {
    id: "time-4",
    year: "2023 - 2024",
    title: "National Hackathon Finalist & Top Innovator",
    subtitle: "Real-Time AI Anomaly Detection System",
    organization: "National Innovation Summit",
    category: "Achievements",
    description: "Applied computer vision models, fast algorithmic problem-solving, and reactive UI design under tight 36-hour sprint constraints, winning top honors among 350+ participating developer teams nationwide.",
    skills: ["Computer Vision", "Python", "FastAPI", "React", "Rapid Prototyping"],
    icon: "Trophy",
    badge: "Award Winner",
  },
  {
    id: "time-5",
    year: "2022 - 2024",
    title: "Professional Certifications & Accreditations",
    subtitle: "Cloud Architecture, Deep Learning & Applied AI",
    organization: "AWS, DeepLearning.AI & Google Cloud",
    category: "Certifications",
    description: "Completed comprehensive industry credentials validating mastery of cloud systems and neural architectures: AWS Certified Solutions Architect, Deep Learning Specialization by Andrew Ng, and Cloud Data Engineering.",
    skills: ["Cloud Architecture", "Deep Learning", "Data Engineering", "DevOps"],
    icon: "Award",
    badge: "Certified Professional",
  },
  {
    id: "time-6",
    year: "2021 - 2025",
    title: "B.Tech in Computer Science & Engineering",
    subtitle: "Core Computing, Algorithms & Distributed Systems",
    organization: "Top Tier Engineering University",
    category: "Education",
    description: "Graduated with First Class Distinction. Strong academic foundation in Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks, and Cryptography.",
    skills: ["Data Structures", "Algorithms", "Operating Systems", "Networking", "DBMS", "C++"],
    icon: "GraduationCap",
    badge: "First Class Distinction",
  },
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    source: "Contact Request" as const,
    message: "New high-priority enterprise project inquiry from Apex Global Tech.",
    timestamp: "10 minutes ago",
    read: false,
    priority: "high" as const,
    actionUrl: "/admin#messages",
  },
  {
    id: "notif-2",
    source: "GitHub Activity" as const,
    message: "Push to main: 3 commits made to 'neurovision-ai' repo.",
    timestamp: "28 minutes ago",
    read: false,
    priority: "normal" as const,
    actionUrl: "https://github.com/rahulthakur-dev",
  },
  {
    id: "notif-3",
    source: "Social Integration Event" as const,
    message: "LinkedIn profile connection request accepted from Senior Engineering Director.",
    timestamp: "2 hours ago",
    read: true,
    priority: "normal" as const,
    actionUrl: "https://www.linkedin.com/in/errahulkumar0025",
  },
  {
    id: "notif-4",
    source: "Newsletter Signup" as const,
    message: "New subscriber joined the 'Engineering Insights' mailing list.",
    timestamp: "4 hours ago",
    read: true,
    priority: "low" as const,
    actionUrl: "/admin#analytics",
  },
  {
    id: "notif-5",
    source: "Project Inquiry" as const,
    message: "Client submitted a technical consultation request for AI/ML architecture.",
    timestamp: "6 hours ago",
    read: true,
    priority: "high" as const,
    actionUrl: "/admin#messages",
  },
];

export const INITIAL_ACTIVITIES = [
  {
    id: "act-1",
    type: "github_commit" as const,
    title: "Pushed 4 commits to rahulthakur-dev/neurovision-ai",
    description: "Optimized tensor batch size and added sub-second inference benchmark tests.",
    timestamp: "14 minutes ago",
    icon: "GitCommit",
    source: "GitHub API",
    url: "https://github.com/rahulthakur-dev/neurovision-ai",
  },
  {
    id: "act-2",
    type: "contact_request" as const,
    title: "New contact request received",
    description: "Senior Technical Recruiter reached out regarding a Lead Software Engineer position.",
    timestamp: "32 minutes ago",
    icon: "Mail",
    source: "Portfolio Contact Form",
  },
  {
    id: "act-3",
    type: "github_repo" as const,
    title: "Created repository rahulthakur-dev/aegisshield-core",
    description: "Initialized zero-trust packet inspector with automated security scanning workflows.",
    timestamp: "3 hours ago",
    icon: "FolderGit2",
    source: "GitHub API",
    url: "https://github.com/rahulthakur-dev",
  },
  {
    id: "act-4",
    type: "portfolio_view" as const,
    title: "Portfolio spike detected from San Francisco, US",
    description: "38 unique visits recorded on 'Featured Projects' and 'Resume' views.",
    timestamp: "5 hours ago",
    icon: "TrendingUp",
    source: "Telemetry Engine",
  },
  {
    id: "act-5",
    type: "social_event" as const,
    title: "LinkedIn post shared: 'Scalable LLMs in Production'",
    description: "Earned 140+ reactions and 28 developer comments in the distributed systems community.",
    timestamp: "12 hours ago",
    icon: "Share2",
    source: "LinkedIn Official Sync",
    url: "https://www.linkedin.com/in/errahulkumar0025",
  },
  {
    id: "act-6",
    type: "newsletter" as const,
    title: "Weekly technical dispatch published",
    description: "'Demystifying eBPF & Modern Microservices' delivered to 1,250 subscribers.",
    timestamp: "1 day ago",
    icon: "Send",
    source: "Newsletter System",
  },
];

export const SOCIAL_INTEGRATIONS: SocialIntegration[] = [
  {
    id: "github",
    name: "GitHub",
    username: "rahulthakur-dev",
    url: "https://github.com/rahulthakur-dev",
    icon: "Github",
    connected: true,
    lastSync: "3 minutes ago",
    availableEvents: ["Push Events", "Repository Creation", "Starred Repositories", "Issue Discussions"],
    followersCount: "1.2k Followers",
    status: "active",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    username: "errahulkumar0025",
    url: "https://www.linkedin.com/in/errahulkumar0025?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    icon: "Linkedin",
    connected: true,
    lastSync: "25 minutes ago",
    availableEvents: ["Profile Views", "Verified Endorsements", "Connection Updates", "Public Articles"],
    followersCount: "3.8k Connections",
    status: "active",
  },
  {
    id: "twitter",
    name: "X / Twitter",
    username: "@rahulkr568579",
    url: "https://x.com/rahulkr568579",
    icon: "Twitter",
    connected: true,
    lastSync: "1 hour ago",
    availableEvents: ["Tech Threads", "Developer Mentions", "Reposts", "Verified Polls"],
    followersCount: "850+ Followers",
    status: "active",
  },
  {
    id: "instagram",
    name: "Instagram",
    username: "@rahul__thakur0025",
    url: "https://www.instagram.com/rahul__thakur0025?stkn=MWV2NjJkdXFsZXlmaA==",
    icon: "Instagram",
    connected: true,
    lastSync: "2 hours ago",
    availableEvents: ["Developer Life Updates", "Workspace Aesthetics", "Stories"],
    followersCount: "1.5k Followers",
    status: "active",
  },
  {
    id: "facebook",
    name: "Facebook",
    username: "Rahul Kumar",
    url: "https://www.facebook.com/share/19JVLuEdDk/",
    icon: "Facebook",
    connected: true,
    lastSync: "5 hours ago",
    availableEvents: ["Professional Community Posts", "Group Contributions"],
    followersCount: "Connected",
    status: "active",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Architecting Scalable LLM Inference Pipelines: From Prototype to 10k QPS",
    slug: "architecting-scalable-llm-inference",
    category: "AI",
    excerpt: "How to eliminate GPU idle states, implement continuous batching, and utilize model quantization to deploy cost-effective Large Language Models at scale.",
    content: `When scaling generative AI workloads to production, standard single-request inference architectures immediately collapse under concurrent load. 

### The Bottleneck: Memory Bandwidth & GPU Idling
Standard transformer inference is predominantly memory-bound rather than compute-bound during the autoregressive token generation phase. To optimize this:
1. **Continuous Batching (vLLM style):** Rather than waiting for an entire batch to finish generating, new requests are dynamically slotted in on a token-by-token basis.
2. **PagedAttention:** Virtual memory paging for Key-Value caches prevents GPU memory fragmentation.
3. **Speculative Decoding:** Employing a lightweight draft model to predict future tokens while the large parent model validates in a single forward pass.

By combining these paradigms with an asynchronous FastAPI gateway and Redis task queue, we achieved an 8x throughput improvement while dropping tail latency by 64%.`,
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    readingTime: "6 min read",
    date: "May 2026",
    tags: ["LLM", "Deep Learning", "FastAPI", "GPU Optimization", "vLLM"],
  },
  {
    id: "blog-2",
    title: "Zero-Trust Microservices: Hardening Cloud Workloads with eBPF and Mutual TLS",
    slug: "zero-trust-microservices-ebpf-mtls",
    category: "Cybersecurity",
    excerpt: "A deep dive into kernel-level network observability, cryptographic service identities, and preventing lateral movement in cloud-native Kubernetes clusters.",
    content: `Traditional perimeter security models assume that anything inside the internal private network can be trusted. In modern distributed cloud infrastructures, this assumption is fatally flawed.

### Core Pillars of Zero-Trust
- **Never Trust, Always Verify:** Every inter-service RPC must cryptographically attest its identity.
- **Mutual TLS (mTLS):** Enforcing SPIFFE/SPIRE identity certificates with automated rotation every 12 hours.
- **Kernel-Level Observability via eBPF:** Monitoring raw socket calls at the Linux kernel boundary without injecting invasive user-space sidecars.

We explore how deploying non-invasive eBPF programs allows real-time packet inspection, identifying token exfiltration attempts in under 3 microseconds.`,
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    readingTime: "8 min read",
    date: "April 2026",
    tags: ["Cybersecurity", "Zero-Trust", "eBPF", "Kubernetes", "Linux"],
  },
  {
    id: "blog-3",
    title: "Next.js 15 Deep Dive: Streaming SSR, Server Actions & React Server Components",
    slug: "nextjs-15-deep-dive-streaming-ssr",
    category: "Web Development",
    excerpt: "Maximizing Core Web Vitals, minimizing client bundle sizes, and building ultra-responsive web applications using the modern Next.js App Router paradigm.",
    content: `The paradigm shift to React Server Components (RSC) redefines how developers balance client-side interactivity with server-driven performance.

### Architectural Takeaways:
- **Zero-Bundle-Size Dependencies:** Markdown parsers, heavy date formatting libraries, and database drivers remain completely on the server.
- **Granular Streaming with Suspense:** Heavy page widgets load asynchronously without holding up the initial critical HTML paint.
- **Type-Safe Server Actions:** Eliminating traditional boilerplate REST endpoints for form mutations while preserving full progressive enhancement.

In this guide, we review optimal caching headers, route segment configs, and the best practices for structuring stateful client islands.`,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    readingTime: "5 min read",
    date: "March 2026",
    tags: ["Next.js", "React", "TypeScript", "Performance", "Web Dev"],
  },
  {
    id: "blog-4",
    title: "Building Resilient Event-Driven Distributed Architectures with Kafka & Redis",
    slug: "resilient-event-driven-architectures",
    category: "Software Engineering",
    excerpt: "Strategies for idempotent consumers, distributed transaction sagas, and graceful backoff in enterprise messaging ecosystems.",
    content: `When handling millions of financial or telemetry events per second, distributed systems must guarantee at-least-once delivery without creating duplicate state corruptions.

### Key Implementation Patterns:
1. **The Outbox Pattern:** Guarantees that local database updates and outbound message publications occur atomically within a single transaction.
2. **Idempotency Keys:** Utilizing Redis distributed bloom filters and atomic locks to discard duplicate event deliveries within milliseconds.
3. **Dead Letter Queues (DLQ) with Exponential Jitter:** Isolating corrupted payloads while preventing retry storms from overwhelming downstream services.`,
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    readingTime: "7 min read",
    date: "February 2026",
    tags: ["Distributed Systems", "Kafka", "Redis", "Architecture", "Microservices"],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Dr. Vikram Seth",
    role: "Director of Engineering",
    company: "Apex Cloud Systems",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    content: "Rahul is a phenomenal software engineer with a rare blend of deep algorithmic rigor and razor-sharp design intuition. His work on our distributed inference pipeline accelerated throughput by 40% and set a new benchmark for code quality across our engineering team.",
    rating: 5,
  },
  {
    id: "test-2",
    name: "Elena Rostova",
    role: "Principal AI Architect",
    company: "NeuralSynth Technologies",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    content: "Working alongside Rahul was a breath of fresh air. He engineered an autonomous multi-modal AI evaluation system that exceeded every reliability KPI. He approaches complex engineering problems with calmness, precision, and boundless creativity.",
    rating: 5,
  },
  {
    id: "test-3",
    name: "Marcus Vance",
    role: "Head of Product",
    company: "HyperScale Ventures",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    content: "Rahul doesn't just write clean code — he crafts complete digital experiences that users love. From zero-latency canvas rendering to rock-solid backend APIs, his technical craftsmanship is truly top-tier.",
    rating: 5,
  },
  {
    id: "test-4",
    name: "Aakash Patel",
    role: "Chief Information Security Officer",
    company: "CyberMatrix Global",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    content: "Rahul's zero-trust implementation for API threat detection is among the cleanest architectures I have audited. His attention to detail regarding security headers, cryptographic validation, and edge latency is remarkable.",
    rating: 5,
  },
];
