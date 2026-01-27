/**
 * Base Engine - Abstract class for code execution engines
 * Extend this to add support for new languages (Python, SQL, etc.)
 */

export class BaseEngine {
  constructor(language) {
    this.language = language;
  }

  /**
   * Execute code and return results
   * @param {string} code - User's code
   * @param {Object} exercise - Exercise definition
   * @returns {Promise<Object>} Execution result
   */
  async execute(code, exercise) {
    throw new Error('execute() must be implemented by subclass');
  }

  /**
   * Validate code syntax before execution
   * @param {string} code - User's code
   * @returns {Object} { valid: boolean, errors: [] }
   */
  validateSyntax(code) {
    throw new Error('validateSyntax() must be implemented by subclass');
  }

  /**
   * Get language-specific hints for common errors
   * @param {Error} error - The error that occurred
   * @returns {string} Helpful hint for the user
   */
  getErrorHint(error) {
    return 'Check your code for errors.';
  }
}

export default BaseEngine;
