import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

const roomData = {
  1: {
    id: 1,
    name: "Luxury Ocean Suite",
    type: "suite",
    price: 499,
    rating: 4.9,
    reviews: 128,
    mainImage: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1582582621959-48d27397dc69?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ],
    description: "Experience unparalleled luxury in our Ocean Suite with breathtaking panoramic views of the ocean. This spacious suite features a private balcony, king-sized bed, and a luxurious jacuzzi for the ultimate relaxation experience.",
    features: [
      { icon: "🌊", name: "Ocean View", description: "Floor-to-ceiling windows with direct ocean views" },
      { icon: "🏖️", name: "Private Balcony", description: "Spacious balcony with seating area and ocean breeze" },
      { icon: "🛁", name: "Jacuzzi", description: "Luxurious jacuzzi tub with massage features" },
      { icon: "🛏️", name: "King Bed", description: "Premium king-sized bed with luxury linens" },
      { icon: "☕", name: "Mini Bar", description: "Fully stocked mini bar with premium beverages" },
      { icon: "📺", name: "Smart TV", description: "65\" 4K Smart TV with streaming services" },
      { icon: "📶", name: "High-Speed WiFi", description: "Complimentary high-speed internet access" },
      { icon: "💎", name: "Luxury Bathroom", description: "Marble bathroom with premium toiletries" }
    ],
    amenities: [
      "Air Conditioning", "Room Service", "Safe", "Hair Dryer", 
      "Bathrobes", "Slippers", "Iron", "Work Desk"
    ],
    size: "85 m²",
    occupancy: "2 Adults",
    bedType: "King Size"
  },
  2: {
    id: 2,
    name: "Executive City View",
    type: "deluxe",
    price: 299,
    rating: 4.7,
    reviews: 89,
    mainImage: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ],
    description: "Perfect for business travelers and urban explorers, our Executive City View room offers stunning skyline views with a sophisticated workspace and modern amenities for both productivity and relaxation.",
    features: [
      { icon: "🏙️", name: "City View", description: "Panoramic windows with breathtaking city skyline views" },
      { icon: "💼", name: "Work Desk", description: "Ergonomic work desk with high-speed internet access" },
      { icon: "🍷", name: "Mini Bar", description: "Curated selection of beverages and snacks" },
      { icon: "📞", name: "Business Ready", description: "Direct dial phones and charging stations" },
      { icon: "🛏️", name: "Queen Bed", description: "Comfortable queen-sized bed with premium bedding" },
      { icon: "🚿", name: "Modern Bathroom", description: "Rain shower and luxury toiletries" },
      { icon: "📺", name: "Smart TV", description: "55\" Smart TV with streaming capabilities" },
      { icon: "🔇", name: "Soundproof", description: "Soundproof walls for peaceful stay" }
    ],
    amenities: [
      "Air Conditioning", "Room Service", "Safe", "Hair Dryer",
      "Iron", "Work Desk", "Coffee Maker", "City View"
    ],
    size: "45 m²",
    occupancy: "2 Adults",
    bedType: "Queen Size"
  },
  3: {
    id: 3,
    name: "Premium Garden Room",
    type: "standard",
    price: 199,
    rating: 4.5,
    reviews: 156,
    mainImage: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ],
    description: "Escape to tranquility in our Premium Garden Room, featuring serene garden views and a peaceful atmosphere. Perfect for couples and solo travelers seeking a relaxing retreat with all modern comforts.",
    features: [
      { icon: "🌿", name: "Garden View", description: "Peaceful views of our beautifully maintained gardens" },
      { icon: "📶", name: "Free WiFi", description: "High-speed internet access throughout your stay" },
      { icon: "📺", name: "Smart TV", description: "55\" Smart TV with streaming capabilities" },
      { icon: "🛏️", name: "Double Bed", description: "Comfortable double bed with premium mattress" },
      { icon: "☕", name: "Coffee Station", description: "In-room coffee maker with premium blends" },
      { icon: "🔇", name: "Soundproof", description: "Soundproof walls for ultimate peace and quiet" },
      { icon: "💧", name: "Private Bathroom", description: "Modern bathroom with shower" },
      { icon: "🪟", name: "Natural Light", description: "Large windows for plenty of natural light" }
    ],
    amenities: [
      "Air Conditioning", "Garden View", "Free WiFi", "TV",
      "Coffee Maker", "Hair Dryer", "Safe", "Desk"
    ],
    size: "35 m²",
    occupancy: "2 Adults",
    bedType: "Double Bed"
  }
};

export default function RoomDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [room, setRoom] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id && roomData[id]) {
      setRoom(roomData[id]);
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading room details...</p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Room Not Found</h1>
          <button 
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{room.name} | Luxury Stays</title>
        <meta name="description" content={room.description} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <button 
                onClick={() => router.push('/dashboard')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span>←</span>
                <span>Back to Dashboard</span>
              </button>
              <h1 className="text-2xl font-bold text-gray-900 font-serif">Luxury Stays</h1>
            </div>
          </div>
        </header>

        {/* Room Gallery */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main Image */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl overflow-hidden shadow-lg"
              >
                <img 
                  src={room.images[selectedImage]} 
                  alt={room.name}
                  className="w-full h-96 object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
              
              {/* Thumbnail Grid */}
              <div className="grid grid-cols-4 gap-2">
                {room.images.map((image, index) => (
                  <motion.img
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    src={image}
                    alt={`${room.name} view ${index + 1}`}
                    className={`w-full h-20 object-cover rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedImage === index ? 'ring-2 ring-gold-500 scale-105' : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </div>

            {/* Room Info */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-4xl font-bold text-gray-900 font-serif">{room.name}</h1>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gold-600">${room.price}<span className="text-lg text-gray-600">/night</span></div>
                    <div className="flex items-center space-x-1 mt-1">
                      <span className="text-gold-500">⭐</span>
                      <span className="font-semibold">{room.rating}</span>
                      <span className="text-gray-500">({room.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed">{room.description}</p>

                {/* Room Specifications */}
                <div className="grid grid-cols-3 gap-4 mt-6 p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-center">
                    <div className="text-2xl">📐</div>
                    <div className="font-semibold">{room.size}</div>
                    <div className="text-sm text-gray-500">Size</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl">👥</div>
                    <div className="font-semibold">{room.occupancy}</div>
                    <div className="text-sm text-gray-500">Occupancy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl">🛏️</div>
                    <div className="font-semibold">{room.bedType}</div>
                    <div className="text-sm text-gray-500">Bed Type</div>
                  </div>
                </div>
              </motion.div>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Room Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {room.features.map((feature, index) => (
                    <motion.div
                      key={feature.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span className="text-2xl">{feature.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{feature.name}</h3>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Amenities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
                <div className="flex flex-wrap gap-3">
                  {room.amenities.map((amenity, index) => (
                    <motion.span
                      key={amenity}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="px-3 py-2 bg-gold-100 text-gold-800 rounded-full text-sm font-medium"
                    >
                      {amenity}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Booking CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-gold-500 to-gold-600 rounded-2xl p-6 text-white"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Ready to experience luxury?</h3>
                    <p className="text-gold-100">Book your stay now and create unforgettable memories</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push('/booking')}
                    className="px-8 py-3 bg-white text-gold-600 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                  >
                    Book Now
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}