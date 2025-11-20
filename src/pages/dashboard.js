import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            router.push("/login");
            return;
        }
        setUser(JSON.parse(userData));
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        router.push("/");
    };

    if (!user) return null;

    const buttons = [
        {
            title: "View Rooms",
            path: "/rooms",
            color: "from-teal-500 to-teal-600",
            icon: "🔍"
        },
        {
            title: "Book a Room",
            path: "/booking",
            color: "from-green-500 to-green-600",
            icon: "🏨"
        },
        {
            title: "Order Food / Room Service",
            path: "/room-service",
            color: "from-orange-500 to-orange-600",
            icon: "🍽️"
        },
        {
            title: "Payment",
            path: "/payment",
            color: "from-purple-500 to-purple-600",
            icon: "💳"
        },
        {
            title: "Contact Support",
            path: "/support",
            color: "from-blue-500 to-blue-600",
            icon: "📞"
        },
        {
            title: "Feedback",
            path: "/feedback",
            color: "from-indigo-500 to-indigo-600",
            icon: "💬"
        }
    ];

    return (
        <div 
            className="min-h-screen relative flex items-center justify-center px-4"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Logout Button */}
            <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="absolute top-6 right-6 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 shadow-lg font-semibold z-10"
            >
                Logout
            </motion.button>

            {/* Welcome Message */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8 absolute top-20"
            >
                <h1 className="text-4xl font-bold text-white mb-2 font-serif">
                    Welcome to Luxury Stays
                </h1>
                <p className="text-white/80 text-lg">
                    How can we assist you today?
                </p>
            </motion.div>

            {/* Buttons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
                {buttons.map((button, index) => (
                    <motion.button
                        key={button.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ 
                            scale: 1.05,
                            y: -5
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push(button.path)}
                        className={`
                            bg-gradient-to-r ${button.color} 
                            text-white p-6 rounded-2xl 
                            shadow-2xl hover:shadow-3xl 
                            transition-all duration-300 
                            text-left group
                            backdrop-blur-sm
                            border border-white/20
                        `}
                    >
                        <div className="flex items-center space-x-4">
                            <motion.span
                                whileHover={{ rotate: 10, scale: 1.2 }}
                                className="text-3xl"
                            >
                                {button.icon}
                            </motion.span>
                            <span className="text-xl font-semibold group-hover:text-white/90">
                                {button.title}
                            </span>
                        </div>
                        
                        {/* Animated Arrow */}
                        <motion.div
                            initial={{ x: -10, opacity: 0 }}
                            whileHover={{ x: 0, opacity: 1 }}
                            className="mt-4 text-right"
                        >
                            <span className="text-2xl">→</span>
                        </motion.div>
                    </motion.button>
                ))}
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -20, 0],
                            x: [0, Math.random() * 10 - 5, 0],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 6 + Math.random() * 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 2
                        }}
                        className="absolute"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 15 + 8}px`,
                            height: `${Math.random() * 15 + 8}px`,
                            backgroundColor: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`,
                            borderRadius: '50%',
                        }}
                    />
                ))}
            </div>
        </div>
    );
}