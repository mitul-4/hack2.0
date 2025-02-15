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
      { id: 1, imageUrl: "https://tse1.mm.bing.net/th?id=OIP.sD9m1YZIkH13OklnDUl1JAHaHa&pid=Api&P=0&h=180", title: "Avocado Toast" },
      { id: 2, imageUrl: "https://www.sipandfeast.com/wp-content/uploads/2019/02/spaghetti-carbonara-recipe-6.jpg", title: "Pasta Carbonara" },
      { id: 3, imageUrl: "https://cookingformysoul.com/wp-content/uploads/2022/05/mixed-berry-smoothie-3-min.jpg", title: "Berry Smoothie" },
    ],
    saved: [
      { id: 4, imageUrl: "https://tse1.mm.bing.net/th?id=OIP.GXil4vpg7Pt2de32O7OseAHaHa&pid=Api&P=0&h=180", title: "Miso Soup" },
      { id: 5, imageUrl: "https://tse1.mm.bing.net/th?id=OIP.pelK9k5ccm6GNDcM6fEozQHaE8&pid=Api&P=0&h=180", title: "Tacos" },
      { id: 6, imageUrl: "https://sugargeekshow.com/wp-content/uploads/2020/01/chocolate-bundt-cake-featured.jpg", title: "Chocolate Cake" },
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
      <div className="grid grid-cols-3 gap-6 mt-6">
        {activeTab === "posts"
          ? user.posts.map((post) => (
              <div key={post.id} className="relative">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={300} // Increased width
                  height={300} // Increased height
                  className="w-full h-72 object-cover rounded-lg" // Adjusted height for cards
                />
              </div>
            ))
          : user.saved.map((saved) => (
              <div key={saved.id} className="relative">
                <Image
                  src={saved.imageUrl}
                  alt={saved.title}
                  width={300} // Increased width
                  height={300} // Increased height
                  className="w-full h-72 object-cover rounded-lg" // Adjusted height for cards
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Profile;
