import { Resend } from "resend";
import { verifyBookingToken, getBookingActionStatus, recordBookingActionStatus } from "@/lib/bookingTokens";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action"); // 'approve' or 'reject'
    const token = searchParams.get("token");

    if (!token || !action || !["approve", "reject"].includes(action)) {
      return renderResponseHtml({
        title: "Invalid Request",
        badge: "ERROR",
        badgeColor: "#dc2626",
        message: "The action link is missing required parameters or is invalid.",
      });
    }

    const booking = verifyBookingToken(token);
    if (!booking) {
      return renderResponseHtml({
        title: "Link Expired or Invalid",
        badge: "INVALID TOKEN",
        badgeColor: "#dc2626",
        message: "This link could not be verified. It may have expired or been tampered with.",
      });
    }

    // Check if this booking was already approved or rejected
    const prevStatus = getBookingActionStatus(booking.booking_id);
    if (prevStatus) {
      const isApproved = prevStatus.status === "approved";
      return renderResponseHtml({
        title: `Already ${isApproved ? "Approved" : "Rejected"}`,
        badge: prevStatus.status.toUpperCase(),
        badgeColor: isApproved ? "#16a34a" : "#dc2626",
        message: `This booking (${booking.booking_id}) was already ${prevStatus.status} on ${new Date(prevStatus.timestamp).toLocaleString("en-IN")}.`,
        booking,
      });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const resend = new Resend(apiKey);
    const fromAddress =
      process.env.RESEND_FROM_EMAIL || `${booking.website_name || "Staycation Villas"} <onboarding@resend.dev>`;

    if (action === "approve") {
      // ─── 1. SEND CONFIRMATION EMAIL TO CUSTOMER ───
      const textContent = `
Hi ${booking.customer_name},

Your Villa Booking Is Confirmed! 🎉

Thank you for choosing ${booking.website_name} for your staycation. We're excited to help you create wonderful memories!

Your payment has been received successfully, and your villa booking is now confirmed.

Booking Details
- Booking ID: ${booking.booking_id}
- Villa Name: ${booking.villa_name}
- Location: ${booking.villa_location}
- Check-in: ${booking.check_in_date} at ${booking.check_in_time}
- Check-out: ${booking.check_out_date} at ${booking.check_out_time}
- Guests: ${booking.number_of_guests}
- Total Amount Paid: ₹${booking.total_amount}
- Payment Status: Paid ✅

What's Next?

Please keep this email handy for your reference. Our team will share any additional check-in instructions or property access details before your arrival.

If you have any questions or need assistance with your booking, feel free to contact us at ${booking.support_email} or ${booking.support_phone}.

We look forward to hosting you and making your stay special!

Warm regards,  
Team ${booking.website_name}  
${booking.website_url}
      `.trim();

      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Villa Booking Is Confirmed</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;" cellspacing="0" cellpadding="0">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 36px 32px; text-align: center;">
              <div style="color: #c5a059; font-size: 13px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 8px;">
                ${booking.website_name}
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">
                Your Villa Booking Is Confirmed! 🎉
              </h1>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px 32px 20px;">
              <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px; color: #1e293b;">
                Hi <strong>${booking.customer_name}</strong>,
              </p>
              <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px; color: #475569;">
                Thank you for choosing <strong>${booking.website_name}</strong> for your staycation. We're excited to help you create wonderful memories!
              </p>
              <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 14px 18px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #065f46; font-size: 14.5px; font-weight: 500;">
                  ✓ Your payment has been received successfully, and your villa booking is now confirmed.
                </p>
              </div>

              <!-- Booking Details Card -->
              <h2 style="font-size: 17px; font-weight: 700; color: #0f172a; margin: 26px 0 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                Booking Details
              </h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden;">
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #64748b; width: 40%;">Booking ID</td>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 700; color: #0f172a; font-family: monospace;">${booking.booking_id}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #64748b;">Villa Name</td>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 600; color: #0f172a;">${booking.villa_name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #64748b;">Location</td>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0f172a;">${booking.villa_location}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #64748b;">Check-in</td>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 600; color: #0f172a;">${booking.check_in_date} at ${booking.check_in_time}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #64748b;">Check-out</td>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 600; color: #0f172a;">${booking.check_out_date} at ${booking.check_out_time}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #64748b;">Guests</td>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0f172a;">${booking.number_of_guests} Guests</td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #64748b;">Total Amount Paid</td>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 15px; font-weight: 700; color: #16a34a;">₹${booking.total_amount}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; font-size: 14px; color: #64748b;">Payment Status</td>
                  <td style="padding: 12px 18px; font-size: 14px; font-weight: 700; color: #16a34a;">Paid ✅</td>
                </tr>
              </table>

              <!-- What's Next Section -->
              <h2 style="font-size: 17px; font-weight: 700; color: #0f172a; margin: 26px 0 12px;">
                What's Next?
              </h2>
              <p style="font-size: 14.5px; line-height: 1.6; margin: 0 0 12px; color: #475569;">
                Please keep this email handy for your reference. Our team will share any additional check-in instructions or property access details before your arrival.
              </p>
              <p style="font-size: 14.5px; line-height: 1.6; margin: 0 0 20px; color: #475569;">
                If you have any questions or need assistance with your booking, feel free to contact us at <a href="mailto:${booking.support_email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${booking.support_email}</a> or <a href="tel:${booking.support_phone.replace(/[^0-9+]/g, '')}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${booking.support_phone}</a>.
              </p>

              <p style="font-size: 14.5px; line-height: 1.6; margin: 0 0 24px; color: #1e293b; font-weight: 500;">
                We look forward to hosting you and making your stay special!
              </p>

              <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 20px;">
                <p style="font-size: 14px; line-height: 1.5; margin: 0; color: #475569;">
                  Warm regards,<br>
                  <strong style="color: #0f172a;">Team ${booking.website_name}</strong><br>
                  <a href="${booking.website_url}" style="color: #64748b; font-size: 13px; text-decoration: none;">${booking.website_url}</a>
                </p>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `.trim();

      const { data: sendData, error: sendError } = await resend.emails.send({
        from: fromAddress,
        to: booking.customer_email,
        subject: `Your Villa Booking Is Confirmed! 🎉 [${booking.booking_id}]`,
        text: textContent,
        html: htmlContent,
      });

      let alertNotice = null;

      if (sendError) {
        console.warn("[resend] Primary recipient send error:", sendError);

        // If Resend test mode blocks sending to non-owner email, forward copy to owner
        if (
          sendError.message?.includes("only send testing emails to your own email address") ||
          sendError.statusCode === 403
        ) {
          alertNotice = `⚠️ <strong>Resend Test Mode Alert:</strong> Resend ke testing mode me bina domain verify kiye direct customer (${booking.customer_email}) ko email nahi jaata. Humne ye confirmation email aapke email (<strong>${process.env.OWNER_EMAIL || "chinmaybhatt26@gmail.com"}</strong>) par forward kar diya hai. Direct customer ko mail bhejne ke liye <strong>resend.com/domains</strong> par domain verify karein.`;

          await resend.emails.send({
            from: fromAddress,
            to: process.env.OWNER_EMAIL || "chinmaybhatt26@gmail.com",
            subject: `[FORWARD TO CUSTOMER: ${booking.customer_email}] Your Villa Booking Is Confirmed! 🎉 [${booking.booking_id}]`,
            text: `NOTE: Forward this email to ${booking.customer_email}\n\n` + textContent,
            html: `
              <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 16px; border-radius: 10px; margin-bottom: 20px; font-family: sans-serif; font-size: 14px; color: #92400e; line-height: 1.5;">
                <strong>⚠️ RESEND TEST MODE — FORWARD TO CUSTOMER</strong><br>
                Resend testing mode me direct customer (<strong>${booking.customer_email}</strong>) ko deliver nahi hua kyunki custom domain verify hona baaki hai.<br>
                Aap ye email directly <strong>${booking.customer_email}</strong> ko forward kar sakte hain.
              </div>
            ` + htmlContent,
          });
        } else {
          alertNotice = `Email delivery notice: ${sendError.message}`;
        }
      }

      // Record status
      recordBookingActionStatus(booking.booking_id, "approved", {
        customerEmail: booking.customer_email,
        villaName: booking.villa_name,
        emailDeliveredDirectly: !sendError,
      });

      return renderResponseHtml({
        title: "Booking Approved Successfully! 🎉",
        badge: "APPROVED & CONFIRMED",
        badgeColor: "#16a34a",
        message: sendError
          ? `Booking status confirmed! Check test mode alert below.`
          : `Confirmation email has been dispatched directly to <strong>${booking.customer_name}</strong> at <strong>${booking.customer_email}</strong>.`,
        alertNotice,
        booking,
      });

    } else if (action === "reject") {
      // ─── 2. SEND REJECTION EMAIL TO CUSTOMER ───
      const rejectText = `
Hi ${booking.customer_name},

Important Update regarding your booking request [${booking.booking_id}]

We regret to inform you that your booking request for ${booking.villa_name} (${booking.check_in_date} to ${booking.check_out_date}) could not be confirmed at this time.

Booking Details:
- Booking ID: ${booking.booking_id}
- Villa: ${booking.villa_name}
- Total Amount: ₹${booking.total_amount}
- Transaction UTR / Ref No: ${booking.utr}

Refund & Next Steps:
If any payment was deducted, our team will verify your transaction against UTR ${booking.utr} and initiate a full refund promptly.

If you have questions or would like to explore alternative dates/villas, please feel free to reach out to us:
Email: ${booking.support_email}
Phone: ${booking.support_phone}

Warm regards,
Team ${booking.website_name}
${booking.website_url}
      `.trim();

      const rejectHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Request Update</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;" cellspacing="0" cellpadding="0">
          
          <tr style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);">
            <td style="padding: 32px; text-align: center;">
              <div style="color: #ef4444; font-size: 12px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; margin-bottom: 6px;">
                BOOKING UPDATE
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 600;">
                Booking Request Not Confirmed
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding: 32px 32px 20px;">
              <p style="font-size: 15.5px; line-height: 1.6; margin: 0 0 16px; color: #1e293b;">
                Hi <strong>${booking.customer_name}</strong>,
              </p>
              <p style="font-size: 15px; line-height: 1.6; margin: 0 0 18px; color: #475569;">
                We regret to inform you that your booking request for <strong>${booking.villa_name}</strong> (${booking.check_in_date} → ${booking.check_out_date}) could not be confirmed at this time due to availability or reservation constraints.
              </p>

              <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 14px 18px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #991b1b; font-size: 14px; font-weight: 500;">
                  Booking ID: <strong>${booking.booking_id}</strong><br>
                  Status: <strong>Rejected / Refund Pending</strong>
                </p>
              </div>

              <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 24px 0 10px;">
                Refund Information
              </h2>
              <p style="font-size: 14.5px; line-height: 1.6; margin: 0 0 16px; color: #475569;">
                If your payment was deducted from your bank/UPI account, our finance team will verify the payment against UTR: <strong style="font-family: monospace;">${booking.utr}</strong> and initiate a full refund.
              </p>

              <p style="font-size: 14.5px; line-height: 1.6; margin: 0 0 20px; color: #475569;">
                For any urgent queries or to book alternative dates, please contact our concierge team at <a href="mailto:${booking.support_email}" style="color: #2563eb; text-decoration: none;">${booking.support_email}</a> or call <a href="tel:${booking.support_phone.replace(/[^0-9+]/g, '')}" style="color: #2563eb; text-decoration: none;">${booking.support_phone}</a>.
              </p>

              <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 24px;">
                <p style="font-size: 14px; line-height: 1.5; margin: 0; color: #475569;">
                  Warm regards,<br>
                  <strong style="color: #0f172a;">Team ${booking.website_name}</strong><br>
                  <a href="${booking.website_url}" style="color: #64748b; font-size: 13px; text-decoration: none;">${booking.website_url}</a>
                </p>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `.trim();

      const { data: rejectData, error: rejectError } = await resend.emails.send({
        from: fromAddress,
        to: booking.customer_email,
        subject: `Booking Request Update [${booking.booking_id}] - ${booking.website_name}`,
        text: rejectText,
        html: rejectHtml,
      });

      let rejectAlert = null;
      if (rejectError) {
        console.warn("[resend] Primary recipient reject error:", rejectError);
        if (
          rejectError.message?.includes("only send testing emails to your own email address") ||
          rejectError.statusCode === 403
        ) {
          rejectAlert = `⚠️ <strong>Resend Test Mode:</strong> Customer (${booking.customer_email}) ko direct email deliver nahi hua. Email copy aapke email (<strong>${process.env.OWNER_EMAIL || "chinmaybhatt26@gmail.com"}</strong>) par forward kar diya gaya hai.`;

          await resend.emails.send({
            from: fromAddress,
            to: process.env.OWNER_EMAIL || "chinmaybhatt26@gmail.com",
            subject: `[FORWARD TO CUSTOMER: ${booking.customer_email}] Booking Request Update [${booking.booking_id}]`,
            text: `NOTE: Forward this email to ${booking.customer_email}\n\n` + rejectText,
            html: `
              <div style="background: #fee2e2; border: 2px solid #ef4444; padding: 16px; border-radius: 10px; margin-bottom: 20px; font-family: sans-serif; font-size: 14px; color: #991b1b; line-height: 1.5;">
                <strong>⚠️ RESEND TEST MODE — FORWARD TO CUSTOMER</strong><br>
                Resend testing mode me direct customer (<strong>${booking.customer_email}</strong>) ko deliver nahi hua.<br>
                Aap ye email <strong>${booking.customer_email}</strong> ko forward kar sakte hain.
              </div>
            ` + rejectHtml,
          });
        }
      }

      // Record status
      recordBookingActionStatus(booking.booking_id, "rejected", {
        customerEmail: booking.customer_email,
        villaName: booking.villa_name,
        emailDeliveredDirectly: !rejectError,
      });

      return renderResponseHtml({
        title: "Booking Rejected",
        badge: "REJECTED",
        badgeColor: "#dc2626",
        message: rejectError
          ? `Booking request rejected. Check test mode alert below.`
          : `Rejection notice has been emailed to <strong>${booking.customer_name}</strong> at <strong>${booking.customer_email}</strong>.`,
        alertNotice: rejectAlert,
        booking,
      });
    }
  } catch (err) {
    console.error("[booking-action] Error handling action:", err);
    return renderResponseHtml({
      title: "An Error Occurred",
      badge: "SERVER ERROR",
      badgeColor: "#dc2626",
      message: err.message || "Something went wrong while processing your request.",
    });
  }
}

