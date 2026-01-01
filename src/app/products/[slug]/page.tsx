import { products } from "@/data/products";
import AnimatedTempleDivider from "@/components/AnimatedTempleDivider";
import BuyButton from "@/components/BuyButton";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = products.find((p) => p.slug === slug);

    if (!product) return <div>Product not found</div>;

    return (
        <section className="px-10 py-20 max-w-4xl mx-auto">
            <h1 className="text-4xl font-serif text-templeGreen text-center">
                {product.name}
            </h1>

            <div className="my-8">
                <AnimatedTempleDivider />
            </div>

            {product.image && (
                <div className="relative h-64 w-full md:w-1/2 mx-auto rounded-xl overflow-hidden shadow-xl border border-jaggeryBrown mb-8">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            <p className="mt-4 text-center text-lg italic text-gray-700 max-w-2xl mx-auto">{product.description}</p>

            <div className="mt-4 text-center">
                <p className="font-semibold text-2xl text-jaggeryBrown">
                    ₹{(product.price * 1.05).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                    (Base: ₹{product.price} + GST 5%: ₹{(product.price * 0.05).toFixed(2)})
                </p>
            </div>

            <div className="flex flex-col items-center gap-4 mt-8 max-w-sm mx-auto">
                <BuyButton amount={product.price} />
                <AddToCartButton
                    id={product.slug}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    className="w-full py-4 rounded-lg shadow-md"
                />
            </div>

            <div className="mt-10 bg-white p-6 rounded-xl border border-dashed border-jaggeryBrown">
                <h3 className="font-serif text-xl mb-4 text-templeGreen">Benefits</h3>
                <ul className="list-disc pl-6 space-y-2">
                    {product.benefits.map((b, i) => (
                        <li key={i}>{b}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
