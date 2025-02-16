"use client";
import { useState } from "react";
import { UserCircle, Bookmark, List, Utensils } from "lucide-react";
import ProfileInfo from "../../components/ProfileInfo";
import DietaryPreferences from "../../components/ProfilePreferences";
import CookingHistory from "../../components/FavouritedRecipes";
import ShoppingListReminders from "../../components/ShoppingReminders";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const tabs = [
    { name: "Profile", Icon: UserCircle, component: <ProfileInfo /> },
    { name: "Dietary Preferences", Icon: Utensils, component: <DietaryPreferences /> },
    { name: "History", Icon: Bookmark, component: <CookingHistory /> },
    { name: "Shopping List", Icon: List, component: <ShoppingListReminders /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <nav className="w-64 bg-white shadow-lg p-2 space-y-4">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`flex items-center gap-2 p-2 rounded-lg w-full ${activeTab === tab.name ? "bg-[#00a36c] text-white" : "text-gray-700"}`}
            onClick={() => setActiveTab(tab.name)}
          >
            <tab.Icon size={20} /> {tab.name}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {tabs.map(
          (tab) =>
            activeTab === tab.name && (
              <div key={tab.name}>
                {tab.component}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Profile;
