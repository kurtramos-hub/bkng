import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Profile() {
const router = useRouter();
const [user, setUser] = useState({ name: "", avatar: "" });
const [selectedFile, setSelectedFile] = useState(null);

useEffect(() => {
const userData = localStorage.getItem("user");
if (!userData) {
router.push("/login");
return;
}


const userObj = JSON.parse(userData);

// Load saved avatar from localStorage
const savedAvatar = localStorage.getItem("userAvatar");
if (savedAvatar) {
  setUser({ ...userObj, avatar: savedAvatar });
} else {
  setUser(userObj);
}


}, [router]);

const handleFileChange = (e) => {
const file = e.target.files[0];
if (file) {
const reader = new FileReader();
reader.onload = () => {
setUser((prev) => ({ ...prev, avatar: reader.result }));
localStorage.setItem("userAvatar", reader.result); // Save immediately
};
reader.readAsDataURL(file);
}
};

const handleNameChange = (e) => {
setUser((prev) => ({ ...prev, name: e.target.value }));
};

const handleSave = () => {
localStorage.setItem("user", JSON.stringify(user));
if (user.avatar) {
localStorage.setItem("userAvatar", user.avatar);
}
alert("Profile updated successfully!");
};

return ( <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
{/* Profile Card */} <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20"> <div className="text-center mb-8"> <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
Your Profile </h1> <p className="text-gray-600 text-lg">Manage your personal information</p> </div>


    {/* Profile Picture */}
    <div className="flex flex-col items-center mb-8">
      <div className="relative group">
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 p-1 shadow-lg">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt="Profile Avatar"
            className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
          />
        </div>
        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-sm font-medium">Change</span>
        </div>
      </div>

      <label className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg cursor-pointer font-semibold flex items-center space-x-2">
        <span>📷</span>
        <span>Choose Photo</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>

    {/* Name Input */}
    <div className="mb-8">
      <label className="block text-sm font-semibold text-gray-600 mb-3 text-center">
        Your Name
      </label>
      <input
        type="text"
        value={user.name}
        onChange={handleNameChange}
        placeholder="Enter your name"
        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white/50 backdrop-blur-sm text-center font-medium text-gray-800 placeholder-gray-400"
      />
    </div>

    {/* Action Buttons */}
    <div className="space-y-4">
      <button
        onClick={handleSave}
        className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg transform hover:scale-105 active:scale-95"
      >
        💾 Save Profile
      </button>
      <button
        onClick={() => router.push("/dashboard")}
        className="w-full px-6 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg transform hover:scale-105 active:scale-95"
      >
        ← Back to Dashboard
      </button>
    </div>
  </div>
</div>


);
}
