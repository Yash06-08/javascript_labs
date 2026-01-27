/**
 * Code Executor - Web Worker-based sandboxed execution
 * Provides safe code execution with timeout protection
 */

const EXECUTION_TIMEOUT = 5000; // 5 seconds

/**
 * Execute code using Web Worker with timeout protection
 * @param {string} userCode - The user's code to execute
 * @param {string} functionName - Expected function name
 * @param {Array} testCases - Array of test cases
 * @returns {Promise<Object>} Execution result
 */
export function executeWithWorker(userCode, functionName, testCases) {
  return new Promise((resolve) => {
    const worker = new Worker('/executor.worker.js');
    let timeoutId;

    // Handle worker response
    worker.onmessage = (e) => {
      clearTimeout(timeoutId);
      worker.terminate();
      resolve(e.data);
    };

    // Handle worker errors
    worker.onerror = (error) => {
      clearTimeout(timeoutId);
      worker.terminate();
      resolve({
        success: false,
        error: {
          type: 'WorkerError',
          message: error.message || 'An error occurred in the execution environment.',
          hint: 'Try refreshing the page and running again.'
        },
        logs: [],
        executionTime: 0
      });
    };

    // Timeout protection for infinite loops
    timeoutId = setTimeout(() => {
      worker.terminate();
      resolve({
        success: false,
        error: {
          type: 'TimeoutError',
          message: 'Code execution timed out after 5 seconds.',
          hint: 'Your code might have an infinite loop. Check your loop conditions.'
        },
        logs: [],
        executionTime: EXECUTION_TIMEOUT
      });
    }, EXECUTION_TIMEOUT);

    // Send code to worker
    worker.postMessage({
      type: 'execute',
      userCode,
      functionName,
      testCases
    });
  });
}

/**
 * Execute a full program using Web Worker with timeout protection
 * @param {string} userCode - The user's code to execute as a full program
 * @returns {Promise<Object>} Execution result
 */
export function executeProgramWithWorker(userCode) {
  return new Promise((resolve) => {
    const worker = new Worker('/executor.worker.js');
    let timeoutId;

    worker.onmessage = (e) => {
      clearTimeout(timeoutId);
      worker.terminate();
      resolve(e.data);
    };

    worker.onerror = (error) => {
      clearTimeout(timeoutId);
      worker.terminate();
      resolve({
        success: false,
        error: {
          type: 'WorkerError',
          message: error.message || 'An error occurred in the execution environment.',
          hint: 'Try refreshing the page and running again.'
        },
        logs: [],
        executionTime: 0
      });
    };

    timeoutId = setTimeout(() => {
      worker.terminate();
      resolve({
        success: false,
        error: {
          type: 'TimeoutError',
          message: 'Code execution timed out after 5 seconds.',
          hint: 'Your code might have an infinite loop. Check your loop conditions.'
        },
        logs: [],
        executionTime: EXECUTION_TIMEOUT
      });
    }, EXECUTION_TIMEOUT);

    worker.postMessage({
      type: 'executeProgram',
      userCode
    });
  });
}

/**
 * Execute code synchronously (fallback for browsers without Worker support)
 * Uses the existing testRunner approach
 * @param {string} userCode - The user's code to execute
 * @param {Object} exercise - Exercise object with functionName and testCases
 * @returns {Object} Execution result
 */
