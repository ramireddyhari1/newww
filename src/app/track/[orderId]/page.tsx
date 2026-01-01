"use client";
import GopuramHeader from "@/components/GopuramHeader";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface TrackingEvent {
    status: string;
    location: string;
    timestamp: string;
    completed: boolean;
}

export default function TrackingPage() {
    const params = useParams();
    const orderId = params.orderId as string;
    const [history, setHistory] = useState<TrackingEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [awb, setAwb] = useState("Fetching...");

    useEffect(() => {
        const fetchOrderAndTracking = async () => {
            try {
                // 1. Fetch Order Details from MongoDB API
                const orderRes = await fetch(`/api/orders/${orderId}`);
                const orderData = await orderRes.json();

                if (orderData.success && orderData.order) {
                    const remoteAwb = orderData.order.awb;
                    setAwb(remoteAwb || "PENDING");

                    if (remoteAwb && remoteAwb !== "PENDING") {
                        // 2. Fetch Tracking History from Shipment API
                        const trackRes = await fetch(`/api/shipment?awb=${remoteAwb}`);
                        const trackData = await trackRes.json();
                        if (trackData.history) {
                            setHistory(trackData.history);
                        }
                    } else {
                        setHistory([{
                            status: "Order Received",
                            location: "Online",
                            timestamp: new Date(orderData.order.createdAt).toLocaleString(),
                            completed: true
                        }]);
                    }
                } else {
                    setAwb("Order Not Found");
                    setHistory([]);
                }
            } catch (error) {
                console.error("Tracking fetch error", error);
                setAwb("Error");
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrderAndTracking();
        }
    }, [orderId]);

    return (
        <main className="min-h-screen bg-ivory">
            <GopuramHeader />

            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                    <div className="flex justify-between items-start mb-8 border-b border-gray-100 pb-6">
                        <div>
                            <h1 className="text-2xl font-serif text-templeGreen mb-2">Track Your Order</h1>
                            <p className="text-gray-500">Order ID: <span className="font-mono font-bold text-black">{orderId}</span></p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-400 uppercase tracking-wide">AWB Number</p>
                            <p className="font-mono text-lg font-bold text-jaggeryBrown">{awb}</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-10 text-gray-400">Loading tracking status...</div>
                    ) : (
                        <div className="relative border-l-2 border-gray-200 ml-4 space-y-8 pl-8 py-2">
                            {history.length > 0 ? history.map((event, index) => (
                                <div key={index} className="relative">
                                    {/* Timeline Dot */}
                                    <div className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-white shadow-sm 
                                        ${event.completed ? 'bg-green-600' : 'bg-gray-300'}`}
                                    />

                                    <div className={`transition-all duration-500 ${event.completed ? 'opacity-100' : 'opacity-50'}`}>
                                        <h3 className={`font-bold text-lg ${event.completed ? 'text-green-800' : 'text-gray-500'}`}>
                                            {event.status}
                                        </h3>
                                        <p className="text-gray-600">{event.location}</p>
                                        <p className="text-xs text-gray-400 mt-1">{event.timestamp}</p>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-gray-500 italic">No tracking updates yet.</div>
                            )}
                        </div>
                    )}

                    <div className="mt-10 bg-green-50 p-4 rounded-lg flex items-center gap-4 text-green-800 border border-green-100">
                        <span className="text-2xl">🚚</span>
                        <div>
                            <p className="font-bold">Estimated Delivery</p>
                            <p className="text-sm">Standard Shipping (3-5 Days)</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
