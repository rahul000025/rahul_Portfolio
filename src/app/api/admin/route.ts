import { NextResponse } from 'next/server';
import { Store } from '@/lib/store';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'rahul2026';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, password } = body;

    if (action === 'login') {
      if (password === ADMIN_PASSWORD) {
        return NextResponse.json({
          success: true,
          token: "session_token_" + Buffer.from(`admin:${Date.now()}`).toString('base64'),
          message: "Authenticated successfully"
        });
      } else {
        return NextResponse.json({ success: false, error: "Invalid admin password" }, { status: 401 });
      }
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const messages = Store.getMessages();
    const notifications = Store.getNotifications();
    const activities = Store.getActivities();
    const socials = Store.getSocials();
    const analytics = Store.getAnalytics();

    return NextResponse.json({
      success: true,
      data: {
        messages,
        notifications,
        activities,
        socials,
        analytics,
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load admin telemetry" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status, archived } = body;

    if (!id) {
      return NextResponse.json({ error: "Message id required" }, { status: 400 });
    }

    const updated = Store.updateMessageStatus(id, status, archived);
    if (!updated) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "Message id required" }, { status: 400 });
    }

    const deleted = Store.deleteMessage(id);
    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}
