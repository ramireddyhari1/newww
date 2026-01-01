"use client";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/admin");
        } catch (err) {
            setError("Invalid credentials or admin access denied.");
        }
    };

    const handleGoogleLogin = async () => {
        setError("");
        try {
            await signInWithPopup(auth, googleProvider);
            router.push("/admin");
        } catch (err) {
            console.error(err);
            setError("Google sign-in failed. Try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-ivory pattern-bg">
            <div className="bg-white p-8 rounded-xl shadow-2xl border border-jaggeryBrown max-w-md w-full relative overflow-hidden">
                {/* Decorative corner */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-templeGreen rounded-tl-xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-templeGreen rounded-br-xl" />

                <div className="text-center mb-8">
                    <div className="inline-block p-4 rounded-full bg-ivory mb-4 shadow-inner">
                        <Image src="/logo.png" alt="Logo" width={60} height={60} className="object-contain" />
                    </div>
                    <h1 className="text-3xl font-serif text-templeGreen">Admin Login</h1>
                    <p className="text-gray-500 text-sm mt-2">Secure Gateway</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-jaggeryBrown mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-templeGreen focus:ring-2 focus:ring-templeGreen/20 outline-none transition-all"
                            placeholder="admin@vishnavi.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-jaggeryBrown mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-templeGreen focus:ring-2 focus:ring-templeGreen/20 outline-none transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-templeGreen text-white py-3 rounded-lg font-serif text-lg hover:bg-green-800 transition-colors shadow-lg"
                    >
                        Enter Portal
                    </button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
                        <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center gap-3 shadow-sm"
                    >
                        <Image src="/google-icon.svg" alt="Google" width={20} height={20} className="w-5 h-5" />
                        Sign in with Google
                    </button>
                </form>
            </div>
        </div>
    );
}
