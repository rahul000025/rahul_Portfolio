'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Sparkles, MessageSquare, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/data';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    reason: 'Full-Time Opportunity' as const,
    message: '',
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const reasons = [
    'Full-Time Opportunity',
    'Internship Opportunity',
    'Contract / Project',
    'Technical Collaboration',
    'General Inquiry',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    setStatus('loading');
    setFeedbackMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch message');
      }

      setStatus('success');
      setFeedbackMessage("Thanks! Your message has been received.");
      setFormData({
        name: '',
        email: '',
        subject: '',
        reason: 'Full-Time Opportunity',
        message: '',
        honeypot: '',
      });
    } catch (err: any) {
      setStatus('error');
      setFeedbackMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden border-t border-slate-900 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono tracking-wider uppercase">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Communication</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let&apos;s Build Something <span className="text-gradient-primary">Exceptional</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Whether you have a breakthrough AI initiative, high-concurrency architecture to scale, or an exciting career opportunity, my inbox is open.
          </p>
        </div>

        {/* Contact Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Get in Touch Directly
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                I prioritize responding to engineering queries, architectural inquiries, and serious project collaborations within 24 business hours.
              </p>

              {/* Contact Channels */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-cyan-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 uppercase">Direct Email</span>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-xs sm:text-sm font-semibold text-white hover:text-cyan-400 block transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-indigo-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 uppercase">Location & Timezone</span>
                    <p className="text-xs sm:text-sm font-semibold text-white">
                      {PERSONAL_INFO.location} <span className="text-slate-400 font-normal">(IST / UTC+5:30)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-emerald-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 uppercase">Typical Response Time</span>
                    <p className="text-xs sm:text-sm font-semibold text-emerald-400">
                      &lt; 12 Hours for Tech Inquiries
                    </p>
                  </div>
                </div>
              </div>

              {/* Security & Spam Guarantee */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-400 space-y-1">
                <div className="flex items-center space-x-2 text-slate-300 font-medium font-mono text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>SECURE DISPATCH & ENCRYPTION</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-500">
                  All transmissions are sanitized, rate-limited, and sent directly to the owner&apos;s authenticated admin vault.
                </p>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative">
              
              <h3 className="text-lg font-bold text-white mb-6 flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>Send a Direct Inquiry</span>
              </h3>

              {/* Success Feedback Alert */}
              {status === 'success' && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-start space-x-3 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold">Thanks! Your message has been received.</p>
                    <p className="text-xs text-emerald-400/80 mt-0.5">
                      Your inquiry has been cataloged in Rahul&apos;s admin dashboard and dispatched for immediate review.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Feedback Alert */}
              {status === 'error' && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-300 flex items-start space-x-3 animate-in fade-in">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold">Submission error</p>
                    <p className="text-xs text-rose-400/80 mt-0.5">{feedbackMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field for bot mitigation */}
                <input
                  type="text"
                  name="website_honey"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>
                </div>

                {/* Reason for Contacting Select */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                    Reason for Contacting *
                  </label>
                  <select
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  >
                    {reasons.map((r) => (
                      <option key={r} value={r} className="bg-slate-900 text-white">
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Brief overview of your proposal or discussion"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe the opportunity, project requirements, timeline, or discussion topic..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <span>Sending your inquiry...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
