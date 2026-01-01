"use client";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface AddToCartButtonProps {
    id: string;
    name: string;
    price: number;
    image?: string;
    className?: string;
}

export default function AddToCartButton({ id, name, price, image, className }: AddToCartButtonProps) {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = () => {
        addToCart({ id, name, price, image });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAdd();
            }}
            className={`transition-all duration-300 font-serif ${className} ${isAdded
                    ? "bg-green-600 text-white scale-95"
                    : "bg-templeGreen text-white hover:bg-green-800"
                }`}
        >
            {isAdded ? "Added ✔" : "Add to Cart"}
        </button>
    );
}
