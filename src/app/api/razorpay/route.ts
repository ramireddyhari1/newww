import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST() {
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const order = await instance.orders.create({
        amount: 50000, // Amount in paise (500 INR demo)
        currency: "INR",
    });

    return NextResponse.json(order);
}
