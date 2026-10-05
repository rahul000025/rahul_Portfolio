'use client';

import React, { useState } from 'react';
import { Github, Linkedin, Facebook, Twitter, Instagram, Share2, Check, ExternalLink, Copy, CheckCircle2, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_INTEGRATIONS } from '@/lib/data';

export default function ConnectSocial() {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(id);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const getPlatformIcon = (id: string) => {
    switch (id) {
      case 'github':
        return <Github className="w-5 h-5 text-white" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5 text-sky-400" />;
      case 'twitter':
        return <Twitter className="w-5 h-5 text-slate-200" />;
      case 'facebook':
        return <Facebook className="w-5 h-5 text-blue-400" />;
      case 'instagram':
        return <Instagram className="w-5 h-5 text-pink-400" />;
      default:
        return <Share2 className="w-5 h-5 text-slate-400" />;
    }
  };

  const getActionLabel = (id: string) => {
    switch (id) {
      case 'github':
        return 'Follow on GitHub';
      case 'linkedin':
        return 'Connect on LinkedIn';
      case 'twitter':
        return 'Follow on X';
      case 'facebook':
        return 'Follow on Facebook';
      case 'instagram':
        return 'Follow on Instagram';
      default:
        return 'Connect';
    }
  };

  return (
    <section id="connect" className="py-24 relative overflow-hidden border-t border-slate-900 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono tracking-wider uppercase">
            <Share2 className="w-3.5 h-3.5" />
            <span>Digital Footprint</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Connect <span className="text-gradient-cyan">With Me</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Follow my open-source code repositories, read technical engineering write-ups, and connect across verified social networks.
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {SOCIAL_INTEGRATIONS.map((platform) => (
            <div
              key={platform.id}
              className="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header with Icon & Verified Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 shadow-inner group-hover:scale-105 transition-transform">
                      {getPlatformIcon(platform.id)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {platform.name}
                        </h3>
                        <span title="Verified Account">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">
                        {platform.username}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                    Live Verified
                  </span>
                </div>

                {/* Available Sync Events */}
                <div className="space-y-1.5 mb-5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                    Supported Activity Feeds:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {platform.availableEvents.map((ev) => (
                      <span
                        key={ev}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                      >
                        {ev}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-800/60 flex items-center space-x-2">
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white hover:border-slate-600 transition-colors flex items-center justify-center space-x-1.5 group-hover:bg-slate-850"
                >
                  <span>{getActionLabel(platform.id)}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <button
                  onClick={() => copyToClipboard(platform.url, platform.id)}
                  title="Copy profile link"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  {copiedUrl === platform.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Notice regarding API-grounded verification */}
        <div className="mt-12 text-center text-xs text-slate-500 max-w-xl mx-auto flex items-center justify-center space-x-2 font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Events are authorized through official developer APIs and platform webhooks.</span>
        </div>

      </div>
    </section>
  );
}
