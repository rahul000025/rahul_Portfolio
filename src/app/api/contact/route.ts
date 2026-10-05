import { NextRequest, NextResponse } from 'next/server';
import { Store } from '@/lib/store';

// Basic rate limiting map
const ipRateMap = new Map<string, { count: number; lastTime: number }>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();

    // Check rate limiting: max 5 requests per 5 minutes per IP
    const rateData = ipRateMap.get(ip);
    if (rateData) {
      if (now - rateData.lastTime < 5 * 60 * 1000) {
        if (rateData.count >= 5) {
          return NextResponse.json(
            { error: "Too many submissions. Please wait a few moments before trying again." },
            { status: 429 }
          );
        }
        rateData.count += 1;
      } else {
        ipRateMap.set(ip, { count: 1, lastTime: now });
      }
    } else {
      ipRateMap.set(ip, { count: 1, lastTime: now });
    }

    const body = await req.json();
    const { name, email, subject, reason, message, honeypot } = body;

    // Honeypot spam check
    if (honeypot && honeypot.trim().length > 0) {
      // Silently reject bot
      return NextResponse.json({ success: true, message: "Message processed" });
    }

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: "Please enter a valid name (at least 2 characters)." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
      return NextResponse.json({ error: "Please enter a subject (at least 3 characters)." }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json({ error: "Please write a message with at least 10 characters." }, { status: 400 });
    }

    const validReasons = [
      'Full-Time Opportunity',
      'Internship Opportunity',
      'Contract / Project',
      'Technical Collaboration',
      'General Inquiry',
      'Job Opportunity',
      'Freelance Project',
      'Collaboration',
      'Technical Discussion',
    ];
    const selectedReason = validReasons.includes(reason) ? reason : 'General Inquiry';

    // Sanitize string content
    const sanitizedName = name.trim().slice(0, 100);
    const sanitizedEmail = email.trim().toLowerCase().slice(0, 150);
    const sanitizedSubject = subject.trim().slice(0, 200);
    const sanitizedMessage = message.trim().slice(0, 5000);

    const savedMessage = Store.addMessage({
      name: sanitizedName,
      email: sanitizedEmail,
      subject: sanitizedSubject,
      reason: selectedReason as any,
      message: sanitizedMessage,
      source: "Portfolio Contact Form",
      ip: ip.split(',')[0],
    });

    return NextResponse.json({
      success: true,
      message: "Thanks! Your message has been received.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while processing your message." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, error: "Access Denied. Messages are private and accessible only via authenticated admin portal." },
    { status: 403 }
  );
}
