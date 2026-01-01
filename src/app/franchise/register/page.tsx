"use client";
import { useState } from "react";
import GopuramHeader from "@/components/GopuramHeader";
import AnimatedTempleDivider from "@/components/AnimatedTempleDivider";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function FranchiseRegister() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        businessDetails: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await addDoc(collection(db, "franchise_applications"), {
                ...formData,
                status: "pending",
                createdAt: serverTimestamp(),
            });
            setSuccess(true);
            setFormData({ name: "", email: "", phone: "", location: "", businessDetails: "" });
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
                    <h1 className="text-4xl font-serif text-templeGreen mb-4">Partner With Us</h1>
                    <p className="text-lg text-gray-600">Join the Vishnavi Organics family and bring pure, traditional products to your community.</p>
                    <div className="mt-8">
                        <AnimatedTempleDivider />
                    </div>
                </div>

                <div className="bg-white p-8 rounded-xl border border-jaggeryBrown/20 shadow-xl relative overflow-hidden">
                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-templeGreen rounded-tr-xl opacity-20" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-templeGreen rounded-bl-xl opacity-20" />

                    {success ? (
                        <div className="text-center py-10">
                            <div className="text-5xl mb-4">🕉️</div>
                            <h3 className="text-2xl font-bold text-templeGreen mb-2">Application Submitted!</h3>
                            <p className="text-gray-600">We have received your details. Our team will contact you shortly.</p>
                            <button
                                onClick={() => setSuccess(false)}
                                className="mt-6 text-jaggeryBrown underline hover:text-templeGreen"
                            >
                                Submit another application
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-templeGreen focus:border-transparent outline-none"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
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
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-templeGreen focus:border-transparent outline-none"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Proposed Location (City/Area)</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-templeGreen focus:border-transparent outline-none"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Business Details / Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-templeGreen focus:border-transparent outline-none"
                                    placeholder="Tell us about your current business or why you want to partner with us..."
                                    value={formData.businessDetails}
                                    onChange={(e) => setFormData({ ...formData, businessDetails: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-templeGreen text-white font-bold py-4 rounded-lg hover:bg-[#244a40] transition duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? "Submitting..." : "Submit Application"}
                            </button>

                            <p className="text-center text-xs text-gray-500 mt-4">
                                By submitting, you agree to our terms of partnership.
                            </p>
                        </form>
                    )}
                </div>
            </section>
        </main>
    );
}
