/**
 * Lab Schema - Definition and validation for lab/exercise data
 * Provides a clear contract for adding new exercises and languages
 */

/**
 * Lab Exercise Schema
 * @typedef {Object} Exercise
 * @property {string} id - Unique identifier
 * @property {number} number - Exercise number in the lesson
 * @property {string} task - Task description (supports markdown)
 * @property {string} hint - Hint for the user
 * @property {string} functionName - Name of the function to implement
 * @property {string} starterCode - Initial code template
 * @property {string} solution - Reference solution
 * @property {string} [solutionExplanation] - Why the solution works
 * @property {string[]} [commonMistakes] - Common errors to avoid
 * @property {string} [difficulty] - 'beginner' | 'intermediate' | 'advanced'
 * @property {TestCase[]} testCases - Array of test cases
 */

/**
 * Test Case Schema
 * @typedef {Object} TestCase
 * @property {any[]} inputs - Input arguments for the function
 * @property {any} expected - Expected return value
 * @property {string} description - Human-readable test description
 * @property {boolean} [isSpecialTest] - If true, uses custom test code
 * @property {string} [testCode] - Custom test code (for special tests)
 */

/**
 * Lesson Schema
 * @typedef {Object} Lesson
 * @property {string} id - Unique identifier
 * @property {number} lessonNumber - Lesson order
 * @property {string} title - Lesson title
 * @property {string} slug - URL-friendly identifier
 * @property {string} content - Markdown content
 * @property {string} [language] - Language for this lesson (default: javascript)
 * @property {Exercise[]} exercises - Array of exercises
 */

/**
 * Validate an exercise definition
 * @param {Object} exercise - Exercise to validate
 * @returns {Object} { valid: boolean, errors: string[] }
 */
export function validateExercise(exercise) {
  const errors = [];

  if (!exercise.id) errors.push('Exercise must have an id');
  if (!exercise.functionName) errors.push('Exercise must have a functionName');
  if (!exercise.starterCode) errors.push('Exercise must have starterCode');
  if (!exercise.testCases || !Array.isArray(exercise.testCases)) {
    errors.push('Exercise must have testCases array');
  } else {
    exercise.testCases.forEach((tc, i) => {
      if (!tc.description) errors.push(`TestCase ${i} must have a description`);
      if (!tc.isSpecialTest && tc.inputs === undefined) {
        errors.push(`TestCase ${i} must have inputs`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validate a lesson definition
 * @param {Object} lesson - Lesson to validate
 * @returns {Object} { valid: boolean, errors: string[] }
 */
export function validateLesson(lesson) {
  const errors = [];

  if (!lesson.id) errors.push('Lesson must have an id');
  if (!lesson.slug) errors.push('Lesson must have a slug');
  if (!lesson.title) errors.push('Lesson must have a title');
  if (!lesson.exercises || !Array.isArray(lesson.exercises)) {
    errors.push('Lesson must have exercises array');
  } else {
    lesson.exercises.forEach((ex, i) => {
      const result = validateExercise(ex);
      if (!result.valid) {
        errors.push(`Exercise ${i} (${ex.id || 'unknown'}): ${result.errors.join(', ')}`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Supported difficulty levels
 */
export const DIFFICULTY_LEVELS = ['beginner', 'intermediate', 'advanced'];

/**
 * Supported languages
 */
export const SUPPORTED_LANGUAGES = ['javascript'];
// Future: ['javascript', 'python', 'sql']

export default { validateExercise, validateLesson, DIFFICULTY_LEVELS, SUPPORTED_LANGUAGES };
