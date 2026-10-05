'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowDown, ExternalLink, Github, Linkedin, Facebook, Twitter, Instagram, Sparkles, Terminal, Copy, Check, Code2, Cpu, Globe2, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/data';

export default function Hero() {
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [activeTab, setActiveTab] = useState<'engineer' | 'architecture' | 'ai'>('engineer');

  const copyCode = () => {
    const code = `// Rahul Thakur - Software Engineer & AI Practitioner
const engineer = {
  name: "Rahul Thakur",
  title: "Software Engineer • AI/ML • Full-Stack Developer",
  coreFocus: ["Distributed Systems", "LLM Inference", "Zero-Trust Security"],
  mission: "I build intelligent, scalable and beautifully engineered digital experiences.",
  availability: "Available for high-impact opportunities"
};`;
    navigator.clipboard.writeText(code);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-7">
            
            {/* Live Availability Badge */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-inner">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-slate-300">
                ● Available for opportunities
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-[11px] font-mono text-cyan-400">Bangalore, IN</span>
            </div>

            {/* Profile Heading & Title */}
            <div className="space-y-3">
              <div className="flex items-center justify-center lg:justify-start space-x-3 mb-1">
                <span className="text-xs uppercase tracking-widest font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-md border border-indigo-500/20">
                  Senior Engineering Portfolio
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                RAHUL <span className="text-gradient-primary">THAKUR</span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-cyan-300/90 tracking-wide font-mono">
                {PERSONAL_INFO.title}
              </p>
            </div>

            {/* Short Premium Introduction */}
            <p className="text-base sm:text-lg text-slate-300/90 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-normal">
              &ldquo;{PERSONAL_INFO.bioHeadline}&rdquo;
            </p>

            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Specialized in scalable full-stack applications, resilient distributed backend systems, and cutting-edge AI/ML integrations designed for extreme reliability and peak performance.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 group"
              >
                <span>View My Work</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 hover:text-white hover:border-slate-500 font-semibold text-sm transition-all flex items-center justify-center space-x-2 hover:bg-slate-800"
              >
                <span>Let&apos;s Connect</span>
                <span className="text-cyan-400 text-xs">→</span>
              </a>
            </div>

            {/* Social Icons Bar */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-500">
                Verified Socials:
              </span>
              <div className="flex items-center space-x-2.5">
                {/* GitHub */}
                <a
                  href={PERSONAL_INFO.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 hover:bg-slate-800/80 transition-all"
                >
                  <Github className="w-4 h-4" />
                </a>

                {/* LinkedIn */}
                <a
                  href={PERSONAL_INFO.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-sky-400 hover:border-sky-500/40 hover:bg-slate-800/80 transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                {/* X / Twitter */}
                <a
                  href={PERSONAL_INFO.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X / Twitter Profile"
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 hover:bg-slate-800/80 transition-all"
                >
                  <Twitter className="w-4 h-4" />
                </a>

                {/* Facebook */}
                <a
                  href={PERSONAL_INFO.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Profile"
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/40 hover:bg-slate-800/80 transition-all"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                {/* Instagram */}
                <a
                  href={PERSONAL_INFO.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-pink-400 hover:border-pink-500/40 hover:bg-slate-800/80 transition-all"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Profile Card + Interactive Code Terminal */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Visual Glassmorphic Developer Card */}
            <div className="w-full max-w-md rounded-2xl glass-panel p-5 relative border border-slate-700/60 shadow-2xl overflow-hidden group">
              
              {/* Subtle top decorative bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400" />

              {/* Developer Header Profile */}
              <div className="flex items-center space-x-4 mb-5">
                <div className="relative">
                  {/* Profile Photo Avatar with Glowing Edge */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[2px] shadow-lg shadow-indigo-500/20">
                    <div className="w-full h-full bg-slate-900 rounded-[14px] overflow-hidden flex items-center justify-center relative">
                      {/* Avatar Image representation */}
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                        alt="Rahul Thakur"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center" title="Online & Available">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold text-white tracking-tight truncate">
                      Rahul Thakur
                    </h2>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
                      v2.6 Prod
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    Lead Systems & AI Developer
                  </p>
                  <p className="text-[11px] text-indigo-400/90 font-mono mt-0.5">
                    @rahulthakur-dev
                  </p>
                </div>
              </div>

              {/* Interactive Code Terminal */}
              <div className="rounded-xl bg-slate-950 border border-slate-800/90 overflow-hidden font-mono text-xs">
                {/* Terminal titlebar */}
                <div className="px-3.5 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="text-[11px] text-slate-400 ml-2 font-sans font-medium">
                      profile.config.ts
                    </span>
                  </div>

                  <button
                    onClick={copyCode}
                    className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                    title="Copy code"
                  >
                    {copiedSnippet ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Terminal Tabs */}
                <div className="flex border-b border-slate-800/70 bg-slate-900/40 text-[11px]">
                  <button
                    onClick={() => setActiveTab('engineer')}
                    className={`px-3 py-1.5 transition-colors border-r border-slate-800 ${
                      activeTab === 'engineer'
                        ? 'bg-slate-950 text-cyan-300 border-b-2 border-b-cyan-400 font-medium'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    engineer.ts
                  </button>
                  <button
                    onClick={() => setActiveTab('architecture')}
                    className={`px-3 py-1.5 transition-colors border-r border-slate-800 ${
                      activeTab === 'architecture'
                        ? 'bg-slate-950 text-cyan-300 border-b-2 border-b-cyan-400 font-medium'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    stack.json
                  </button>
                  <button
                    onClick={() => setActiveTab('ai')}
                    className={`px-3 py-1.5 transition-colors ${
                      activeTab === 'ai'
                        ? 'bg-slate-950 text-cyan-300 border-b-2 border-b-cyan-400 font-medium'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    ai_runtime.py
                  </button>
                </div>

                {/* Code Contents */}
                <div className="p-3.5 text-slate-300 leading-relaxed text-[11px] overflow-x-auto min-h-[160px]">
                  {activeTab === 'engineer' && (
                    <div>
                      <p><span className="text-purple-400">const</span> engineer = &#123;</p>
                      <p className="pl-4">name: <span className="text-emerald-300">&quot;Rahul Thakur&quot;</span>,</p>
                      <p className="pl-4">role: <span className="text-emerald-300">&quot;Software Engineer&quot;</span>,</p>
                      <p className="pl-4">focus: [<span className="text-amber-300">&quot;Full-Stack&quot;</span>, <span className="text-amber-300">&quot;AI/ML&quot;</span>, <span className="text-amber-300">&quot;Cybersecurity&quot;</span>],</p>
                      <p className="pl-4">status: <span className="text-emerald-400">&quot;Available for opportunities&quot;</span>,</p>
                      <p className="pl-4">builds: <span className="text-cyan-300">&quot;Intelligent & Scalable Systems&quot;</span></p>
                      <p>&#125;;</p>
                    </div>
                  )}

                  {activeTab === 'architecture' && (
                    <div>
                      <p><span className="text-slate-500">&#47;&#47; High Concurrency Architecture</span></p>
                      <p>&#123;</p>
                      <p className="pl-4"><span className="text-cyan-400">&quot;frontend&quot;</span>: <span className="text-amber-300">&quot;Next.js 15, TypeScript, Tailwind&quot;</span>,</p>
                      <p className="pl-4"><span className="text-cyan-400">&quot;backend&quot;</span>: <span className="text-amber-300">&quot;FastAPI, Node.js, Python, REST&quot;</span>,</p>
                      <p className="pl-4"><span className="text-cyan-400">&quot;database&quot;</span>: <span className="text-amber-300">&quot;PostgreSQL, MongoDB, Redis&quot;</span>,</p>
                      <p className="pl-4"><span className="text-cyan-400">&quot;security&quot;</span>: <span className="text-emerald-400">&quot;Zero-Trust, mTLS, Rate-Limited&quot;</span></p>
                      <p>&#125;</p>
                    </div>
                  )}

                  {activeTab === 'ai' && (
                    <div>
                      <p><span className="text-purple-400">from</span> gemini <span className="text-purple-400">import</span> ModelEngine</p>
                      <p><span className="text-purple-400">import</span> torch, asyncio</p>
                      <p className="mt-1"><span className="text-purple-400">async def</span> <span className="text-blue-400">stream_inference</span>(prompt):</p>
                      <p className="pl-4">agent = ModelEngine(mode=<span className="text-emerald-300">&quot;multimodal&quot;</span>)</p>
                      <p className="pl-4"><span className="text-purple-400">return await</span> agent.generate_stream(prompt)</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Spec Badges */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-center">
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="block text-[10px] text-slate-500 font-mono">LATENCY</span>
                  <span className="text-xs font-bold text-cyan-400">&lt; 15ms</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="block text-[10px] text-slate-500 font-mono">ACCURACY</span>
                  <span className="text-xs font-bold text-indigo-400">99.1%</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="block text-[10px] text-slate-500 font-mono">AVAILABILITY</span>
                  <span className="text-xs font-bold text-emerald-400">99.99%</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
