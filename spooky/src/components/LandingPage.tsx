import React from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-spooky-darker via-spooky-dark to-spooky-purple flex items-center justify-center px-4">
      <div className="max-w-4xl text-center">
        {/* Title */}
        <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-pulse">
          <span className="text-spooky-orange">👻</span>
          <span className="text-white"> Haunted SF</span>
          <span className="text-spooky-orange"> 🎃</span>
        </h1>

        {/* Subtitle */}
        <p className="text-2xl md:text-3xl text-purple-200 mb-4">
          Walking Audio Tours
        </p>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Dare to explore the haunted streets of San Francisco?
          Generate your own spooky walking tour and uncover the dark secrets
          lurking in the City by the Bay...
        </p>

        {/* CTA Button */}
        <button
          onClick={onGetStarted}
          className="bg-spooky-orange hover:bg-orange-600 text-white font-bold text-xl px-12 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          Begin Your Haunted Journey
        </button>

        {/* Spooky tagline */}
        <p className="text-sm text-purple-300 mt-8 italic">
          "Not all who wander are lost... but some are haunted"
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
