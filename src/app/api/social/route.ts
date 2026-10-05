import { NextResponse } from 'next/server';
import { Store } from '@/lib/store';

export async function GET() {
  try {
    const socials = Store.getSocials();
    return NextResponse.json({ success: true, socials });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch social integrations" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, action } = body;

    if (!id) {
      return NextResponse.json({ error: "Social ID required" }, { status: 400 });
    }

    if (action === 'toggle') {
      const updated = Store.toggleSocialConnection(id);
      return NextResponse.json({ success: true, social: updated });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update social integration" }, { status: 500 });
  }
}
