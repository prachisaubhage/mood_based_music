import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-r-2 border-blue-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        <div className="absolute inset-4 rounded-full border-b-2 border-purple-500 animate-spin" style={{ animationDuration: '2s' }}></div>
      </div>
      <p className="mt-6 text-textSub font-medium tracking-widest text-sm uppercase">Curating the perfect playlist...</p>
    </div>
  );
};

export default LoadingSpinner;
