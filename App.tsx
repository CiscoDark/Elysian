
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

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('home');

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
        return <Home setActiveView={setActiveView} />;
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
    </div>
  );
};

export default App;