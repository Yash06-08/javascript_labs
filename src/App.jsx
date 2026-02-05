import { useState, useEffect } from 'react';
import { Routes, Route, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import LessonIntro from './components/LessonIntro';
import ExercisePage from './components/ExercisePage';
import LabsHome from './components/LabsHome';
import LanguagePlaceholder from './components/LanguagePlaceholder';
import { lessons } from './data/lessons';
import { getCompletedExercises } from './utils/storage';

function JsLabsLayout() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('js-labs-theme') || 'light';
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showMenuToggle, setShowMenuToggle] = useState(true);
  const [completedExercises, setCompletedExercises] = useState(() => getCompletedExercises());
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

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;

        if (Math.abs(delta) > 8) {
          if (delta > 0) setShowMenuToggle(false);
          else setShowMenuToggle(true);
          lastY = y;
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app">
      <button
        className={`menu-toggle ${showMenuToggle ? '' : 'hidden'}`}
        onClick={() => setSidebarOpen(prev => !prev)}
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
        <Outlet context={{ completedExercises, refreshProgress }} />
      </main>
    </div>
  );
}

function JsHomeRoute() {
  const { completedExercises } = useOutletContext();

  return (
    <Home
      lessons={lessons}
      completedExercises={completedExercises}
    />
  );
}

function JsLessonIntroRoute() {
  return <LessonIntro lessons={lessons} />;
}

function JsExerciseRoute() {
  const { refreshProgress } = useOutletContext();
  return <ExercisePage lessons={lessons} onComplete={refreshProgress} />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LabsHome />} />
      <Route path="/python" element={<LanguagePlaceholder language="Python" />} />
      <Route path="/sql" element={<LanguagePlaceholder language="SQL" />} />

      <Route path="/js" element={<JsLabsLayout />}>
        <Route index element={<JsHomeRoute />} />
        <Route path="lesson/:lessonSlug" element={<JsLessonIntroRoute />} />
        <Route path="lesson/:lessonSlug/exercise/:exerciseNumber" element={<JsExerciseRoute />} />
      </Route>
    </Routes>
  );
}

export default App;


