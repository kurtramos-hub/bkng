import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function RoomServicePage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const menu = [
        { id: 1, name: "Burger & Fries", price: 250, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" },
        { id: 2, name: "Chicken Alfredo Pasta", price: 320, image: "https://images.unsplash.com/photo-1598866594230-a7c12756260f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" },
        { id: 3, name: "Club Sandwich", price: 210, image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" },
        { id: 4, name: "Fresh Fruit Bowl", price: 180, image: "https://images.unsplash.com/photo-1564093497595-593b96d80180?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" },
        { id: 5, name: "Beef Steak", price: 550, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" },
        { id: 6, name: "Coffee (Hot)", price: 90, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" },
        { id: 7, name: "Iced Tea", price: 60, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" },
    ];

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            router.push("/login");
            return;
        }
        setUser(JSON.parse(userData));
    }, [router]);

    const toggleItem = (item) => {
        setSelectedItems((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.filter((i) => i.id !== item.id);
            } else {
                return [...prev, { ...item, quantity: 1 }];
            }
        });
    };

    const updateQuantity = (itemId, delta) => {
        setSelectedItems((prev) =>
            prev.map((item) => {
                if (item.id === itemId) {
                    const newQty = item.quantity + delta;
                    return { ...item, quantity: newQty > 0 ? newQty : 1 };
                }
                return item;
            })
        );
    };

    const handleOrder = async () => {
        if (selectedItems.length === 0) return;
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
                    items: selectedItems.map((item) => ({
                        item_name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                    })),
                }),
            });

            if (res.ok) {
                setSuccess(`Your order for ${selectedItems.length} item(s) has been placed!`);
                setError("");
                setSelectedItems([]);
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

    const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (!user) return null;

    return (
        <div
            className="min-h-screen px-4 flex items-center justify-center py-10"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-4xl border border-white/20"
            >
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
                        <span className="text-2xl text-white">🍽️</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 font-serif">Order Food / Room Service</h1>
                    <p className="text-gray-600 mt-2">Select items and choose quantities.</p>
                </div>

                {success && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-center"
                    >
                        ✅ {success}
                    </motion.div>
                )}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center"
                    >
                        ⚠️ {error}
                    </motion.div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Menu Section */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <span className="mr-2">📋</span>
                            Our Menu
                        </h2>
                        <div className="grid grid-cols-1 gap-4 max-h-[500px] overflow-y-auto pr-2">
                            {menu.map((item) => (
                                <motion.button
                                    key={item.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => toggleItem(item)}
                                    className={`w-full p-4 border-2 rounded-xl text-left transition-all duration-300 ${
                                        selectedItems.find((i) => i.id === item.id)
                                            ? "border-orange-500 bg-orange-50 shadow-md"
                                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                    }`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="relative">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-lg shadow-sm"
                                                onError={(e) => {
                                                    e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
                                                }}
                                            />
                                            <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                                selectedItems.find((i) => i.id === item.id)
                                                    ? "border-orange-500 bg-orange-500"
                                                    : "border-gray-300 bg-white"
                                            }`}>
                                                {selectedItems.find((i) => i.id === item.id) && (
                                                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                                            <p className="text-green-600 font-bold text-md">₱{item.price}</p>
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <span className="mr-2">🛒</span>
                            Your Order
                        </h2>
                        
                        {selectedItems.length > 0 ? (
                            <div className="space-y-4">
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
                                    {selectedItems.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-100"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-12 h-12 object-cover rounded-lg"
                                                    onError={(e) => {
                                                        e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
                                                    }}
                                                />
                                                <div>
                                                    <p className="font-semibold text-blue-800">{item.name}</p>
                                                    <p className="text-green-600 font-bold">₱{item.price}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <div className="flex items-center space-x-2 bg-blue-100 rounded-lg px-2 py-1">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            updateQuantity(item.id, -1);
                                                        }}
                                                        className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="font-bold text-blue-800 min-w-6 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            updateQuantity(item.id, 1);
                                                        }}
                                                        className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <p className="font-bold text-blue-700 min-w-16 text-right">
                                                    ₱{item.price * item.quantity}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Total Price */}
                                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-lg">Total Amount:</span>
                                        <span className="font-bold text-xl">₱{totalPrice}</span>
                                    </div>
                                    <p className="text-green-100 text-sm mt-1 text-center">
                                        {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
                                    </p>
                                </div>

                                {/* Order Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleOrder}
                                    className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg transition-all duration-300"
                                >
                                    Place Order - ₱{totalPrice}
                                </motion.button>
                            </div>
                        ) : (
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
                                <span className="text-6xl mb-4 block">🛒</span>
                                <p className="text-gray-500 font-semibold">Your cart is empty</p>
                                <p className="text-gray-400 text-sm mt-1">Select items from the menu to get started</p>
                            </div>
                        )}

                        {/* Back Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => router.push("/dashboard")}
                            className="mt-4 w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 border border-gray-200"
                        >
                            Back to Dashboard
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}