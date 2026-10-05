'use client';

import React, { useState } from 'react';
import { FileText, Download, Eye, ExternalLink, X, Printer, CheckCircle2, Award, Briefcase, GraduationCap, Sparkles, Brain } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/data';

export default function ResumeSection() {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate simple dynamic printable / download HTML document trigger
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Rahul Thakur - Resume</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.5; color: #111; padding: 40px; max-width: 800px; margin: 0 auto; }
            h1 { margin: 0 0 4px 0; font-size: 28px; text-transform: uppercase; }
            .subtitle { font-size: 14px; color: #444; margin-bottom: 12px; font-weight: 600; }
            .contacts { font-size: 12px; color: #666; margin-bottom: 24px; border-bottom: 1px solid #ccc; padding-bottom: 12px; }
            h2 { font-size: 16px; border-bottom: 2px solid #222; padding-bottom: 4px; margin-top: 24px; text-transform: uppercase; }
            .job-title { font-weight: bold; font-size: 14px; }
            .job-org { color: #555; font-size: 13px; margin-bottom: 6px; }
            ul { margin-top: 4px; padding-left: 20px; font-size: 13px; }
            li { margin-bottom: 4px; }
          </style>
        </head>
        <body>
          <h1>RAHUL THAKUR</h1>
          <div class="subtitle">Software Engineer • AI/ML • Full-Stack Developer</div>
          <div class="contacts">
            Location: Bangalore, India | Email: rk7840145@gmail.com | Portfolio: Available
          </div>

          <h2>Summary</h2>
          <p style="font-size: 13px;">
            Results-driven Software Engineer and AI practitioner with expertise in distributed microservices, scalable full-stack applications, and low-latency transformer inference pipelines. Demonstrated success improving system throughput by 40%+ while ensuring high fault-tolerance.
          </p>

          <h2>Core Competencies</h2>
          <p style="font-size: 13px;">
            <strong>Languages:</strong> Python, TypeScript, JavaScript, SQL, Bash<br/>
            <strong>Frontend:</strong> React, Next.js 15, Tailwind CSS, HTML5, CSS3, WebSockets<br/>
            <strong>Backend & Systems:</strong> FastAPI, Node.js, Express, REST APIs, Microservices, Redis<br/>
            <strong>AI / Machine Learning:</strong> PyTorch, Scikit-Learn, Gemini API, RAG, LangChain, Vector DBs<br/>
            <strong>Cloud & DevOps:</strong> Docker, Kubernetes, Git, GitHub Actions, MongoDB, MySQL
          </p>

          <h2>Applied Knowledge & Project Milestones</h2>
          <div class="job-title">Applied AI & Autonomous Agent Architecture</div>
          <div class="job-org">Advanced Systems Exploration & Production Projects (2025 - 2026)</div>
          <ul>
            <li>Engineered asynchronous LLM inference pipelines with continuous batching and sub-second response times.</li>
            <li>Designed zero-trust security perimeters with automated threat isolation and eBPF network telemetry.</li>
            <li>Implemented high-concurrency microservices processing 50k+ events/sec with fault-tolerant circuit breaking.</li>
          </ul>

          <div class="job-title" style="margin-top: 14px;">Full-Stack Web & Distributed Systems Engineering</div>
          <div class="job-org">Production Project Architectures (2024 - 2025)</div>
          <ul>
            <li>Built reactive Next.js 15 full-stack applications with real-time WebSockets synchronization.</li>
            <li>Developed multimodal diagnostic models achieving 99.1% classification precision with Qdrant vector retrieval.</li>
          </ul>

          <h2>Education & Credentials</h2>
          <p style="font-size: 13px;">
            <strong>Bachelor of Computer Applications (BCA)</strong> — Computer Applications & Software Systems<br/>
            <strong>Certifications:</strong> AWS Certified Solutions Architect, Deep Learning Specialization (DeepLearning.AI)
          </p>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <section id="resume" className="py-24 relative overflow-hidden border-t border-slate-900 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-wider uppercase">
            <FileText className="w-3.5 h-3.5" />
            <span>Curriculum Vitae</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional <span className="text-gradient-cyan">Resume</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Detailed overview of technical education, employment history, engineering capabilities, and research credentials.
          </p>
        </div>

        {/* Resume Preview Box */}
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {PERSONAL_INFO.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                  Verified Candidate
                </span>
              </div>
              <p className="text-xs sm:text-sm text-cyan-400 font-mono">
                {PERSONAL_INFO.title}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Bangalore, India • {PERSONAL_INFO.email}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsViewerOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-slate-500 text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-colors"
              >
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>View Full Resume</span>
              </button>

              <button
                onClick={handleDownload}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-xs sm:text-sm font-semibold flex items-center space-x-2 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all hover:scale-102"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>

          {/* Quick Snapshot Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 text-xs">
            <div className="space-y-2 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center space-x-2 text-indigo-400 font-bold font-mono">
                <Brain className="w-4 h-4" />
                <span>CORE KNOWLEDGE</span>
              </div>
              <p className="font-semibold text-white">Full-Stack & Applied AI Knowledge</p>
              <p className="text-slate-400 leading-relaxed">
                Deep architectural understanding of LLM inference, asynchronous microservices, modern React 19 / Next.js, and zero-trust security.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center space-x-2 text-cyan-400 font-bold font-mono">
                <GraduationCap className="w-4 h-4" />
                <span>EDUCATION</span>
              </div>
              <p className="font-semibold text-white">Bachelor of Computer Applications (BCA)</p>
              <p className="text-slate-400 leading-relaxed">
                First Class with Distinction. Focused on software development, database systems, web technologies, and algorithms.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold font-mono">
                <Award className="w-4 h-4" />
                <span>CERTIFICATIONS</span>
              </div>
              <p className="font-semibold text-white">Industry Credentials</p>
              <p className="text-slate-400 leading-relaxed">
                AWS Solutions Architect, Deep Learning Specialization, and Google Cloud Data Engineering.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Interactive PDF / Document Viewer Modal */}
      {isViewerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-dark-950/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl glass-panel border border-slate-700 bg-dark-900/95 shadow-2xl p-6 sm:p-8 space-y-6">
            
            {/* Modal Controls */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">Resume Document Preview</h3>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDownload}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                  title="Print / Save PDF"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsViewerOpen(false)}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Paper Document Preview Simulation */}
            <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 text-slate-200 font-sans space-y-6">
              
              <div className="border-b border-slate-800 pb-5">
                <h2 className="text-2xl font-black text-white tracking-wide uppercase">
                  RAHUL THAKUR
                </h2>
                <p className="text-sm text-cyan-400 font-mono mt-0.5">
                  Software Engineer • AI/ML • Full-Stack Developer
                </p>
                <p className="text-xs text-slate-400 mt-2 font-mono">
                  Email: {PERSONAL_INFO.email} | Location: Bangalore, India | Portfolio: Live Verified
                </p>
              </div>

              {/* Summary */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
                  Professional Profile
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {PERSONAL_INFO.aboutDetailed}
                </p>
              </div>

              {/* Key Skills */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
                  Core Technical Matrix
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  <div><strong>Frontend:</strong> React, Next.js 15, TypeScript, Tailwind, WebSockets</div>
                  <div><strong>Backend:</strong> Python, FastAPI, Node.js, REST APIs, Microservices</div>
                  <div><strong>AI & Machine Learning:</strong> PyTorch, Deep Learning, Gemini API, RAG</div>
                  <div><strong>Database & Tools:</strong> MongoDB, MySQL, Docker, Git</div>
                </div>
              </div>

              {/* Applied Knowledge & Technical Milestones */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
                  Applied Knowledge & Engineering Milestones
                </h4>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-white">
                    <span>Applied AI & Autonomous Agent Architecture</span>
                    <span className="font-mono text-cyan-400">2025 - 2026</span>
                  </div>
                  <p className="text-xs text-slate-400">Advanced Systems Exploration & Production Projects</p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Practical knowledge of continuous batching, PagedAttention KV caches, and multimodal diagnostic models. Engineered sub-second inference pipelines with FastAPI and Google Gemini API.
                  </p>
                </div>

                <div className="space-y-1 pt-2">
                  <div className="flex justify-between text-xs font-bold text-white">
                    <span>Full-Stack Web & Distributed Systems Engineering</span>
                    <span className="font-mono text-cyan-400">2024 - 2025</span>
                  </div>
                  <p className="text-xs text-slate-400">Hands-on Architecture & Implementation</p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Designed reactive Next.js 15 applications with WebSockets synchronization, Redis caching layers, and database optimization.
                  </p>
                </div>
              </div>

              {/* Education */}
              <div className="space-y-1 pt-2 border-t border-slate-800">
                <div className="flex justify-between text-xs font-bold text-white">
                  <span>Bachelor of Computer Applications (BCA)</span>
                  <span className="font-mono text-cyan-400">Computer Science & Applications</span>
                </div>
                <p className="text-xs text-slate-400">Graduated with First Class Distinction</p>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
}
