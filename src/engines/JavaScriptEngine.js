/**
 * JavaScript Engine - Executes JavaScript code using Web Workers
 * Implements the BaseEngine interface for JavaScript
 */

import { BaseEngine } from './BaseEngine.js';
import { execute } from '../utils/codeExecutor.js';

export class JavaScriptEngine extends BaseEngine {
  constructor() {
    super('javascript');
  }

  /**
   * Execute JavaScript code and return results
   * @param {string} code - User's JavaScript code
   * @param {Object} exercise - Exercise definition with functionName and testCases
   * @returns {Promise<Object>} Execution result
   */
  async execute(code, exercise) {
    return execute(code, exercise);
  }

  /**
   * Validate JavaScript syntax
   * @param {string} code - User's code
   * @returns {Object} { valid: boolean, errors: [] }
   */
  validateSyntax(code) {
    try {
      new Function(code);
      return { valid: true, errors: [] };
    } catch (error) {
      return {
        valid: false,
        errors: [{
          message: error.message,
          type: 'SyntaxError'
        }]
      };
    }
  }

  /**
   * Get JavaScript-specific hints for common errors
   * @param {Error} error - The error that occurred
   * @returns {string} Helpful hint for the user
   */
  getErrorHint(error) {
    const message = error.message || '';

    if (message.includes('Unexpected token')) {
      return 'Check for missing brackets, parentheses, or semicolons.';
    }
    if (message.includes('is not defined')) {
      return 'Make sure all variables are declared before use.';
    }
    if (message.includes('is not a function')) {
      return 'The value you are trying to call is not a function.';
    }
    if (message.includes('Cannot read property')) {
      return 'You might be accessing a property on undefined or null.';
    }

    return 'Check your code for typos and syntax errors.';
  }
}

export default JavaScriptEngine;
