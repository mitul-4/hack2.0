type OtherConsiderationsProps = {
  effort: string;
  setEffort: React.Dispatch<React.SetStateAction<string>>;
  sentiment: string;
  setSentiment: React.Dispatch<React.SetStateAction<string>>;
  saveConsiderations: () => void;
};

const OtherConsiderations: React.FC<OtherConsiderationsProps> = ({
  effort,
  setEffort,
  sentiment,
  setSentiment,
  saveConsiderations,
}) => {
  // Function to show alert on save
  const handleSave = () => {
    // Trigger the save alert
    alert(" Considerations saved!");
    // Call saveConsiderations if needed
    saveConsiderations();
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg mb-6">
      <h2 className="text-2xl font-semibold mb-4">Step 3: Other Considerations</h2>

      {/* Effort Selection */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Time/Effort</label>
        <select
          value={effort}
          onChange={(e) => setEffort(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select effort level...</option>
          <option value="Quick Meal (≤15 min)">Quick Meal (≤15 min)</option>
          <option value="Standard (30 min)">Standard (30 min)</option>
          <option value="Detailed (1 hr+)">Detailed (1 hr+)</option>
        </select>
      </div>

      {/* Sentiment Selection */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Cravings</label>
        <select
          value={sentiment}
          onChange={(e) => setSentiment(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select a craving...</option>
          <option value="Sweet">Sweet</option>
          <option value="Savory">Savory</option>
          <option value="Spicy">Spicy</option>
          <option value="Sour">Sour</option>
          <option value="Umami">Umami</option>
        </select>
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-[#00a36c] text-white py-2 rounded-full hover:bg-[#007f4c]"
      >
        Save Considerations
      </button>
    </div>
  );
};

export default OtherConsiderations;
