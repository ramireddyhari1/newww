import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            return NextResponse.json({ status: "error", message: "MONGODB_URI is not defined in env" }, { status: 500 });
        }

        if (mongoose.connection.readyState === 1) {
            return NextResponse.json({ status: "ok", message: "Already connected" });
        }

        await mongoose.connect(uri);
        return NextResponse.json({ status: "ok", message: "Connected successfully via Mongoose" });
    } catch (e: unknown) {
        console.error("DB Connection Error:", e);
        const errorMessage = e instanceof Error ? e.message : "Unknown error";
        const errorCode = (e as { code?: string | number }).code;
        return NextResponse.json({
            status: "error",
            message: errorMessage,
            code: errorCode,
            envVarDefined: !!process.env.MONGODB_URI,
            envVarLength: process.env.MONGODB_URI?.length
        }, { status: 200 }); // Return 200 to see body
    }
}
