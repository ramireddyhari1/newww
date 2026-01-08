import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();

        // Basic validation
        if (!body.customer || !body.amount || !body.paymentId) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        const newOrder = await Order.create(body);

        // Note: We could trigger notifications here directly, 
        // but for now we'll return success and let the client trigger them 
        // to maintain the existing flow structure, or we can move it here.
        // Let's keep it simple: Save and return.

        return NextResponse.json({ success: true, orderId: newOrder.orderId, mongoId: newOrder._id });
    } catch (error) {
        console.error("Order creation failed:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
