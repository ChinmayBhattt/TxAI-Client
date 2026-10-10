import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createBookingToken } from "@/lib/bookingTokens";

export async function POST(req) {
  try {
    const body = await req.json();

    const customer_name = body.customer_name || body.guest_name || "Guest";
    const customer_email = body.customer_email || body.guest_email;
    const customer_phone = body.customer_phone || body.guest_phone || "N/A";
    const booking_id = body.booking_id || "N/A";
    const villa_name = body.villa_name || "Luxury Villa";
    const villa_location = body.villa_location || "Maharashtra, India";
    const check_in_date = body.check_in_date || body.check_in || "N/A";
    const check_in_time = body.check_in_time || "2:00 PM";
    const check_out_date = body.check_out_date || body.check_out || "N/A";
    const check_out_time = body.check_out_time || "11:00 AM";
    const number_of_guests = body.number_of_guests || body.guests || 1;
    const total_amount = body.total_amount
      ? Number(body.total_amount).toLocaleString("en-IN")
      : "0";
    const transaction_date = body.transaction_date || new Date().toISOString().split("T")[0];
    const utr = body.utr || body.utr_number || "N/A";
    const website_name = body.website_name || "Staycation Villas";
    const website_url = body.website_url || process.env.NEXT_PUBLIC_SITE_URL || "https://staycationvillas.co";
    const support_email = body.support_email || process.env.SUPPORT_EMAIL || "staycationvillas26@gmail.com";
    const support_phone = body.support_phone || "‪+91 80820 88000‬";

    const owner_email = process.env.OWNER_EMAIL || "chinmaybhatt26@gmail.com";

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY is not defined.");
      return NextResponse.json(
        { error: "RESEND_API_KEY is not configured" },
        { status: 500 }
      );
    }

    // Determine current base URL dynamically for email action buttons
    const origin = req.headers.get("origin") || req.nextUrl?.origin;
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
    const proto = req.headers.get("x-forwarded-proto") || (host?.includes("localhost") ? "http" : "https");
    const baseUrl = origin || (host ? `${proto}://${host}` : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");

    // Package booking details into a signed token
    const bookingPayload = {
      booking_id,
      customer_name,
      customer_email,
      customer_phone,
      villa_name,
      villa_location,
      check_in_date,
      check_in_time,
      check_out_date,
      check_out_time,
      number_of_guests,
      total_amount,
      transaction_date,
      utr,
      website_name,
      website_url,
      support_email,
      support_phone,
      createdAt: new Date().toISOString(),
    };

    const token = createBookingToken(bookingPayload);

    const approveUrl = `${baseUrl}/api/booking-action?action=approve&token=${token}`;
    const rejectUrl = `${baseUrl}/api/booking-action?action=reject&token=${token}`;

    const resend = new Resend(apiKey);
    const fromAddress =
      process.env.RESEND_FROM_EMAIL || `${website_name} <onboarding@resend.dev>`;

    // Owner Email HTML Template
    const ownerHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking Approval Required</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #cbd5e1;" cellspacing="0" cellpadding="0">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px; text-align: center;">
              <span style="background-color: #f59e0b; color: #78350f; font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; display: inline-block; margin-bottom: 12px;">
                ACTION REQUIRED
              </span>
              <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: -0.3px;">
                New Booking Approval Request
              </h1>
              <p style="margin: 6px 0 0; color: #94a3b8; font-size: 13px;">
                Booking ID: <strong style="color: #ffffff; font-family: monospace;">${booking_id}</strong>
              </p>
            </td>
          </tr>

          <!-- Summary Message -->
          <tr>
            <td style="padding: 24px 30px 16px;">
              <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #334155;">
                Hello <strong>Owner</strong>,<br>
                A customer has submitted a payment via UPI QR for <strong>${villa_name}</strong>. Please review the customer and transaction details below, and either <strong>Approve</strong> or <strong>Reject</strong> the booking.
              </p>
            </td>
          </tr>

          <!-- Booking & Payment Details Table -->
          <tr>
            <td style="padding: 0 30px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden;">
                <tr>
                  <td colspan="2" style="background-color: #f1f5f9; padding: 10px 16px; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; color: #475569; text-transform: uppercase;">
                    Guest Information
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13.5px; color: #64748b; width: 40%;">Guest Name:</td>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13.5px; font-weight: 600; color: #0f172a;">${customer_name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13.5px; color: #64748b;">Guest Email:</td>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13.5px; color: #0f172a;">
                    <a href="mailto:${customer_email}" style="color: #2563eb; text-decoration: none;">${customer_email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13.5px; color: #64748b;">Guest Phone:</td>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13.5px; font-weight: 600; color: #0f172a;">
                    <a href="tel:${customer_phone.replace(/[^0-9+]/g, '')}" style="color: #0f172a; text-decoration: none;">${customer_phone}</a>
                  </td>
                </tr>

                <tr>
                  <td colspan="2" style="background-color: #f1f5f9; padding: 10px 16px; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; color: #475569; text-transform: uppercase;">
                    Stay Details
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13.5px; color: #64748b;">Property:</td>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13.5px; font-weight: 600; color: #0f172a;">${villa_name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13.5px; color: #64748b;">Location:</td>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13.5px; color: #0f172a;">${villa_location}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13.5px; color: #64748b;">Dates:</td>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13.5px; font-weight: 600; color: #0f172a;">
                    ${check_in_date} (${check_in_time}) → ${check_out_date} (${check_out_time})
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13.5px; color: #64748b;">Guests:</td>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13.5px; color: #0f172a;">${number_of_guests} Guests</td>
                </tr>

                <tr>
                  <td colspan="2" style="background-color: #f1f5f9; padding: 10px 16px; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; color: #475569; text-transform: uppercase;">
                    Payment Verification
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13.5px; color: #64748b;">Amount:</td>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 16px; font-weight: 700; color: #16a34a;">₹${total_amount}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13.5px; color: #64748b;">Transaction Date:</td>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13.5px; font-weight: 600; color: #0f172a;">${transaction_date}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 13.5px; color: #64748b;">UTR / Ref Number:</td>
                  <td style="padding: 10px 16px; font-size: 14px; font-weight: 700; color: #b45309; font-family: monospace;">${utr}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Action Buttons (Approve / Reject) -->
          <tr>
            <td style="padding: 0 30px 30px; text-align: center;">
              <p style="margin: 0 0 16px; font-size: 13px; color: #64748b;">
                Click below to send the respective confirmation or rejection email to the customer:
              </p>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding-bottom: 12px;">
                    <a href="${approveUrl}" style="display: block; width: 100%; box-sizing: border-box; background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); color: #ffffff; text-decoration: none; padding: 16px 24px; border-radius: 12px; font-weight: 800; font-size: 15px; letter-spacing: 1px; text-align: center; box-shadow: 0 4px 14px rgba(22, 163, 74, 0.35);">
                      ✅ APPROVE BOOKING
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <a href="${rejectUrl}" style="display: block; width: 100%; box-sizing: border-box; background: #fee2e2; color: #dc2626; border: 1.5px solid #fca5a5; text-decoration: none; padding: 13px 24px; border-radius: 12px; font-weight: 700; font-size: 14px; letter-spacing: 0.5px; text-align: center;">
                      ❌ REJECT BOOKING
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 30px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                Staycation Villas Automated Booking Management System
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    const ownerText = `
ACTION REQUIRED: New Booking Approval Request
Booking ID: ${booking_id}

Guest Name: ${customer_name}
Guest Email: ${customer_email}
Guest Phone: ${customer_phone}

Villa: ${villa_name}
Location: ${villa_location}
Check-In: ${check_in_date} (${check_in_time})
Check-Out: ${check_out_date} (${check_out_time})
Guests: ${number_of_guests}

Total Amount Paid: ₹${total_amount}
Transaction Date: ${transaction_date}
UTR / Ref No: ${utr}

Approve Booking: ${approveUrl}
Reject Booking: ${rejectUrl}
    `.trim();

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: owner_email,
      subject: `🔔 [APPROVAL NEEDED] Booking ${booking_id} — ${customer_name} (${villa_name})`,
      text: ownerText,
      html: ownerHtml,
    });

    if (error) {
      console.error("[resend] Error sending owner approval email:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    console.log("[resend] Owner approval email sent to:", owner_email, "id:", data?.id);
    return NextResponse.json({ success: true, emailId: data?.id });
  } catch (err) {
    console.error("[resend] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to send approval email" },
      { status: 500 }
    );
  }
}
