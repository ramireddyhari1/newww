// import axios from "axios";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// Mock Tracking Data Generator
const generateTrackingHistory = (awb: string) => {
  return [
    { status: "Order Placed", location: "Online", timestamp: "2024-10-28 10:00 AM", completed: true },
    { status: "Picked Up", location: "Vishnavi Warehouse, Guntur", timestamp: "2024-10-29 02:30 PM", completed: true },
    { status: "In Transit", location: "Vijayawada Hub", timestamp: "2024-10-29 08:15 PM", completed: true },
    { status: "Out for Delivery", location: "Hyderabad", timestamp: "Expected Today", completed: false },
    { status: "Delivered", location: "Customer Address", timestamp: "Pending", completed: false },
  ];
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { invoiceNo } = body;

    // Simulate Shiprocket API call
    console.log("Creating Shiprocket shipment for", invoiceNo);

    // Mock robust AWB generation
    const mockAwb = "SR" + Math.floor(100000000 + Math.random() * 900000000);

    return NextResponse.json({
      success: true,
      awb: mockAwb,
      courier: "Delhivery",
      estimated_delivery: "3 Days"
    });
  } catch (_error) {
    return NextResponse.json({ error: "Shipment creation failed" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const awb = searchParams.get('awb');

  if (!awb) {
    return NextResponse.json({ error: "AWB Required" }, { status: 400 });
  }

  // Return mock tracking data
  return NextResponse.json({
    awb,
    status: "In Transit",
    history: generateTrackingHistory(awb)
  });
}
