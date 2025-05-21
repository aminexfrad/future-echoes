
import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className="w-full py-6 px-4 sm:px-6 lg:px-8 absolute bottom-0 left-0 z-10">
      <div className={`max-w-7xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-[20px]'}`}>
        <p className="text-sm text-white font-light animate-fade-in">
          Une expérience où l'humain interagit avec l'invisible, l'attente, et le futur.
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="h-1 w-1 rounded-full bg-white animate-pulse-soft"></div>
          <div className="h-1 w-1 rounded-full bg-white animate-pulse-soft" style={{ animationDelay: '0.5s' }}></div>
          <div className="h-1 w-1 rounded-full bg-white animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
          <div className="h-1 w-1 rounded-full bg-white/70 animate-pulse-soft" style={{ animationDelay: '1.5s' }}></div>
          <div className="h-1 w-1 rounded-full bg-white/70 animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
        </div>
        <p className="mt-4 text-xs text-white/50 opacity-50 hover:opacity-100 transition-opacity duration-300">
          © {new Date().getFullYear()} Échos du Futur
        </p>
      </div>
    </footer>
  );
};

export default Footer;
