import React from 'react';
import { Music, Headphones } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-6 px-4 md:px-8 border-b border-white/10 glass-panel sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-full">
            <Music className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Mood<span className="text-primary">Music</span>
            </h1>
            <p className="text-xs text-textSub hidden md:block">AI-Powered Spotify Recommendations</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
