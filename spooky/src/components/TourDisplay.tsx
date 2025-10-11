import React from 'react';

interface TourStop {
  id: number;
  title: string;
  location: string;
  story: string;
  spookyFact: string;
}

interface TourDisplayProps {
  userDescription: string;
  onBack: () => void;
  onStartOver: () => void;
}

// Mock spooky tour data
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getMockTourStops = (_userDescription: string): TourStop[] => {
  // TODO: In the future, this will use the userDescription to generate custom tours
  return [
    {
      id: 1,
      title: "The Haunted Mansion of Nob Hill",
      location: "1000 California Street",
      story: "In 1906, during the great earthquake, the wealthy Vanderbilt family perished in their mansion. Locals report seeing ghostly figures in Victorian attire wandering the grounds at midnight, searching for their lost fortune buried beneath the rubble.",
      spookyFact: "Visitors claim to hear the sound of breaking china and screams echoing from the empty halls."
    },
    {
      id: 2,
      title: "Alcatraz's Cursed Cellblock D",
      location: "Alcatraz Island",
      story: "The infamous 'hole' where prisoners were kept in solitary confinement. Multiple guards reported seeing shadowy figures and hearing blood-curdling screams from empty cells. One guard refused to ever enter D-Block again after claiming cold hands grabbed him from behind.",
      spookyFact: "Cell 14D is said to be haunted by a prisoner who was found strangled under mysterious circumstances."
    },
    {
      id: 3,
      title: "The Ghosts of Fisherman's Wharf",
      location: "Pier 39",
      story: "Before it was a tourist destination, this area was the site of numerous shipwrecks. Fishermen spoke of phantom ships appearing in the fog, crewed by the skeletal remains of sailors lost at sea. The sounds of creaking wood and ghostly shanties echo when the fog rolls in.",
      spookyFact: "Old sailors refuse to dock here after sunset, claiming the drowned pull living souls into the depths."
    },
    {
      id: 4,
      title: "The Haunted Cable Car Turnaround",
      location: "Powell and Market Streets",
      story: "In 1892, a cable car operator named Thomas McCready was crushed when a cable snapped. His ghost is said to operate phantom cable cars that appear in the dead of night, taking passengers on a one-way journey to the afterlife.",
      spookyFact: "Witnesses report boarding empty cable cars that move on their own, operated by a figure in Victorian clothing."
    },
    {
      id: 5,
      title: "The Mission Dolores Cemetery",
      location: "3321 16th Street",
      story: "San Francisco's oldest building houses thousands of unmarked graves. The cemetery is said to be haunted by the spirits of Native Americans and early settlers. On foggy nights, ghostly processions of mourners in period dress march through the grounds.",
      spookyFact: "The statue of Father Junípero Serra is said to weep blood on the anniversary of the 1906 earthquake."
    }
  ];
};

const TourDisplay: React.FC<TourDisplayProps> = ({ userDescription, onBack, onStartOver }) => {
  const tourStops = getMockTourStops(userDescription);

  return (
    <div className="min-h-screen bg-gradient-to-b from-spooky-darker via-spooky-dark to-spooky-purple px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className="text-purple-300 hover:text-white flex items-center gap-2"
          >
            ← Edit Description
          </button>
          <button
            onClick={onStartOver}
            className="text-spooky-orange hover:text-orange-400 flex items-center gap-2"
          >
            Start Over
          </button>
        </div>

        {/* Tour Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Your Haunted Tour <span className="text-spooky-orange">👻</span>
          </h1>
          <div className="bg-spooky-dark/50 border border-purple-500 rounded-lg p-4 inline-block">
            <p className="text-gray-300 italic">"{userDescription}"</p>
          </div>
        </div>

        {/* Tour Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="bg-spooky-dark border border-purple-500 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🚶</div>
            <div className="text-white font-bold">{tourStops.length} Stops</div>
            <div className="text-gray-400 text-sm">~2.5 miles</div>
          </div>
          <div className="bg-spooky-dark border border-purple-500 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-white font-bold">90 minutes</div>
            <div className="text-gray-400 text-sm">walking time</div>
          </div>
          <div className="bg-spooky-dark border border-purple-500 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">😱</div>
            <div className="text-white font-bold">Very Spooky</div>
            <div className="text-gray-400 text-sm">scare level</div>
          </div>
        </div>

        {/* Tour Stops */}
        <div className="space-y-8">
          {tourStops.map((stop, index) => (
            <div
              key={stop.id}
              className="bg-spooky-dark border-2 border-purple-500 rounded-lg p-6 hover:border-spooky-orange transition-colors duration-200"
            >
              {/* Stop number */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-spooky-orange rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {index + 1}
                </div>
                <div className="flex-1">
                  {/* Title and location */}
                  <h3 className="text-2xl font-bold text-white mb-2">{stop.title}</h3>
                  <p className="text-purple-300 mb-4 flex items-center gap-2">
                    📍 {stop.location}
                  </p>

                  {/* Story */}
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {stop.story}
                  </p>

                  {/* Spooky fact */}
                  <div className="bg-spooky-darker border border-spooky-orange rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <span className="text-2xl">💀</span>
                      <div>
                        <p className="text-spooky-orange font-bold text-sm mb-1">SPOOKY FACT:</p>
                        <p className="text-gray-300 text-sm">{stop.spookyFact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="mt-12 flex gap-4 justify-center">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
            🎧 Generate Audio (Coming Soon)
          </button>
          <button className="bg-spooky-orange hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
            💾 Save Tour (Coming Soon)
          </button>
        </div>

        {/* Warning */}
        <div className="mt-12 text-center">
          <p className="text-purple-300 italic text-sm">
            ⚠️ Please be respectful of the locations and their histories. Some sites may be on private property.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TourDisplay;
