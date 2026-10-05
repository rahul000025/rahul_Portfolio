'use client';

import React, { useState } from 'react';
import { ExternalLink, Github, Sparkles, ArrowUpRight, FolderGit2, CheckCircle2, Eye } from 'lucide-react';
import { PROJECTS } from '@/lib/data';
import { Project, Category } from '@/lib/types';
import ProjectModal from './ProjectModal';

export default function FeaturedProjects() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories: Category[] = [
    'All',
    'AI/ML',
    'Web Development',
    'Cybersecurity',
    'Software Engineering',
  ];

  const filteredProjects = PROJECTS.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  const handleOpenProject = async (project: Project) => {
    setActiveProject(project);
    // Record view in activity log
    try {
      fetch('/api/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'portfolio_view',
          title: `Project inspected: ${project.title}`,
          description: `User opened deep architecture specifications for ${project.title}.`,
          icon: 'Eye',
          source: 'Interactive Portfolio Showcase',
        }),
      }).catch(() => {});
    } catch (e) {
      // Ignore
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono tracking-wider uppercase">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Engineered Systems</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured <span className="text-gradient-primary">Projects</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Enterprise platforms, distributed architectures, and machine learning models engineered for real-world reliability and scale.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-500/20 scale-105'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{cat}</span>
              <span className="ml-1.5 text-[11px] opacity-70 font-mono">
                ({cat === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.category === cat).length})
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleOpenProject(project)}
              className="glass-card rounded-3xl overflow-hidden border border-slate-800/80 hover:border-slate-700 cursor-pointer flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/10"
            >
              <div>
                {/* Project Image Preview */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-950/20 to-transparent" />
                  
                  {/* Category Pill on Image */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-dark-950/80 backdrop-blur-md text-cyan-400 border border-white/10 shadow-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Stats Tag */}
                  {project.stats && (
                    <div className="absolute bottom-3.5 right-3.5">
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold bg-emerald-950/90 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                        {project.stats.label}: {project.stats.metric}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center space-x-1.5">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300/90 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono text-slate-400 bg-slate-900/90 border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-slate-500 bg-slate-900 border border-slate-800">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer with Buttons */}
              <div
                className="px-6 py-4 border-t border-slate-800/60 bg-slate-950/40 flex items-center justify-between"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => handleOpenProject(project)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Deep Dive Spec</span>
                </button>

                <div className="flex items-center space-x-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View GitHub"
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Live Demo"
                    className="p-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 hover:text-white hover:bg-indigo-600/40 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
