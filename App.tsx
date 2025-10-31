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

const getViewFromHash = (hash: string): View => {
  // if hash is "" or "#", path is "/"
  const path = hash.length > 1 ? hash.substring(1).split('?')[0] : '/';
  return pathViewMap[path] || 'home';
};

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(getViewFromHash(window.location.hash));
  const [isTutorialActive, setIsTutorialActive] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [scrollToModelId, setScrollToModelId] = useState<number | null>(null);

  const navigateTo = useCallback((view: View, options?: { modelId?: number }) => {
    // Clear application submission status when navigating away to another view.
    // This ensures if the user navigates back to 'Apply', they see the form again.
    if (view !== 'apply') {
        sessionStorage.removeItem('applicationSubmitted');
    }

    const path = viewPathMap[view];
    if (path === undefined) return;

    let hash = `#${path}`;
    if (options?.modelId) {
      hash += `?scrollTo=${options.modelId}`;
    }
    
    // Setting the hash will trigger the 'hashchange' event listener
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const pathPart = hash.split('?')[0];
      const searchPart = hash.split('?')[1];
      const params = new URLSearchParams(searchPart);
      const modelId = params.get('scrollTo');

      setActiveView(getViewFromHash(pathPart));
      setScrollToModelId(modelId ? Number(modelId) : null);
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Initial check on load
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);


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
    const currentHash = window.location.hash;
    const viewPath = currentHash.split('?')[0];

    if (viewPath === '#/models' && currentHash.includes('?scrollTo=')) {
        // Use replaceState to avoid triggering hashchange and scroll to top
        window.history.replaceState({}, '', window.location.pathname + viewPath);
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
