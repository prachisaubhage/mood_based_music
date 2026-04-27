import React from 'react';
import SongCard from './SongCard';

const SongGrid = ({ tracks, mood }) => {
  if (!tracks || tracks.length === 0) {
    return (
      <div className="py-12 text-center text-textSub bg-card/30 rounded-xl border border-white/5">
        <p>No tracks found for this mood.</p>
        <p className="text-sm mt-2">Try a different feeling!</p>
      </div>
    );
  }

  return (
    <div className="mt-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white capitalize flex items-center gap-2">
          {mood} <span className="text-primary font-normal text-lg">Vibes</span>
        </h2>
        <span className="text-sm text-textSub">{tracks.length} tracks</span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {tracks.map((track, index) => (
          <div 
            key={track.id} 
            className="animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <SongCard track={track} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongGrid;
