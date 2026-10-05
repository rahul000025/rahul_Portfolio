'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Globe, Terminal, Brain, Server, Database, ShieldCheck } from 'lucide-react';

interface ExpertiseItem {
  id: string;
  title: string;
  category: string;
  content: string;
  highlights: string[];
  focus: string;
  icon: React.ReactNode;
}

const EXPERTISE_AREAS: ExpertiseItem[] = [
  {
    id: 'full-stack',
    title: 'Full-Stack Web Development',
    category: 'Modern Web Architecture',
    content: 'Engineering responsive, high-performance web applications using modern frontend frameworks and robust server-side architectures. Specialized in crafting reactive interfaces, modular component systems, optimized Core Web Vitals, and seamless client-server state synchronization.',
    highlights: ['Next.js 15 & React 19', 'TypeScript', 'Tailwind CSS', 'Responsive UI & UX', 'Client-Server Synchronization'],
    focus: 'Frontend & Full-Stack Systems',
    icon: <Globe className="w-6 h-6 text-indigo-400" />,
  },
  {
    id: 'python',
    title: 'Python Development',
    category: 'Backend & Systems Programming',
    content: 'Writing idiomatic, high-throughput Python backends, automation scripts, and algorithmic data services. Proficient in FastAPI, asynchronous I/O with asyncio, robust type hinting, clean architectural patterns, and performance tuning.',
    highlights: ['FastAPI & AsyncIO', 'Python 3.12+', 'Algorithmic Logic', 'Data Processing', 'Clean Code & Testing'],
    focus: 'Python Software Engineering',
    icon: <Terminal className="w-6 h-6 text-cyan-400" />,
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    category: 'Intelligent Systems & Inference',
    content: 'Implementing machine learning models and modern generative AI integrations to solve practical problems. Experienced in multimodal reasoning with the Google Gemini API, retrieval-augmented generation (RAG), vector embeddings, and computer vision classification.',
    highlights: ['Gemini API', 'RAG & Embeddings', 'Deep Learning', 'Vector Databases', 'Prompt Engineering'],
    focus: 'Applied AI & Machine Learning',
    icon: <Brain className="w-6 h-6 text-purple-400" />,
  },
  {
    id: 'node-backend',
    title: 'Node.js & Backend Development',
    category: 'Scalable Services & Microservices',
    content: 'Designing scalable, event-driven backend services and RESTful APIs using Node.js and Express. Experienced in non-blocking asynchronous I/O patterns, structured logging, middleware security, request rate limiting, and real-time WebSockets.',
    highlights: ['Node.js Runtime', 'Express', 'RESTful Architecture', 'WebSockets', 'Middleware Security'],
    focus: 'Backend Systems & Services',
    icon: <Server className="w-6 h-6 text-emerald-400" />,
  },
  {
    id: 'api-database',
    title: 'API & Database Development',
    category: 'Data Modeling & Schema Design',
    content: 'Architecting robust relational and NoSQL database schemas alongside clean, well-documented REST APIs. Proficient in data modeling, normalization, query optimization, indexing strategies, and transactional consistency with MySQL and MongoDB.',
    highlights: ['MySQL & Relational Design', 'MongoDB & NoSQL', 'REST APIs', 'Query Optimization', 'Schema Modeling'],
    focus: 'Data Layer & API Infrastructure',
    icon: <Database className="w-6 h-6 text-amber-400" />,
  },
  {
    id: 'software-engineering',
    title: 'Software Engineering',
    category: 'Core Computing Principles',
    content: 'Grounding all engineering work in core computer science fundamentals, data structures, algorithms, and SOLID design principles. Dedicated to clean architecture, Git version control workflows, automated testing, and secure system design.',
    highlights: ['Data Structures & Algorithms', 'SOLID Principles', 'System Design', 'Git & GitHub', 'Clean Architecture'],
    focus: 'Core Software Principles',
    icon: <ShieldCheck className="w-6 h-6 text-blue-400" />,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? EXPERTISE_AREAS.length - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === EXPERTISE_AREAS.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const current = EXPERTISE_AREAS[currentIndex];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden border-t border-slate-900 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering <span className="text-gradient-primary">Expertise</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Key engineering capabilities and practical proficiencies across modern full-stack development, applied AI, backend services, and robust systems design.
          </p>
        </div>

        {/* Quick Domain Selector Buttons */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10 max-w-4xl mx-auto">
          {EXPERTISE_AREAS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                currentIndex === idx
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-500/20 border border-indigo-500/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative">
          
          <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden transition-all duration-500">
            
            {/* Top Icon & Category Tag */}
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-inner">
                {current.icon}
              </div>

              <span className="px-3.5 py-1 rounded-full text-xs font-mono bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 font-medium">
                {current.category}
              </span>
            </div>

            {/* Expertise Area Title */}
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
              {current.title}
            </h3>

            {/* Short Content */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-8">
              {current.content}
            </p>

            {/* Highlights / Key Competencies Pills */}
            <div className="space-y-2 mb-8">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                Key Competencies & Technologies
              </span>
              <div className="flex flex-wrap gap-2">
                {current.highlights.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg text-xs font-mono text-cyan-300 bg-slate-900/90 border border-slate-800/90 shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Bar: Focus Badge + Carousel Arrows */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800/80 flex-wrap gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs text-slate-400 font-mono">
                  {current.focus} • Domain <span className="text-white font-semibold">{currentIndex + 1}</span> of {EXPERTISE_AREAS.length}
                </span>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={prev}
                  aria-label="Previous expertise area"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next expertise area"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center space-x-2 mt-6">
            {EXPERTISE_AREAS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to domain ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === i ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
