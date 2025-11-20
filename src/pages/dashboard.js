import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [currentBackground, setCurrentBackground] = useState(0);

    // Array of beautiful hotel backgrounds
    const backgrounds = [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ];

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            router.push("/login");
            return;
        }
        setUser(JSON.parse(userData));

        // Change background every 8 seconds
        const interval = setInterval(() => {
            setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
        }, 8000);

        return () => clearInterval(interval);
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
        <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
            {/* Background Images with Transitions */}
            {backgrounds.map((bg, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ 
                        opacity: index === currentBackground ? 1 : 0 
                    }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${bg}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed'
                    }}
                />
            ))}

            {/* Background Indicator Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {backgrounds.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentBackground(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentBackground 
                                ? 'bg-white scale-125' 
                                : 'bg-white/50 hover:bg-white/70'
                        }`}
                    />
                ))}
            </div>

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
                className="text-center mb-8 absolute top-20 z-10"
            >
                <h1 className="text-4xl font-bold text-white mb-2 font-serif">
                    Welcome to Luxury Stays
                </h1>
                <p className="text-white/80 text-lg">
                    How can we assist you today?
                </p>
            </motion.div>

            {/* Buttons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full z-10">
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
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, Math.random() * 15 - 7.5, 0],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 8 + Math.random() * 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 2
                        }}
                        className="absolute"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 20 + 10}px`,
                            height: `${Math.random() * 20 + 10}px`,
                            backgroundColor: `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1})`,
                            borderRadius: '50%',
                        }}
                    />
                ))}
            </div>
        </div>
    );
}