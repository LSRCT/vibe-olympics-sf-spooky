import React, { useState } from 'react';

interface TourInputProps {
  onGenerateTour: (description: string) => void;
  onBack: () => void;
}

const TourInput: React.FC<TourInputProps> = ({ onGenerateTour, onBack }) => {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      setIsGenerating(true);
      // Simulate generation delay
      setTimeout(() => {
        onGenerateTour(description);
        setIsGenerating(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-spooky-darker via-spooky-dark to-spooky-purple px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Back button */}
        <button
          onClick={onBack}
          className="text-purple-300 hover:text-white mb-8 flex items-center gap-2"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Create Your Tour <span className="text-spooky-orange">👻</span>
          </h1>
          <p className="text-gray-300">
            Describe the kind of haunted tour you'd like to experience...
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="description" className="block text-white text-lg mb-2">
              Tour Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., A tour of haunted Victorian mansions in Pacific Heights..."
              className="w-full h-40 px-4 py-3 bg-spooky-dark border-2 border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-spooky-orange resize-none"
              disabled={isGenerating}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={!description.trim() || isGenerating}
            className="w-full bg-spooky-orange hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold text-xl px-8 py-4 rounded-lg shadow-lg transform hover:scale-105 disabled:hover:scale-100 transition-all duration-200"
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Summoning spirits...
              </span>
            ) : (
              '🔮 Generate Haunted Tour'
            )}
          </button>
        </form>

        {/* Tips */}
        <div className="mt-12 p-6 bg-spooky-dark/50 border border-purple-500 rounded-lg">
          <h3 className="text-spooky-orange font-bold mb-3">Pro Tips:</h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>• Be specific about neighborhoods (e.g., Haight-Ashbury, Mission District)</li>
            <li>• Mention interests (Victorian architecture, true crime, ghost stories)</li>
            <li>• Don't worry - we'll make it spooky no matter what! 👻</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TourInput;
