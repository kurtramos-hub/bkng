import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");
    const [stats, setStats] = useState({
        totalBookings: 0,
        upcomingStays: 0,
        totalSpent: 0,
        rewardsPoints: 0
    });
    const [recentBookings, setRecentBookings] = useState([]);

    useEffect(() => {
        // Check if user is logged in
        const userData = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        
        if (!userData || !token) {
            router.push("/login");
            return;
        }

        setUser(JSON.parse(userData));
        loadDashboardData();
    }, [router]);

    const loadDashboardData = async () => {
        // Mock data - replace with actual API calls
        setStats({
            totalBookings: 12,
            upcomingStays: 2,
            totalSpent: 2450.00,
            rewardsPoints: 1250
        });

        setRecentBookings([
            {
                id: 1,
                room: "Deluxe Suite - 301",
                checkIn: "2024-12-15",
                checkOut: "2024-12-18",
                status: "confirmed",
                amount: 897.00
            },
            {
                id: 2,
                room: "Standard Room - 101",
                checkIn: "2024-11-20",
                checkOut: "2024-11-22",
                status: "completed",
                amount: 398.00
            }
        ]);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        router.push("/");
    };

    const statCards = [
        {
            title: "Total Bookings",
            value: stats.totalBookings,
            icon: "📅",
            color: "from-blue-500 to-blue-600",
            description: "All-time bookings"
        },
        {
            title: "Upcoming Stays",
            value: stats.upcomingStays,
            icon: "🏨",
            color: "from-green-500 to-green-600",
            description: "Future reservations"
        },
        {
            title: "Total Spent",
            value: `$${stats.totalSpent.toLocaleString()}`,
            icon: "💰",
            color: "from-purple-500 to-purple-600",
            description: "Lifetime spending"
        },
        {
            title: "Rewards Points",
            value: stats.rewardsPoints,
            icon: "⭐",
            color: "from-orange-500 to-orange-600",
            description: "Available points"
        }
    ];

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white shadow-sm border-b"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-3">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-lg"
                            >
                                <span className="text-lg">🏨</span>
                            </motion.div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 font-serif">Luxury Stays</h1>
                                <p className="text-sm text-gray-500">Dashboard</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="font-semibold text-gray-900">Welcome back, {user.name}!</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                            >
                                Logout
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome back, {user.name}!
                    </h2>
                    <p className="text-gray-600">
                        Here's what's happening with your stays and rewards.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                >
                    {statCards.map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className={`bg-gradient-to-br ${stat.color} text-white p-6 rounded-2xl shadow-lg`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-white/80 text-sm">{stat.title}</p>
                                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                    <p className="text-white/60 text-xs mt-2">{stat.description}</p>
                                </div>
                                <motion.div
                                    whileHover={{ rotate: 10, scale: 1.1 }}
                                    className="text-2xl"
                                >
                                    {stat.icon}
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Bookings */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-white rounded-2xl shadow-sm border p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Recent Bookings</h3>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => router.push('/my-bookings')}
                                    className="px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors duration-300 text-sm"
                                >
                                    View All
                                </motion.button>
                            </div>

                            <div className="space-y-4">
                                {recentBookings.map((booking, index) => (
                                    <motion.div
                                        key={booking.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1 + index * 0.1 }}
                                        whileHover={{ scale: 1.01 }}
                                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gold-300 transition-colors duration-300"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className={`w-3 h-3 rounded-full ${
                                                booking.status === 'confirmed' ? 'bg-green-500' : 
                                                booking.status === 'completed' ? 'bg-blue-500' : 'bg-gray-500'
                                            }`}></div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{booking.room}</p>
                                                <p className="text-sm text-gray-500">
                                                    {booking.checkIn} → {booking.checkOut}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900">${booking.amount}</p>
                                            <p className="text-sm text-gray-500 capitalize">{booking.status}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Actions & Rewards */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 }}
                        className="space-y-6"
                    >
                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl shadow-sm border p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                {[
                                    { icon: "🛏️", label: "Book a Room", path: "/booking" },
                                    { icon: "📅", label: "My Bookings", path: "/my-bookings" },
                                    { icon: "⭐", label: "Hotel Services", path: "/services" },
                                    { icon: "🎁", label: "Special Offers", path: "/offers" }
                                ].map((action, index) => (
                                    <motion.button
                                        key={action.label}
                                        whileHover={{ x: 5, scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => router.push(action.path)}
                                        className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors duration-300 border border-transparent hover:border-gold-200"
                                    >
                                        <span className="text-xl">{action.icon}</span>
                                        <span className="font-medium text-gray-700">{action.label}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Rewards Card */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-gradient-to-br from-gold-400 to-gold-600 text-white rounded-2xl p-6 shadow-lg"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-lg">Loyalty Rewards</h3>
                                <span className="text-2xl">🏆</span>
                            </div>
                            <div className="mb-4">
                                <p className="text-gold-100 text-sm">Current Points</p>
                                <p className="text-2xl font-bold">{stats.rewardsPoints}</p>
                            </div>
                            <div className="w-full bg-gold-700 rounded-full h-2 mb-2">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(stats.rewardsPoints / 2000) * 100}%` }}
                                    transition={{ delay: 1.5, duration: 1 }}
                                    className="bg-white h-2 rounded-full"
                                ></motion.div>
                            </div>
                            <p className="text-gold-100 text-xs">
                                {2000 - stats.rewardsPoints} points until next tier
                            </p>
                        </motion.div>

                        {/* Special Offer */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl p-6 shadow-lg"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-bold text-lg">Exclusive Offer</h3>
                                <span className="text-xl">🎁</span>
                            </div>
                            <p className="text-purple-100 text-sm mb-3">
                                Get 20% off your next stay when you book before December 31st!
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => router.push('/offers')}
                                className="w-full bg-white text-purple-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                            >
                                Claim Offer
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Upcoming Stay Highlight */}
                {stats.upcomingStays > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Your Next Adventure Awaits!</h3>
                                <p className="text-blue-100">
                                    You have {stats.upcomingStays} upcoming stay{stats.upcomingStays > 1 ? 's' : ''}. 
                                    Get ready for an unforgettable experience.
                                </p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => router.push('/my-bookings')}
                                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                            >
                                View Details
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}