import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CodeEditor from './CodeEditor';
import TestResults from './TestResults';
import { runTests, getTestSummary } from '../utils/testRunner';
import { setLabCompleted, isLabCompleted } from '../utils/storage';

/**
 * LabWorkspace Component
 * Main workspace for completing a lab with editor and test runner
 */

function LabWorkspace({ topics, labs, onComplete }) {
  const { labId } = useParams();
  const navigate = useNavigate();

  const lab = labs.find(l => l.id === labId);
  const topic = lab ? topics.find(t => t.id === lab.topicId) : null;

  const [code, setCode] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [hasRun, setHasRun] = useState(false);

  // Initialize code from starter or localStorage
  useEffect(() => {
    if (lab) {
      const savedCode = localStorage.getItem(`lab-code-${lab.id}`);
      setCode(savedCode || lab.starterCode);
      setResults(null);
      setError(null);
      setHasRun(false);
    }
  }, [lab]);

  // Save code to localStorage on change
  useEffect(() => {
    if (lab && code) {
      localStorage.setItem(`lab-code-${lab.id}`, code);
    }
  }, [code, lab]);

  if (!lab || !topic) {
    return (
      <div className="error-page">
        <h2>Lab not found</h2>
        <Link to="/">← Back to Topics</Link>
      </div>
    );
  }

  const handleRunTests = () => {
    setHasRun(true);
    const result = runTests(code, lab);

    if (result.error) {
      setError(result.error);
      setResults([]);
    } else {
      setError(null);
      setResults(result.results);

      // Check if all tests passed
      const summary = getTestSummary(result.results);
      if (summary.allPassed) {
        setLabCompleted(lab.id);
        onComplete();
      }
    }
  };

  const handleReset = () => {
    setCode(lab.starterCode);
    setResults(null);
    setError(null);
    setHasRun(false);
    localStorage.removeItem(`lab-code-${lab.id}`);
  };

  const completed = isLabCompleted(lab.id);
  const summary = results ? getTestSummary(results) : null;

  return (
    <div className="workspace">
      <header className="workspace-header">
        <button className="back-button" onClick={() => navigate(`/topic/${topic.id}`)}>
          ←
        </button>
        <div className="labs-header-content">
          <h1>
            {lab.title}
            {completed && <span style={{ marginLeft: '0.5rem', color: 'var(--color-success)' }}>✓</span>}
          </h1>
          <p>
            <Link to={`/topic/${topic.id}`}>{topic.icon} {topic.name}</Link>
            {' • '}
            <span className={`difficulty-badge ${lab.difficulty.toLowerCase()}`}>
              {lab.difficulty}
            </span>
          </p>
        </div>
      </header>

      <section className="workspace-description">
        <h2>📋 Instructions</h2>
        <div
          className="workspace-description-content"
          dangerouslySetInnerHTML={{ __html: formatDescription(lab.description) }}
        />
      </section>

      <section className="workspace-editor-panel">
        <div className="editor-header">
          <span className="editor-title">
            <span>📝</span>
            Solution
          </span>
          <div className="editor-actions">
            <button className="btn btn-secondary" onClick={handleReset}>
              ↺ Reset
            </button>
            <button className="btn btn-success" onClick={handleRunTests}>
              ▶ Run Tests
            </button>
          </div>
        </div>
        <CodeEditor
          value={code}
          onChange={setCode}
          onRun={handleRunTests}
        />
      </section>

      <section className="workspace-results">
        <TestResults
          results={results}
          error={error}
          hasRun={hasRun}
          summary={summary}
        />
      </section>
    </div>
  );
}

/**
 * Format description markdown to HTML
 * Simple markdown parser for code blocks and emphasis
 */
function formatDescription(text) {
  return text
    // Code blocks
    .replace(/```javascript\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/```\n?([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br />')
    // Wrap in paragraph
    .replace(/^(.*)$/, '<p>$1</p>');
}

export default LabWorkspace;
