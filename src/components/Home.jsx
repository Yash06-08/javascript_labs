import { useNavigate } from 'react-router-dom';

/**
 * Home Page - Shows all lessons with progress
 */
function Home({ lessons, completedExercises }) {
  const navigate = useNavigate();

  const getLessonProgress = (lesson) => {
    const completed = lesson.exercises.filter(ex => completedExercises.has(ex.id)).length;
    return { completed, total: lesson.exercises.length };
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <h1 className="home-title">Learn JavaScript</h1>
        <p className="home-subtitle">
          Master JavaScript fundamentals through hands-on interactive exercises.
          Complete each lesson to build a solid foundation.
        </p>
      </header>

      <div className="lessons-grid">
        {lessons.map(lesson => {
          const progress = getLessonProgress(lesson);
          const isComplete = progress.completed === progress.total;

          return (
            <article
              key={lesson.id}
              className={`lesson-card ${isComplete ? 'completed' : ''}`}
              onClick={() => navigate(`/js/lesson/${lesson.slug}`)}
            >
              <div className="lesson-card-number">{lesson.lessonNumber}</div>
              <h3>{lesson.title}</h3>
              <p>{lesson.exercises.length} exercises</p>
              <div className="lesson-card-progress">
                {progress.completed > 0 ? (
                  <span className={isComplete ? 'completed-text' : ''}>
                    {isComplete ? '✓ Completed' : `${progress.completed}/${progress.total} completed`}
                  </span>
                ) : (
                  'Not started'
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
