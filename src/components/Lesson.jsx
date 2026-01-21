import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Exercise from './Exercise';
import { getCompletedExercises } from '../utils/storage';

/**
 * Lesson Page - SQLBolt-style with content + exercises
 */
function Lesson({ lessons, onComplete }) {
  const { lessonSlug } = useParams();
  const [completedExercises, setCompletedExercises] = useState(new Set());

  const lesson = lessons.find(l => l.slug === lessonSlug);
  const lessonIndex = lessons.findIndex(l => l.slug === lessonSlug);
  const prevLesson = lessonIndex > 0 ? lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < lessons.length - 1 ? lessons[lessonIndex + 1] : null;

  useEffect(() => {
    setCompletedExercises(getCompletedExercises());
    window.scrollTo(0, 0);
  }, [lessonSlug]);

  const handleExerciseComplete = () => {
    setCompletedExercises(getCompletedExercises());
    onComplete();
  };

  if (!lesson) {
    return (
      <div className="lesson-page">
        <h1>Lesson not found</h1>
        <Link to="/">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="lesson-page">
      <header className="lesson-header">
        <span className="lesson-badge">Lesson {lesson.lessonNumber}</span>
        <h1 className="lesson-title">{lesson.title}</h1>
        <nav className="lesson-nav">
          {prevLesson && (
            <Link to={`/lesson/${prevLesson.slug}`}>← {prevLesson.title.split(':')[0]}</Link>
          )}
          {nextLesson && (
            <Link to={`/lesson/${nextLesson.slug}`}>{nextLesson.title.split(':')[0]} →</Link>
          )}
        </nav>
      </header>

      <div
        className="lesson-content"
        dangerouslySetInnerHTML={{ __html: formatContent(lesson.content) }}
      />

      <section className="exercises-section">
        <h2 className="exercises-title">Exercises</h2>
        <p className="exercises-intro">
          Complete the following exercises to practice what you've learned.
          Write your solution in the editor and click "Run" to test it.
        </p>

        <div className="exercise-list">
          {lesson.exercises.map(exercise => (
            <Exercise
              key={exercise.id}
              exercise={exercise}
              isCompleted={completedExercises.has(exercise.id)}
              onComplete={handleExerciseComplete}
            />
          ))}
        </div>
      </section>

      <footer className="lesson-footer">
        {prevLesson ? (
          <Link to={`/lesson/${prevLesson.slug}`}>← Previous Lesson</Link>
        ) : <span />}
        {nextLesson ? (
          <Link to={`/lesson/${nextLesson.slug}`}>Next Lesson →</Link>
        ) : (
          <Link to="/">← Back to Home</Link>
        )}
      </footer>
    </div>
  );
}

/**
 * Format lesson content markdown to HTML
 */
function formatContent(content) {
  return content
    // Headers
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    // Code blocks
    .replace(/```javascript\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/```\n?([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hpuol])/gm, '<p>')
    .replace(/(<p><\/p>|<p>(<[huo])|(<\/[huo]>)<\/p>)/g, '$2$3');
}

export default Lesson;
