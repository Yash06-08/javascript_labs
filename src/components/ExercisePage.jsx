import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Exercise from './Exercise';
import { getCompletedExercises } from '../utils/storage';
import extraExercises from '../data/extraExercises';

function ExercisePage({ lessons, onComplete }) {
  const { lessonSlug, exerciseNumber } = useParams();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(new Set());

  const lesson = lessons.find(l => l.slug === lessonSlug);
  const lessonIndex = lessons.findIndex(l => l.slug === lessonSlug);
  const prevLesson = lessonIndex > 0 ? lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < lessons.length - 1 ? lessons[lessonIndex + 1] : null;

  // Merge base exercises with optional extras for this lesson slug
  const exercises = useMemo(() => {
    if (!lesson) return [];
    const extras = extraExercises[lesson.slug] || [];
    return [...lesson.exercises, ...extras];
  }, [lesson]);

  const indexByNumber = useMemo(() => {
    const map = new Map();
    exercises.forEach((ex, idx) => map.set(String(ex.number), idx));
    return map;
  }, [exercises]);

  const currentIndex = indexByNumber.get(String(exerciseNumber));
  const exercise = typeof currentIndex === 'number' ? exercises[currentIndex] : null;
  const prevExercise = typeof currentIndex === 'number' && currentIndex > 0 ? exercises[currentIndex - 1] : null;
  const nextExercise = typeof currentIndex === 'number' && currentIndex < exercises.length - 1 ? exercises[currentIndex + 1] : null;

  useEffect(() => {
    setCompleted(getCompletedExercises());
    window.scrollTo(0, 0);
  }, [lessonSlug, exerciseNumber]);

  if (!lesson || !exercise) {
    return (
      <div className="lesson-page">
        <h1>Exercise not found</h1>
        <Link to={`/js/lesson/${lessonSlug}`}>← Back to {lesson ? lesson.title.split(':')[0] : 'Lesson'}</Link>
      </div>
    );
  }

  const handleComplete = () => {
    setCompleted(getCompletedExercises());
    onComplete();
  };

  const goPrev = () => {
    if (prevExercise) navigate(`/js/lesson/${lesson.slug}/exercise/${prevExercise.number}`);
    else if (prevLesson) navigate(`/js/lesson/${prevLesson.slug}`);
  };

  const goNext = () => {
    if (nextExercise) navigate(`/js/lesson/${lesson.slug}/exercise/${nextExercise.number}`);
    else if (nextLesson) navigate(`/js/lesson/${nextLesson.slug}`);
  };

  return (
    <div className="lesson-page">
      <header className="lesson-header">
        <span className="lesson-badge">Lesson {lesson.lessonNumber}</span>
        <h1 className="lesson-title">{lesson.title}</h1>
        <nav className="lesson-nav" style={{ gap: '8px' }}>
          <Link to={`/js/lesson/${lesson.slug}`}>← Intro</Link>
          {prevExercise && (
            <button className="btn btn-secondary btn-sm" onClick={goPrev}>
              ← Exercise {prevExercise.number}
            </button>
          )}
          {nextExercise && (
            <button className="btn btn-primary btn-sm" onClick={goNext}>
              Exercise {nextExercise.number} →
            </button>
          )}
        </nav>
      </header>

      <section className="exercises-section">
        {/* Question header */}
        <article className="exercise-card" style={{ marginBottom: '16px' }}>
          <div className="exercise-header" style={{ cursor: 'default' }}>
            <span className="exercise-number">{exercise.number}</span>
            <span className="exercise-task">Exercise {exercise.number}</span>
          </div>
          <div className="exercise-body">
            <div className="exercises-intro" style={{ marginBottom: 0 }}>{exercise.task}</div>
            {exercise.hint && (
              <div className="exercise-hint" style={{ marginTop: '8px' }}>
                <strong>💡 Hint:</strong> {exercise.hint}
              </div>
            )}
          </div>
        </article>

        <div className="exercise-list">
          <Exercise
            exercise={exercise}
            isCompleted={completed.has(exercise.id)}
            onComplete={handleComplete}
            hideHeader={true}
            forceExpanded={true}
          />
        </div>

        <div className="lesson-footer" style={{ marginTop: '24px' }}>
          <div>
            {prevExercise ? (
              <button className="btn btn-secondary" onClick={goPrev}>← Previous</button>
            ) : (
              prevLesson ? <Link to={`/js/lesson/${prevLesson.slug}`} className="btn btn-secondary">← Prev Lesson</Link> : <span />
            )}
          </div>
          <div>
            {nextExercise ? (
              <button className="btn btn-primary" onClick={goNext}>Next →</button>
            ) : (
              nextLesson ? <Link to={`/js/lesson/${nextLesson.slug}`} className="btn btn-primary">Next Lesson →</Link> : <span />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ExercisePage;
