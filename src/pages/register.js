import { useState } from "react";
import { motion } from "framer-motion";

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            setMsg(data.message);
            
            if (res.ok) {
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000);
            }
        } catch (error) {
            setMsg("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div 
            className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Animated Background Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 bg-black/30"
            />
            
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="bg-white/15 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/30 relative z-10"
            >
                {/* Hotel Branding */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-8"
                >
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
                    >
                        <span className="text-2xl">✨</span>
                    </motion.div>
                    <motion.h1 
                        className="text-4xl font-bold text-white mb-2 font-serif"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        Join Luxury Stays
                    </motion.h1>
                    <p className="text-white/80 text-lg">Begin Your Extraordinary Journey</p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Input */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <label className="block text-white text-sm font-medium mb-2">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            className="w-full px-4 py-3 bg-white/20 border border-white/40 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all duration-300 backdrop-blur-sm"
                            required
                        />
                    </motion.div>

                    {/* Email Input */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <label className="block text-white text-sm font-medium mb-2">Email Address</label>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            className="w-full px-4 py-3 bg-white/20 border border-white/40 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all duration-300 backdrop-blur-sm"
                            required
                        />
                    </motion.div>

                    {/* Password Input */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <label className="block text-white text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Create secure password"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            className="w-full px-4 py-3 bg-white/20 border border-white/40 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all duration-300 backdrop-blur-sm"
                            required
                        />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: loading ? 1 : 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white py-3 px-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:from-gold-600 hover:to-gold-700 mt-6"
                    >
                        {loading ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"
                            />
                        ) : (
                            "Create Luxury Account"
                        )}
                    </motion.button>
                </form>

                {/* Message Display */}
                {msg && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-4 text-center text-sm font-medium ${
                            msg.includes("successful") ? "text-green-300" : "text-red-300"
                        }`}
                    >
                        {msg}
                    </motion.p>
                )}

                {/* Login Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-center mt-6"
                >
                    <p className="text-white/70">
                        Already have an account?{" "}
                        <motion.a
                            href="/login"
                            className="text-gold-300 font-semibold hover:text-gold-200 underline transition-colors duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Sign In
                        </motion.a>
                    </p>
                </motion.div>

                {/* Hotel Benefits */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="mt-6 grid grid-cols-2 gap-2 text-center"
                >
                    <div className="text-white/60 text-sm">⭐ Exclusive Deals</div>
                    <div className="text-white/60 text-sm">🏆 VIP Treatment</div>
                    <div className="text-white/60 text-sm">🎯 Best Rates</div>
                    <div className="text-white/60 text-sm">💎 Luxury Rewards</div>
                </motion.div>
            </motion.div>

            {/* Floating Luxury Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        y: [0, -25, 0],
                        x: [0, 15, 0],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/3 right-1/4 w-10 h-10 bg-gold-500/40 rounded-full backdrop-blur-sm"
                />
                <motion.div
                    animate={{
                        y: [0, 20, 0],
                        x: [0, -12, 0],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute bottom-1/4 left-1/3 w-8 h-8 bg-white/25 rounded-lg backdrop-blur-sm"
                />
                <motion.div
                    animate={{
                        y: [0, -30, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                    className="absolute top-2/3 right-1/3 w-6 h-6 bg-gold-300/50 rounded-full backdrop-blur-sm"
                />
            </div>
        </div>
    );
}