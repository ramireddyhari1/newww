"use client";
import GopuramHeader from "@/components/GopuramHeader";
import { useState } from "react";

// Mock Data
const mockStock = [
    { id: 1, item: "Organic Jaggery (1kg)", quantity: 45, threshold: 20 },
    { id: 2, item: "Black Rice (1kg)", quantity: 12, threshold: 15 },
    { id: 3, item: "Wild Raw Honey (500g)", quantity: 28, threshold: 10 },
];

export default function FranchiseDashboard() {
    const [orderMode, setOrderMode] = useState(false);

    return (
        <main className="min-h-screen bg-ivory">
            <GopuramHeader />

            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-serif text-templeGreen">Franchise Portal</h1>
                        <p className="text-gray-600">Store ID: VISH-HYD-001 | Location: Hyderabad</p>
                    </div>
                    <button
                        onClick={() => setOrderMode(!orderMode)}
                        className="bg-jaggeryBrown text-white px-6 py-3 rounded-lg hover:bg-[#6d4621] transition"
                    >
                        {orderMode ? "View Dashboard" : "Place Bulk Order"}
                    </button>
                </div>

                {orderMode ? (
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                        <h2 className="text-2xl font-serif text-templeGreen mb-6">New Replenishment Order</h2>
                        <div className="space-y-4">
                            {mockStock.map(stock => (
                                <div key={stock.id} className="flex items-center justify-between p-4 border-b border-gray-100">
                                    <div>
                                        <p className="font-medium text-lg">{stock.item}</p>
                                        <p className="text-sm text-gray-500">Current Stock: {stock.quantity} units</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <label className="text-sm">Order Qty:</label>
                                        <input type="number" className="w-20 p-2 border border-gray-300 rounded text-center" placeholder="0" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 text-right">
                            <button className="bg-templeGreen text-white px-8 py-3 rounded-lg font-bold shadow hover:bg-[#244a40]">
                                Submit Order Request
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* LOW STOCK ALERT */}
                        <div className="col-span-full mb-4">
                            {mockStock.filter(s => s.quantity < s.threshold).map(s => (
                                <div key={s.id} className="bg-red-50 border-l-4 border-red-500 p-4 mb-2 flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-red-700">Low Stock Alert</p>
                                        <p className="text-sm text-red-600">{s.item} is below threshold ({s.quantity} left).</p>
                                    </div>
                                    <button onClick={() => setOrderMode(true)} className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded border border-red-200">Restock Now</button>
                                </div>
                            ))}
                        </div>

                        {/* Stat Cards */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <p className="text-gray-500 mb-1">Total Sales (This Month)</p>
                            <p className="text-3xl font-bold text-templeGreen">₹1,24,500</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <p className="text-gray-500 mb-1">active Orders</p>
                            <p className="text-3xl font-bold text-jaggeryBrown">3</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <p className="text-gray-500 mb-1">Customer Happiness</p>
                            <p className="text-3xl font-bold text-yellow-600">4.8/5</p>
                        </div>

                        {/* Current Stock Table */}
                        <div className="col-span-full bg-white rounded-xl shadow-sm border border-gray-200 mt-6 overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700">
                                Live Inventory Status
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-500 text-sm">
                                    <tr>
                                        <th className="px-6 py-3">Item Name</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3">Quantity</th>
                                        <th className="px-6 py-3">Threshold</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {mockStock.map(s => (
                                        <tr key={s.id}>
                                            <td className="px-6 py-4">{s.item}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.quantity < s.threshold ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                                    {s.quantity < s.threshold ? 'Low Stock' : 'Good'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-mono">{s.quantity}</td>
                                            <td className="px-6 py-4 text-gray-400">{s.threshold}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
