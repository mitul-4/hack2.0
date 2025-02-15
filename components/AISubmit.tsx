type AISubmitProps = {
  AIResponse: string;
  callAI: () => void;
};

const AISubmit: React.FC<AISubmitProps> = ({AIResponse, callAI}) => {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Generate Meal Plan!</h2>
      <button
        onClick={callAI}
        className="w-full bg-[#00a36c] text-white py-2 rounded-full hover:bg-[#007f4c]"
      >
        Create your meal
      </button>
      <div>{AIResponse}</div>
    </div>
  );
};

export default AISubmit;