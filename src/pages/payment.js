import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function PaymentPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [amount, setAmount] = useState("");
    const [method, setMethod] = useState("card");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            router.push("/login");
            return;
        }

        const parsed = JSON.parse(userData);
        setUser(parsed);

        const uid = parsed.id || parsed.user_id;
        fetchOrders(uid);
    }, []);

    const fetchOrders = async (userId) => {
        try {
            const res = await fetch(`/api/room-service?user_id=${userId}`);
            const data = await res.json();
            setOrders(data.orders || []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!amount) {
            setError("Please enter an amount.");
            return;
        }

        try {
            const res = await fetch("/api/payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: user.name,
                    amount: parseFloat(amount),
                    method,
                }),
            });

            if (res.ok) {
                setSuccess("Payment processed successfully!");
                setError("");
                setAmount("");

                // Reload orders
                const uid = user.id || user.user_id;
                fetchOrders(uid);
            } else {
                setError("Payment failed.");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred.");
        }
    };

    if (!user) return null;

    const uid = user.id || user.user_id;

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">

            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mb-10">
                <h1 className="text-2xl font-bold mb-4">Payment</h1>

                {success && <p className="text-green-600 mb-4">{success}</p>}
                {error && <p className="text-red-600 mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                    />

                    <select
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                    >
                        <option value="card">Credit/Debit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="bank">Bank Transfer</option>
                    </select>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                    >
                        Submit Payment
                    </button>
                </form>

                <button
                    onClick={() => router.push("/dashboard")}
                    className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                    Back to Dashboard
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
    <h2 className="text-xl font-bold mb-4">Your Room Service Orders</h2>

    {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
    ) : (
        <ul className="space-y-4">
            {orders.map((order) => (
                <li
                    key={order.id}
                    className="p-4 border rounded-lg bg-gray-50 flex justify-between items-start"
                >
                    <div>
                        <p><strong>Item:</strong> {order.item_name}</p>
                        <p><strong>Price:</strong> ${order.price}</p>
                        <p><strong>Quantity:</strong> {order.quantity}</p>
                        <p className="text-sm text-gray-500">
                            {new Date(order.created_at).toLocaleString()}
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            setAmount(order.price * order.quantity);
                            setSuccess("");
                            setError("");

                            // Smooth scroll to top payment form
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="ml-4 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition"
                    >
                        Make Payment
                    </button>
                </li>
            ))}
        </ul>
    )}
</div>
        </div>
    );
}