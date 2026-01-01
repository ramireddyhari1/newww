import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await dbConnect();
        // Fetch all orders, sorted by newest first
        const orders = await Order.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, orders });
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 });
    }
}
