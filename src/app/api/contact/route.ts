import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || !body.name || !body.email || !body.message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const recipient = "bharath.eee.engineer@gmail.com";
    const subject = encodeURIComponent(`Portfolio Inquiry from ${body.name}`);
    const emailBody = encodeURIComponent(
      `Name: ${body.name}\nEmail: ${body.email}\n\nMessage:\n${body.message}`
    );
    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${emailBody}`;

    console.log(`[contact] Dispatching response for ${recipient}:`, {
      from: `${body.name} <${body.email}>`,
      to: recipient,
      messagePreview: String(body.message).slice(0, 100),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      ok: true,
      recipient,
      mailtoUrl,
      message: `Your message has been addressed to ${recipient}.`,
    });
  } catch (err) {
    console.error("[contact] Error:", err);
    return NextResponse.json(
      { ok: false, error: "Internal error processing message." },
      { status: 500 }
    );
  }
}
