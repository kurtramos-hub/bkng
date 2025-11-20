import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function RoomsPage() {
    const router = useRouter();
    const [selectedRoom, setSelectedRoom] = useState(null);

    const rooms = [
        {
            id: 1,
            type: "Standard Room",
            price: "$149",
            perNight: "/night",
            image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            description: "Comfortable and affordable accommodation perfect for solo travelers or couples",
            features: [
                "1 Queen Size Bed",
                "300 sq ft",
                "City View",
                "Free WiFi",
                "Smart TV",
                "Work Desk",
                "Coffee Maker",
                "Private Bathroom"
            ],
            amenities: ["Air Conditioning", "Hair Dryer", "Safe", "Iron", "24/7 Room Service"]
        },
        {
            id: 2,
            type: "Deluxe Room",
            price: "$249",
            perNight: "/night",
            image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            description: "Spacious room with premium amenities and beautiful views for a luxurious stay",
            features: [
                "1 King Size Bed",
                "450 sq ft",
                "Ocean View",
                "Premium WiFi",
                "55\" Smart TV",
                "Sitting Area",
                "Mini Bar",
                "Marble Bathroom"
            ],
            amenities: ["Air Conditioning", "Hair Dryer", "Safe", "Iron", "Bathrobes", "Slippers", "24/7 Room Service", "Daily Housekeeping"]
        },
        {
            id: 3,
            type: "Suite",
            price: "$399",
            perNight: "/night",
            image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            description: "Luxurious suite with separate living area, premium amenities, and exclusive services",
            features: [
                "1 King Size Bed + Sofa Bed",
                "650 sq ft",
                "Panoramic City View",
                "Ultra-Fast WiFi",
                "65\" 4K Smart TV",
                "Separate Living Room",
                "Dining Area",
                "Luxury Bathroom with Jacuzzi"
            ],
            amenities: [
                "Air Conditioning", 
                "Premium Toiletries", 
                "Electronic Safe", 
                "Iron & Board", 
                "Bathrobes & Slippers",
                "Complimentary Mini Bar",
                "24/7 Butler Service",
                "Daily Housekeeping",
                "Turndown Service"
            ]
        }
    ];

    return (
        <div 
            className="min-h-screen"
            style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Header */}
            <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white shadow-lg border-b border-gray-200"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-xl text-white">🏨</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 font-serif">Luxury Stays</h1>
                                <p className="text-sm text-gray-500">Our Rooms & Suites</p>
                            </div>
                        </div>
                        
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push("/dashboard")}
                            className="px-6 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg shadow-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 font-semibold"
                        >
                            Back to Dashboard
                        </motion.button>
                    </div>
                </div>
            </motion.header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
                        Our Accommodations
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover our carefully curated selection of rooms and suites, 
                        each designed to provide the ultimate comfort and luxury experience.
                    </p>
                </motion.div>

                {/* Rooms Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {rooms.map((room, index) => (
                        <motion.div
                            key={room.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 cursor-pointer"
                            onClick={() => setSelectedRoom(room)}
                        >
                            {/* Room Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={room.image}
                                    alt={room.type}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    {room.price}{room.perNight}
                                </div>
                            </div>

                            {/* Room Info */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{room.type}</h3>
                                <p className="text-gray-600 mb-4 text-sm">{room.description}</p>
                                
                                {/* Key Features */}
                                <div className="mb-4">
                                    <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        {room.features.slice(0, 4).map((feature, i) => (
                                            <li key={i} className="flex items-center">
                                                <span className="text-green-500 mr-2">✓</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* View Details Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedRoom(room);
                                    }}
                                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                                >
                                    View Details
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Room Comparison Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Room Comparison</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-4 font-semibold text-gray-900">Features</th>
                                    {rooms.map(room => (
                                        <th key={room.id} className="text-center py-4 font-semibold text-gray-900">
                                            {room.type}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-100">
                                    <td className="py-4 font-medium text-gray-700">Price per Night</td>
                                    {rooms.map(room => (
                                        <td key={room.id} className="text-center py-4 text-lg font-bold text-blue-600">
                                            {room.price}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="py-4 font-medium text-gray-700">Room Size</td>
                                    {rooms.map(room => (
                                        <td key={room.id} className="text-center py-4 text-gray-600">
                                            {room.features.find(f => f.includes('sq ft'))}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="py-4 font-medium text-gray-700">Bed Type</td>
                                    {rooms.map(room => (
                                        <td key={room.id} className="text-center py-4 text-gray-600">
                                            {room.features.find(f => f.includes('Bed'))}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="py-4 font-medium text-gray-700">View</td>
                                    {rooms.map(room => (
                                        <td key={room.id} className="text-center py-4 text-gray-600">
                                            {room.features.find(f => f.includes('View'))}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>

            {/* Room Detail Modal */}
            {selectedRoom && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="relative">
                            <img
                                src={selectedRoom.image}
                                alt={selectedRoom.type}
                                className="w-full h-64 object-cover"
                            />
                            <button
                                onClick={() => setSelectedRoom(null)}
                                className="absolute top-4 right-4 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                            >
                                ×
                            </button>
                            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg">
                                <span className="text-2xl font-bold">{selectedRoom.price}</span>
                                <span className="text-white/80">{selectedRoom.perNight}</span>
                            </div>
                        </div>

                        <div className="p-8">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">{selectedRoom.type}</h3>
                            <p className="text-gray-600 text-lg mb-6">{selectedRoom.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Room Features</h4>
                                    <ul className="space-y-2">
                                        {selectedRoom.features.map((feature, index) => (
                                            <li key={index} className="flex items-center text-gray-700">
                                                <span className="text-green-500 mr-3 text-lg">✓</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Amenities & Services</h4>
                                    <ul className="space-y-2">
                                        {selectedRoom.amenities.map((amenity, index) => (
                                            <li key={index} className="flex items-center text-gray-700">
                                                <span className="text-blue-500 mr-3 text-lg">★</span>
                                                {amenity}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-8 flex space-x-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => router.push('/booking')}
                                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
                                >
                                    Book This Room
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedRoom(null)}
                                    className="px-8 bg-gray-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-gray-600 transition-all duration-300"
                                >
                                    Close
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}