"use client";

import { useState } from "react";
import Image from "next/image";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<"posts" | "saved">("posts");

  // Dummy User Data (Replace with actual user data)
  const user = {
    name: "John Doe",
    username: "johndoe",
    avatar: "https://wallpapers.com/images/featured/funny-facebook-profile-pictures-nghrweqjmsbdt69s.jpg", // ✅ Use an external image
    followers: 1200,
    following: 500,
    posts: [
      { id: 1, imageUrl: "/recipe1.jpg", title: "Avocado Toast" },
      { id: 2, imageUrl: "/recipe2.jpg", title: "Pasta Carbonara" },
      { id: 3, imageUrl: "/recipe3.jpg", title: "Berry Smoothie" },
    ],
    saved: [
      { id: 4, imageUrl: "/recipe4.jpg", title: "Vegan Tacos" },
      { id: 5, imageUrl: "/recipe5.jpg", title: "Miso Soup" },
      { id: 6, imageUrl: "/recipe6.jpg", title: "Chocolate Cake" },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-6">
        {/* Profile Picture */}
        <div className="w-24 h-24">
          <Image
            src={user.avatar}
            alt="Profile Picture"
            width={96}
            height={96}
            className="rounded-full border-2 border-gray-300"
          />
        </div>

        {/* User Info */}
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">@{user.username}</p>
          <div className="flex space-x-4 mt-2">
            <p className="font-semibold">{user.posts.length} Posts</p>
            <p className="font-semibold">{user.followers} Followers</p>
            <p className="font-semibold">{user.following} Following</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation (Posts & Saved) */}
      <div className="mt-6 flex border-b">
        <button
          className={`flex-1 py-2 text-center font-bold transition-all duration-300 ${
            activeTab === "posts"
              ? "border-b-2 border-[#00a36c] text-[#00a36c]"
              : "text-gray-600 hover:text-[#00a36c]"
          }`}
          onClick={() => setActiveTab("posts")}
        >
          Posts
        </button>
        <button
          className={`flex-1 py-2 text-center font-bold transition-all duration-300 ${
            activeTab === "saved"
              ? "border-b-2 border-[#00a36c] text-[#00a36c]"
              : "text-gray-600 hover:text-[#00a36c]"
          }`}
          onClick={() => setActiveTab("saved")}
        >
          Saved
        </button>
      </div>

      {/* Posts or Saved Recipes */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {activeTab === "posts"
          ? user.posts.map((post) => (
              <div key={post.id} className="relative">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={150}
                  height={150}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
            ))
          : user.saved.map((saved) => (
              <div key={saved.id} className="relative">
                <Image
                  src={saved.imageUrl}
                  alt={saved.title}
                  width={150}
                  height={150}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Profile;
