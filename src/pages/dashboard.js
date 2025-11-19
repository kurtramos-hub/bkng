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
    // Mock data - replace with SQL API calls
    setStats({
        totalBookings: 12,
        upcomingStays: 2,
        totalSpent: 2450.00,
        rewardsPoints: 1250
    });
};

const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    router.push("/");
};

const navItems = [
    { title: "Overview", key: "overview" },
    { title: "Bookings", key: "bookings" },
    { title: "Rooms & Services", key: "rooms" },
    { title: "Analytics", key: "analytics" },
    { title: "Feedback", key: "feedback" }
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
                        <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-lg">🏨</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 font-serif">Luxury Stays</h1>
                            <p className="text-sm text-gray-500">Dashboard</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="font-semibold text-gray-900">Welcome, {user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </motion.header>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <nav className="flex space-x-6 border-b pb-2">
                {navItems.map(item => (
                    <button
                        key={item.key}
                        onClick={() => setActiveTab(item.key)}
                        className={`pb-2 font-medium ${
                            activeTab === item.key ? "border-b-2 border-gold-500 text-gray-900" : "text-gray-500 hover:text-gray-900"
                        }`}
                    >
                        {item.title}
                    </button>
                ))}
            </nav>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {activeTab === "overview" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Total Bookings", value: stats.totalBookings, color: "from-blue-500 to-blue-600" },
                            { title: "Upcoming Stays", value: stats.upcomingStays, color: "from-green-500 to-green-600" },
                            { title: "Total Spent", value: `$${stats.totalSpent.toLocaleString()}`, color: "from-purple-500 to-purple-600" },
                            { title: "Rewards Points", value: stats.rewardsPoints, color: "from-orange-500 to-orange-600" }
                        ].map(stat => (
                            <div key={stat.title} className={`bg-gradient-to-br ${stat.color} text-white p-6 rounded-2xl shadow-lg`}>
                                <p className="text-sm">{stat.title}</p>
                                <p className="text-2xl font-bold mt-2">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {activeTab === "bookings" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Bookings</h2>
                    <p className="text-gray-600">This section will list all bookings from SQL.</p>
                </motion.div>
            )}

            {activeTab === "rooms" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Rooms & Services</h2>
                    <p className="text-gray-600">Manage rooms and services here.</p>
                </motion.div>
            )}

            {activeTab === "analytics" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Analytics</h2>
                    <p className="text-gray-600">Show statistics and charts from SQL queries.</p>
                </motion.div>
            )}

            {activeTab === "feedback" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Feedback</h2>
                    <p className="text-gray-600">View user feedback submitted through the frontend.</p>
                </motion.div>
            )}
        </div>
    </div>
);
```

}
