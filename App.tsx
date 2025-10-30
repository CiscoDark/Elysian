import React, { useState, useEffect, useCallback } from 'react';
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

const pathViewMap: { [path: string]: View } = {
  '/': 'home',
  '/models': 'models',
  '/agencies/modeling': 'modelingAgencies',
  '/agencies/movie': 'movieAgencies',
  '/music/casting': 'musicVideoCasting',
  '/music/promoting': 'musicPromoting',
  '/apply': 'apply',
};

const viewPathMap: { [view in View]: string } = {
  home: '/',
  models: '/models',
  modelingAgencies: '/agencies/modeling',
  movieAgencies: '/agencies/movie',
  musicVideoCasting: '/music/casting',
  musicPromoting: '/music/promoting',
  apply: '/apply',
};

const getViewFromPath = (path: string): View => {
  return pathViewMap[path] || 'home';
};

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(getViewFromPath(window.location.pathname));
  const [isTutorialActive, setIsTutorialActive] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [scrollToModelId, setScrollToModelId] = useState<number | null>(null);

  const handleNavigation = useCallback(() => {
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    const modelId = params.get('scrollTo');

    setActiveView(getViewFromPath(path));
    setScrollToModelId(modelId ? Number(modelId) : null);
  }, []);
  
  const navigateTo = useCallback((view: View, options?: { modelId?: number }) => {
    const path = viewPathMap[view];
    if (!path) return;

    let url = path;
    if (options?.modelId) {
      url += `?scrollTo=${options.modelId}`;
    }
    
    // Prevent pushing the same state again
    if (window.location.pathname + window.location.search === url) return;

    window.history.pushState({}, '', url);
    handleNavigation();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [handleNavigation]);

  useEffect(() => {
    window.addEventListener('popstate', handleNavigation);
    
    // Initial check for query params on load
    handleNavigation();

    return () => {
      window.removeEventListener('popstate', handleNavigation);
    };
  }, [handleNavigation]);


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

  const handleModelClickFromHome = (modelId: number) => {
    navigateTo('models', { modelId });
  };

  const handleScrollComplete = useCallback(() => {
    setScrollToModelId(null);
    // Clean the URL after the scroll is complete to allow for sharing the link
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    if (path === '/models' && params.has('scrollTo')) {
        window.history.replaceState({}, '', path);
    }
  }, []);

  const renderView = () => {
    switch (activeView) {
      case 'models':
        return <Models scrollToModelId={scrollToModelId} onScrollComplete={handleScrollComplete} />;
      case 'modelingAgencies':
        return <ModelingAgencies />;
      case 'movieAgencies':
        return <MovieAgencies />;
      case 'musicVideoCasting':
        return <MusicVideoCasting />;
      case 'musicPromoting':
        return <MusicPromoting />;
      case 'apply':
        return <Apply navigateTo={navigateTo} />;
      case 'home':
      default:
        return <Home navigateTo={navigateTo} startTutorial={startTutorial} onModelClick={handleModelClickFromHome} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeView={activeView} navigateTo={navigateTo} />
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