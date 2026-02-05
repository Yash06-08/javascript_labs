import { Link, NavLink, useLocation } from 'react-router-dom';

/**
 * Sidebar Component - SQLBolt-style navigation
 */
function Sidebar({ lessons, completedExercises, isOpen, theme, onToggleTheme }) {
  const location = useLocation();

  const getLessonProgress = (lesson) => {
    const completed = lesson.exercises.filter(ex => completedExercises.has(ex.id)).length;
    return { completed, total: lesson.exercises.length };
  };

  const isLessonCompleted = (lesson) => {
    const progress = getLessonProgress(lesson);
    return progress.completed === progress.total;
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <Link to="/js" className="sidebar-brand" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="sidebar-brand-icon">JS</div>
          <span>JS Labs</span>
        </Link>
        <div className="sidebar-tagline">Learn JavaScript with interactive exercises</div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section">Interactive Lessons</div>

        {lessons.map(lesson => {
          const isActive = location.pathname === `/js/lesson/${lesson.slug}`;
          const completed = isLessonCompleted(lesson);
          const progress = getLessonProgress(lesson);

          return (
            <NavLink
              key={lesson.id}
              to={`/js/lesson/${lesson.slug}`}
              className={`sidebar-link ${isActive ? 'active' : ''} ${completed ? 'completed' : ''}`}
            >
              <span className="lesson-number">
                {completed ? '✓' : lesson.lessonNumber}
              </span>
              <span>{lesson.title.split(':')[0]}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="theme-toggle" onClick={onToggleTheme}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
