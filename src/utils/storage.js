/**
 * LocalStorage utilities for progress tracking
 */

const STORAGE_KEY = 'js-labs-completed';

/**
 * Get all completed exercise IDs from localStorage
 * @returns {Set<string>} Set of completed exercise IDs
 */
export function getCompletedExercises() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return new Set(JSON.parse(data));
    }
  } catch (e) {
    console.error('Error reading progress from localStorage:', e);
  }
  return new Set();
}

/**
 * Mark an exercise as completed
 * @param {string} exerciseId - The ID of the exercise to mark as completed
 */
export function setExerciseCompleted(exerciseId) {
  try {
    const completed = getCompletedExercises();
    completed.add(exerciseId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
  } catch (e) {
    console.error('Error saving progress to localStorage:', e);
  }
}

/**
 * Check if an exercise is completed
 * @param {string} exerciseId - The ID of the exercise to check
 * @returns {boolean} True if the exercise is completed
 */
export function isExerciseCompleted(exerciseId) {
  return getCompletedExercises().has(exerciseId);
}

/**
 * Get progress for a specific lesson
 * @param {Object} lesson - The lesson object
 * @returns {{ completed: number, total: number }} Progress object
 */
export function getLessonProgress(lesson) {
  const completed = getCompletedExercises();
  const completedCount = lesson.exercises.filter(ex => completed.has(ex.id)).length;

  return {
    completed: completedCount,
    total: lesson.exercises.length
  };
}

/**
 * Get overall progress across all lessons
 * @param {Array} lessons - All lessons array
 * @returns {{ completed: number, total: number, percentage: number }} Overall progress
 */
export function getOverallProgress(lessons) {
  const completed = getCompletedExercises();
  let totalExercises = 0;
  let completedCount = 0;

  lessons.forEach(lesson => {
    totalExercises += lesson.exercises.length;
    completedCount += lesson.exercises.filter(ex => completed.has(ex.id)).length;
  });

  return {
    completed: completedCount,
    total: totalExercises,
    percentage: totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0
  };
}

/**
 * Clear all progress
 */
export function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(ATTEMPTS_KEY);
}

// ==================== FAILED ATTEMPTS TRACKING ====================

const ATTEMPTS_KEY = 'js-labs-attempts';

/**
 * Get failed attempts for a specific exercise
 * @param {string} exerciseId - The ID of the exercise
 * @returns {number} Number of failed attempts
 */
export function getFailedAttempts(exerciseId) {
  try {
    const data = localStorage.getItem(ATTEMPTS_KEY);
    if (data) {
      const attempts = JSON.parse(data);
      return attempts[exerciseId] || 0;
    }
  } catch (e) {
    console.error('Error reading attempts from localStorage:', e);
  }
  return 0;
}

/**
 * Increment failed attempts for a specific exercise
 * @param {string} exerciseId - The ID of the exercise
 * @returns {number} New number of failed attempts
 */
export function incrementFailedAttempts(exerciseId) {
  try {
    const data = localStorage.getItem(ATTEMPTS_KEY);
    const attempts = data ? JSON.parse(data) : {};
    attempts[exerciseId] = (attempts[exerciseId] || 0) + 1;
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
    return attempts[exerciseId];
  } catch (e) {
    console.error('Error saving attempts to localStorage:', e);
    return 0;
  }
}

/**
 * Reset failed attempts for a specific exercise
 * @param {string} exerciseId - The ID of the exercise
 */
export function resetFailedAttempts(exerciseId) {
  try {
    const data = localStorage.getItem(ATTEMPTS_KEY);
    if (data) {
      const attempts = JSON.parse(data);
      delete attempts[exerciseId];
      localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
    }
  } catch (e) {
    console.error('Error resetting attempts in localStorage:', e);
  }
}

export default {
  getCompletedExercises,
  setExerciseCompleted,
  isExerciseCompleted,
  getLessonProgress,
  getOverallProgress,
  clearProgress,
  getFailedAttempts,
  incrementFailedAttempts,
  resetFailedAttempts
};
