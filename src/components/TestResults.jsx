import { formatValue } from '../utils/testRunner';

/**
 * TestResults Component
 * Displays test results with pass/fail status and details
 */

function TestResults({ results, error, hasRun, summary }) {
  if (!hasRun) {
    return (
      <>
        <div className="results-header">
          <h3>Test Results</h3>
        </div>
        <div className="results-content">
          <div className="results-empty">
            Click "Run Tests" to check your solution
            <br />
            <small style={{ opacity: 0.7 }}>Tip: Press Ctrl+Enter to run tests quickly</small>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="results-header">
          <h3>Test Results</h3>
          <span className="results-summary some-failed">Error</span>
        </div>
        <div className="results-content">
          <div className="results-error">
            {error}
          </div>
        </div>
      </>
    );
  }

  if (!results || results.length === 0) {
    return (
      <>
        <div className="results-header">
          <h3>Test Results</h3>
        </div>
        <div className="results-content">
          <div className="results-empty">
            No test results available
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="results-header">
        <h3>Test Results</h3>
        <span className={`results-summary ${summary.allPassed ? 'all-passed' : 'some-failed'}`}>
          {summary.allPassed ? '✓ All Passed!' : `${summary.passed}/${summary.total} passed`}
        </span>
      </div>
      <div className="results-content">
        {results.map((result, index) => (
          <TestResultItem key={index} result={result} />
        ))}
      </div>
    </>
  );
}

function TestResultItem({ result }) {
  return (
    <div className="test-result">
      <div className={`test-icon ${result.passed ? 'passed' : 'failed'}`}>
        {result.passed ? '✓' : '✗'}
      </div>
      <div className="test-info">
        <div className="test-description">{result.description}</div>
        {!result.passed && (
          <div className="test-details">
            <span>Expected: {formatValue(result.expected)}</span>
            <span>Received: {formatValue(result.actual)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default TestResults;
