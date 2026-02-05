/**
 * Test Runner - Client-side code execution and testing
 */

/**
 * Deep equality check
 */
function deepEqual(a, b) {
  if (a === b) return true;
  if (a === null || b === null) return a === b;
  if (typeof a !== typeof b) return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((val, i) => deepEqual(val, b[i]));
  }

  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every(key => deepEqual(a[key], b[key]));
  }

  return false;
}

/**
 * Run tests for an exercise
 */
export function runTests(userCode, exercise) {
  const { functionName, testCases } = exercise;
  const results = [];

  try {
    // Create sandbox
    const sandbox = new Function(`
      'use strict';
      ${userCode}
      return typeof ${functionName} === 'function' ? ${functionName} : undefined;
    `);

    let userFunction;
    try {
      userFunction = sandbox();
    } catch (syntaxError) {
      return {
        error: `Syntax Error: ${syntaxError.message}`,
        results: []
      };
    }

    if (!userFunction) {
      return {
        error: `Function "${functionName}" is not defined. Make sure to name your function correctly.`,
        results: []
      };
    }

    // Run tests
    for (const testCase of testCases) {
      try {
        if (testCase.isSpecialTest) {
          const specialTestFn = new Function(`
            'use strict';
            ${userCode}
            ${testCase.testCode}
          `);
          const result = specialTestFn();

          results.push({
            description: testCase.description,
            passed: result.passed,
            expected: result.expected,
            actual: result.actual
          });
        } else {
          const actual = userFunction(...testCase.inputs);
          const passed = deepEqual(actual, testCase.expected);

          results.push({
            description: testCase.description,
            passed,
            expected: testCase.expected,
            actual
          });
        }
      } catch (runtimeError) {
        results.push({
          description: testCase.description,
          passed: false,
          expected: testCase.expected,
          actual: `Error: ${runtimeError.message}`,
          error: runtimeError.message
        });
      }
    }

    return { results, error: null };
  } catch (err) {
    return {
      error: `Error: ${err.message}`,
      results: []
    };
  }
}

/**
 * Get test summary
 */
export function getTestSummary(results) {
  const passed = results.filter(r => r.passed).length;
  return {
    passed,
    total: results.length,
    allPassed: passed === results.length
  };
}

export default { runTests, getTestSummary, deepEqual };
