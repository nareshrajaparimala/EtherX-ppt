import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Landing = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="container mx-auto px-6 py-4">
        <nav className="navbar">
          <div className="flex items-center space-x-2">
            <img src="/src/assets/icons/DOCS-LOGO-final-transparent.png" alt="Logo" className="w-8 h-8" />
            <span className="text-2xl font-bold nav-title">EtherXPPT</span>
          </div>
          <div className="flex items-center space-x-3">
            {/* Theme toggle near signup */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all duration-200 border"
              style={{
                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'
              }}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {isDark ? (
                <svg className="w-5 h-5 text-neutral-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <Link to="/login" className="px-4 py-2 rounded-md font-medium border"
              onClick={() => {
                // Mark returning user flow
                localStorage.setItem('authFlow', 'login');
              }}
              style={{
                color: isDark ? '#f3f4f6' : '#000000',
                borderColor: isDark ? 'rgba(255,255,255,0.24)' : '#111827',
                background: isDark ? 'rgba(255,255,255,0.04)' : 'transparent'
              }}
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => {
                // Mark first-time user flow (Sign In experience)
                localStorage.setItem('authFlow', 'signin');
              }}
              className="px-4 py-2 rounded-md font-semibold shadow-sm"
              style={{
                background: 'linear-gradient(90deg, var(--accent-gold), var(--gold-hover))',
                color: '#111',
                border: '1px solid rgba(0,0,0,0.25)'
              }}
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in nav-title">
            Create Amazing
            <span className="text-white"> Presentations</span>
          </h1>
          <p className="text-xl text-neutral-300 mb-8 animate-slide-in-up">
            Professional PowerPoint-like editor with real-time collaboration, 
            modern design tools, and seamless workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in">
            <Link to="/signup" className="btn-primary text-lg px-8 py-3">
              Get Started Free
            </Link>
            <Link to="/dashboard" className="btn-secondary text-lg px-8 py-3">
              Try Demo
            </Link>
          </div>
        </div>

        {/* Features Grid replaced per requirements */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <button
            onClick={() => navigate('/dashboard')}
            className="panel p-6 text-center animate-slide-in-left hover:shadow-glow transition"
          >
            <div className="w-12 h-12 bg-transparent rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🆕</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">New Presentation</h3>
            <p className="text-neutral-300">Create and open a new presentation instantly.</p>
          </button>
          
          <button
            onClick={() => {
              if (user) navigate('/dashboard?view=favourites');
            }}
            className="panel p-6 text-center animate-zoom-in hover:shadow-glow transition"
            disabled={!user}
            title={user ? 'View your favourites' : 'Login required'}
          >
            <div className="w-12 h-12 bg-transparent rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Favourites</h3>
            <p className="text-neutral-300">{user ? 'Your starred presentations.' : 'Sign in to access favourites.'}</p>
          </button>
          
          <button
            onClick={() => {
              if (user) navigate('/dashboard?view=history');
            }}
            className="panel p-6 text-center animate-slide-in-right hover:shadow-glow transition"
            disabled={!user}
            title={user ? 'View your history' : 'Login required'}
          >
            <div className="w-12 h-12 bg-transparent rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🕘</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">History</h3>
            <p className="text-neutral-300">{user ? 'Recently worked on presentations.' : 'Sign in to access history.'}</p>
          </button>
        </div>

        {/* Simplified UI: remove cluttered features */}
        <div className="mt-20 text-center"></div>
      </main>

      {/* Footer */}
      <footer className="py-12 mt-20">
        <div className="container mx-auto px-6 text-center text-neutral-300">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="/src/assets/icons/DOCS-LOGO-final-transparent.png" alt="Logo" className="w-8 h-8" />
            <span className="text-2xl font-bold nav-title">EtherXPPT</span>
          </div>
          <p className="mb-4">Professional presentation software for modern teams</p>
          <div className="flex justify-center space-x-6">
            <Link to="/login" className="text-neutral-300 hover:text-white">Login</Link>
            <Link to="/signup" className="text-neutral-300 hover:text-white">Sign Up</Link>
            <a href="#" className="text-neutral-300 hover:text-white">Documentation</a>
            <a href="#" className="text-neutral-300 hover:text-white">Support</a>
          </div>
          <div className="mt-8 pt-8 border-t border-transparent">
            <p className="text-neutral-400">© 2025 EtherXPPT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;