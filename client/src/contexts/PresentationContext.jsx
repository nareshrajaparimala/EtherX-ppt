import React, { createContext, useContext, useState, useEffect } from 'react';

const PresentationContext = createContext();

export const usePresentation = () => {
  const context = useContext(PresentationContext);
  if (!context) {
    throw new Error('usePresentation must be used within a PresentationProvider');
  }
  return context;
};

export const PresentationProvider = ({ children }) => {
  const [slides, setSlides] = useState([{
    id: 1,
    title: 'Slide 1',
    content: 'Click to add content',
    background: '#ffffff',
    textColor: '#000000',
    layout: 'title-content',
    elements: []
  }]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [clipboard, setClipboard] = useState(null);
  const [presentationMeta, setPresentationMeta] = useState({
    title: 'Untitled',
    author: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    slideSize: '16:9',
    themePreset: 'default',
    header: { default: '', first: '', even: '', odd: '' },
    footer: { default: '', first: '', even: '', odd: '' }
  });

  // Push a new snapshot into history (trimming future states)
  const pushHistory = (nextSlides) => {
    try {
      const snapshot = JSON.parse(JSON.stringify(nextSlides));
      const base = history.slice(0, historyIndex + 1);
      const updated = [...base, snapshot];
      setHistory(updated);
      setHistoryIndex(base.length);
    } catch (e) {
      console.warn('History snapshot failed:', e);
    }
  };

  const addSlide = (layout = 'blank') => {
    const newSlide = {
      id: Date.now(),
      title: `Slide ${slides.length + 1}`,
      content: 'Click to add content',
      background: '#ffffff',
      textColor: '#000000',
      layout,
      elements: []
    };
    const next = [...slides, newSlide];
    setSlides(next);
    setCurrentSlide(slides.length);
    pushHistory(next);
  };

  const deleteSlide = (index) => {
    if (slides.length > 1) {
      const newSlides = slides.filter((_, i) => i !== index);
      setSlides(newSlides);
      if (currentSlide >= newSlides.length) {
        setCurrentSlide(newSlides.length - 1);
      }
      pushHistory(newSlides);
    }
  };

  const duplicateSlide = (index) => {
    const slide = slides[index];
    const newSlide = { ...JSON.parse(JSON.stringify(slide)), id: Date.now(), title: `${slide.title} Copy` };
    const newSlides = [...slides];
    newSlides.splice(index + 1, 0, newSlide);
    setSlides(newSlides);
    pushHistory(newSlides);
  };

  const resetSlide = (index) => {
    const newSlides = [...slides];
    newSlides[index] = {
      ...newSlides[index],
      content: 'Click to add content',
      elements: []
    };
    setSlides(newSlides);
    pushHistory(newSlides);
  };

  const updateSlide = (index, updates) => {
    const newSlides = [...slides];
    newSlides[index] = { ...newSlides[index], ...updates };
    setSlides(newSlides);
    pushHistory(newSlides);
  };

  const applyLayout = (index, layout) => {
    const newSlides = [...slides];
    const current = { ...newSlides[index] };

    // Initialize layout-specific metadata and fields
    let layoutMeta = {};
    switch (layout) {
      case 'blank':
        layoutMeta = { type: 'blank' };
        // Clear standard fields for blank if desired
        current.title = '';
        current.content = '';
        break;
      case 'title-content':
        layoutMeta = { type: 'title-content' };
        current.title = current.title || '';
        current.content = current.content || '';
        break;
      case 'title-only':
        layoutMeta = { type: 'title-only' };
        current.title = current.title || '';
        current.content = '';
        break;
      case 'content-only':
        layoutMeta = { type: 'content-only' };
        current.title = '';
        current.content = current.content || '';
        break;
      case 'two-column':
        layoutMeta = { type: 'two-column', columns: 2 };
        current.contentLeft = current.contentLeft || '';
        current.contentRight = current.contentRight || '';
        break;
      case 'image-text':
        layoutMeta = { type: 'image-text', regions: [{ type: 'image' }, { type: 'text' }] };
        current.imageSrc = current.imageSrc || '';
        current.content = current.content || '';
        break;
      case 'comparison':
        layoutMeta = { type: 'comparison', columns: 2 };
        current.compLeftTitle = current.compLeftTitle || '';
        current.compLeftContent = current.compLeftContent || '';
        current.compRightTitle = current.compRightTitle || '';
        current.compRightContent = current.compRightContent || '';
        break;
      default:
        layoutMeta = { type: layout };
    }

    current.layout = layout;
    current.layoutMeta = layoutMeta;
    newSlides[index] = current;
    setSlides(newSlides);
    pushHistory(newSlides);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setSlides(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setSlides(history[historyIndex + 1]);
    }
  };

  const copy = () => {
    setClipboard(slides[currentSlide]);
  };

  const paste = () => {
    if (clipboard) {
      const newSlide = { ...JSON.parse(JSON.stringify(clipboard)), id: Date.now() };
      const next = [...slides, newSlide];
      setSlides(next);
      pushHistory(next);
    }
  };

  const reorderSlides = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
    const next = [...slides];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    setSlides(next);
    setCurrentSlide(toIndex);
    pushHistory(next);
  };

  useEffect(() => {
    // initialize history on mount
    if (historyIndex === -1) {
      const initial = JSON.parse(JSON.stringify(slides));
      setHistory([initial]);
      setHistoryIndex(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem('presentation', JSON.stringify({ slides, presentationMeta }));
    }, 30000);
    return () => clearInterval(interval);
  }, [slides, presentationMeta]);

  const value = {
    slides,
    setSlides,
    currentSlide,
    setCurrentSlide,
    addSlide,
    deleteSlide,
    duplicateSlide,
    resetSlide,
    updateSlide,
    applyLayout,
    undo,
    redo,
    copy,
    paste,
    clipboard,
    presentationMeta,
    setPresentationMeta,
    reorderSlides
  };

  return (
    <PresentationContext.Provider value={value}>
      {children}
    </PresentationContext.Provider>
  );
};