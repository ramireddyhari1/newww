"use client";
import Script from "next/script";
// import { db } from "@/lib/firebase"; // Removed Firestore
// import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Removed Firestore
import { useState } from "react";

interface CustomerDetails {
    name: string;
    phone: string;
    address: string;
    email: string;
}

export default function BuyButton({ amount: _amount }: { amount: number }) {
    const [showModal, setShowModal] = useState(false);
    const [details, setDetails] = useState<CustomerDetails>({ name: "", phone: "", address: "", email: "" });
    const [paymentMethod, setPaymentMethod] = useState<"ONLINE" | "COD">("ONLINE");
    const [isProcessing, setIsProcessing] = useState(false);

    const handleOrderPlacement = async () => {
        if (!details.name || !details.phone || !details.address) {
            alert("Please fill in all details to proceed.");
            return;
        }
        setShowModal(false);
        setIsProcessing(true);

        if (paymentMethod === "COD") {
            await processCodOrder();
        } else {
            processOnlineOrder();
        }
        setIsProcessing(false);
    };

    const generateAWB = async (orderId: string) => {
        try {
            const shipRes = await fetch("/api/shipment", {
                method: "POST",
                body: JSON.stringify({ invoiceNo: orderId })
            });
            const shipData = await shipRes.json();
            if (shipData.success) return shipData.awb;
        } catch (e) {
            console.error("AWB Generation failed", e);
        }
        return "PENDING";
    }

    const triggerNotifications = async (orderId: string, amount: number) => {
        try {
            // 1. Notify Customer
            await fetch("/api/notify", {
                method: "POST",
                body: JSON.stringify({
                    type: "customer",
                    phone: details.phone,
                    orderId: orderId,
                    customerName: details.name
                })
            });

            // 2. Alert Admin
            await fetch("/api/notify", {
                method: "POST",
                body: JSON.stringify({
                    type: "admin",
                    orderId: orderId,
                    amount: amount
                })
            });
        } catch (e) {
            console.error("Notification trigger failed", e);
        }
    };

    const processCodOrder = async () => {
        try {
            const orderId = "ORD-COD-" + Math.floor(Math.random() * 10000);

            // Generate AWB
            const awb = await generateAWB(orderId);

            // Save to MongoDB via API
            const saveRes = await fetch("/api/orders/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customer: details.name,
                    phone: details.phone,
                    address: details.address,
                    email: details.email,
                    amount: 200,
                    items: "Organic Bundle (COD)",
                    paymentId: "COD",
                    paymentMethod: "COD",
                    orderId: orderId,
                    awb: awb,
                    status: "Pending"
                })
            });

            if (!saveRes.ok) throw new Error("Failed to save order");

            // Trigger Alerts
            await triggerNotifications(orderId, 200);

            alert(`Order placed successfully! Tracking AWB: ${awb}`);
            window.location.href = "/track/" + orderId;
        } catch (e) {
            console.error("Error saving COD order", e);
            alert("Failed to place order. Please try again.");
        }
    };

    const processOnlineOrder = async () => {
        const res = await fetch("/api/razorpay", { method: "POST" });
        const order = await res.json();

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: "INR",
            name: "Vishnavi Organics",
            description: "Organic Product Purchase",
            order_id: order.id,
            prefill: {
                name: details.name,
                email: details.email,
                contact: details.phone
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            handler: async function (response: any) {
                try {
                    // Generate AWB
                    const awb = await generateAWB(order.id);

                    // Save to MongoDB via API
                    const saveRes = await fetch("/api/orders/create", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            customer: details.name,
                            phone: details.phone,
                            address: details.address,
                            email: details.email,
                            amount: order.amount / 100,
                            items: "Organic Bundle",
                            paymentId: response.razorpay_payment_id,
                            paymentMethod: "ONLINE",
                            orderId: order.id,
                            awb: awb,
                            status: "Paid/Processing"
                        })
                    });

                    if (!saveRes.ok) throw new Error("Failed to save order");

                    // Trigger Alerts
                    await triggerNotifications(order.id, order.amount / 100);

                    alert(`Payment Successful! Order ID: ${order.id}. AWB: ${awb}`);
                    window.location.href = `/track/${order.id}`;
                } catch (e) {
                    console.error("Error saving order", e);
                    alert("Payment success but failed to save order. Contact support.");
                }
            },
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
    };

    return (
        <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="font-serif text-lg text-templeGreen mb-4">Select Payment Method</h3>

            <div className="space-y-3 mb-6">
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer bg-white hover:border-templeGreen transition">
                    <input
                        type="radio"
                        name="payment"
                        className="w-5 h-5 text-templeGreen focus:ring-templeGreen"
                        checked={paymentMethod === "ONLINE"}
                        onChange={() => setPaymentMethod("ONLINE")}
                    />
                    <div className="flex-1">
                        <p className="font-bold text-gray-800">Online Payment</p>
                        <p className="text-xs text-gray-500">Cards, UPI, Netbanking (via Razorpay)</p>
                    </div>
                </label>

                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer bg-white hover:border-templeGreen transition">
                    <input
                        type="radio"
                        name="payment"
                        className="w-5 h-5 text-templeGreen focus:ring-templeGreen"
                        checked={paymentMethod === "COD"}
                        onChange={() => setPaymentMethod("COD")}
                        id="cod-radio"
                    />
                    <div className="flex-1">
                        <p className="font-bold text-gray-800">Cash on Delivery (COD)</p>
                        <p className="text-xs text-gray-500">Pay cash/UPI upon delivery (Max ₹2000)</p>
                    </div>
                </label>
            </div>

            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />

            <button
                onClick={() => setShowModal(true)}
                disabled={isProcessing}
                className="w-full bg-templeGreen text-white px-8 py-4 rounded-lg font-serif text-lg hover:bg-green-800 transition-colors shadow-lg disabled:opacity-50"
            >
                {isProcessing ? "Processing..." : "Buy Now — ₹500"}
            </button>
            <p className="text-center text-xs text-gray-500 mt-3">Secure payment powered by Razorpay</p>

            {/* Customer Details Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>

                        <h3 className="text-xl font-serif text-templeGreen mb-1">Shipping Details</h3>
                        <p className="text-sm text-gray-500 mb-6">Where should we create your order?</p>

                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-templeGreen"
                                value={details.name}
                                onChange={e => setDetails({ ...details, name: e.target.value })}
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-templeGreen"
                                value={details.phone}
                                onChange={e => setDetails({ ...details, phone: e.target.value })}
                            />
                            <input
                                type="email"
                                placeholder="Email Address (Optional)"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-templeGreen"
                                value={details.email}
                                onChange={e => setDetails({ ...details, email: e.target.value })}
                            />
                            <textarea
                                placeholder="Delivery Address"
                                rows={3}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-templeGreen resize-none"
                                value={details.address}
                                onChange={e => setDetails({ ...details, address: e.target.value })}
                            ></textarea>

                            <button
                                onClick={handleOrderPlacement}
                                disabled={isProcessing}
                                className="w-full bg-jaggeryBrown text-white font-bold py-3 rounded-lg hover:bg-brown-700 transition disabled:opacity-50"
                            >
                                {isProcessing ? "Processing..." : `Proceed to ${paymentMethod === 'COD' ? 'Place Order' : 'Pay'}`}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
