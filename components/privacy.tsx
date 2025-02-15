const PrivacySettings = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Privacy Settings</h2>
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox" /> <span>Make profile private</span>
        </label>
      </div>
    );
  };
  
export default PrivacySettings