import { useState } from "react";

const Settings = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleProfileUpdate = () => {
    alert("Profile updated successfully!");
    setIsProfileModalOpen(false);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
    alert(`Notifications ${notificationsEnabled ? "enabled" : "disabled"}`);
  };

  const handleLogout = () => {
    alert("You have been logged out!");
    // Handle actual logout logic (clear session, tokens, etc.)
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Settings</h2>

      {/* Profile Update Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Profile Settings</h3>
        <button
          onClick={() => setIsProfileModalOpen(true)}
          className="bg-[#00a36c] text-white py-2 px-6 rounded-full hover:bg-[#007f4c] transition-colors duration-300"
        >
          Update Profile
        </button>
      </div>

      {/* Notifications Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Notification Settings</h3>
        <button
          onClick={toggleNotifications}
          className="py-2 px-6 rounded-full bg-[#00a36c] text-white hover:bg-[#007f4c] transition-colors duration-300"
        >
          {notificationsEnabled ? "Enable Notifications" : "Disable Notifications"}
        </button>
      </div>

      {/* Logout Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Account Settings</h3>
        <button
          onClick={handleLogout}
          className="bg-[#00a36c] text-white py-2 px-6 rounded-full hover:bg-[#007f4c] transition-colors duration-300"
        >
          Logout
        </button>
      </div>

      {/* Profile Update Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Update Profile</h3>
            <div className="mb-4">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="New Name"
                className="w-full p-3 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-[#00a36c]"
              />
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="New Username"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00a36c]"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleProfileUpdate}
                className="bg-[#00a36c] text-white py-2 px-6 rounded-full hover:bg-[#007f4c] transition-colors duration-300"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="bg-gray-300 text-gray-700 py-2 px-6 rounded-full hover:bg-gray-400 transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
