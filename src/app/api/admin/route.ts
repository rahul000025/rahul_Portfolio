import { NextResponse } from 'next/server';
import { Store } from '@/lib/store';
import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'rahul@8863';
const TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || 'rahul_admin_vault_secret_8863_key';

function createAdminToken(): string {
  const timestamp = Date.now();
  const payload = `admin:${timestamp}`;
  const signature = crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest('hex');
  return `${Buffer.from(payload).toString('base64url')}.${signature}`;
}

function verifyAdminToken(token?: string | null): boolean {
  if (!token) return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return false;
    const [b64Payload, signature] = parts;
    const payload = Buffer.from(b64Payload, 'base64url').toString('utf-8');
    const expectedSignature = crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest('hex');
    if (signature !== expectedSignature) return false;

    const [user, tsStr] = payload.split(':');
    if (user !== 'admin') return false;
    const ts = parseInt(tsStr, 10);
    if (isNaN(ts)) return false;
    // 7 days expiration
    if (Date.now() - ts > 7 * 24 * 60 * 60 * 1000) return false;

    return true;
  } catch {
    return false;
  }
}

function isAuthorized(req: Request): boolean {
  // 1. Check Authorization Bearer header
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    if (verifyAdminToken(token)) return true;
  }

  // 2. Check x-admin-token custom header
  const customHeader = req.headers.get('x-admin-token');
  if (customHeader && verifyAdminToken(customHeader)) {
    return true;
  }

  // 3. Check Cookie header
  const cookieHeader = req.headers.get('cookie') || '';
  const cookies: Record<string, string> = {};
  cookieHeader.split(';').forEach((c) => {
    const [k, v] = c.trim().split('=');
    if (k && v) cookies[k] = v;
  });

  const cookieToken = cookies['rahul_admin_session'] || cookies['admin_session'];
  if (cookieToken && verifyAdminToken(cookieToken)) {
    return true;
  }

  return false;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, password } = body;

    if (action === 'login') {
      if (password === ADMIN_PASSWORD) {
        const token = createAdminToken();
        const res = NextResponse.json({
          success: true,
          token,
          message: "Authenticated successfully"
        });

        // Set secure HTTP-only cookie
        res.cookies.set('rahul_admin_session', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
          maxAge: 7 * 24 * 60 * 60,
        });

        return res;
      } else {
        return NextResponse.json({ success: false, error: "Invalid admin passcode" }, { status: 401 });
      }
    }

    if (action === 'logout') {
      const res = NextResponse.json({ success: true, message: "Logged out successfully" });
      res.cookies.delete('rahul_admin_session');
      return res;
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access. Admin authentication required." },
      { status: 401 }
    );
  }

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
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access. Admin authentication required." },
      { status: 401 }
    );
  }

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
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access. Admin authentication required." },
      { status: 401 }
    );
  }

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
