import { useState, useEffect } from 'react';
import { execute } from '../utils/codeExecutor';
import { setExerciseCompleted, getFailedAttempts, incrementFailedAttempts } from '../utils/storage';
import OutputPanel from './OutputPanel';

/**
 * Exercise Component - Individual exercise with editor, tests, and console output
 * Features: Web Worker execution, console capture, solution with confirmation
 */
function Exercise({ exercise, isCompleted, onComplete, hideHeader = false, forceExpanded = false }) {
  const [code, setCode] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [logs, setLogs] = useState([]);
  const [executionTime, setExecutionTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showSolutionConfirm, setShowSolutionConfirm] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isExpanded, setIsExpanded] = useState(forceExpanded || !isCompleted);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`exercise-code-${exercise.id}`);
    setCode(saved || exercise.starterCode);
    setFailedAttempts(getFailedAttempts(exercise.id));
  }, [exercise]);

  useEffect(() => {
    if (forceExpanded) {
      setIsExpanded(true);
    }
  }, [forceExpanded, exercise?.id]);

  useEffect(() => {
    if (code && code !== exercise.starterCode) {
      localStorage.setItem(`exercise-code-${exercise.id}`, code);
    }
  }, [code, exercise]);

  const handleRun = async () => {
    setIsRunning(true);
    setError(null);
    setResults(null);
    setShowSuccess(false);

    try {
      const result = await execute(code, exercise);

      setLogs(result.logs || []);
      setExecutionTime(result.executionTime);

      if (!result.success) {
        setError({
          type: result.error.type,
          message: result.error.message,
          hint: result.error.hint
        });
        setResults([]);
        const newAttempts = incrementFailedAttempts(exercise.id);
        setFailedAttempts(newAttempts);
      } else {
        // Validation logic for Program Mode vs Function Mode
        if (exercise.isProgramMode) {
          const programResults = exercise.testCases.map(tc => {
            if (tc.isConsoleTest) {
              const logContents = (result.logs || []).map(l => l.content);

              let passed = false;
              if (tc.expectedOutput !== undefined) {
                // Pass if ANY console line exactly matches expectedOutput as string
                const expected = String(tc.expectedOutput);
                passed = logContents.some(c => c === expected);
              }
              if (!passed && typeof tc.validate === 'function') {
                try {
                  passed = !!tc.validate(result.logs || []);
                } catch (_) {
                  passed = false;
                }
              }

              return {
                description: tc.description,
                passed,
                actual: logContents,
                expected: tc.expectedOutput
              };
            }
            return { description: tc.description, passed: false };
          });

          setResults(programResults);
          const allPassed = programResults.every(r => r.passed);

          if (allPassed) {
            setExerciseCompleted(exercise.id);
            setShowSuccess(true);
            onComplete();
            setTimeout(() => setShowSuccess(false), 2000);
          } else {
            const newAttempts = incrementFailedAttempts(exercise.id);
            setFailedAttempts(newAttempts);
          }
        } else {
          setResults(result.results);
          if (result.summary.allPassed) {
            setExerciseCompleted(exercise.id);
            setShowSuccess(true);
            onComplete();
            setTimeout(() => setShowSuccess(false), 2000);
          } else {
            const newAttempts = incrementFailedAttempts(exercise.id);
            setFailedAttempts(newAttempts);
          }
        }
      }
    } catch (err) {
      setError({
        type: 'UnexpectedError',
        message: err.message,
        hint: 'An unexpected error occurred. Try refreshing the page.'
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(exercise.starterCode);
    setResults(null);
    setError(null);
    setLogs([]);
    setExecutionTime(null);
    setShowHint(false);
    setShowSolution(false);
    setShowSolutionConfirm(false);
    localStorage.removeItem(`exercise-code-${exercise.id}`);
  };

  const handleShowSolution = () => {
    // If solution is currently visible, hide it immediately
    if (showSolution) {
      setShowSolution(false);
      setShowSolutionConfirm(false);
      return;
    }

    // Otherwise, if this is the very first attempt, show confirmation
    if (failedAttempts === 0) {
      setShowSolutionConfirm(true);
      return;
    }

    // Past the first-attempt gate: show the solution
    setShowSolution(true);
  };

  const confirmShowSolution = () => {
    setShowSolutionConfirm(false);
    setShowSolution(true);
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

  const getTestSummary = () => {
    if (!results || results.length === 0) return null;
    const passed = results.filter(r => r.passed).length;
    return {
      passed,
      total: results.length,
      allPassed: passed === results.length
    };
  };

  const summary = getTestSummary();
  const canShowSolution = exercise.solution && !isCompleted;

  return (
    <article className={`exercise-card ${isCompleted ? 'completed' : ''} ${showSuccess ? 'success-animation' : ''}`}>
      {!hideHeader && (
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
      )}

      {isExpanded && (
        <div className="exercise-body">
          {/* Solution Confirmation Modal */}
          {showSolutionConfirm && (
            <div className="solution-confirm-modal">
              <div className="solution-confirm-content">
                <h4>💡 Are you sure?</h4>
                <p>Try solving it yourself first! You'll learn more by working through the problem.</p>
                <div className="solution-confirm-actions">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => setShowSolutionConfirm(false)}
                  >
                    Keep Trying
                  </button>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={confirmShowSolution}
                  >
                    Show Solution Anyway
                  </button>
                </div>
              </div>
            </div>
          )}

          {showHint && (
            <div className="exercise-hint">
              <strong>💡 Hint:</strong> {exercise.hint}
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
              {exercise.solutionExplanation && (
                <div className="solution-explanation">
                  <strong>Why this works:</strong>
                  <p>{exercise.solutionExplanation}</p>
                </div>
              )}
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
                  {showHint ? 'Hide Hint' : '💡 Hint'}
                </button>
                {canShowSolution && (
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={handleShowSolution}
                    title={failedAttempts < 2 ? `${2 - failedAttempts} more attempts to unlock` : 'View the solution'}
                  >
                    {showSolution ? 'Hide Solution' : '👁️ Solution'}
                  </button>
                )}
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={handleReset}
                >
                  ↺ Reset
                </button>
                <button
                  className={`btn btn-sm btn-primary ${isRunning ? 'running' : ''}`}
                  onClick={handleRun}
                  disabled={isRunning}
                >
                  {isRunning ? (
                    <>
                      <span className="spinner"></span>
                      Running...
                    </>
                  ) : (
                    '▶ Run'
                  )}
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
            <div className="code-editor-footer">
              <span className="keyboard-hint">Ctrl+Enter to run</span>
            </div>
          </div>

          {/* Run status banners */}
          {error && (
            <div className="run-banner error">
              <strong>❌ {error.type}:</strong> {error.message}
            </div>
          )}
          {!error && results && summary && (
            <div className={`run-banner ${summary.allPassed ? 'success' : 'info'}`}>
              {summary.allPassed ? '✅ All tests passed! Great job.' : `Tests passed: ${summary.passed}/${summary.total}`}
            </div>
          )}

          {/* Console Output Panel */}
          <OutputPanel
            logs={logs}
            executionTime={executionTime}
            isVisible={logs.length > 0 || executionTime !== null}
          />

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
                <div className="test-error">
                  <div className="error-type">{error.type}</div>
                  <div className="error-message">{error.message}</div>
                  {error.hint && <div className="error-hint">💡 {error.hint}</div>}
                </div>
              )}

              {!error && !results && !isRunning && (
                <div className="test-empty">
                  Ready when you are! Click <strong>Run</strong> (or press <strong>Ctrl+Enter</strong>) to execute your program and see output below.
                </div>
              )}

              {isRunning && (
                <div className="test-running">
                  <span className="spinner"></span>
                  Running tests...
                </div>
              )}

              {results && results.map((result, i) => (
                <div key={i} className={`test-item ${result.passed ? 'passed' : 'failed'}`}>
                  <span className={`test-icon ${result.passed ? 'pass' : 'fail'}`}>
                    {result.passed ? '✓' : '✗'}
                  </span>
                  <div className="test-details">
                    <span className="test-description">{result.description}</span>
                    {!result.passed && (
                      <div className="test-comparison">
                        <div className="expected">
                          <span className="label">Expected:</span>
                          <code>{JSON.stringify(result.expected)}</code>
                        </div>
                        <div className="actual">
                          <span className="label">Got:</span>
                          <code>{JSON.stringify(result.actual)}</code>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Attempts info */}
              {!isCompleted && failedAttempts > 0 && failedAttempts < 2 && (
                <div className="attempts-info">
                  💡 {2 - failedAttempts} more attempt{failedAttempts === 1 ? '' : 's'} to unlock solution hint
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
