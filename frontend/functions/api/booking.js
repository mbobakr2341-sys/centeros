const RESEND_ENDPOINT = "https://api.resend.com/emails";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function clean(value, maxLength = 500) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    if (!env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is missing");
      return json({ success: false, message: "Email service is not configured." }, 500);
    }

    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return json({ success: false, message: "Invalid request." }, 400);
    }

    // Honeypot: bots often fill hidden fields.
    if (body.website) {
      return json({ success: true });
    }

    const managerName = clean(body.managerName, 150);
    const centerName = clean(body.centerName, 150);
    const email = clean(body.email, 254);
    const branches = clean(body.branches, 100);
    const studentsCount = clean(body.studentsCount, 100);
    const additionalInfo = clean(body.additionalInfo, 2000);

    if (!managerName || !centerName || !email || !branches || !studentsCount) {
      return json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        400
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        400
      );
    }

    const to = env.BOOKING_TO || "centeros@centeros.online";
    const from = env.SMTP_FROM || "centeros@centeros.online";

    const html = `
      <!doctype html>
      <html>
        <body style="font-family:Arial,sans-serif;background:#f5f7fb;padding:30px;">
          <div style="max-width:680px;margin:auto;background:#ffffff;border-radius:18px;padding:30px;border:1px solid #e8eaf0;">
            <h2 style="margin-top:0;color:#17172b;">New CenterOS Booking Request</h2>

            <div style="margin-top:24px;">
              <p><strong>Manager Name:</strong><br>${escapeHtml(managerName)}</p>
              <p><strong>Center / Academy:</strong><br>${escapeHtml(centerName)}</p>
              <p><strong>Email:</strong><br>${escapeHtml(email)}</p>
              <p><strong>Branches:</strong><br>${escapeHtml(branches)}</p>
              <p><strong>Expected Students:</strong><br>${escapeHtml(studentsCount)}</p>
              <p><strong>Additional Information:</strong><br>${escapeHtml(additionalInfo || "—")}</p>
            </div>

            <hr style="border:0;border-top:1px solid #eee;margin:28px 0;">

            <p style="color:#777;font-size:13px;margin-bottom:0;">
              Sent from the CenterOS website.
            </p>
          </div>
        </body>
      </html>
    `;

    const resendResponse = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New CenterOS Booking — ${centerName}`,
        html,
      }),
    });

    const resendData = await resendResponse.json().catch(() => ({}));

    if (!resendResponse.ok) {
      console.error("Resend error:", resendData);

      return json(
        {
          success: false,
          message: "Unable to send the booking request right now.",
        },
        502
      );
    }

    return json({
      success: true,
      message: "Booking request sent successfully.",
    });
  } catch (error) {
    console.error("Booking function error:", error);

    return json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      500
    );
  }
}
