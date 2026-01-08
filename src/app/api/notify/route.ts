// import twilio from "twilio";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { type, phone, orderId, amount, customerName } = body;

        // Mock Notification Logic
        if (type === 'admin') {
            console.log(`🚨 [ADMIN ALERT] New Order Received! ID: ${orderId} | Amount: ₹${amount}`);
            // In real app: await sendAdminSMS(process.env.ADMIN_PHONE, `New Order ${orderId}...`);
        } else if (type === 'customer') {
            const message = `Namaste ${customerName}, your order ${orderId} is confirmed! It will be shipped shortly.`;
            console.log(`🔔 [CUSTOMER SMS] Sent to ${phone}: "${message}"`);
            // In real app: await sendSMS(phone, message);
        } else {
            console.log(`[Generic Notification] To: ${phone}`);
        }

        return NextResponse.json({ success: true });
    } catch (_error) {
        return NextResponse.json({ error: "Failed to send notification" }, { status: 500 });
    }
}
