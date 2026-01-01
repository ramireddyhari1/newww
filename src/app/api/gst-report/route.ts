import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET() {
    try {
        const snap = await getDocs(collection(db, "orders"));
        const report = snap.docs.map(doc => doc.data());

        return NextResponse.json(report);
    } catch (_error) {
        return NextResponse.json([]);
    }
}
