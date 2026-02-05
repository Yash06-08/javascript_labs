import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Exercise from './Exercise';
import { getCompletedExercises } from '../utils/storage';
import { execute } from '../utils/codeExecutor';
import OutputPanel from './OutputPanel';
import lessonExamples from '../data/examples';
import extraExercises from '../data/extraExercises';

/**
 * Lesson Page - SQLBolt-style with content + exercises
 */
function Lesson({ lessons, onComplete }) {
  const { lessonSlug } = useParams();
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [showModeHelp, setShowModeHelp] = useState(false);

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
        <Link to="/js">← Back to Home</Link>
      </div>
    );
  }

  const examplesData = (lesson.examples && Array.isArray(lesson.examples)) ? lesson.examples : (lessonExamples[lesson.slug] || []);
  const combinedExercises = Array.isArray(lesson.exercises)
    ? [...lesson.exercises, ...(extraExercises[lesson.slug] || [])]
    : (extraExercises[lesson.slug] || []);

function ExampleCard({ example }) {
  const [code, setCode] = useState(example.code || '');
  const [logs, setLogs] = useState([]);
  const [execTime, setExecTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState(null);

  const runExample = async () => {
    setIsRunning(true);
    setError(null);
    setLogs([]);
    setExecTime(null);
    try {
      const result = await execute(code, { isProgramMode: true });
      if (!result.success) {
        setError(result.error);
      }
      setLogs(result.logs || []);
      setExecTime(result.executionTime);
    } catch (e) {
      setError({ type: 'UnexpectedError', message: e.message });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <article className="exercise-card">
      <div className="exercise-header" style={{ cursor: 'default' }}>
        <span className="exercise-number">★</span>
        <span className="exercise-task">{example.title || 'Runnable Example'}</span>
        <span className="exercise-status">▶</span>
      </div>
      <div className="exercise-body">
        {example.description && (
          <div className="exercises-intro" style={{ marginBottom: '0.75rem' }}>{example.description}</div>
        )}
        <div className="code-editor-wrapper">
          <div className="code-editor-header">
            <span className="code-editor-title">Example Code</span>
            <div className="code-editor-actions">
              <button className={`btn btn-sm btn-primary ${isRunning ? 'running' : ''}`} onClick={runExample} disabled={isRunning}>
                {isRunning ? <><span className="spinner"></span> Running...</> : '▶ Run'}
              </button>
            </div>
          </div>
          <textarea
            className="code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />
          <div className="code-editor-footer">
            <span className="keyboard-hint">Edit and click Run</span>
          </div>
        </div>

        {error && (
          <div className="run-banner error">
            <strong>❌ {error.type}:</strong> {error.message}
          </div>
        )}

        <OutputPanel logs={logs} executionTime={execTime} isVisible={logs.length > 0 || execTime !== null} />
      </div>
    </article>
  );
}

  return (
    <div className="lesson-page">
      <header className="lesson-header">
        <span className="lesson-badge">Lesson {lesson.lessonNumber}</span>
        <h1 className="lesson-title">{lesson.title}</h1>
        <nav className="lesson-nav">
          {prevLesson && (
            <Link to={`/js/lesson/${prevLesson.slug}`}>← {prevLesson.title.split(':')[0]}</Link>
          )}
          {nextLesson && (
            <Link to={`/js/lesson/${nextLesson.slug}`}>{nextLesson.title.split(':')[0]} →</Link>
          )}
        </nav>
      </header>

      <div
        className="lesson-content"
        dangerouslySetInnerHTML={{ __html: formatContent(lesson.content) }}
      />

      {/* Examples (optional) */}
      {examplesData.length > 0 && (
        <section className="exercises-section">
          <h2 className="exercises-title">Example Program</h2>
          <div className="exercise-list">
            {examplesData.map((ex, idx) => (
              <ExampleCard key={idx} example={ex} />)
            )}
          </div>
        </section>
      )}

      <section className="exercises-section">
        <h2 className="exercises-title">Exercises</h2>
        <p className="exercises-intro">
          Complete the following exercises to practice what you've learned.
          Write your solution in the editor and click "Run" to test it.
          {' '}
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            style={{ marginLeft: '8px' }}
            onClick={() => setShowModeHelp(v => !v)}
          >
            {showModeHelp ? 'Hide Help' : 'What does Run do?'}
          </button>
        </p>

        {showModeHelp && (
          <div className="exercise-hint" style={{ marginTop: '10px' }}>
            <strong>How code is executed</strong>
            <ul style={{ marginTop: '6px', marginBottom: 0, paddingLeft: '18px' }}>
              <li>
                <strong>Program mode</strong>: Runs your entire code top-to-bottom and captures what you print with <code>console.log</code>.
                Great for early lessons like Hello World, variables, conditionals, and loops.
              </li>
              <li>
                <strong>Function mode</strong>: You define a function with a specific name. We call your function with test inputs and
                check its <em>return value</em> against the expected answer.
              </li>
              <li>
                Both modes run in a safe sandbox with a short time limit to prevent infinite loops.
              </li>
            </ul>
          </div>
        )}

        <div className="exercise-list">
          {combinedExercises.map(exercise => (
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
          <Link to={`/js/lesson/${prevLesson.slug}`}>← Previous Lesson</Link>
        ) : <span />}
        {nextLesson ? (
          <Link to={`/js/lesson/${nextLesson.slug}`}>Next Lesson →</Link>
        ) : (
          <Link to="/js">← Back to Home</Link>
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
