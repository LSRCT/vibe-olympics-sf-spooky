import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import type { User } from '@supabase/supabase-js';
import Auth from './components/Auth';
import LandingPage from './components/LandingPage';
import TourInput from './components/TourInput';
import TourDisplay from './components/TourDisplay';

type Screen = 'auth' | 'landing' | 'input' | 'display';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<Screen>('auth');
  const [tourDescription, setTourDescription] = useState<string>('');

  // Check for existing session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        setCurrentScreen('landing');
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user && currentScreen === 'auth') {
        setCurrentScreen('landing');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthSuccess = () => {
    setCurrentScreen('landing');
  };

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentScreen('auth');
    setTourDescription('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-spooky-darker via-spooky-dark to-spooky-purple flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">👻</div>
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* User info bar (shown on all screens except auth) */}
      {currentScreen !== 'auth' && (
        <div className="fixed top-0 right-0 p-4 z-50">
          <div className="bg-spooky-dark border border-purple-500 rounded-lg px-4 py-2 flex items-center gap-3">
            {user ? (
              <>
                <span className="text-purple-300 text-sm">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="text-spooky-orange hover:text-orange-400 text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <span className="text-gray-400 text-sm">Guest Mode</span>
            )}
          </div>
        </div>
      )}

      {/* Main content */}
      {currentScreen === 'auth' && (
        <Auth onAuthSuccess={handleAuthSuccess} />
      )}
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
