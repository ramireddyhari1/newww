import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

// Define Admin Schema if not exists, or use raw collection for now as per prompt
// For consistency with the existing project, I'll use Mongoose connection
// but interact with the collection directly to match the user's snippet logic closely
// while using the existing dbConnect helper.

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const db = mongoose.connection.db;
        if (!db) throw new Error("Database not connected");

        // Fetch the specific admin user 'admin' or 'superadmin'
        // The prompt says: findOne({ role: 'superadmin' })
        const admin = await db.collection('admins').findOne({ role: 'superadmin' });

        return NextResponse.json({ admin }, { status: 200 });
    } catch (error) {
        console.error("Admin fetch error:", error);
        return NextResponse.json({ error: 'Failed to fetch admin' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const adminData = await request.json();
        await dbConnect();
        const db = mongoose.connection.db;
        if (!db) throw new Error("Database not connected");

        const result = await db.collection('admins').insertOne({
            ...adminData,
            createdAt: new Date()
        });

        return NextResponse.json({ success: true, adminId: result.insertedId }, { status: 201 });
    } catch (error) {
        console.error("Admin create error:", error);
        return NextResponse.json({ error: 'Failed to create admin' }, { status: 500 });
    }
}
