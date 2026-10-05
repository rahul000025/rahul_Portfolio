'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, FileText, Lock, Sparkles, Terminal } from 'lucide-react';
import NotificationCenter from './NotificationCenter';
import { PERSONAL_INFO } from '@/lib/data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Tech Stack", href: "#tech-stack" },
    { label: "Projects", href: "#projects" },
    { label: "Knowledge", href: "#experience" },
    { label: "Live Activity", href: "#activity" },
    { label: "Insights", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-950/80 backdrop-blur-xl border-b border-white/[0.07] py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Monogram */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
              <div className="w-full h-full bg-dark-950 rounded-[11px] flex items-center justify-center">
                <span className="font-mono font-bold text-sm tracking-tighter text-white group-hover:text-cyan-300 transition-colors">
                  RT
                </span>
              </div>
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base tracking-tight text-white flex items-center space-x-2">
                <span>{PERSONAL_INFO.name}</span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider hidden sm:block">
                SOFTWARE ENGINEER
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 rounded-full px-4 py-1.5 bg-slate-900/60 border border-white/[0.08] backdrop-blur-md">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-all"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* Live Status Badge */}
            <div className="hidden xl:flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available</span>
            </div>

            {/* Notification Bell */}
            <NotificationCenter />

            {/* Resume Button */}
            <a
              href="#resume"
              className="hidden md:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs font-medium text-slate-200 hover:text-white hover:border-slate-600 transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume</span>
            </a>

            {/* Admin Dashboard Link */}
            <Link
              href="/admin"
              className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 text-slate-400 hover:text-indigo-300 transition-all"
              title="Admin Portal"
            >
              <Lock className="w-4 h-4" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 border-b border-slate-800 bg-dark-950/95 backdrop-blur-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1.5 py-2">
            <div className="px-3 py-2 mb-2 flex items-center justify-between rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 text-xs">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for opportunities</span>
              </span>
              <span className="font-mono text-[10px] text-emerald-500">Active</span>
            </div>

            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-900/80 transition-colors"
              >
                {item.label}
              </a>
            ))}

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <a
                href="#resume"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 mr-2 text-center py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-200"
              >
                View Resume
              </a>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-4 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-xs font-medium text-indigo-300"
              >
                Admin Area
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
