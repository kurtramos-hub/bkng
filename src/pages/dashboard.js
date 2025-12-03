import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [currentBackground, setCurrentBackground] = useState(0);

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
        { title: "View Rooms", path: "/rooms", color: "from-teal-500 to-teal-600", icon: "🔍" },  
        { title: "Book a Room", path: "/booking", color: "from-green-500 to-green-600", icon: "🏨" },  
        { title: "Order Food / Room Service", path: "/room-service", color: "from-orange-500 to-orange-600", icon: "🍽️" },  
        { title: "Payment", path: "/payment", color: "from-purple-500 to-purple-600", icon: "💳" },  
        { title: "Contact Support", path: "/support", color: "from-blue-500 to-blue-600", icon: "📞" },  
        { title: "Feedback", path: "/feedback", color: "from-indigo-500 to-indigo-600", icon: "💬" }  
    ];  

    return (  
        <div className="min-h-screen relative overflow-y-auto">  
            {/* Background Images */}  
            {backgrounds.map((bg, index) => (  
                <motion.div  
                    key={index}  
                    initial={{ opacity: 0 }}  
                    animate={{ opacity: index === currentBackground ? 1 : 0 }}  
                    transition={{ duration: 1.5 }}  
                    className="fixed inset-0 z-0"  
                    style={{  
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${bg}')`,  
                        backgroundSize: 'cover',  
                        backgroundPosition: 'center',  
                        backgroundAttachment: 'fixed'  
                    }}  
                />  
            ))}  

            {/* Top Navigation Bar */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed top-0 left-0 right-0 bg-black/30 backdrop-blur-md border-b border-white/20 z-50 p-4"
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center space-x-3 cursor-pointer"
                            onClick={() => router.push("/profile")}
                        >
                            <img
                                src={user.avatar || localStorage.getItem("userAvatar") || "/default-avatar.png"}
                                alt="Profile"
                                className="w-10 h-10 rounded-full border-2 border-white/60 shadow-lg object-cover"
                            />
                            <div className="text-left">
                                <p className="text-white font-semibold text-sm">{user.name || "User"}</p>
                                <p className="text-white/70 text-xs">Premium Member</p>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <h1 className="text-2xl font-bold text-white font-serif">Luxury Stays</h1>
                        <p className="text-white/80 text-sm">Welcome back!</p>
                    </motion.div>

                    <div className="flex items-center space-x-4">
                       
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg transition-all duration-300 font-medium text-sm"
                        >
                            Logout
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* Main Content Area */}
            <div className="relative z-10 pt-24 pb-20 px-4">
                {/* Welcome Section */}
                <motion.div  
                    initial={{ opacity: 0, y: 20 }}  
                    animate={{ opacity: 1, y: 0 }}  
                    className="text-center mb-16"  
                >  
                    <h1 className="text-5xl font-bold text-white mb-4 font-serif">Welcome to Lulua hotel</h1>  
                    <p className="text-white/80 text-xl max-w-2xl mx-auto">Experience unparalleled luxury and comfort in our world-class accommodations</p>  
                </motion.div>

                {/* Featured Content Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-4xl mx-auto mb-16"
                >
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                        <h2 className="text-3xl font-bold text-white mb-6 text-center">🌟 Exclusive Member Benefits</h2>
                        
                        <div className="grid md:grid-cols-2 gap-8 text-white/90">
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <span className="text-2xl">🎯</span>
                                    <div>
                                        <h3 className="font-semibold text-white">Personalized Service</h3>
                                        <p className="text-white/70 text-sm">Our dedicated staff ensures every detail of your stay is perfect, from customized room preferences to personalized dining experiences.</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-3">
                                    <span className="text-2xl">💎</span>
                                    <div>
                                        <h3 className="font-semibold text-white">Luxury Amenities</h3>
                                        <p className="text-white/70 text-sm">Enjoy premium amenities including spa services, fine dining, and exclusive access to our private facilities and events.</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <span className="text-2xl">⚡</span>
                                    <div>
                                        <h3 className="font-semibold text-white">Instant Support</h3>
                                        <p className="text-white/70 text-sm">24/7 concierge service available to assist with any requests, from restaurant reservations to local experiences.</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-3">
                                    <span className="text-2xl">🏆</span>
                                    <div>
                                        <h3 className="font-semibold text-white">Rewards Program</h3>
                                        <p className="text-white/70 text-sm">Earn points with every stay that can be redeemed for room upgrades, spa treatments, and exclusive member-only benefits.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-4xl mx-auto mb-16"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                            <div className="text-2xl font-bold text-white">12+</div>
                            <div className="text-white/70 text-sm">Luxury Properties</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                            <div className="text-2xl font-bold text-white">24/7</div>
                            <div className="text-white/70 text-sm">Concierge Service</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                            <div className="text-2xl font-bold text-white">98%</div>
                            <div className="text-white/70 text-sm">Guest Satisfaction</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                            <div className="text-2xl font-bold text-white">5★</div>
                            <div className="text-white/70 text-sm">Premium Rating</div>
                        </div>
                    </div>
                </motion.div>

                {/* Buttons Grid - EXACT SAME SYNTAX AS BEFORE */}  
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">  
                    {buttons.map((button, index) => (  
                        <motion.button  
                            key={button.title}  
                            initial={{ opacity: 0, y: 30 }}  
                            animate={{ opacity: 1, y: 0 }}  
                            transition={{ delay: index * 0.1 }}  
                            whileHover={{ scale: 1.05, y: -5 }}  
                            whileTap={{ scale: 0.95 }}  
                            onClick={() => router.push(button.path)}  
                            className={`bg-gradient-to-r ${button.color} text-white p-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-left group backdrop-blur-sm border border-white/20`}  
                        >  
                            <div className="flex items-center space-x-4">  
                                <motion.span whileHover={{ rotate: 10, scale: 1.2 }} className="text-3xl">{button.icon}</motion.span>  
                                <span className="text-xl font-semibold group-hover:text-white/90">{button.title}</span>  
                            </div>  
                            <motion.div initial={{ x: -10, opacity: 0 }} whileHover={{ x: 0, opacity: 1 }} className="mt-4 text-right">  
                                <span className="text-2xl">→</span>  
                            </motion.div>  
                        </motion.button>  
                    ))}  
                </div>

                {/* Additional Content Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                        <h2 className="text-3xl font-bold text-white mb-6 text-center">🏨 About Luxury Stays</h2>
                        <div className="text-white/90 space-y-4">
                            <p>
                                Welcome to Luxury Stays, where exceptional service meets unparalleled comfort. 
                                Our commitment to excellence ensures every moment of your stay is memorable and extraordinary.
                            </p>
                            <p>
                                From our meticulously designed rooms to our world-class amenities, we've created 
                                an environment where luxury is standard and every detail matters. Our team is 
                                dedicated to providing personalized experiences that cater to your unique preferences.
                            </p>
                            <p>
                                Whether you're here for business or leisure, our comprehensive services including 
                                fine dining, spa treatments, and concierge assistance are designed to make your 
                                stay truly remarkable.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Background Indicator Dots */}  
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40">  
                {backgrounds.map((_, index) => (  
                    <button  
                        key={index}  
                        onClick={() => setCurrentBackground(index)}  
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentBackground ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'}`}  
                    />  
                ))}  
            </div>  

            {/* Floating Decorative Elements */}  
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">  
                {[...Array(8)].map((_, i) => (  
                    <motion.div  
                        key={i}  
                        animate={{ y: [0, -30, 0], x: [0, Math.random() * 15 - 7.5, 0], rotate: [0, 180, 360] }}  
                        transition={{ duration: 8 + Math.random() * 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}  
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