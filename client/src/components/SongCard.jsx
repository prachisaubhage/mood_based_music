import React, { useRef, useState } from 'react';
import { Play, Pause, ExternalLink } from 'lucide-react';

const SongCard = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!track.previewUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Find any other playing audio and pause it (optional enhancement)
      document.querySelectorAll('audio').forEach(a => a.pause());
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div 
      className="group bg-card hover:bg-cardHover rounded-xl p-4 transition-all duration-300 border border-white/5 hover:border-white/10 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
      onClick={() => window.open(track.spotifyUrl, '_blank')}
      role="button"
    >
      {/* Play/Pause Overlay */}
      <div className="relative aspect-square mb-4 rounded-md overflow-hidden bg-darker">
        <img 
          src={track.albumArt || 'https://via.placeholder.com/300x300?text=No+Cover'} 
          alt={track.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {track.previewUrl && (
          <button 
            onClick={togglePlay}
            className={`absolute bottom-2 right-2 p-3 rounded-full bg-primary text-black shadow-lg shadow-black/40 transform transition-all duration-300 ${isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'} hover:scale-105 hover:bg-green-400 z-10`}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
          </button>
        )}
        
        {!track.previewUrl && (
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur text-white text-[10px] px-2 py-1 rounded font-medium border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            No Preview
          </div>
        )}
      </div>

      <div>
        <h3 className="text-white font-bold text-base truncate pr-6 group-hover:text-primary transition-colors">
          {track.title}
        </h3>
        <p className="text-textSub text-sm truncate mt-1">
          {track.artist}
        </p>
      </div>

      <ExternalLink className="absolute bottom-4 right-4 w-4 h-4 text-textSub opacity-0 group-hover:opacity-100 transition-opacity" />

      {track.previewUrl && (
        <audio 
          ref={audioRef} 
          src={track.previewUrl} 
          onEnded={handleEnded}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        />
      )}
    </div>
  );
};

export default SongCard;
