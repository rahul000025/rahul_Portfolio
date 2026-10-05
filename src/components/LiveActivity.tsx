'use client';

import React, { useState, useEffect } from 'react';
import { Activity, GitCommit, FolderGit2, Mail, Eye, Share2, Send, RefreshCw, Radio, CheckCircle2, ExternalLink } from 'lucide-react';
import { ActivityItem } from '@/lib/types';
import { INITIAL_ACTIVITIES } from '@/lib/data';

export default function LiveActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const fetchActivities = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/activity');
      if (res.ok) {
        const data = await res.json();
        if (data.activities) {
          setActivities(data.activities);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  useEffect(() => {
    fetchActivities();
    const interval = setInterval(fetchActivities, 20000);
    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'github_commit':
        return <GitCommit className="w-4 h-4 text-cyan-400" />;
      case 'github_repo':
        return <FolderGit2 className="w-4 h-4 text-violet-400" />;
      case 'contact_request':
        return <Mail className="w-4 h-4 text-emerald-400" />;
      case 'portfolio_view':
        return <Eye className="w-4 h-4 text-amber-400" />;
      case 'social_event':
        return <Share2 className="w-4 h-4 text-blue-400" />;
      case 'newsletter':
        return <Send className="w-4 h-4 text-pink-400" />;
      default:
        return <Activity className="w-4 h-4 text-slate-400" />;
    }
  };

  const filteredActivities = activities.filter((act) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'GitHub') return act.type === 'github_commit' || act.type === 'github_repo';
    if (activeFilter === 'Contact') return act.type === 'contact_request';
    if (activeFilter === 'Telemetry') return act.type === 'portfolio_view' || act.type === 'newsletter';
    return true;
  });

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
              Live <span className="text-gradient-cyan">Activity</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Legitimately connected activity feeds, verified code commits, incoming portfolio inquiries, and deployment events.
            </p>
          </div>

          {/* Controls: Refresh button + Live badge */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYNC ACTIVE</span>
            </div>

            <button
              onClick={fetchActivities}
              disabled={isRefreshing}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              title="Refresh Activity"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
          {['All', 'GitHub', 'Contact', 'Telemetry'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Activity Feed Grid / Timeline */}
        {filteredActivities.length === 0 ? (
          <div className="glass-panel rounded-2xl p-8 sm:p-12 text-center border border-slate-800/80 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 flex items-center justify-center mx-auto mb-4">
              <Activity className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">No live activity events yet</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Real-time repository commits, project deployments, and direct inquiries will stream here automatically once initiated.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredActivities.map((item) => (
              <div
                key={item.id}
                className="glass-card rounded-2xl p-5 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                        {getActivityIcon(item.type)}
                      </div>
                      <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider">
                        {item.source}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-slate-500 whitespace-nowrap">
                      {item.timestamp}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {item.url && (
                  <div className="pt-3 border-t border-slate-800/60 flex justify-end">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                    >
                      <span>View upstream</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
