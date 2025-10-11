import { useState } from 'react';
import LandingPage from './components/LandingPage';
import TourInput from './components/TourInput';
import TourDisplay from './components/TourDisplay';

type Screen = 'landing' | 'input' | 'display';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [tourDescription, setTourDescription] = useState<string>('');

  const handleGetStarted = () => {
    setCurrentScreen('input');
  };

  const handleGenerateTour = (description: string) => {
    setTourDescription(description);
    setCurrentScreen('display');
  };

  const handleBackToInput = () => {
    setCurrentScreen('input');
  };

  const handleStartOver = () => {
    setTourDescription('');
    setCurrentScreen('landing');
  };

  return (
    <div className="min-h-screen">
      {currentScreen === 'landing' && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}
      {currentScreen === 'input' && (
        <TourInput
          onGenerateTour={handleGenerateTour}
          onBack={handleStartOver}
        />
      )}
      {currentScreen === 'display' && (
        <TourDisplay
          userDescription={tourDescription}
          onBack={handleBackToInput}
          onStartOver={handleStartOver}
        />
      )}
    </div>
  );
}

export default App;
