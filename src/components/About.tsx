'use client';

import React from 'react';
import { Brain, Layers, Shield, Cloud, Cpu, Sparkles, CheckCircle2, Award, Code2, Rocket } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/data';

export default function About() {
  const interestIcons = {
    Brain: <Brain className="w-5 h-5 text-purple-400" />,
    Layers: <Layers className="w-5 h-5 text-cyan-400" />,
    Shield: <Shield className="w-5 h-5 text-emerald-400" />,
    Cloud: <Cloud className="w-5 h-5 text-indigo-400" />,
    Cpu: <Cpu className="w-5 h-5 text-amber-400" />,
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineer Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About <span className="text-gradient-primary">Rahul Thakur</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Bridging cutting-edge artificial intelligence models with resilient software architectures to build transformative digital experiences.
          </p>
        </div>

        {/* Top Grid: Bio Card + Highlighted Specializations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left Column: Image & Personal Snapshot */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 flex-1 flex flex-col justify-between border border-slate-800 shadow-xl relative overflow-hidden">
              
              {/* Profile Image with subtle ring */}
              <div className="relative mb-6">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/80 relative group">
                  <img
                    src="/rahul.jpg"
                    alt="Rahul Thakur - Software Engineer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-300">
                    <span className="px-2 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10">
                      Software Engineer
                    </span>
                    <span className="px-2 py-1 rounded bg-emerald-950/80 text-emerald-400 backdrop-blur-md border border-emerald-500/30">
                      Open to Impact Roles
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio summary */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  High-Performance Software & Machine Learning
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {PERSONAL_INFO.aboutDetailed}
                </p>
                
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-cyan-400 border border-slate-800">
                    #FullStack
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-indigo-400 border border-slate-800">
                    #MachineLearning
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-purple-400 border border-slate-800">
                    #Cybersecurity
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800">
                    #CloudDevOps
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: 5 Core Engineering Interests */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="space-y-3.5">
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
                <Code2 className="w-5 h-5 text-indigo-400" />
                <span>Primary Technical Focus Areas</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Core engineering disciplines where I architect, innovate, and deploy production systems:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 flex-1">
              {PERSONAL_INFO.interests.map((item, idx) => (
                <div
                  key={item.name}
                  className={`glass-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between border border-slate-800/80 hover:border-slate-700 transition-all ${
                    idx === 0 ? 'sm:col-span-2 bg-slate-900/40 border-indigo-500/20' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3.5 mb-2">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                      {interestIcons[item.icon as keyof typeof interestIcons] || <Sparkles className="w-5 h-5 text-cyan-400" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white tracking-wide">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-800/50 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>STATUS: ACTIVE</span>
                    <span className="text-cyan-400">Production-Ready</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Core Pillars / Competency Highlights Row (Numerical stats removed per requirement) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Projects Completed */}
          <div className="glass-card rounded-2xl p-6 text-center border border-slate-800 hover:border-indigo-500/30 transition-all flex flex-col items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-3">
              <Rocket className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Projects Completed
              </h4>
              <p className="text-xs text-indigo-400 font-medium mt-1">
                Engineered & Deployed
              </p>
              <p className="text-[11px] text-slate-500 font-mono mt-1">Open Source & Web Systems</p>
            </div>
          </div>

          {/* Technologies Mastered */}
          <div className="glass-card rounded-2xl p-6 text-center border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-3">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Technologies Mastered
              </h4>
              <p className="text-xs text-cyan-400 font-medium mt-1">
                Full-Stack & AI Stack
              </p>
              <p className="text-[11px] text-slate-500 font-mono mt-1">Modern Web & Data Tools</p>
            </div>
          </div>

          {/* Learning & Practice */}
          <div className="glass-card rounded-2xl p-6 text-center border border-slate-800 hover:border-purple-500/30 transition-all flex flex-col items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-3">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Learning & Practice
              </h4>
              <p className="text-xs text-purple-400 font-medium mt-1">
                Continuous Exploration
              </p>
              <p className="text-[11px] text-slate-500 font-mono mt-1">Deep Systems & AI Study</p>
            </div>
          </div>

          {/* Certifications */}
          <div className="glass-card rounded-2xl p-6 text-center border border-slate-800 hover:border-emerald-500/30 transition-all flex flex-col items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Certifications
              </h4>
              <p className="text-xs text-emerald-400 font-medium mt-1">
                Verified Credentials
              </p>
              <p className="text-[11px] text-slate-500 font-mono mt-1">Cloud, AI & Systems</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
