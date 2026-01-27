import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Lesson from './components/Lesson';
import { lessons } from './data/lessons';
import { getCompletedExercises } from './utils/storage';

/**
 * Main App Component - SQLBolt-style Layout
 */
function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('js-labs-theme') || 'light';
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('js-labs-theme', theme);
  }, [theme]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  const refreshProgress = () => {
    setCompletedExercises(getCompletedExercises());
  };

  useEffect(() => {
    refreshProgress();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app">
      <button
        className="menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      <div
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <Sidebar
        lessons={lessons}
        completedExercises={completedExercises}
        isOpen={sidebarOpen}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                lessons={lessons}
                completedExercises={completedExercises}
              />
            }
          />
          <Route
            path="/lesson/:lessonSlug"
            element={
              <Lesson
                lessons={lessons}
                onComplete={refreshProgress}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
