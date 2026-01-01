"use client";
import { useCart } from "@/context/CartContext";
import GopuramHeader from "@/components/GopuramHeader";
import { useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CustomerDetails {
    name: string;
    phone: string;
    address: string;
    email: string;
}

export default function CheckoutPage() {
    const { items, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [details, setDetails] = useState<CustomerDetails>({ name: "", phone: "", address: "", email: "" });
    const [paymentMethod, setPaymentMethod] = useState<"ONLINE" | "COD">("ONLINE");
    const [isProcessing, setIsProcessing] = useState(false);

    if (items.length === 0) {
        return (
            <main className="min-h-screen bg-ivory">
                <GopuramHeader />
                <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                    <h2 className="text-2xl font-serif text-gray-400 mb-4">Your cart is empty</h2>
                    <button
                        onClick={() => router.push("/")}
                        className="text-templeGreen underline"
                    >
                        Go back to Home
                    </button>
                </div>
            </main>
        );
    }

    const handleOrderPlacement = async () => {
        if (!details.name || !details.phone || !details.address) {
            alert("Please fill in all details.");
            return;
        }
        setIsProcessing(true);

        if (paymentMethod === "COD") {
            await processCodOrder();
        } else {
            processOnlineOrder();
        }
    };

    const processCodOrder = async () => {
        try {
            const orderId = "ORD-" + Math.floor(Math.random() * 100000);

            const res = await fetch("/api/orders/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customer: details.name,
                    phone: details.phone,
                    address: details.address,
                    email: details.email,
                    amount: cartTotal,
                    items: items.map(i => `${i.name} x${i.quantity}`).join(", "),
                    paymentId: "COD",
                    paymentMethod: "COD",
                    orderId: orderId,
                    awb: "PENDING", // Will be updated by backend or separate process in real app
                    status: "Pending"
                })
            });

            if (!res.ok) throw new Error("Order creation failed");

            const data = await res.json();
            clearCart();
            router.push(`/track/${data.orderId}`);
        } catch (error) {
            console.error(error);
            alert("Failed to place order. Connection Check: Is MongoDB Connected?");
            setIsProcessing(false);
        }
    };

    const processOnlineOrder = async () => {
        const res = await fetch("/api/razorpay", { method: "POST" });
        const order = await res.json();

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: cartTotal * 100, // Razorpay uses paisa
            currency: "INR",
            name: "Vishnavi Organics",
            description: "Cart Checkout",
            order_id: order.id,
            prefill: {
                name: details.name,
                email: details.email,
                contact: details.phone
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            handler: async function (response: any) {
                try {
                    const saveRes = await fetch("/api/orders/create", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            customer: details.name,
                            phone: details.phone,
                            address: details.address,
                            email: details.email,
                            amount: cartTotal,
                            items: items.map(i => `${i.name} x${i.quantity}`).join(", "),
                            paymentId: response.razorpay_payment_id,
                            paymentMethod: "ONLINE",
                            orderId: order.id,
                            awb: "PENDING",
                            status: "Paid/Processing"
                        })
                    });

                    if (!saveRes.ok) throw new Error("Failed to save order");
                    const data = await saveRes.json();

                    clearCart();
                    router.push(`/track/${data.orderId}`);
                } catch (e) {
                    console.error("Error saving order", e);
                    alert("Payment success but failed to save order. Contact support.");
                }
            },
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
        setIsProcessing(false);
    };

    return (
        <main className="min-h-screen bg-ivory">
            <GopuramHeader />
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />

            <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left: Form */}
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-2xl font-serif text-templeGreen mb-6">Shipping Information</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-templeGreen"
                                value={details.name}
                                onChange={e => setDetails({ ...details, name: e.target.value })}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="tel"
                                    placeholder="Phone"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-templeGreen"
                                    value={details.phone}
                                    onChange={e => setDetails({ ...details, phone: e.target.value })}
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-templeGreen"
                                    value={details.email}
                                    onChange={e => setDetails({ ...details, email: e.target.value })}
                                />
                            </div>
                            <textarea
                                placeholder="Address"
                                rows={3}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-templeGreen resize-none"
                                value={details.address}
                                onChange={e => setDetails({ ...details, address: e.target.value })}
                            ></textarea>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-2xl font-serif text-templeGreen mb-6">Payment Method</h2>
                        <div className="space-y-3">
                            <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${paymentMethod === 'ONLINE' ? 'border-templeGreen bg-green-50' : 'border-gray-200'}`}>
                                <input type="radio" name="pay" checked={paymentMethod === 'ONLINE'} onChange={() => setPaymentMethod('ONLINE')} className="text-templeGreen focus:ring-templeGreen" />
                                <div>
                                    <p className="font-bold">Pay Online</p>
                                    <p className="text-xs text-gray-500">Credit/Debit Cards, UPI</p>
                                </div>
                            </label>
                            <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${paymentMethod === 'COD' ? 'border-templeGreen bg-green-50' : 'border-gray-200'}`}>
                                <input type="radio" name="pay" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="text-templeGreen focus:ring-templeGreen" />
                                <div>
                                    <p className="font-bold">Cash on Delivery</p>
                                    <p className="text-xs text-gray-500">Pay at your doorstep</p>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Right: Order Summary */}
                <div>
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-jaggeryBrown/20 sticky top-32">
                        <h2 className="text-xl font-serif text-templeGreen mb-6 border-b border-gray-100 pb-4">Order Summary</h2>
                        <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                            {items.map(item => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                        {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-sm text-gray-800">{item.name}</p>
                                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-medium text-sm">₹{item.price * item.quantity}</p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span>₹{cartTotal}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-jaggeryBrown border-t border-dashed border-gray-200 pt-4 mt-2">
                                <span>Total</span>
                                <span>₹{cartTotal}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleOrderPlacement}
                            disabled={isProcessing}
                            className="w-full mt-8 bg-templeGreen text-white py-4 rounded-lg font-serif text-lg hover:bg-green-800 transition shadow-lg disabled:opacity-70"
                        >
                            {isProcessing ? "Processing..." : `Place Order (₹${cartTotal})`}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
