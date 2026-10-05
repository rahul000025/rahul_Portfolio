export type Category = 'All' | 'AI/ML' | 'Web Development' | 'Cybersecurity' | 'Software Engineering';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: Category;
  description: string;
  problem: string;
  solution: string;
  architecture: string;
  technologies: string[];
  features: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  stats?: {
    metric: string;
    label: string;
  };
  featured: boolean;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  organization: string;
  category: 'Knowledge' | 'Education' | 'Projects' | 'Certifications' | 'Achievements' | 'Milestones' | 'Research';
  description: string;
  skills: string[];
  icon: string;
  badge?: string;
}

export interface TechItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'AI/ML' | 'Database' | 'Tools';
  level: number; // 1-100
  experience: string;
  icon: string;
  color: string;
  description: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  reason: 'Job Opportunity' | 'Freelance Project' | 'Collaboration' | 'Technical Discussion' | 'General Inquiry';
  message: string;
  source: string;
  date: string;
  status: 'New' | 'In Progress' | 'Replied' | 'Closed';
  ip?: string;
  archived?: boolean;
}

export interface AppNotification {
  id: string;
  source: 'Contact Request' | 'Message' | 'Project Inquiry' | 'GitHub Activity' | 'Social Integration Event' | 'Newsletter Signup';
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'normal' | 'high';
  actionUrl?: string;
}

export interface ActivityItem {
  id: string;
  type: 'github_commit' | 'github_repo' | 'contact_request' | 'portfolio_view' | 'social_event' | 'newsletter';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
  url?: string;
  source: string;
}

export interface SocialIntegration {
  id: string;
  name: string;
  username: string;
  url: string;
  icon: string;
  connected: boolean;
  lastSync: string;
  availableEvents: string[];
  followersCount?: string;
  status: 'active' | 'syncing' | 'idle' | 'auth_required';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'AI' | 'Software Engineering' | 'Web Development' | 'Cybersecurity' | 'Technology';
  excerpt: string;
  content: string;
  coverImage: string;
  readingTime: string;
  date: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}
