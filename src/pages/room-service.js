import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function RoomServicePage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    // Sample menu (replace later with SQL menu if needed)
    const menu = [
        { id: 1, name: "Burger & Fries", price: 250 },
        { id: 2, name: "Chicken Alfredo Pasta", price: 320 },
        { id: 3, name: "Club Sandwich", price: 210 },
        { id: 4, name: "Fresh Fruit Bowl", price: 180 },
        { id: 5, name: "Beef Steak", price: 550 },
        { id: 6, name: "Coffee (Hot)", price: 90 },
        { id: 7, name: "Iced Tea", price: 60 },
    ];

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            router.push("/login");
            return;
        }
        setUser(JSON.parse(userData));
    }, [router]);

    const handleOrder = async () => {
        if (!selectedItem) return;
        if (!user || !user.id || !user.name) {
            setError("User information missing.");
            return;
        }

        try {
            const res = await fetch("/api/room-service", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: user.id,
                    username: user.name,
                    item_name: selectedItem.name,
                    price: selectedItem.price,
                    quantity: 1
                }),
            });

            if (res.ok) {
                setSuccess(`Your order for "${selectedItem.name}" has been placed!`);
                setError("");
                setSelectedItem(null);
            } else {
                const data = await res.json();
                setError(`Failed: ${data.message}`);
                setSuccess("");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred while placing the order.");
            setSuccess("");
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 px-4 flex items-center justify-center py-10">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Food / Room Service</h1>
                <p className="text-gray-600 mb-6">Select a food item and place your order.</p>

                {success && (
                    <p className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
                        {success}
                    </p>
                )}
                {error && (
                    <p className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
                        {error}
                    </p>
                )}

                {/* Menu List */}
                <div className="grid grid-cols-1 gap-4">
                    {menu.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className={`w-full p-4 border rounded-lg flex justify-between 
                                        text-left hover:bg-gray-100 transition 
                                        ${selectedItem?.id === item.id ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
                        >
                            <span className="font-medium text-gray-800">{item.name}</span>
                            <span className="text-gray-600">₱{item.price}</span>
                        </button>
                    ))}
                </div>

                {/* Order Button */}
                <button
                    onClick={handleOrder}
                    disabled={!selectedItem}
                    className={`w-full mt-6 py-3 rounded-lg font-semibold transition 
                               ${selectedItem ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                >
                    Place Order
                </button>

                {/* Back Button */}
                <button
                    onClick={() => router.push("/dashboard")}
                    className="mt-3 w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
}