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

                {/* Explore Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push('/dashboard')}
                    className="px-12 py-4 bg-gradient-to-r from-gold-400 to-gold-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:from-gold-500 hover:to-gold-700 transition-all duration-300 transform hover:shadow-2xl border-2 border-gold-300"
                >
                    Explore
                </motion.button>
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