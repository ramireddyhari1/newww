"use client";
import { useState } from "react";
import GopuramHeader from "@/components/GopuramHeader";
import AnimatedTempleDivider from "@/components/AnimatedTempleDivider";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function FarmerJoin() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        village: "",
        landSize: "",
        crops: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await addDoc(collection(db, "farmer_applications"), {
                ...formData,
                status: "pending",
                createdAt: serverTimestamp(),
            });
            setSuccess(true);
            setFormData({ name: "", phone: "", village: "", landSize: "", crops: "" });
        } catch (error) {
            console.error("Error submitting application:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-ivory">
            <GopuramHeader />

            <section className="max-w-3xl mx-auto px-6 py-20">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-serif text-templeGreen mb-4">Empowering Farmers</h1>
                    <p className="text-lg text-gray-600">Join the Vishnavi Organics network. Fair prices, direct access, and community growth.</p>
                    <div className="mt-8">
                        <AnimatedTempleDivider />
                    </div>
                </div>

                <div className="bg-white p-8 rounded-xl border border-jaggeryBrown/20 shadow-xl relative overflow-hidden">
                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-20 h-20 border-t-8 border-r-8 border-templeGreen/10 rounded-full -mr-10 -mt-10" />

                    {success ? (
                        <div className="text-center py-10">
                            <div className="text-5xl mb-4">🌾</div>
                            <h3 className="text-2xl font-bold text-templeGreen mb-2">Registration Successful!</h3>
                            <p className="text-gray-600">Welcome to the family. Our field officer will visit your farm shortly for verification.</p>
                            <button
                                onClick={() => setSuccess(false)}
                                className="mt-6 text-jaggeryBrown underline hover:text-templeGreen"
                            >
                                Register another farmer
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Farmer Name (Raithu Peru)</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-templeGreen focus:border-transparent outline-none"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        required
                                        type="tel"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-templeGreen focus:border-transparent outline-none"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Village / Mandal</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-templeGreen focus:border-transparent outline-none"
                                        value={formData.village}
                                        onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Land Size (Acres)</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-templeGreen focus:border-transparent outline-none"
                                        placeholder="e.g. 2.5 acres"
                                        value={formData.landSize}
                                        onChange={(e) => setFormData({ ...formData, landSize: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Crops</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-templeGreen focus:border-transparent outline-none"
                                        placeholder="e.g. Rice, Turmeric"
                                        value={formData.crops}
                                        onChange={(e) => setFormData({ ...formData, crops: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-jaggeryBrown text-white font-bold py-4 rounded-lg hover:bg-[#6d4621] transition duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? "Registering..." : "Join as Farmer"}
                            </button>

                            <p className="text-center text-xs text-gray-500 mt-4">
                                Vishnavi Organics ensures fair price guarantee for all registered partners.
                            </p>
                        </form>
                    )}
                </div>
            </section>
        </main>
    );
}
