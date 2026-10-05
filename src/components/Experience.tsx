'use client';

import React, { useState } from 'react';
import { Brain, GraduationCap, Trophy, Award, Rocket, Code2, Sparkles, Calendar, Shield, BookOpen } from 'lucide-react';
import { TIMELINE } from '@/lib/data';
import { TimelineItem } from '@/lib/types';

export default function Experience() {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Knowledge', 'Projects', 'Research', 'Achievements', 'Certifications', 'Education'];

  const filteredTimeline = TIMELINE.filter(
    (item) => activeFilter === 'All' || item.category === activeFilter
  );

  const getTimelineIcon = (category: TimelineItem['category']) => {
    switch (category) {
      case 'Knowledge':
        return <Brain className="w-4 h-4 text-cyan-400" />;
      case 'Projects':
        return <Code2 className="w-4 h-4 text-purple-400" />;
      case 'Research':
        return <Shield className="w-4 h-4 text-indigo-400" />;
      case 'Achievements':
        return <Trophy className="w-4 h-4 text-amber-400" />;
      case 'Certifications':
        return <Award className="w-4 h-4 text-emerald-400" />;
      case 'Education':
        return <GraduationCap className="w-4 h-4 text-sky-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden border-t border-slate-900 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono tracking-wider uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Technical Foundations & Progression</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Journey & <span className="text-gradient-primary">Knowledge</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            A progression of deep self-driven learning, core computer science principles, applied AI architectures, and verified credentials.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Central Vertical Glowing Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-indigo-500 via-cyan-500 to-purple-500 opacity-30 transform -translate-x-1/2 hidden sm:block" />
          <div className="absolute left-6 top-4 bottom-4 w-[2px] bg-indigo-500/30 sm:hidden" />

          {/* Timeline Nodes */}
          <div className="space-y-10 sm:space-y-12">
            {filteredTimeline.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Badge */}
                  <div className="absolute left-6 sm:left-1/2 transform -translate-x-1/2 w-9 h-9 rounded-full bg-slate-900 border-2 border-indigo-500/60 flex items-center justify-center shadow-lg shadow-indigo-500/20 z-10 shrink-0">
                    {getTimelineIcon(item.category)}
                  </div>

                  {/* Spacer for alternate layout on Desktop */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Content Card */}
                  <div className="w-full sm:w-1/2 pl-14 sm:pl-0 sm:px-8">
                    <div className="glass-card rounded-2xl p-6 border border-slate-800/90 hover:border-slate-700 transition-all duration-300 relative group">
                      
                      {/* Top Bar with Category & Year */}
                      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                        <div className="flex items-center space-x-2">
                          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-slate-900 text-cyan-400 border border-slate-800">
                            {item.category}
                          </span>
                          {item.badge && (
                            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-500/30">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-1 text-xs font-mono text-slate-400">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          <span>{item.year}</span>
                        </div>
                      </div>

                      {/* Title & Organization */}
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs font-medium text-indigo-400 mt-0.5">
                        {item.organization} • <span className="text-slate-400">{item.subtitle}</span>
                      </p>

                      {/* Description */}
                      <p className="text-xs text-slate-300/90 leading-relaxed mt-3">
                        {item.description}
                      </p>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-4 mt-3 border-t border-slate-800/60">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-0.5 rounded text-[11px] font-mono text-slate-400 bg-slate-900/80 border border-slate-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
