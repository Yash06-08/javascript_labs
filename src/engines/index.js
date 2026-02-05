/**
 * Engine Registry - Central registry for code execution engines
 * Add new language engines here for multi-language support
 */

import { JavaScriptEngine } from './JavaScriptEngine.js';

// Engine instances (singleton pattern)
const engines = {
  javascript: null,
  // Future: python, sql, etc.
};

/**
 * Get the engine for a specific language
 * @param {string} language - Language identifier
 * @returns {BaseEngine} Engine instance
 */
export function getEngine(language = 'javascript') {
  if (!engines[language]) {
    switch (language) {
      case 'javascript':
        engines[language] = new JavaScriptEngine();
        break;
      // Future language support:
      // case 'python':
      //   engines[language] = new PythonEngine();
      //   break;
      // case 'sql':
      //   engines[language] = new SQLEngine();
      //   break;
      default:
        throw new Error(`Unsupported language: ${language}`);
    }
  }
  return engines[language];
}

/**
 * Execute code using the appropriate engine
 * @param {string} code - User's code
 * @param {Object} exercise - Exercise definition
 * @param {string} language - Language to use (default: javascript)
 * @returns {Promise<Object>} Execution result
 */
export async function executeWithEngine(code, exercise, language = 'javascript') {
  const engine = getEngine(language);
  return engine.execute(code, exercise);
}

/**
 * Get list of supported languages
 * @returns {string[]} Supported language identifiers
 */
export function getSupportedLanguages() {
  return ['javascript'];
  // Future: return ['javascript', 'python', 'sql'];
}

export default { getEngine, executeWithEngine, getSupportedLanguages };
