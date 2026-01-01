"use client";
import GopuramHeader from "@/components/GopuramHeader";
import { useState } from "react";

// Mock Data
const mockCrops = [
    { id: 1, crop: "Turmeric (Haldi)", acres: 1.5, sowedDate: "2025-06-15", harvestDate: "2026-03-15", status: "Growing" },
    { id: 2, crop: "Black Rice", acres: 1.0, sowedDate: "2025-07-01", harvestDate: "2025-11-30", status: "Ready for Harvest" },
];

export default function FarmerDashboard() {
    const [showAddCrop, setShowAddCrop] = useState(false);

    return (
        <main className="min-h-screen bg-ivory">
            <GopuramHeader />

            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-serif text-templeGreen">Farmer Portal (Raithu Vedika)</h1>
                        <p className="text-gray-600">ID: FID-8821 | Location: Guntur</p>
                    </div>
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold border border-green-200">
                        ✅ Verified Partner
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 mb-1">Total Earnings</p>
                        <p className="text-3xl font-bold text-templeGreen">₹85,000</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 mb-1">Next Payment</p>
                        <p className="text-3xl font-bold text-jaggeryBrown">₹12,400</p>
                        <p className="text-xs text-gray-400">Due: 15 Oct 2025</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 mb-1">Active Crops</p>
                        <p className="text-3xl font-bold text-templeGreen">2</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-700">My Crops (Panta Vivaralu)</h3>
                        <button
                            onClick={() => setShowAddCrop(!showAddCrop)}
                            className="text-sm bg-templeGreen text-white px-4 py-2 rounded hover:bg-[#244a40]"
                        >
                            + Add New Crop
                        </button>
                    </div>

                    {showAddCrop && (
                        <div className="p-6 bg-gray-50 border-b border-gray-200">
                            <p className="text-sm text-gray-500 mb-2">Update us about your new sowing to get advance bookings.</p>
                            <div className="flex gap-4">
                                <input type="text" placeholder="Crop Name" className="flex-1 p-2 border rounded" />
                                <input type="date" className="p-2 border rounded" />
                                <button className="bg-jaggeryBrown text-white px-6 rounded">Save</button>
                            </div>
                        </div>
                    )}

                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-sm">
                            <tr>
                                <th className="px-6 py-3">Crop Name</th>
                                <th className="px-6 py-3">Acres</th>
                                <th className="px-6 py-3">Harvest Date (Est)</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockCrops.map(c => (
                                <tr key={c.id}>
                                    <td className="px-6 py-4 font-medium">{c.crop}</td>
                                    <td className="px-6 py-4">{c.acres}</td>
                                    <td className="px-6 py-4">{c.harvestDate}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium 
                                    ${c.status === 'Ready for Harvest' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-700'}`}>
                                            {c.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
