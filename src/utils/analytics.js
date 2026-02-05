/**
 * Analytics - Learning analytics hooks and tracking utilities
 * Captures user progress data for learning insights
 */

const ANALYTICS_KEY = 'js-labs-analytics';

/**
 * Get analytics data from localStorage
 * @returns {Object} Analytics data
 */
function getAnalyticsData() {
  try {
    const data = localStorage.getItem(ANALYTICS_KEY);
    return data ? JSON.parse(data) : createInitialAnalytics();
  } catch (e) {
    console.error('Error reading analytics:', e);
    return createInitialAnalytics();
  }
}

/**
 * Save analytics data to localStorage
 * @param {Object} data - Analytics data
 */
function saveAnalyticsData(data) {
  try {
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving analytics:', e);
  }
}

/**
 * Create initial analytics structure
 */
function createInitialAnalytics() {
  return {
    exercises: {},
    sessions: [],
    totalTimeMs: 0,
    createdAt: new Date().toISOString()
  };
}

/**
 * Track when a user starts working on an exercise
 * @param {string} exerciseId - Exercise identifier
 */
export function trackExerciseStart(exerciseId) {
  const data = getAnalyticsData();

  if (!data.exercises[exerciseId]) {
    data.exercises[exerciseId] = {
      attempts: 0,
      timeSpentMs: 0,
      firstAttemptAt: null,
      completedAt: null,
      errorPatterns: []
    };
  }

  data.exercises[exerciseId].startedAt = Date.now();
  if (!data.exercises[exerciseId].firstAttemptAt) {
    data.exercises[exerciseId].firstAttemptAt = new Date().toISOString();
  }

  saveAnalyticsData(data);
}

/**
 * Track a code submission attempt
 * @param {string} exerciseId - Exercise identifier
 * @param {boolean} passed - Whether all tests passed
 * @param {Object} result - Execution result with error info
 */
export function trackAttempt(exerciseId, passed, result) {
  const data = getAnalyticsData();

  if (!data.exercises[exerciseId]) {
    data.exercises[exerciseId] = {
      attempts: 0,
      timeSpentMs: 0,
      firstAttemptAt: new Date().toISOString(),
      completedAt: null,
      errorPatterns: []
    };
  }

  const exercise = data.exercises[exerciseId];
  exercise.attempts++;

  // Calculate time spent
  if (exercise.startedAt) {
    exercise.timeSpentMs += Date.now() - exercise.startedAt;
    exercise.startedAt = Date.now(); // Reset for next segment
  }

  // Track completion
  if (passed && !exercise.completedAt) {
    exercise.completedAt = new Date().toISOString();
    exercise.attemptsToComplete = exercise.attempts;
  }

  // Track error patterns
  if (!passed && result?.error) {
    const errorType = result.error.type || 'Unknown';
    if (!exercise.errorPatterns.includes(errorType)) {
      exercise.errorPatterns.push(errorType);
    }
  }

  saveAnalyticsData(data);
}

/**
 * Track exercise completion
 * @param {string} exerciseId - Exercise identifier
 */
export function trackCompletion(exerciseId) {
  const data = getAnalyticsData();

  if (data.exercises[exerciseId]) {
    data.exercises[exerciseId].completedAt = new Date().toISOString();
  }

  saveAnalyticsData(data);
}

/**
 * Get learning insights summary
 * @returns {Object} Learning insights
 */
export function getLearningInsights() {
  const data = getAnalyticsData();
  const exercises = Object.values(data.exercises);

  const completed = exercises.filter(e => e.completedAt);
  const totalAttempts = exercises.reduce((sum, e) => sum + e.attempts, 0);
  const totalTime = exercises.reduce((sum, e) => sum + e.timeSpentMs, 0);

  // Find most common error patterns
  const errorCounts = {};
  exercises.forEach(e => {
    e.errorPatterns.forEach(pattern => {
      errorCounts[pattern] = (errorCounts[pattern] || 0) + 1;
    });
  });

  const commonErrors = Object.entries(errorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([error, count]) => ({ error, count }));

  return {
    totalExercises: exercises.length,
    completedExercises: completed.length,
    completionRate: exercises.length ? (completed.length / exercises.length * 100).toFixed(1) : 0,
    totalAttempts,
    averageAttemptsPerExercise: exercises.length ? (totalAttempts / exercises.length).toFixed(1) : 0,
    totalTimeMinutes: Math.round(totalTime / 60000),
    averageTimePerExercise: exercises.length ? Math.round(totalTime / exercises.length / 1000) : 0,
    commonErrors,
    averageAttemptsToComplete: completed.length
      ? (completed.reduce((sum, e) => sum + (e.attemptsToComplete || 1), 0) / completed.length).toFixed(1)
      : 0
  };
}

/**
 * Get exercise-specific stats
 * @param {string} exerciseId - Exercise identifier
 * @returns {Object|null} Exercise stats
 */
export function getExerciseStats(exerciseId) {
  const data = getAnalyticsData();
  return data.exercises[exerciseId] || null;
}

/**
 * Export all analytics data (for debugging or external analysis)
 * @returns {Object} Complete analytics data
 */
export function exportAnalytics() {
  return getAnalyticsData();
}

/**
 * Clear all analytics data
 */
export function clearAnalytics() {
  localStorage.removeItem(ANALYTICS_KEY);
}

export default {
  trackExerciseStart,
  trackAttempt,
  trackCompletion,
  getLearningInsights,
  getExerciseStats,
  exportAnalytics,
  clearAnalytics
};
