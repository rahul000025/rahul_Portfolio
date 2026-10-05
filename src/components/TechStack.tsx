'use client';

import React, { useState } from 'react';
import { Layers, Terminal, Sparkles, Database, Wrench, Code2, CheckCircle2, ChevronRight, Laptop, Bot } from 'lucide-react';
import { TECH_STACK } from '@/lib/data';
import { TechItem } from '@/lib/types';

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);

  const categories = ['All', 'Frontend', 'Backend', 'AI/ML', 'Database', 'Tools'];

  const filteredStack = TECH_STACK.filter(
    item => activeCategory === 'All' || item.category === activeCategory
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend':
        return <Layers className="w-4 h-4 text-cyan-400" />;
      case 'Backend':
        return <Terminal className="w-4 h-4 text-emerald-400" />;
      case 'AI/ML':
        return <Bot className="w-4 h-4 text-purple-400" />;
      case 'Database':
        return <Database className="w-4 h-4 text-blue-400" />;
      case 'Tools':
        return <Wrench className="w-4 h-4 text-amber-400" />;
      default:
        return <Code2 className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <section id="tech-stack" className="py-24 relative overflow-hidden border-t border-slate-900 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-wider uppercase">
            <Code2 className="w-3.5 h-3.5" />
            <span>Core Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical <span className="text-gradient-cyan">Stack & Tooling</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            A comprehensive matrix of battle-tested languages, frameworks, AI architectures, and infrastructure platforms.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-500/20 scale-105'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat !== 'All' && getCategoryIcon(cat)}
              <span>{cat}</span>
              <span className="text-[11px] opacity-70 font-mono">
                ({cat === 'All' ? TECH_STACK.length : TECH_STACK.filter(t => t.category === cat).length})
              </span>
            </button>
          ))}
        </div>

        {/* Tech Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredStack.map((item) => (
            <div
              key={item.name}
              onClick={() => setSelectedTech(item)}
              className="glass-card rounded-2xl p-5 border border-slate-800/80 hover:border-slate-700 cursor-pointer flex flex-col justify-between group relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              {/* Subtle accent indicator */}
              <div
                className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 blur-xl group-hover:opacity-25 transition-opacity"
                style={{ backgroundColor: item.color }}
              />

              <div>
                <div className="flex items-start justify-between mb-3.5">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-sm shadow-inner group-hover:border-slate-700 transition-colors"
                      style={{ color: item.color }}
                    >
                      {item.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-500 block uppercase">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    {item.experience}
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Proficiency Bar */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-500">Proficiency</span>
                  <span className="text-slate-300 font-semibold">{item.level}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${item.level}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Tech Insight Banner */}
        <div className="mt-14 p-6 rounded-2xl glass-panel border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Full-Cycle Architectural Delivery</h4>
              <p className="text-xs text-slate-400">
                From low-level data structure design and model inference to responsive client frontends and zero-downtime CI/CD deployment.
              </p>
            </div>
          </div>
          <a
            href="#projects"
            className="shrink-0 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white hover:border-slate-600 transition-colors flex items-center space-x-1.5"
          >
            <span>Explore Implementations</span>
            <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
          </a>
        </div>

      </div>
    </section>
  );
}
