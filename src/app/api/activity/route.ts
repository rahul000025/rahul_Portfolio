import { NextResponse } from 'next/server';
import { CURRENT_GITHUB_PROJECTS } from '@/lib/data';

let cachedProjects: string[] = CURRENT_GITHUB_PROJECTS || ['Voxora-AI'];
let lastFetchTime = 0;

async function fetchActiveGithubProjects(): Promise<string[]> {
  const now = Date.now();
  if (cachedProjects.length > 0 && now - lastFetchTime < 60 * 1000) {
    return cachedProjects;
  }

  try {
    const res = await fetch('https://api.github.com/users/rahul000025/events', {
      headers: {
        'User-Agent': 'PortfolioApp',
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return cachedProjects;
    }

    const events = await res.json();
    if (!Array.isArray(events)) return cachedProjects;

    const projectSet = new Set<string>();
    for (const event of events) {
      if (event.repo && event.repo.name) {
        const cleanName = event.repo.name.includes('/')
          ? event.repo.name.split('/')[1]
          : event.repo.name;

        if (cleanName && cleanName.toLowerCase() !== 'rahul000025') {
          projectSet.add(cleanName);
        }
      }
    }

    const uniqueProjects = Array.from(projectSet);
    if (uniqueProjects.length > 0) {
      cachedProjects = uniqueProjects;
      lastFetchTime = now;
    }

    return cachedProjects;
  } catch (err) {
    console.error('Error fetching GitHub active projects:', err);
    return cachedProjects;
  }
}

export async function GET() {
  try {
    const projects = await fetchActiveGithubProjects();
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    return NextResponse.json({ success: true, projects: CURRENT_GITHUB_PROJECTS || ['Voxora-AI'] });
  }
}

export async function POST(req: Request) {
  return NextResponse.json({ success: true });
}
