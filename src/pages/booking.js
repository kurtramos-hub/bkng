import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function BookingPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [room, setRoom] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
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

        if (!room || !checkIn || !checkOut) {
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
                }),
            });

            if (res.ok) {
                setSuccess("Booking submitted successfully!");
                setError("");
                setRoom("");
                setCheckIn("");
                setCheckOut("");
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-gray-900">Book a Room</h1>

                {success && <p className="mb-4 text-green-600">{success}</p>}
                {error && <p className="mb-4 text-red-600">{error}</p>}

                <form onSubmit={handleBooking} className="space-y-4">
                    <select
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Room</option>
                        <option value="Standard Room">Standard Room</option>
                        <option value="Deluxe Room">Deluxe Room</option>
                        <option value="Suite">Suite</option>
                    </select>

                    <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Check-in Date"
                    />

                    <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Check-out Date"
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300"
                    >
                        Submit Booking
                    </button>
                </form>

                <button
                    onClick={() => router.push("/dashboard")}
                    className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
}