import { useRef, useEffect } from 'react';

/**
 * CodeEditor Component
 * Textarea-based code editor with keyboard shortcuts
 */

function CodeEditor({ value, onChange, onRun }) {
  const textareaRef = useRef(null);

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    // Ctrl/Cmd + Enter to run tests
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun();
      return;
    }

    // Tab key for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);

      // Move cursor after the inserted spaces
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  // Auto-resize textarea (optional)
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      className="code-editor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      spellCheck={false}
      autoCapitalize="off"
      autoCorrect="off"
      placeholder="Write your solution here..."
    />
  );
}

export default CodeEditor;
