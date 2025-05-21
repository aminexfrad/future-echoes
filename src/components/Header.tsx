
import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const Header = () => {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [isVisible, setIsVisible] = useState(false);
  const isNightTime = currentHour < 6 || currentHour >= 20;

  useEffect(() => {
    // Update current hour every minute
    const timer = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000);

    // Animate in
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => {
      clearInterval(timer);
      clearTimeout(visibilityTimer);
    };
  }, []);

  return (
    <header className="w-full py-6 px-4 sm:px-6 lg:px-8 absolute top-0 left-0 z-10">
      <div className={`flex justify-between items-center max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-[-20px]'}`}>
        <div className="text-xl sm:text-2xl font-light tracking-wider text-white animate-pulse-soft">
          Échos du Futur
        </div>
        <div className="flex items-center space-x-2">
          {isNightTime ? (
            <Moon className="h-5 w-5 text-white opacity-70 animate-pulse-soft" />
          ) : (
            <Sun className="h-5 w-5 text-white opacity-70 animate-pulse-soft" />
          )}
          <span className="text-sm text-white/70 animate-fade-in">
            {new Date().toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
