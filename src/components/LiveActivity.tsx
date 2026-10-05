'use client';

import React, { useState, useEffect } from 'react';
import { FolderGit2, RefreshCw, Radio } from 'lucide-react';
import { CURRENT_GITHUB_PROJECTS } from '@/lib/data';

export default function LiveActivity() {
  const [projects, setProjects] = useState<string[]>(CURRENT_GITHUB_PROJECTS || ['Voxora-AI']);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchProjects = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/activity');
      if (res.ok) {
        const data = await res.json();
        if (data.projects && Array.isArray(data.projects) && data.projects.length > 0) {
          setProjects(data.projects);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  useEffect(() => {
    fetchProjects();
    const interval = setInterval(fetchProjects, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="activity" className="py-24 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-wider uppercase">
              <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span>Real-Time Stream</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Currently Working <span className="text-gradient-cyan">On</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Job opportunities, internships, and real-world projects in Full-Stack Web Development, Python, AI, and Node.js.
            </p>
          </div>

          {/* Controls: Refresh button + Live badge */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYNC ACTIVE</span>
            </div>

            <button
              onClick={fetchProjects}
              disabled={isRefreshing}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              title="Refresh Activity"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Unique Projects Grid */}
        {projects.length === 0 ? (
          <div className="glass-panel rounded-2xl p-8 sm:p-12 text-center border border-slate-800/80 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 flex items-center justify-center mx-auto mb-4">
              <FolderGit2 className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">No active projects</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Projects currently being worked on through GitHub will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {projects.map((projectName) => (
              <div
                key={projectName}
                className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-800/80 hover:border-slate-700 transition-all flex items-center space-x-4 group"
              >
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 shrink-0 group-hover:border-cyan-500/40 transition-colors">
                  <FolderGit2 className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight truncate">
                    {projectName}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
