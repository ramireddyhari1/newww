import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

export const dynamic = 'force-dynamic';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ orderId: string }> }
) {
    try {
        await dbConnect();
        const { orderId } = await params;

        // Find by custom orderId field, not _id
        const order = await Order.findOne({ orderId: orderId });

        if (!order) {
            return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, order });
    } catch (error) {
        console.error("Fetch order error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
