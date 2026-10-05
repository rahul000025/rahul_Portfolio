import { NextResponse } from 'next/server';
import { Store } from '@/lib/store';
import { INITIAL_ACTIVITIES } from '@/lib/data';
import { ActivityItem } from '@/lib/types';

let cachedGithubEvents: ActivityItem[] = [];
let lastFetchTime = 0;

async function fetchGithubActivity(): Promise<ActivityItem[]> {
  const now = Date.now();
  if (cachedGithubEvents.length > 0 && now - lastFetchTime < 60 * 1000) {
    return cachedGithubEvents;
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
      return cachedGithubEvents;
    }

    const events = await res.json();
    if (!Array.isArray(events)) return cachedGithubEvents;

    const formatted: ActivityItem[] = events
      .filter((e: any) => e.type === 'PushEvent' || e.type === 'CreateEvent')
      .slice(0, 8)
      .map((e: any) => {
        const repoName = e.repo?.name || 'rahul000025/Voxora-AI';
        const isPush = e.type === 'PushEvent';
        const branch = e.payload?.ref?.replace('refs/heads/', '') || 'main';

        return {
          id: `gh-${e.id}`,
          type: isPush ? 'github_commit' : 'github_repo',
          title: isPush ? `Pushed commits to ${repoName}` : `Created branch in ${repoName}`,
          description: isPush
            ? `Committed updates to ${branch} branch`
            : `Initialized ${branch} branch on ${repoName}`,
          timestamp: e.created_at,
          icon: isPush ? 'GitCommit' : 'FolderGit2',
          url: `https://github.com/${repoName}`,
          source: 'GitHub',
        };
      });

    if (formatted.length > 0) {
      cachedGithubEvents = formatted;
      lastFetchTime = now;
    }
    return cachedGithubEvents;
  } catch (err) {
    console.error('Error fetching live GitHub activity:', err);
    return cachedGithubEvents;
  }
}

export async function GET() {
  try {
    const localActivities = Store.getActivities();
    const liveGithub = await fetchGithubActivity();

    // Combine local activities, live GitHub events, and initial baseline activities
    const combined = [...localActivities, ...liveGithub];
    if (combined.length === 0) {
      combined.push(...INITIAL_ACTIVITIES);
    } else {
      // Ensure baseline telemetry is present if none in local
      const hasTelemetry = combined.some((a) => a.type === 'portfolio_view');
      if (!hasTelemetry) {
        const telemetryItem = INITIAL_ACTIVITIES.find((a) => a.type === 'portfolio_view');
        if (telemetryItem) combined.push(telemetryItem);
      }
    }

    // Deduplicate by id
    const seen = new Set<string>();
    const uniqueActivities: ActivityItem[] = [];
    for (const item of combined) {
      if (!seen.has(item.id)) {
        seen.add(item.id);
        uniqueActivities.push(item);
      }
    }

    return NextResponse.json({ success: true, activities: uniqueActivities });
  } catch (error) {
    return NextResponse.json({ success: true, activities: INITIAL_ACTIVITIES });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, title, description, icon, source, url } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description required" }, { status: 400 });
    }

    const item = Store.recordActivity({
      type: type || 'portfolio_view',
      title,
      description,
      icon: icon || 'Activity',
      source: source || 'Portfolio Client',
      url,
    });

    return NextResponse.json({ success: true, activity: item });
  } catch (error) {
    return NextResponse.json({ error: "Failed to record activity" }, { status: 500 });
  }
}
