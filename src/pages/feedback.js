import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Feedback() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    rating: 5,
    comment: "",
    category: "general"
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Load logged-in user + feedback
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(userData));
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    try {
      const res = await fetch("/api/feedback");
      const data = await res.json();
      setFeedback(data);
    } catch (err) {
      setMessage("Error loading feedback: " + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user": JSON.stringify(user)
        },
        body: JSON.stringify(newFeedback)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Feedback submitted successfully!");
        setNewFeedback({ rating: 5, comment: "", category: "general" });
        loadFeedback();
      } else {
        setMessage("❌ Error: " + (data.error || "Failed to submit"));
      }
    } catch (err) {
      setMessage("❌ Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Message */}
        {message && (
          <div
            className={`p-4 mb-4 rounded ${
              message.includes("✅")
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        {/* Feedback Form */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-xl font-bold mb-4">Leave Feedback</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Rating</label>
              <div className="flex gap-2 text-2xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() =>
                      setNewFeedback((prev) => ({ ...prev, rating: star }))
                    }
                    className={
                      star <= newFeedback.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Category</label>
              <select
                className="w-full border p-2 rounded"
                value={newFeedback.category}
                onChange={(e) =>
                  setNewFeedback((prev) => ({
                    ...prev,
                    category: e.target.value
                  }))
                }
              >
                <option value="general">General</option>
                <option value="rooms">Rooms</option>
                <option value="services">Services</option>
                <option value="dining">Dining</option>
                <option value="staff">Staff</option>
                <option value="facilities">Facilities</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Comment</label>
              <textarea
                rows={4}
                required
                className="w-full border p-2 rounded"
                value={newFeedback.comment}
                onChange={(e) =>
                  setNewFeedback((prev) => ({ ...prev, comment: e.target.value }))
                }
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700"
            >
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
        </div>

        {/* Feedback List */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Recent Feedback</h2>
          {feedback.length === 0 ? (
            <p className="text-gray-500">No feedback yet.</p>
          ) : (
            feedback.map((f) => (
              <div key={f.id} className="border-b py-3">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{f.user_name}</h3>
                  <span>⭐ {f.rating}</span>
                </div>
                <p>{f.comment}</p>
                <small className="text-gray-500">
                  {new Date(f.created_at).toLocaleString()}
                </small>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}