import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function HomePage() {
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const checkAuth = () => {
            const user = localStorage.getItem("user");
            const token = localStorage.getItem("token");
            const isLoggedIn = localStorage.getItem("isLoggedIn");

            if (!user || !token || isLoggedIn !== "true") {
                // Not logged in, redirect to login page
                router.push("/login");
            } else {
                // User is logged in, show the homepage
                setIsCheckingAuth(false);
            }
        };

        checkAuth();
    }, [router]);

    const navigationButtons = [
        {
            title: "Book a Room",
            description: "Find and reserve your perfect room",
            icon: "🛏️",
            path: "/booking",
            color: "from-blue-500 to-blue-600",
            hoverColor: "hover:from-blue-600 hover:to-blue-700"
        },
        {
            title: "My Bookings",
            description: "View and manage your reservations",
            icon: "📅",
            path: "/my-bookings",
            color: "from-green-500 to-green-600",
            hoverColor: "hover:from-green-600 hover:to-green-700"
        },
        {
            title: "Hotel Services",
            description: "Explore our premium amenities",
            icon: "⭐",
            path: "/services",
            color: "from-purple-500 to-purple-600",
            hoverColor: "hover:from-purple-600 hover:to-purple-700"
        },
        {
            title: "Special Offers",
            description: "Exclusive deals and packages",
            icon: "🎁",
            path: "/offers",
            color: "from-pink-500 to-pink-600",
            hoverColor: "hover:from-pink-600 hover:to-pink-700"
        },
        {
            title: "Contact & Support",
            description: "24/7 customer service",
            icon: "📞",
            path: "/contact",
            color: "from-orange-500 to-orange-600",
            hoverColor: "hover:from-orange-600 hover:to-orange-700"
        }
    ];

    const handleNavigation = (path) => {
        router.push(path);
    };

    // Show loading while checking authentication
    if (isCheckingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="text-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <p className="text-white text-lg">Checking authentication...</p>
                </div>
            </div>
        );
    }

    return (
        <div 
            className="min-h-screen relative overflow-hidden"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
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
                className="absolute inset-0 bg-black/40"
            />

            {/* Header */}
            <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 p-6"
            >
                <div className="flex justify-between items-center">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-3"
                    >
                        <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-xl">🏨</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white font-serif">Luxury Stays</h1>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex space-x-4"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push('/dashboard')}
                            className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-300"
                        >
                            Dashboard
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                localStorage.removeItem("user");
                                localStorage.removeItem("token");
                                localStorage.removeItem("isLoggedIn");
                                router.push("/login");
                            }}
                            className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300"
                        >
                            Logout
                        </motion.button>
                    </motion.div>
                </div>
            </motion.header>

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative z-10 text-center pt-16 pb-20 px-4"
            >
                <motion.h1
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="text-6xl md:text-7xl font-bold text-white font-serif mb-6"
                >
                    Welcome to
                    <motion.span
                        className="block bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent"
                        whileHover={{ scale: 1.05 }}
                    >
                        Luxury Stays
                    </motion.span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-xl text-white/80 max-w-2xl mx-auto mb-12"
                >
                    Experience unparalleled luxury and comfort in our world-class hotels. 
                    Your extraordinary journey begins here.
                </motion.p>
            </motion.div>

            {/* Navigation Grid */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="relative z-10 px-4 pb-16"
            >
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="text-3xl font-bold text-white text-center mb-12 font-serif"
                    >
                        Explore Our Services
                    </motion.h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {navigationButtons.map((button, index) => (
                            <motion.button
                                key={button.title}
                                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                transition={{ 
                                    duration: 0.6, 
                                    delay: 1.4 + (index * 0.1),
                                    type: "spring",
                                    stiffness: 100
                                }}
                                whileHover={{ 
                                    scale: 1.05, 
                                    y: -5,
                                    transition: { type: "spring", stiffness: 400 }
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleNavigation(button.path)}
                                className={`bg-gradient-to-br ${button.color} ${button.hoverColor} text-white p-6 rounded-2xl shadow-xl backdrop-blur-sm border border-white/20 text-left transition-all duration-300 group`}
                            >
                                <motion.div
                                    whileHover={{ rotate: 5, scale: 1.1 }}
                                    className="text-3xl mb-4"
                                >
                                    {button.icon}
                                </motion.div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-gold-100 transition-colors">
                                    {button.title}
                                </h3>
                                <p className="text-white/80 text-sm group-hover:text-white/90 transition-colors">
                                    {button.description}
                                </p>
                                
                                {/* Animated Arrow */}
                                <motion.div
                                    initial={{ x: -10, opacity: 0 }}
                                    whileHover={{ x: 0, opacity: 1 }}
                                    className="mt-4 text-right"
                                >
                                    <span className="text-lg">→</span>
                                </motion.div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, Math.random() * 20 - 10, 0],
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
                            backgroundColor: `rgba(255, 215, 0, ${Math.random() * 0.3 + 0.1})`,
                            borderRadius: '50%',
                            backdropBlur: 'sm'
                        }}
                    />
                ))}
            </div>
        </div>
    );
}