'use client';

import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, Tag, ArrowUpRight, X, Sparkles, Share2 } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/data';
import { BlogPost } from '@/lib/types';

export default function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);

  const categories = [
    'All',
    'AI',
    'Software Engineering',
    'Distributed Systems',
    'Hardware & Systems',
    'Web Development',
    'Cybersecurity',
  ];

  const filteredPosts = BLOG_POSTS.filter(
    (post) => selectedCategory === 'All' || post.category === selectedCategory
  );

  return (
    <section id="blog" className="py-24 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono tracking-wider uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Technical Insights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering <span className="text-gradient-primary">Articles</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Architectural teardowns, machine learning systems benchmarks, zero-trust security audits, and modern web patterns.
          </p>
        </div>

        {/* Categories */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setReadingPost(post)}
              className="glass-card rounded-3xl overflow-hidden border border-slate-800/80 hover:border-slate-700 cursor-pointer flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Cover Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-dark-950/80 backdrop-blur-md text-cyan-400 border border-white/10">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-3 text-xs text-slate-500 font-mono">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readingTime}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug flex items-start justify-between gap-2">
                    <span>{post.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 py-3.5 border-t border-slate-800/60 bg-slate-950/40 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 flex items-center justify-between">
                <span>Read Full Analysis</span>
                <span className="text-slate-500 group-hover:text-cyan-400">→</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {readingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-dark-950/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel border border-slate-700 bg-dark-900/95 shadow-2xl p-6 sm:p-10 space-y-6">
            
            <button
              onClick={() => setReadingPost(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {readingPost.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {readingPost.title}
              </h2>
              <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
                <span>By Rahul Thakur</span>
                <span>•</span>
                <span>{readingPost.date}</span>
                <span>•</span>
                <span>{readingPost.readingTime}</span>
              </div>
            </div>

            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={readingPost.coverImage}
                alt={readingPost.title}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Markdown/Formatted text */}
            <div className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed space-y-4">
              <p className="text-base text-slate-200 font-medium italic border-l-2 border-cyan-400 pl-4 py-1">
                {readingPost.excerpt}
              </p>
              
              <div className="whitespace-pre-line text-slate-300 leading-relaxed font-sans">
                {readingPost.content}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
              <div className="flex flex-wrap gap-2">
                {readingPost.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    #{t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setReadingPost(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-700"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
