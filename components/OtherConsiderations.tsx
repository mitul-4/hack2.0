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
  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Step 3: Other Consideration</h2>
      <div className="mb-4">
        <textarea
          value={effort}
          onChange={(e) => setEffort(e.target.value)}
          placeholder="Allergies (e.g., nuts, dairy)"
          className="w-full p-2 border rounded-md mb-2"
        />
        <textarea
          value={sentiment}
          onChange={(e) => setSentiment(e.target.value)}
          placeholder="Health Goals (e.g., weight loss, muscle gain)"
          className="w-full p-2 border rounded-md mb-2"
        />
        <button
          onClick={saveConsiderations}
          className="w-full bg-[#00a36c] text-white py-2 rounded-full hover:bg-[#007f4c]"
        >
          Save Considerations
        </button>
      </div>
    </div>
  )
};

export default OtherConsiderations;