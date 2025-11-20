import { useEffect, useState } from 'react';
import logo from '../assets/icons/DOCS-LOGO-final-transparent.png';

// Clean, minimal SplashScreen showing only logo, title, and tagline
function SplashScreen({ onLoadingComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Keep splash briefly for brand visibility, then proceed
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (typeof onLoadingComplete === 'function') onLoadingComplete();
    }, 1200);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center p-8 z-50 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ background: 'var(--primary-dark)' }}
    >
      <div className="flex flex-col items-center text-center">
        {/* Company Logo - prominent */}
        <img
          src={logo}
          alt="Company logo"
          className="w-28 h-28 md:w-32 md:h-32 mb-4 object-contain"
        />

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: 'var(--accent-gold)' }}>
          Etherx PPT
        </h1>

        {/* Tagline under title */}
        <p className="text-base md:text-lg text-white/70">
          where vision meets reality
        </p>
      </div>
    </div>
  );
}

export default SplashScreen;
