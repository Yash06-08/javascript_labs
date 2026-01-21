import { useState, useEffect } from 'react';
import { runTests, getTestSummary } from '../utils/testRunner';
import { setExerciseCompleted, getFailedAttempts, incrementFailedAttempts } from '../utils/storage';

/**
 * Exercise Component - Individual exercise with editor and tests
 * Shows solution after 2+ failed attempts
 */
function Exercise({ exercise, isCompleted, onComplete }) {
  const [code, setCode] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isExpanded, setIsExpanded] = useState(!isCompleted);

  useEffect(() => {
    const saved = localStorage.getItem(`exercise-code-${exercise.id}`);
    setCode(saved || exercise.starterCode);
    setFailedAttempts(getFailedAttempts(exercise.id));
  }, [exercise]);

  useEffect(() => {
    if (code && code !== exercise.starterCode) {
      localStorage.setItem(`exercise-code-${exercise.id}`, code);
    }
  }, [code, exercise]);

  const handleRun = () => {
    const result = runTests(code, exercise);

    if (result.error) {
      setError(result.error);
      setResults([]);
      // Count syntax errors as failed attempts too
      const newAttempts = incrementFailedAttempts(exercise.id);
      setFailedAttempts(newAttempts);
    } else {
      setError(null);
      setResults(result.results);

      const summary = getTestSummary(result.results);
      if (summary.allPassed) {
        setExerciseCompleted(exercise.id);
        onComplete();
      } else {
        // Increment failed attempts when tests fail
        const newAttempts = incrementFailedAttempts(exercise.id);
        setFailedAttempts(newAttempts);
      }
    }
  };

  const handleReset = () => {
    setCode(exercise.starterCode);
    setResults(null);
    setError(null);
    setShowHint(false);
    setShowSolution(false);
    localStorage.removeItem(`exercise-code-${exercise.id}`);
  };

  const handleCopySolution = () => {
    if (exercise.solution) {
      setCode(exercise.solution);
      setShowSolution(false);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRun();
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newValue);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const summary = results ? getTestSummary(results) : null;
  const canShowSolution = failedAttempts >= 2 && exercise.solution && !isCompleted;

  return (
    <article className={`exercise-card ${isCompleted ? 'completed' : ''}`}>
      <div
        className="exercise-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="exercise-number">{exercise.number}</span>
        <span className="exercise-task">{exercise.task}</span>
        <span className="exercise-status">
          {isCompleted ? '✓' : isExpanded ? '−' : '+'}
        </span>
      </div>

      {isExpanded && (
        <div className="exercise-body">
          {showHint && (
            <div className="exercise-hint">
              <strong>Hint:</strong> {exercise.hint}
            </div>
          )}

          {showSolution && exercise.solution && (
            <div className="exercise-solution">
              <div className="solution-header">
                <strong>💡 Solution</strong>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={handleCopySolution}
                >
                  Copy to Editor
                </button>
              </div>
              <pre className="solution-code"><code>{exercise.solution}</code></pre>
            </div>
          )}

          <div className="code-editor-wrapper">
            <div className="code-editor-header">
              <span className="code-editor-title">Your Solution</span>
              <div className="code-editor-actions">
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => setShowHint(!showHint)}
                >
                  {showHint ? 'Hide Hint' : 'Hint'}
                </button>
                {canShowSolution && (
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => setShowSolution(!showSolution)}
                  >
                    {showSolution ? 'Hide Solution' : 'Show Solution'}
                  </button>
                )}
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={handleRun}
                >
                  ▶ Run
                </button>
              </div>
            </div>
            <textarea
              className="code-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
            />
          </div>

          <div className="test-results">
            <div className="test-results-header">
              <span className="test-results-title">Test Results</span>
              {summary && (
                <span className={`test-results-summary ${summary.allPassed ? 'passed' : 'failed'}`}>
                  {summary.allPassed ? '✓ All Passed' : `${summary.passed}/${summary.total} Passed`}
                </span>
              )}
            </div>
            <div className="test-results-body">
              {error && (
                <div className="test-error">{error}</div>
              )}

              {!error && !results && (
                <div className="test-empty">
                  Click "Run" to test your solution (or press Ctrl+Enter)
                </div>
              )}

              {results && results.map((result, i) => (
                <div key={i} className="test-item">
                  <span className={`test-icon ${result.passed ? 'pass' : 'fail'}`}>
                    {result.passed ? '✓' : '✗'}
                  </span>
                  <span className="test-description">{result.description}</span>
                </div>
              ))}

              {/* Show attempts info when close to unlocking solution */}
              {!isCompleted && failedAttempts > 0 && failedAttempts < 2 && (
                <div className="attempts-info">
                  💡 {2 - failedAttempts} more attempt{failedAttempts === 1 ? '' : 's'} to unlock solution
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default Exercise;
