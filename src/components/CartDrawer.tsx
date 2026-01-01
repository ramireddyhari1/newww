"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
    const { items, isCartOpen, setCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={() => setCartOpen(false)}
            />

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-ivory h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                <div className="p-6 bg-templeGreen text-white flex justify-between items-center shadow-md">
                    <h2 className="text-xl font-serif">Your Cart ({items.length})</h2>
                    <button
                        onClick={() => setCartOpen(false)}
                        className="text-white/80 hover:text-white text-2xl"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {items.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">
                            <p className="text-4xl mb-4">🛒</p>
                            <p>Your cart is empty.</p>
                            <button
                                onClick={() => setCartOpen(false)}
                                className="mt-4 text-templeGreen font-bold hover:underline"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="flex gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <div className="w-20 h-20 bg-gray-50 rounded-md relative overflow-hidden flex-shrink-0">
                                    {item.image ? (
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-xs text-gray-400">No Img</div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-serif text-jaggeryBrown font-bold">{item.name}</h3>
                                    <p className="text-sm text-gray-500">₹{item.price}</p>

                                    <div className="flex items-center gap-3 mt-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200"
                                        >
                                            -
                                        </button>
                                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-gray-400 hover:text-red-500 self-start"
                                >
                                    🗑️
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                        <div className="flex justify-between items-center mb-4 text-lg">
                            <span className="text-gray-600">Total</span>
                            <span className="font-bold text-templeGreen text-xl">₹{cartTotal}</span>
                        </div>
                        <Link
                            href="/checkout"
                            onClick={() => setCartOpen(false)}
                            className="block w-full bg-jaggeryBrown text-white text-center py-4 rounded-lg font-serif font-bold hover:bg-brown-800 transition shadow-lg"
                        >
                            Proceed to Buy
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