export function executeSync(userCode, exercise) {
  const { functionName, testCases } = exercise;
  const startTime = performance.now();
  const capturedLogs = [];

  // Create a patched console
  const originalLog = console.log;
  console.log = (...args) => {
    capturedLogs.push({
      type: 'log',
      content: args.map(arg => {
        if (arg === null) return 'null';
        if (arg === undefined) return 'undefined';
        if (typeof arg === 'object') {
          try { return JSON.stringify(arg); } catch { return String(arg); }
        }
        return String(arg);
      }).join(' ')
    });
  };

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
      console.log = originalLog;
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
      console.log = originalLog;
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

    const results = [];

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
            actual: result.actual,
            inputs: testCase.inputs || []
          });
        } else {
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

    console.log = originalLog;

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
    console.log = originalLog;
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
 * Execute full program synchronously (fallback when Worker is unavailable)
 * Also evaluates and displays the result of the last expression
 * @param {string} userCode - The user's code to execute as a full program
 * @returns {Object} Execution result
 */
export function executeProgramSync(userCode) {
  const startTime = performance.now();
  const capturedLogs = [];

  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;

  const formatArg = (arg) => {
    if (arg === null) return 'null';
    if (arg === undefined) return 'undefined';
    if (typeof arg === 'object') {
      try { return JSON.stringify(arg); } catch { return String(arg); }
    }
    return String(arg);
  };

  console.log = (...args) => {
    capturedLogs.push({ type: 'log', content: args.map(formatArg).join(' ') });
  };
  console.error = (...args) => {
    capturedLogs.push({ type: 'error', content: args.map(formatArg).join(' ') });
  };
  console.warn = (...args) => {
    capturedLogs.push({ type: 'warn', content: args.map(formatArg).join(' ') });
  };

  try {
    const run = new Function(`
      'use strict';
      ${userCode}
    `);

    try {
      run();
    } catch (runtimeError) {
      // Handle "return outside function" error
      if (runtimeError.message.includes('return')) {
        const codeWithoutReturn = userCode.replace(/\breturn\s+/g, '');
        try {
          const evalResult = new Function(`
            'use strict';
            ${codeWithoutReturn}
            return (${codeWithoutReturn.split(';').filter(s => s.trim()).pop()?.trim() || 'undefined'});
          `)();

          if (evalResult !== undefined) {
            capturedLogs.push({ type: 'result', content: `→ ${formatArg(evalResult)}` });
          }

          console.log = originalLog; console.error = originalError; console.warn = originalWarn;
          return { success: true, logs: capturedLogs, executionTime: performance.now() - startTime };
        } catch {
          // Fall through
        }
      }

      console.log = originalLog; console.error = originalError; console.warn = originalWarn;
      return {
        success: false,
        error: {
          type: 'RuntimeError',
          message: runtimeError.message,
          hint: runtimeError.message.includes('return')
            ? 'The "return" keyword only works inside functions. Use console.log() to display values.'
            : 'Check the variables and expressions you are executing.'
        },
        logs: capturedLogs,
        executionTime: performance.now() - startTime
      };
    }

    // If no output, try to evaluate last expression
    if (capturedLogs.length === 0) {
      try {
        const lines = userCode.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('//'));
        const lastLine = lines[lines.length - 1];

        const evalFn = new Function(`
          'use strict';
          ${userCode}
          try { return eval(${JSON.stringify(lastLine.replace(/;$/, ''))}); } catch { return undefined; }
        `);

        const result = evalFn();
        if (result !== undefined) {
          capturedLogs.push({ type: 'result', content: `→ ${formatArg(result)}` });
        }
      } catch {
        // Ignore
      }
    }

    console.log = originalLog; console.error = originalError; console.warn = originalWarn;
    return { success: true, logs: capturedLogs, executionTime: performance.now() - startTime };

  } catch (syntaxError) {
    console.log = originalLog; console.error = originalError; console.warn = originalWarn;
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
 * Smart execute - uses Worker if available, falls back to sync
 */
export async function execute(userCode, exercise) {
  const isProgramMode = !!exercise.isProgramMode;
  // Check if Workers are supported
  if (typeof Worker !== 'undefined') {
    if (isProgramMode) {
      return executeProgramWithWorker(userCode);
    }
    return executeWithWorker(userCode, exercise.functionName, exercise.testCases);
  }
  return isProgramMode ? executeProgramSync(userCode) : executeSync(userCode, exercise);
}

export default { execute, executeWithWorker, executeSync, executeProgramWithWorker, executeProgramSync };
