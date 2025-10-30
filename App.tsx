
import React, { useState } from 'react';
import Header from './components/Header';
import Home from './views/Home';
import Models from './views/models/Models';
import ModelingAgencies from './views/agencies/ModelingAgencies';
import MovieAgencies from './views/agencies/MovieAgencies';
import MusicVideoCasting from './views/casting/MusicVideoCasting';
import MusicPromoting from './views/music/MusicPromoting';
import Apply from './views/apply/Apply';
import type { View } from './types';
import BackToTopButton from './components/BackToTopButton';
import TagSlider from './views/home/TagSlider';
import Tutorial from './components/Tutorial';
import { playSound } from './utils/sound';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('home');
  const [isTutorialActive, setIsTutorialActive] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  const startTutorial = () => {
    playSound('open');
    setTutorialStep(0);
    setIsTutorialActive(true);
  };

  const endTutorial = () => {
    playSound('close');
    setIsTutorialActive(false);
  };

  const nextStep = () => {
    playSound('click', 0.3);
    setTutorialStep(prev => prev + 1);
  };

  const prevStep = () => {
    playSound('click', 0.3);
    setTutorialStep(prev => prev - 1);
  };

  const renderView = () => {
    switch (activeView) {
      case 'models':
        return <Models />;
      case 'modelingAgencies':
        return <ModelingAgencies />;
      case 'movieAgencies':
        return <MovieAgencies />;
      case 'musicVideoCasting':
        return <MusicVideoCasting />;
      case 'musicPromoting':
        return <MusicPromoting />;
      case 'apply':
        return <Apply setActiveView={setActiveView} />;
      case 'home':
      default:
        return <Home setActiveView={setActiveView} startTutorial={startTutorial} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeView={activeView} setActiveView={setActiveView} />
      {activeView === 'home' && <TagSlider />}
      <main className="flex-grow">
        {renderView()}
      </main>
      <BackToTopButton />
      {isTutorialActive && (
        <Tutorial
          stepIndex={tutorialStep}
          nextStep={nextStep}
          prevStep={prevStep}
          endTour={endTutorial}
          setStep={setTutorialStep}
        />
      )}
    </div>
  );
};

export default App;
