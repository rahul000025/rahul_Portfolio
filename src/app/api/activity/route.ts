import { NextResponse } from 'next/server';
import { Store } from '@/lib/store';

export async function GET() {
  try {
    const activities = Store.getActivities();
    return NextResponse.json({ success: true, activities });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 });
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
