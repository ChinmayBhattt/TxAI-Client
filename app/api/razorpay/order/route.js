import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request) {
  try {
    const { amount, bookingId, villaName } = await request.json();

    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_TJ0s4Jf9hX9tiU",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "Ynor1jTKCiq04m99O3oxRW5M",
    });

    const options = {
      amount: Math.round(amount * 100), // amount in paise
      currency: "INR",
      receipt: bookingId || `receipt_${Date.now()}`,
      notes: {
        bookingId: bookingId,
        villaName: villaName || "Staycation Villa",
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_TJ0s4Jf9hX9tiU",
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
