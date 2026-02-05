import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import lessonExamples from '../data/examples';

function LessonIntro({ lessons }) {
  const { lessonSlug } = useParams();
  const lesson = lessons.find(l => l.slug === lessonSlug);
  const lessonIndex = lessons.findIndex(l => l.slug === lessonSlug);
  const prevLesson = lessonIndex > 0 ? lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < lessons.length - 1 ? lessons[lessonIndex + 1] : null;

  useEffect(() => { window.scrollTo(0, 0); }, [lessonSlug]);

  if (!lesson) {
    return (
      <div className="lesson-page">
        <h1>Lesson not found</h1>
        <Link to="/js">← Back to Home</Link>
      </div>
    );
  }

  const examples = Array.isArray(lesson.examples) ? lesson.examples : (lessonExamples[lesson.slug] || []);

  return (
    <div className="lesson-page">
      <header className="lesson-header">
        <span className="lesson-badge">Lesson {lesson.lessonNumber}</span>
        <h1 className="lesson-title">{lesson.title}</h1>
        <nav className="lesson-nav">
          {prevLesson && (<Link to={`/js/lesson/${prevLesson.slug}`}>← {prevLesson.title.split(':')[0]}</Link>)}
          {nextLesson && (<Link to={`/js/lesson/${nextLesson.slug}`}>{nextLesson.title.split(':')[0]} →</Link>)}
        </nav>
      </header>

      <div className="lesson-content" dangerouslySetInnerHTML={{ __html: formatContent(lesson.content) }} />

      {examples.length > 0 && (
        <section className="exercises-section">
          <h2 className="exercises-title">Example Program</h2>
          <div className="exercise-list">
            {examples.map((ex, i) => (
              <article key={i} className="exercise-card">
                <div className="exercise-header" style={{ cursor: 'default' }}>
                  <span className="exercise-number">★</span>
                  <span className="exercise-task">{ex.title || 'Example'}</span>
                </div>
                <div className="exercise-body">
                  {ex.description && <div className="exercises-intro" style={{ marginBottom: '8px' }}>{ex.description}</div>}
                  <pre className="solution-code"><code>{ex.code}</code></pre>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="exercises-section">
        <h2 className="exercises-title">Start Exercises</h2>
        <p className="exercises-intro">Work through each exercise one-by-one. Your progress is saved locally.</p>
        <div style={{ marginBottom: '12px' }}>
          {lesson.exercises?.length > 0 && (
            <Link className="btn btn-primary" to={`/js/lesson/${lesson.slug}/exercise/1`}>Start Lesson →</Link>
          )}
        </div>
        <div className="exercise-list">
          {lesson.exercises.map((ex) => (
            <Link key={ex.id} to={`/js/lesson/${lesson.slug}/exercise/${ex.number}`} className="exercise-card" style={{ textDecoration: 'none' }}>
              <div className="exercise-header">
                <span className="exercise-number">{ex.number}</span>
                <span className="exercise-task">{ex.task}</span>
                <span className="exercise-status">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function formatContent(content) {
  if (!content) return '';
  let html = content;
  html = html.replace(/^###\s(.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s(.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s(.+)$/gm, '<h1>$1</h1>');
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  html = html.replace(/\n/g, '<br>');
  return html;
}

export default LessonIntro;
