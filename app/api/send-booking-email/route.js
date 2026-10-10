import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req) {
  try {
    const body = await req.json();

    const customer_name = body.customer_name || body.guest_name || "Valued Guest";
    const customer_email = body.customer_email || body.guest_email;
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
    const website_name = body.website_name || "Staycation Villas";
    const website_url = body.website_url || process.env.NEXT_PUBLIC_SITE_URL || "https://staycationvillas.co";
    const support_email = body.support_email || process.env.SUPPORT_EMAIL || "staycationvillas26@gmail.com";
    const support_phone = body.support_phone || "‪+91 80820 88000‬";

    if (!customer_email) {
      return NextResponse.json(
        { error: "Customer email is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY is not defined in environment variables.");
      return NextResponse.json(
        { error: "RESEND_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const fromAddress =
      process.env.RESEND_FROM_EMAIL || `${website_name} <onboarding@resend.dev>`;

    // Plain text version matching user specification
    const textContent = `
Hi ${customer_name},

Your Villa Booking Is Confirmed! 🎉

Thank you for choosing ${website_name} for your staycation. We're excited to help you create wonderful memories!

Your payment has been received successfully, and your villa booking is now confirmed.

Booking Details
- Booking ID: ${booking_id}
- Villa Name: ${villa_name}
- Location: ${villa_location}
- Check-in: ${check_in_date} at ${check_in_time}
- Check-out: ${check_out_date} at ${check_out_time}
- Guests: ${number_of_guests}
- Total Amount Paid: ₹${total_amount}
- Payment Status: Paid ✅

What's Next?

Please keep this email handy for your reference. Our team will share any additional check-in instructions or property access details before your arrival.

If you have any questions or need assistance with your booking, feel free to contact us at ${support_email} or ${support_phone}.

We look forward to hosting you and making your stay special!

Warm regards,  
Team ${website_name}  
${website_url}
    `.trim();

    // Responsive HTML version matching brand styling
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
                ${website_name}
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
                Hi <strong>${customer_name}</strong>,
              </p>
              <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px; color: #475569;">
                Thank you for choosing <strong>${website_name}</strong> for your staycation. We're excited to help you create wonderful memories!
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
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 700; color: #0f172a; font-family: monospace;">${booking_id}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #64748b;">Villa Name</td>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 600; color: #0f172a;">${villa_name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #64748b;">Location</td>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0f172a;">${villa_location}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #64748b;">Check-in</td>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 600; color: #0f172a;">${check_in_date} at ${check_in_time}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #64748b;">Check-out</td>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 600; color: #0f172a;">${check_out_date} at ${check_out_time}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #64748b;">Guests</td>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0f172a;">${number_of_guests} Guest${number_of_guests > 1 ? "s" : ""}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #64748b;">Total Amount Paid</td>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-size: 15px; font-weight: 700; color: #16a34a;">₹${total_amount}</td>
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
                If you have any questions or need assistance with your booking, feel free to contact us at <a href="mailto:${support_email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${support_email}</a> or <a href="tel:${support_phone.replace(/[^0-9+]/g, '')}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${support_phone}</a>.
              </p>

              <p style="font-size: 14.5px; line-height: 1.6; margin: 0 0 24px; color: #1e293b; font-weight: 500;">
                We look forward to hosting you and making your stay special!
              </p>

              <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 20px;">
                <p style="font-size: 14px; line-height: 1.5; margin: 0; color: #475569;">
                  Warm regards,<br>
                  <strong style="color: #0f172a;">Team ${website_name}</strong><br>
                  <a href="${website_url}" style="color: #64748b; font-size: 13px; text-decoration: none;">${website_url}</a>
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

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: customer_email,
      subject: `Your Villa Booking Is Confirmed! 🎉 [${booking_id}]`,
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      console.error("[resend] Error sending booking confirmation email:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    console.log("[resend] Confirmation email sent successfully:", data?.id);
    return NextResponse.json({ success: true, emailId: data?.id });
  } catch (err) {
    console.error("[resend] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
