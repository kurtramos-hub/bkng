import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function BookingPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [room, setRoom] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1); // Added guests state
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

    const handleBooking = async (e) => {  
        e.preventDefault();  

        if (!room || !checkIn || !checkOut || !guests) {  
            setError("Please fill in all fields.");  
            return;  
        }  

        try {  
            const res = await fetch("/api/booking", {  
                method: "POST",  
                headers: {  
                    "Content-Type": "application/json",  
                },  
                body: JSON.stringify({  
                    username: user.name,  
                    room,  
                    checkIn,  
                    checkOut,  
                    guests, // Send guests to backend  
                }),  
            });  

            if (res.ok) {  
                setSuccess("Booking submitted successfully!");  
                setError("");  
                setRoom("");  
                setCheckIn("");  
                setCheckOut("");  
                setGuests(1); // Reset guests  
            } else {  
                setError("Failed to submit booking. Try again.");  
            }  
        } catch (err) {  
            console.error(err);  
            setError("An error occurred. Try again.");  
        }  
    };  

    if (!user) return null;  

    return (  
        <div 
            className="min-h-screen flex items-center justify-center px-4"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
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
                    <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
                        <span className="text-2xl text-white">🏨</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 font-serif">Book a Room</h1>
                    <p className="text-gray-600 mt-2">Luxury Stays Experience</p>
                </div>

                {success && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center"
                    >
                        ✅ {success}
                    </motion.div>
                )}  
                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center"
                    >
                        ⚠️ {error}
                    </motion.div>
                )}  

                <form onSubmit={handleBooking} className="space-y-4">  
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Room Type</label>
                        <select  
                            value={room}  
                            onChange={(e) => setRoom(e.target.value)}  
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white"  
                        >  
                            <option value="">Select Room</option>  
                            <option value="Standard Room">Standard Room - $149/night</option>  
                            <option value="Deluxe Room">Deluxe Room - $249/night</option>  
                            <option value="Suite">Suite - $399/night</option>  
                        </select>  
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Check-in</label>
                            <input  
                                type="date"  
                                value={checkIn}  
                                onChange={(e) => setCheckIn(e.target.value)}  
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"  
                                placeholder="Check-in Date"  
                            />  
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Check-out</label>
                            <input  
                                type="date"  
                                value={checkOut}  
                                onChange={(e) => setCheckOut(e.target.value)}  
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"  
                                placeholder="Check-out Date"  
                            />  
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Guests</label>
                        <select  
                            value={guests}  
                            onChange={(e) => setGuests(parseInt(e.target.value))}  
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white"  
                        >  
                            {[1,2,3,4,5,6].map(num => (  
                                <option key={num} value={num}>  
                                    {num} Guest{num > 1 ? 's' : ''}  
                                </option>  
                            ))}  
                        </select>  
                    </div>

                    <motion.button  
                        type="submit"  
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg"  
                    >  
                        Submit Booking  
                    </motion.button>  
                </form>  

                <motion.button  
                    onClick={() => router.push("/dashboard")}  
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 border border-gray-200"  
                >  
                    Back to Dashboard  
                </motion.button>  
            </motion.div>  
        </div>  
    );  
}