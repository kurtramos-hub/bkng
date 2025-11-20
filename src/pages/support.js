import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function SupportPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            router.push("/login");
            return;
        }
        setUser(JSON.parse(userData));
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message) {
            setError("Please enter your support message.");
            return;
        }

        try {
            const res = await fetch("/api/support", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: user.name,
                    message,
                }),
            });

            if (res.ok) {
                setSuccess("Your support request has been sent!");
                setError("");
                setMessage("");
            } else {
                setError("Failed to send request. Try again.");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred. Try again.");
        }
    };

    if (!user) return null;

    return (
        <div 
            className="min-h-screen flex items-center justify-center px-4 py-10"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20"
            >
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
                        <span className="text-2xl text-white">📞</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 font-serif">Contact Support</h1>
                    <p className="text-gray-600 mt-2">
                        Tell us your issue or concern and our team will respond.
                    </p>
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

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Your Message *
                        </label>
                        <textarea
                            placeholder="Describe your issue or concern in detail..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-2">
                            Our support team will respond within 24 hours
                        </p>
                    </div>

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
                    >
                        Send Message
                    </motion.button>
                </form>

                {/* Support Information */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                        <span className="mr-2">💬</span>
                        Support Information
                    </h3>
                    <div className="space-y-2 text-sm text-blue-700">
                        <p>📧 Email: support@luxurystays.com</p>
                        <p>📞 Phone: +1 (555) 123-HELP</p>
                        <p>⏰ Hours: 24/7 Available</p>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/dashboard")}
                    className="mt-4 w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 border border-gray-200"
                >
                    Back to Dashboard
                </motion.button>
            </motion.div>
        </div>
    );
}