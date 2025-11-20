import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function PaymentPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [amount, setAmount] = useState("");
    const [method, setMethod] = useState("card");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        // Get user info from localStorage
        const userData = localStorage.getItem("user");
        if (!userData) {
            router.push("/login");
            return;
        }
        setUser(JSON.parse(userData));
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!amount) {
            setError("Please enter an amount.");
            return;
        }

        try {
            const res = await fetch("/api/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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
                setMethod("card");
            } else {
                setError("Failed to process payment. Try again.");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred. Try again.");
        }
    };

    if (!user) return null; // wait for user to load

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-gray-900">Payment</h1>

                {success && <p className="mb-4 text-green-600">{success}</p>}
                {error && <p className="mb-4 text-red-600">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <select
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="card">Credit/Debit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="bank">Bank Transfer</option>
                    </select>

                    <button
                        type="submit"
                        className="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 transition-colors duration-300"
                    >
                        Submit Payment
                    </button>
                </form>

                <button
                    onClick={() => router.push("/dashboard")}
                    className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
}