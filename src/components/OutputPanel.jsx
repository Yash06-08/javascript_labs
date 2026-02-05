import { useState } from 'react';

/**
 * OutputPanel Component - Displays console output and execution info
 */
function OutputPanel({ logs, executionTime, isVisible }) {
  const [activeTab, setActiveTab] = useState('output');

  if (!isVisible) return null;

  return (
    <div className="output-panel">
      <div className="output-panel-header">
        <div className="output-panel-tabs">
          <button
            className="output-tab active"
          >
            Program Output
          </button>
        </div>
        {executionTime !== undefined && (
          <span className="execution-time">
            ⚡ {executionTime.toFixed(1)}ms
          </span>
        )}
      </div>

      <div className="output-panel-body">
        {activeTab === 'output' && (
          <div className="console-output">
            {logs && logs.length > 0 ? (
              logs.map((log, index) => (
                <div key={index} className={`console-line console-${log.type}`}>
                  <span className="console-prefix">
                    {log.type === 'error' ? '❌' : log.type === 'warn' ? '⚠️' : '›'}
                  </span>
                  <span className="console-content">{log.content}</span>
                </div>
              ))
            ) : (
              <div className="console-empty">
                No console output. Use console.log() to see output here.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default OutputPanel;
