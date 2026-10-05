'use client';

import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Cpu, Layers, AlertCircle, ArrowUpRight, ShieldCheck, Activity } from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-dark-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl glass-panel border border-slate-700/80 bg-dark-900/95 shadow-2xl p-6 sm:p-8 space-y-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors z-20"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {project.category}
            </span>
            {project.stats && (
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {project.stats.label}: {project.stats.metric}
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {project.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Hero Image / Screenshot */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner group">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <span className="text-xs font-mono text-white/80 bg-slate-900/80 px-2.5 py-1 rounded-md border border-white/10">
              Production Architecture
            </span>
            <span className="text-xs font-mono text-cyan-300 bg-slate-900/80 px-2.5 py-1 rounded-md border border-white/10">
              Verified Implementation
            </span>
          </div>
        </div>

        {/* Action Links Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold text-xs sm:text-sm flex items-center space-x-2 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all hover:scale-102"
          >
            <span>Live Demonstration</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-slate-500 font-semibold text-xs sm:text-sm flex items-center space-x-2 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>View Source Code</span>
          </a>
        </div>

        {/* Detailed Breakdown: Problem & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-rose-950/40">
            <div className="flex items-center space-x-2 text-rose-400 font-semibold text-xs uppercase tracking-wider mb-2 font-mono">
              <AlertCircle className="w-4 h-4" />
              <span>Problem Statement</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/60 border border-emerald-950/40">
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-2 font-mono">
              <CheckCircle2 className="w-4 h-4" />
              <span>Architected Solution</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Architecture Section */}
        <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider mb-2 font-mono">
            <Cpu className="w-4 h-4" />
            <span>Systems Architecture & Dataflow</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
            {project.architecture}
          </p>
        </div>

        {/* Key Features Checklist */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-slate-300">
            Core Features & Performance Highlights:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-200"
              >
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack Tags */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Technologies & Frameworks Employed:
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-900 text-slate-300 border border-slate-800"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
