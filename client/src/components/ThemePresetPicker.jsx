import React from 'react';

const PRESETS = [
  {
    id: 'default',
    name: 'Default (Dark + Gold)',
    vars: {
      '--primary-dark': '#1B1A17',
      '--accent-gold': '#F0A500',
      '--text-light': '#FFFFFF',
      '--gold-hover': '#d48f00'
    }
  },
  {
    id: 'ocean',
    name: 'Ocean Blue',
    vars: {
      '--primary-dark': '#0b132b',
      '--accent-gold': '#1c2541',
      '--text-light': '#e0e6f1',
      '--gold-hover': '#3a506b'
    }
  },
  {
    id: 'forest',
    name: 'Forest Green',
    vars: {
      '--primary-dark': '#0f1f14',
      '--accent-gold': '#2f6d3d',
      '--text-light': '#e6f2ea',
      '--gold-hover': '#3f8d50'
    }
  }
];

const applyVars = (vars) => {
  const root = document.documentElement;
  Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
};

const ThemePresetPicker = ({ onClose, onSelect }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="modal w-[420px]">
        <div className="modal-header">
          <h3 className="nav-title">Theme Presets</h3>
          <button onClick={onClose} className="btn-ghost">✕</button>
        </div>
        <div className="space-y-2">
          {PRESETS.map(p => (
            <button
              key={p.id}
              onClick={() => { applyVars(p.vars); onSelect?.(p.id); onClose?.(); }}
              className="w-full text-left dropdown-item"
            >
              {p.name}
            </button>
          ))}
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ThemePresetPicker;
