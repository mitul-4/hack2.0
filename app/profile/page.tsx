'use client';
import { useState } from "react";
import { UserCircle, Bookmark, Bell, Shield, List, Utensils, Settings } from "lucide-react";
import ProfileInfo from "../../components/ProfileInfo";
import DietaryPreferences from "../../components/ProfilePreferences";
import CookingHistory from "../../components/FavouritedRecipes";
import PrivacySettings from "../../components/privacy";
import PushNotifications from "../../components/notifs";
import ShoppingListReminders from "../../components/ShoppingReminders";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  // Dummy Data (Replace with user data)
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/profile-pic.jpg", // Replace with actual user image
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <nav className="w-64 bg-white shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <button className={`flex items-center gap-2 p-2 rounded-lg w-full ${activeTab === "profile" ? "bg-blue-500 text-white" : "text-gray-700"}`} onClick={() => setActiveTab("profile")}>
          <UserCircle size={20} /> Profile  
        </button>
        <button className={`flex items-center gap-2 p-2 rounded-lg w-full ${activeTab === "diet" ? "bg-blue-500 text-white" : "text-gray-700"}`} onClick={() => setActiveTab("diet")}>
          <Utensils size={20} /> Dietary Preferences
        </button>
        <button className={`flex items-center gap-2 p-2 rounded-lg w-full ${activeTab === "history" ? "bg-blue-500 text-white" : "text-gray-700"}`} onClick={() => setActiveTab("history")}>
          <Bookmark size={20} /> Favourited Recipes
        </button>
        <button className={`flex items-center gap-2 p-2 rounded-lg w-full ${activeTab === "privacy" ? "bg-blue-500 text-white" : "text-gray-700"}`} onClick={() => setActiveTab("privacy")}>
          <Shield size={20} /> Privacy Settings
        </button>
        <button className={`flex items-center gap-2 p-2 rounded-lg w-full ${activeTab === "notifications" ? "bg-blue-500 text-white" : "text-gray-700"}`} onClick={() => setActiveTab("notifications")}>
          <Bell size={20} /> Push Notifications
        </button>
        <button className={`flex items-center gap-2 p-2 rounded-lg w-full ${activeTab === "reminders" ? "bg-blue-500 text-white" : "text-gray-700"}`} onClick={() => setActiveTab("reminders")}>
          <List size={20} /> Shopping List
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === "profile" && <ProfileInfo user={user} />}
        {activeTab === "diet" && <DietaryPreferences />}
        {activeTab === "history" && <CookingHistory />}
        {activeTab === "privacy" && <PrivacySettings />}
        {activeTab === "notifications" && <PushNotifications />}
        {activeTab === "reminders" && <ShoppingListReminders />}
      </div>
    </div>
  );
};

export default Profile;

  
