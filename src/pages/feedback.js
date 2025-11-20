import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function FeedbackPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(0);
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

        if (!message || rating === 0) {
            setError("Please enter a message and select a rating.");
            return;
        }

        try {
            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: user.name, // Use account username
                    message,
                    rating,
                }),
            });

            if (res.ok) {
                setSuccess("Thank you for your feedback!");
                setError("");
                setMessage("");
                setRating(0);
            } else {
                setError("Failed to submit feedback. Try again.");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred. Try again.");
        }
    };

    if (!user) return null; // wait for user to load

    return (
        <div 
            className="min-h-screen flex items-center justify-center px-4 py-10"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1559305289-0d0b0c4ca65b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
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
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
                        <span className="text-2xl text-white">💬</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 font-serif">Submit Feedback</h1>
                    <p className="text-gray-600 mt-2">We value your opinion and suggestions</p>
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
                            placeholder="Share your thoughts, suggestions, or experience with us..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-none"
                            rows={4}
                        ></textarea>
                    </div>

                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">
                            Rating *
                        </label>
                        <div className="flex items-center justify-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <motion.button
                                    key={star}
                                    type="button"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setRating(star)}
                                    className={`text-3xl transition-all duration-300 ${
                                        star <= rating ? "text-yellow-400" : "text-gray-300"
                                    }`}
                                >
                                    ★
                                </motion.button>
                            ))}
                        </div>
                        <p className="text-center text-sm text-gray-500">
                            {rating === 0 ? "Select your rating" : 
                             rating === 1 ? "Poor" :
                             rating === 2 ? "Fair" :
                             rating === 3 ? "Good" :
                             rating === 4 ? "Very Good" : "Excellent"}
                        </p>
                    </div>

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-xl font-bold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
                    >
                        Submit Feedback
                    </motion.button>
                </form>

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