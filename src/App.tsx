import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingGlass from './components/LoadingGlass';
import type { View } from './types';
import BackToTopButton from './components/BackToTopButton';
import TagSlider from './views/home/TagSlider';
import Tutorial from './components/Tutorial';
import { playSound } from './utils/sound';

// Lazy-loaded views for code splitting and lightweight initial bundle
const Home = lazy(() => import('./views/Home'));
const Models = lazy(() => import('./views/models/Models'));
const ModelingAgencies = lazy(() => import('./views/agencies/ModelingAgencies'));
const MovieAgencies = lazy(() => import('./views/agencies/MovieAgencies'));
const MovieCasting = lazy(() => import('./views/casting/MovieCasting'));
const MusicVideoCasting = lazy(() => import('./views/casting/MusicVideoCasting'));
const MusicPromoting = lazy(() => import('./views/music/MusicPromoting'));
const Apply = lazy(() => import('./views/apply/Apply'));

const pathViewMap: { [path: string]: View } = {
  '/': 'home',
  '/models': 'models',
  '/agencies/modeling': 'modelingAgencies',
  '/agencies/movie': 'movieAgencies',
  '/casting/movie': 'movieCasting',
  '/music/casting': 'musicVideoCasting',
  '/music/promoting': 'musicPromoting',
  '/apply': 'apply',
};

const viewPathMap: { [view in View]: string } = {
  home: '/',
  models: '/models',
  modelingAgencies: '/agencies/modeling',
  movieAgencies: '/agencies/movie',
  movieCasting: '/casting/movie',
  musicVideoCasting: '/music/casting',
  musicPromoting: '/music/promoting',
  apply: '/apply',
};

const getViewFromHash = (hash: string): View => {
  const path = hash.length > 1 ? hash.substring(1).split('?')[0] : '/';
  return pathViewMap[path] || 'home';
};

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(getViewFromHash(window.location.hash));
  const [isTutorialActive, setIsTutorialActive] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [scrollToModelId, setScrollToModelId] = useState<number | null>(null);

  const navigateTo = useCallback((view: View, options?: { modelId?: number }) => {
    // Only access/remove storage if an active flag exists to avoid redundant writes
    if (view !== 'apply' && typeof window !== 'undefined' && sessionStorage.getItem('applicationSubmitted')) {
      sessionStorage.removeItem('applicationSubmitted');
    }

    const path = viewPathMap[view];
    if (path === undefined) return;

    let hash = `#${path}`;
    if (options?.modelId) {
      hash += `?scrollTo=${options.modelId}`;
    }

    if (window.location.hash !== hash) {
      window.location.hash = hash;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    playSound('click', 0.25);
    setTutorialStep((prev) => prev + 1);
  };

  const prevStep = () => {
    playSound('click', 0.25);
    setTutorialStep((prev) => prev - 1);
  };

  const handleModelClickFromHome = (modelId: number) => {
    navigateTo('models', { modelId });
  };

  const handleScrollComplete = useCallback(() => {
    setScrollToModelId(null);
    const currentHash = window.location.hash;
    const viewPath = currentHash.split('?')[0];

    if (viewPath === '#/models' && currentHash.includes('?scrollTo=')) {
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
      case 'movieCasting':
        return <MovieCasting />;
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
    <div className="min-h-screen flex flex-col bg-[#050507] text-[#FAFAFA] antialiased selection:bg-white/20 selection:text-white">
      <Header activeView={activeView} navigateTo={navigateTo} startTutorial={startTutorial} />
      <TagSlider
        onSelectTag={() => {
          navigateTo('models');
        }}
      />
      <main className="flex-grow">
        <Suspense fallback={<LoadingGlass />}>
          {renderView()}
        </Suspense>
      </main>
      <Footer navigateTo={navigateTo} />
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

// © Elysian Talent Hub — Cisco Dark / Jolayemi / hazelyak
export default App;
