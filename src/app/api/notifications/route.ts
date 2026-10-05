import { NextResponse } from 'next/server';
import { Store } from '@/lib/store';

export async function GET() {
  try {
    const allNotifications = Store.getNotifications();
    // Visitor messages and contact inquiries are strictly private and never exposed publicly
    const notifications = allNotifications.filter(
      n => n.source !== 'Contact Request' && n.source !== 'Message'
    );
    const unreadCount = notifications.filter(n => !n.read).length;
    return NextResponse.json({ success: true, notifications, unreadCount });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, markAll } = body;

    if (markAll) {
      Store.markAllNotificationsAsRead();
      return NextResponse.json({ success: true, message: "All marked as read" });
    }

    if (id) {
      const updated = Store.markNotificationAsRead(id);
      return NextResponse.json({ success: true, updated });
    }

    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update notification" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: "Missing notification id" }, { status: 400 });
    }

    const removed = Store.deleteNotification(id);
    return NextResponse.json({ success: true, removed });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete notification" }, { status: 500 });
  }
}
