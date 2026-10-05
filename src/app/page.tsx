'use client';

import React from 'react';
import BackgroundEffects from '@/components/BackgroundEffects';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import TechStack from '@/components/TechStack';
import FeaturedProjects from '@/components/FeaturedProjects';
import Experience from '@/components/Experience';
import LiveActivity from '@/components/LiveActivity';
import ResumeSection from '@/components/ResumeSection';
import BlogSection from '@/components/BlogSection';
import Testimonials from '@/components/Testimonials';
import ConnectSocial from '@/components/ConnectSocial';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-dark-950 text-slate-100 overflow-x-hidden">
      {/* Dynamic Background Effects: Particle Canvas, Moving Grid, Glows */}
      <BackgroundEffects />

      {/* Futuristic Sticky Navbar with Live Notification Center */}
      <Navbar />

      {/* 1. Full-Screen Hero / Landing Section */}
      <Hero />

      {/* 2. Interactive About Me with Animated Statistics */}
      <About />

      {/* 3. Interactive Tech Stack Matrix */}
      <TechStack />

      {/* 4. Featured Projects with Deep-Dive Modal */}
      <FeaturedProjects />

      {/* 5. Journey & Knowledge Vertical Timeline */}
      <Experience />

      {/* 6. Live Activity Dashboard Stream */}
      <LiveActivity />

      {/* 7. Resume Showcase & Modern PDF Viewer */}
      <ResumeSection />

      {/* 8. Blog & Engineering Insights */}
      <BlogSection />

      {/* 9. Testimonials Carousel */}
      <Testimonials />

      {/* 10. Follow & Connect System */}
      <ConnectSocial />

      {/* 11. Contact & Message System with Admin Dispatch */}
      <ContactSection />

      {/* 12. Modern Footer */}
      <Footer />
    </main>
  );
}
