import React from 'react';
import { Smile, Frown, Zap, Coffee, Heart, Flame } from 'lucide-react';

const moods = [
  { id: 'happy', label: 'Happy', icon: Smile, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'hover:border-yellow-400' },
  { id: 'sad', label: 'Sad', icon: Frown, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'hover:border-blue-400' },
  { id: 'energetic', label: 'Energetic', icon: Zap, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'hover:border-purple-400' },
  { id: 'relaxed', label: 'Relaxed', icon: Coffee, color: 'text-green-400', bg: 'bg-green-400/10', border: 'hover:border-green-400' },
  { id: 'romantic', label: 'Romantic', icon: Heart, color: 'text-pink-400', bg: 'bg-pink-400/10', border: 'hover:border-pink-400' },
  { id: 'angry', label: 'Angry', icon: Flame, color: 'text-red-500', bg: 'bg-red-500/10', border: 'hover:border-red-500' },
];

const MoodSelector = ({ currentMood, onSelectMood }) => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4 text-white">Select your vibe:</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {moods.map((mood) => {
          const Icon = mood.icon;
          const isSelected = currentMood === mood.id;
          
          return (
            <button
              key={mood.id}
              onClick={() => onSelectMood(mood.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ${
                isSelected 
                  ? `border-${mood.color.split('-')[1]}-400 shadow-[0_0_15px_rgba(255,255,255,0.1)] ${mood.bg}` 
                  : 'border-white/10 hover:bg-cardHover bg-card/50'
              } ${mood.border}`}
            >
              <Icon className={`w-8 h-8 mb-2 ${isSelected ? mood.color : 'text-textSub group-hover:text-white transition-colors'}`} />
              <span className={`font-medium ${isSelected ? 'text-white' : 'text-textSub'}`}>
                {mood.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MoodSelector;
