/**
 * Web Worker for sandboxed JavaScript code execution
 * Runs user code in isolation with console capture and timeout protection
 */

// Capture console output
let capturedLogs = [];

const originalConsole = {
  log: console.log,
  error: console.error,
  warn: console.warn
};

// Override console methods to capture output
console.log = (...args) => {
  capturedLogs.push({ type: 'log', content: args.map(formatArg).join(' ') });
};

console.error = (...args) => {
  capturedLogs.push({ type: 'error', content: args.map(formatArg).join(' ') });
};

console.warn = (...args) => {
  capturedLogs.push({ type: 'warn', content: args.map(formatArg).join(' ') });
};

/**
 * Format argument for display
 */
function formatArg(arg) {
  if (arg === null) return 'null';
  if (arg === undefined) return 'undefined';
  if (typeof arg === 'object') {
    try {
      return JSON.stringify(arg, null, 2);
    } catch {
      return String(arg);
    }
  }
  return String(arg);
}

/**
 * Deep equality check for comparing expected vs actual values
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
 * Execute user code and run test cases
 */
function executeCode(userCode, functionName, testCases) {
  capturedLogs = [];
  const results = [];
  const startTime = performance.now();

  try {
    // Create function from user code
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
        success: false,
        error: {
          type: 'SyntaxError',
          message: syntaxError.message,
          hint: 'Check your code for typos, missing brackets, or incorrect syntax.'
        },
        logs: capturedLogs,
        executionTime: performance.now() - startTime
      };
    }

    if (!userFunction) {
      return {
        success: false,
        error: {
          type: 'FunctionNotFound',
          message: `Function "${functionName}" is not defined.`,
          hint: `Make sure to define a function named "${functionName}" in your code.`
        },
        logs: capturedLogs,
        executionTime: performance.now() - startTime
      };
    }

    // Run test cases
    for (const testCase of testCases) {
      try {
        if (testCase.isSpecialTest) {
          // Special test with custom test code
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
            actual: result.actual,
            inputs: testCase.inputs || []
          });
        } else {
          // Standard test case
          const actual = userFunction(...testCase.inputs);
          const passed = deepEqual(actual, testCase.expected);

          results.push({
            description: testCase.description,
            passed,
            expected: testCase.expected,
            actual,
            inputs: testCase.inputs
          });
        }
      } catch (runtimeError) {
        results.push({
          description: testCase.description,
          passed: false,
          expected: testCase.expected,
          actual: `Runtime Error: ${runtimeError.message}`,
          inputs: testCase.inputs || [],
          error: runtimeError.message
        });
      }
    }

    const passedCount = results.filter(r => r.passed).length;

    return {
      success: true,
      results,
      logs: capturedLogs,
      summary: {
        passed: passedCount,
        total: results.length,
        allPassed: passedCount === results.length
      },
      executionTime: performance.now() - startTime
    };

  } catch (err) {
    return {
      success: false,
      error: {
        type: 'ExecutionError',
        message: err.message,
        hint: 'An unexpected error occurred during execution.'
      },
      logs: capturedLogs,
      executionTime: performance.now() - startTime
    };
  }
}

/**
 * Execute a full program (no function required)
 * Runs the user code and only captures output/errors
 */
function executeProgram(userCode) {
  capturedLogs = [];
  const startTime = performance.now();

  try {
    const run = new Function(`
      'use strict';
      ${userCode}
    `);

    try {
      run();
    } catch (runtimeError) {
      return {
        success: false,
        error: {
          type: 'RuntimeError',
          message: runtimeError.message,
          hint: 'Check the variables and expressions you are executing.'
        },
        logs: capturedLogs,
        executionTime: performance.now() - startTime
      };
    }

    return {
      success: true,
      logs: capturedLogs,
      executionTime: performance.now() - startTime
    };

  } catch (syntaxError) {
    return {
      success: false,
      error: {
        type: 'SyntaxError',
        message: syntaxError.message,
        hint: 'Check your code for typos, missing brackets, or incorrect syntax.'
      },
      logs: capturedLogs,
      executionTime: performance.now() - startTime
    };
  }
}

// Handle messages from main thread
self.onmessage = function (e) {
  const { type, userCode, functionName, testCases } = e.data;

  if (type === 'execute') {
    const result = executeCode(userCode, functionName, testCases);
    self.postMessage({ type: 'result', ...result });
  }

  if (type === 'executeProgram') {
    const result = executeProgram(userCode);
    self.postMessage({ type: 'result', ...result });
  }
};
