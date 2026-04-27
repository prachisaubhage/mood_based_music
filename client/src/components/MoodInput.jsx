import React from 'react';
import { Search } from 'lucide-react';

const MoodInput = ({ value, onChange, onEnter, isClassifying }) => {
  return (
    <div className="w-full mt-8 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Or type how you feel:</h2>
        {isClassifying && (
          <span className="text-xs text-primary animate-pulse flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary inline-block animate-ping"></span>
            Detecting vibe...
          </span>
        )}
      </div>
      
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-textSub group-focus-within:text-primary transition-colors" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onEnter) {
              onEnter();
            }
          }}
          placeholder="e.g. 'I just aced my exam and I want to dance!'"
          className="block w-full pl-12 pr-4 py-4 bg-card border border-white/10 rounded-xl text-white placeholder-textSub/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-inner text-lg"
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <div className="h-full flex items-center">
            {value.length > 0 && !isClassifying && (
              <span className="text-xs text-textSub bg-darker px-2 py-1 rounded border border-white/5">
                Press Enter
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodInput;