/**
 * Returns a styled HTML response page for the owner's browser.
 */
function renderResponseHtml({ title, badge, badgeColor, message, alertNotice, booking }) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Staycation Villas Admin</title>
  <style>
    body {
      margin: 0;
      padding: 40px 20px;
      background-color: #0f172a;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      color: #f8fafc;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 90vh;
    }
    .card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 20px;
      max-width: 560px;
      width: 100%;
      padding: 36px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      text-align: center;
    }
    .badge {
      display: inline-block;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 2px;
      color: #ffffff;
      background-color: ${badgeColor};
      margin-bottom: 20px;
    }
    h1 {
      margin: 0 0 12px;
      font-size: 24px;
      color: #ffffff;
      font-weight: 700;
    }
    p {
      color: #94a3b8;
      font-size: 15px;
      line-height: 1.6;
      margin: 0 0 20px;
    }
    .alert-banner {
      background: rgba(245, 158, 11, 0.15);
      border: 1.5px solid #f59e0b;
      border-radius: 12px;
      padding: 14px 18px;
      color: #fbbf24;
      font-size: 13.5px;
      line-height: 1.55;
      text-align: left;
      margin-bottom: 24px;
    }
    .details {
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 18px 20px;
      text-align: left;
      font-size: 13.5px;
      margin-bottom: 24px;
    }
    .row {
      display: flex;
      justify-content: space-between;
      padding: 7px 0;
      border-bottom: 1px solid #1e293b;
    }
    .row:last-child {
      border-bottom: none;
    }
    .row span {
      color: #64748b;
    }
    .row strong {
      color: #e2e8f0;
    }
    .close-btn {
      display: inline-block;
      padding: 12px 24px;
      background: #334155;
      color: #ffffff;
      border-radius: 10px;
      font-weight: 600;
      font-size: 13px;
      text-decoration: none;
      transition: background 0.2s;
    }
    .close-btn:hover {
      background: #475569;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">${badge}</div>
    <h1>${title}</h1>
    <p>${message}</p>

    ${alertNotice ? `<div class="alert-banner">${alertNotice}</div>` : ""}

    ${
      booking
        ? `
      <div class="details">
        <div class="row"><span>Booking ID:</span><strong style="font-family: monospace;">${booking.booking_id}</strong></div>
        <div class="row"><span>Property:</span><strong>${booking.villa_name}</strong></div>
        <div class="row"><span>Guest:</span><strong>${booking.customer_name}</strong></div>
        <div class="row"><span>Email:</span><strong>${booking.customer_email}</strong></div>
        <div class="row"><span>Dates:</span><strong>${booking.check_in_date} → ${booking.check_out_date}</strong></div>
        <div class="row"><span>Amount:</span><strong style="color: #22c55e;">₹${booking.total_amount}</strong></div>
        <div class="row"><span>UTR / Ref No:</span><strong style="font-family: monospace;">${booking.utr}</strong></div>
      </div>
    `
        : ""
    }

    <a href="https://staycationvillas.co" class="close-btn">Return to Site</a>
  </div>
</body>
</html>
  `.trim();

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
