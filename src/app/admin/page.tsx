"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

// Types
interface Order {
    id: string; // The MongoDB _id or custom orderId
    orderId: string;
    customer: string;
    items: string;
    amount: number;
    status: string;
    createdAt: string;
}

interface Franchise {
    id: string;
    name: string;
    location: string;
    status: string;
}

interface Farmer {
    id: string;
    name: string;
    village: string;
    crops: string;
    status: string;
}

export default function AdminPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("dashboard");

    // Real Data States
    const [orders, setOrders] = useState<Order[]>([]);
    const [franchises, setFranchises] = useState<Franchise[]>([]);
    const [farmers, setFarmers] = useState<Farmer[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [aiInsights, setAiInsights] = useState<any[] | null>(null);
    const router = useRouter();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                router.push("/login");
                return;
            }

            try {
                // In a real app, strict check. For demo, we might allow any auth or check mock
                const snap = await getDoc(doc(db, "users", currentUser.uid));
                if (snap.exists() && snap.data()?.role !== "admin") {
                    // router.push("/"); // Uncomment for strict RBAC
                }
                setUser(currentUser);
            } catch (e) {
                console.error("Error fetching user role", e);
            } finally {
                setLoading(false);
            }
        });

        return () => unsub();
    }, [router]);

    // Fetch Admin Details from MongoDB
    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const res = await fetch("/api/admin");
                const data = await res.json();
                if (data.admin) {
                    // Optionally store admin details in state if needed for UI
                    console.log("Admin Loaded:", data.admin);
                }
            } catch (err) {
                console.error("Failed to fetch admin details", err);
            }
        };
        fetchAdminDetails();
    }, []);

    // Fetch Data from MongoDB API
    useEffect(() => {
        if (!user) return;

        const fetchOrders = async () => {
            try {
                const res = await fetch("/api/orders");
                const data = await res.json();
                if (data.success) {
                    setOrders(data.orders);
                }
            } catch (err) {
                console.error("Failed to fetch orders from API", err);
            }
        };

        fetchOrders();

        // 2. Mock Data for Franchise & Farmers (Move to API later)
        setFarmers([
            { id: "1", name: "Ramesh Babu", village: "Guntur", crops: "Turmeric", status: "Verified" },
            { id: "2", name: "Suresh Reddy", village: "Vijayawada", crops: "Chilli", status: "Pending" }
        ]);

        setFranchises([
            { id: "1", name: "Vizag Organics", location: "Visakhapatnam", status: "Active" },
            { id: "2", name: "Tirupati Naturals", location: "Tirupati", status: "Pending" }
        ]);

    }, [user]);

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/login");
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-templeGreen animate-pulse">Loading Temple Admin...</div>;
    if (!user) return null;

    return (
        <div className="min-h-screen bg-ivory flex">
            {/* Sidebar */}
            <aside className="w-64 bg-templeGreen text-white flex flex-col hidden md:flex">
                <div className="p-6 flex items-center gap-3 border-b border-green-800">
                    <div className="bg-white p-2 rounded-full">
                        <div className="w-6 h-6 bg-jaggeryBrown rounded-full"></div>
                    </div>
                    <span className="font-serif text-xl">Vishnavi Admin</span>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <button onClick={() => setActiveTab("dashboard")} className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === 'dashboard' ? 'bg-green-800' : 'hover:bg-green-700'}`}>Dashboard</button>
                    <button onClick={() => setActiveTab("orders")} className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === 'orders' ? 'bg-green-800' : 'hover:bg-green-700'}`}>Orders</button>
                    <button onClick={() => setActiveTab("franchise")} className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === 'franchise' ? 'bg-green-800' : 'hover:bg-green-700'}`}>Franchises</button>
                    <button onClick={() => setActiveTab("farmers")} className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === 'farmers' ? 'bg-green-800' : 'hover:bg-green-700'}`}>Farmers</button>
                    <button onClick={() => {
                        setActiveTab("ai-insights");
                        if (!aiInsights) {
                            fetch("/api/ai-forecast")
                                .then(res => res.json())
                                .then(data => setAiInsights(data.insights))
                                .catch(err => console.error(err));
                        }
                    }} className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === 'ai-insights' ? 'bg-purple-800' : 'hover:bg-green-700'} flex items-center justify-between`}>
                        <span>AI Insights</span>
                        <span className="bg-purple-400 text-xs px-1 rounded text-white">BETA</span>
                    </button>
                </nav>
                <div className="p-4 border-t border-green-800">
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-600 rounded transition flex items-center gap-2">
                        <span>🚪</span> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-serif text-jaggeryBrown">Dashboard Overview</h1>
                        <p className="text-gray-500">Welcome back, {user.email || "Admin"}</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow border border-gray-200">
                        {new Date().toLocaleDateString()}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    {[
                        { label: "Total Revenue", value: "₹" + orders.reduce((acc, o) => acc + o.amount, 0), color: "bg-green-100 text-green-800" },
                        { label: "Pending Orders", value: orders.filter(o => o.status === 'Pending').length.toString(), color: "bg-yellow-100 text-yellow-800" },
                        { label: "Total Customers", value: "128", color: "bg-blue-100 text-blue-800" },
                        { label: "Low Stock Items", value: "2", color: "bg-red-100 text-red-800" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                            <p className={`text-2xl font-bold ${stat.color} inline-block px-2 py-1 rounded text-sm`}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Recent Orders Table */}
                {(activeTab === 'dashboard' || activeTab === 'orders') && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-serif text-lg text-templeGreen">Recent Orders</h3>
                        </div>
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Order ID</th>
                                    <th className="px-6 py-3 font-medium">Customer</th>
                                    <th className="px-6 py-3 font-medium">Items</th>
                                    <th className="px-6 py-3 font-medium">Amount</th>
                                    <th className="px-6 py-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orders.length === 0 ? (
                                    <tr><td colSpan={5} className="text-center py-6 text-gray-400">No orders found</td></tr>
                                ) : (
                                    orders.map((order) => (
                                        <tr key={order.id || order.orderId} className="hover:bg-ivory/50 transition">
                                            <td className="px-6 py-4 font-mono text-gray-600">{order.orderId}</td>
                                            <td className="px-6 py-4">{order.customer || "Guest"}</td>
                                            <td className="px-6 py-4 text-gray-500">{order.items || "Assorted Items"}</td>
                                            <td className="px-6 py-4 font-medium text-jaggeryBrown">₹{order.amount}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium 
                                            ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                        order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-yellow-100 text-yellow-700'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'franchise' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h3 className="font-serif text-lg text-templeGreen">Franchise Requests</h3>
                        </div>
                        {/* Franchise Table content */}
                        <div className="p-6 text-gray-500 text-center">Implementation Pending Migration</div>
                    </div>
                )}

                {activeTab === 'farmers' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h3 className="font-serif text-lg text-templeGreen">Farmer Requests</h3>
                        </div>
                        {/* Farmer Table content */}
                        <div className="p-6 text-gray-500 text-center">Implementation Pending Migration</div>
                    </div>
                )}

                {activeTab === 'ai-insights' && (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-xl p-8 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-3xl font-serif mb-2">🔮 AI Smart Inventory</h2>
                                <p className="text-purple-200">Predictive analytics to prevent stockouts and reduce waste.</p>
                            </div>
                        </div>
                        {/* AI content */}
                        {aiInsights && <div className="text-json">{JSON.stringify(aiInsights, null, 2)}</div>}
                    </div>
                )}
            </main>
        </div>
    );
}
