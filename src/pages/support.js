import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function SupportPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message) {
            setError("Please enter your support message.");
            return;
        }

        try {
            const res = await fetch("/api/support", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: user.name,
                    message,
                }),
            });

            if (res.ok) {
                setSuccess("Your support request has been sent!");
                setError("");
                setMessage("");
            } else {
                setError("Failed to send request. Try again.");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred. Try again.");
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-gray-900">Contact Support</h1>
                <p className="text-gray-600 mb-6">
                    Tell us your issue or concern and our team will respond.
                </p>

                {success && <p className="mb-4 text-green-600">{success}</p>}
                {error && <p className="mb-4 text-red-600">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        placeholder="Write your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    ></textarea>

                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
                    >
                        Send Message
                    </button>
                </form>

                <button
                    onClick={() => router.push("/dashboard")}
                    className="mt-4 w-full bg-gray-200 py-2 rounded-lg text-gray-700 hover:bg-gray-300 transition"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
}