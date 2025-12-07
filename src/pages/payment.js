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
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isLoadingOrders, setIsLoadingOrders] = useState(true);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            router.push("/login");
            return;
        }

        const parsed = JSON.parse(userData);
        setUser(parsed);
        fetchOrders(parsed.id || parsed.user_id);
    }, []);

    const fetchOrders = async (userId) => {
        setIsLoadingOrders(true);
        try {
            const res = await fetch(`/api/room-service?user_id=${userId}`);
            if (!res.ok) throw new Error(`Failed to fetch orders: ${res.status}`);
            const data = await res.json();
            
            // Your backend returns array directly, not {orders: [...]}
            console.log("Orders data:", data); // Debug log
            
            // Filter only unpaid orders if you have a payment_status field
            // For now, show all orders since we don't have payment_status yet
            setOrders(data || []);
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError("Failed to load orders. Please try again.");
            setOrders([]);
        } finally {
            setIsLoadingOrders(false);
        }
    };

    const handleOrderSelect = (order) => {
        setSelectedOrder(order);
        const total = (order.price * order.quantity).toFixed(2);
        setAmount(total);
        setSuccess("");
        setError("");
        
        // Smooth scroll to payment form
        document.getElementById("payment-form")?.scrollIntoView({ 
            behavior: "smooth" 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!amount || parseFloat(amount) <= 0) {
            setError("Please enter a valid amount.");
            return;
        }

        if (!selectedOrder && !amount) {
            setError("Please select an order to pay or enter an amount.");
            return;
        }

        setIsProcessing(true);

        try {
            const paymentData = {
                user_id: user.id || user.user_id,
                username: user.name,
                amount: parseFloat(amount),
                method: method,
                ...(selectedOrder && { 
                    order_id: selectedOrder.id,
                    item_name: selectedOrder.item_name,
                    quantity: selectedOrder.quantity 
                })
            };

            console.log("Sending payment data:", paymentData); // Debug log

            const res = await fetch("/api/payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(paymentData),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess(`Payment of $${amount} processed successfully!`);
                setAmount("");
                
                // If we paid for a specific order, remove it from the list
                if (selectedOrder) {
                    // Option 1: Delete the order from database via API
                    try {
                        await fetch(`/api/room-service?order_id=${selectedOrder.id}`, {
                            method: "DELETE"
                        });
                        
                        // Remove from local state
                        setOrders(prevOrders => 
                            prevOrders.filter(order => order.id !== selectedOrder.id)
                        );
                    } catch (deleteErr) {
                        console.error("Failed to delete order:", deleteErr);
                        // Still update local state even if delete fails
                        setOrders(prevOrders => 
                            prevOrders.filter(order => order.id !== selectedOrder.id)
                        );
                    }
                    
                    setSelectedOrder(null);
                }
                
                // Clear success message after 5 seconds
                setTimeout(() => setSuccess(""), 5000);
            } else {
                setError(data.message || "Payment failed. Please try again.");
            }
        } catch (err) {
            console.error("Payment error:", err);
            setError("An error occurred while processing payment.");
        } finally {
            setIsProcessing(false);
        }
    };

    const calculateTotal = () => {
        if (!orders || orders.length === 0) return "0.00";
        return orders.reduce((total, order) => {
            return total + (parseFloat(order.price) * parseInt(order.quantity));
        }, 0).toFixed(2);
    };

    if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Payment Portal</h1>
                    <p className="text-gray-600">Welcome, {user.name}!</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column: Orders List */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Your Orders</h2>
                            {orders.length > 0 && (
                                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                                    Total Due: ${calculateTotal()}
                                </span>
                            )}
                        </div>

                        {isLoadingOrders ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                                <p className="mt-4 text-gray-600">Loading your orders...</p>
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-gray-400 mb-4">
                                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <p className="text-gray-600 text-lg mb-2">No orders found</p>
                                <p className="text-gray-500">You haven't placed any room service orders yet.</p>
                                <button
                                    onClick={() => router.push("/room-service")}
                                    className="mt-4 inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
                                >
                                    Order Room Service
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className={`p-4 border rounded-lg transition-all duration-200 ${
                                            selectedOrder?.id === order.id 
                                                ? 'border-purple-500 bg-purple-50' 
                                                : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="font-semibold text-gray-800 text-lg">
                                                        {order.item_name}
                                                    </h3>
                                                    <span className="font-bold text-purple-600 text-lg">
                                                        ${(parseFloat(order.price) * parseInt(order.quantity)).toFixed(2)}
                                                    </span>
                                                </div>
                                                
                                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                                                    <div>
                                                        <span className="font-medium">Price:</span> ${parseFloat(order.price).toFixed(2)}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Quantity:</span> {order.quantity}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Order ID:</span> {order.id}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Date:</span>{" "}
                                                        {new Date(order.created_at).toLocaleDateString()}
                                                    </div>
                                                </div>
                                                
                                                {order.notes && (
                                                    <p className="text-sm text-gray-500 italic">
                                                        Note: {order.notes}
                                                    </p>
                                                )}
                                            </div>
                                            
                                            <button
                                                onClick={() => handleOrderSelect(order)}
                                                className="ml-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium whitespace-nowrap"
                                            >
                                                Pay Now
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <button
                                onClick={() => router.push("/dashboard")}
                                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium flex items-center justify-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Dashboard
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Payment Form */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div id="payment-form">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">
                                {selectedOrder ? `Pay for: ${selectedOrder.item_name}` : "Make a Payment"}
                            </h2>

                            {success && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex items-center text-green-800">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="font-medium">{success}</span>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex items-center text-red-800">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                        <span className="font-medium">{error}</span>
                                    </div>
                                </div>
                            )}

                            {selectedOrder && (
                                <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                                    <h3 className="font-semibold text-purple-800 mb-2">Selected Order Details</h3>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div><span className="font-medium">Item:</span> {selectedOrder.item_name}</div>
                                        <div><span className="font-medium">Quantity:</span> {selectedOrder.quantity}</div>
                                        <div><span className="font-medium">Unit Price:</span> ${parseFloat(selectedOrder.price).toFixed(2)}</div>
                                        <div><span className="font-medium">Total:</span> ${(parseFloat(selectedOrder.price) * parseInt(selectedOrder.quantity)).toFixed(2)}</div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSelectedOrder(null);
                                            setAmount("");
                                        }}
                                        className="mt-3 text-sm text-purple-600 hover:text-purple-800 flex items-center"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Clear Selection
                                    </button>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Amount
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500">₱</span>
                                        </div>
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="w-full pl-8 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                            min="0.01"
                                            step="0.01"
                                            disabled={!!selectedOrder}
                                        />
                                    </div>
                                    {selectedOrder && (
                                        <p className="mt-1 text-sm text-gray-500">
                                            Amount is pre-filled from selected order
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Payment Method
                                    </label>
                                    <select
                                        value={method}
                                        onChange={(e) => setMethod(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                    >
                                        <option value="card">💳 Credit/Debit Card</option>
                                        <option value="paypal">💰 PayPal</option>
                                        <option value="bank">🏦 Bank Transfer</option>
                                        <option value="cash">💵 Cash (At Reception)</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isProcessing || (!amount && !selectedOrder)}
                                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isProcessing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        `Pay $${amount || "0.00"}`
                                    )}
                                </button>
                            </form>

                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h3 className="font-medium text-gray-700 mb-3">Payment Information</h3>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    <li className="flex items-start">
                                        <svg className="w-4 h-4 mr-2 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Secure SSL encryption
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-4 h-4 mr-2 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        No payment information stored
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-4 h-4 mr-2 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Instant confirmation
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}