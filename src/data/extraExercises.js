// Extra challenge exercises per lesson slug
// These are appended after the built-in exercises
const extraExercises = {
  'loops': [
    {
      id: 'loop-extra-1',
      number: 5,
      task: 'Print only even numbers from 2 to 10 using a loop.',
      hint: 'Use i += 2 starting at 2',
      isProgramMode: true,
      starterCode: `// Print even numbers 2,4,6,8,10\n`,
      solution: `for (let i = 2; i <= 10; i += 2) {\n  console.log(i);\n}`,
      testCases: [
        { isConsoleTest: true, validate: (logs) => logs.map(l=>l.content).join(',') === '2,4,6,8,10', description: 'Should print even sequence' }
      ]
    },
    {
      id: 'loop-extra-2',
      number: 6,
      task: 'Count down from 3 to 1 then print "Go!"',
      hint: 'Use a for loop that starts at 3 and decrements',
      isProgramMode: true,
      starterCode: `// 3, 2, 1 then Go!\n`,
      solution: `for (let i = 3; i >= 1; i--) { console.log(i); }\nconsole.log('Go!');`,
      testCases: [
        { isConsoleTest: true, validate: (logs) => logs.map(l=>l.content).slice(-1)[0] === 'Go!', description: 'Ends with Go!' }
      ]
    }
  ],
  'functions-basics': [
    {
      id: 'fun-extra-1',
      number: 5,
      task: 'Create a function `returnsTrue()` that returns true.',
      hint: 'return true;',
      functionName: 'returnsTrue',
      starterCode: `function returnsTrue() {\n  // return true\n}\n`,
      solution: `function returnsTrue() {\n  return true;\n}`,
      testCases: [
        { inputs: [], expected: true, description: 'returnsTrue() should return true' }
      ]
    },
    {
      id: 'fun-extra-2',
      number: 6,
      task: 'Create a function `getTen()` that returns the number 10.',
      hint: 'return 10;',
      functionName: 'getTen',
      starterCode: `function getTen() {\n}\n`,
      solution: `function getTen() {\n  return 10;\n}`,
      testCases: [
        { inputs: [], expected: 10, description: 'getTen() should return 10' }
      ]
    }
  ],
  'functions-advanced': [
    {
      id: 'fun-adv-extra-1',
      number: 5,
      task: 'Write a function `triple(n)` that returns n * 3.',
      hint: 'return n * 3;',
      functionName: 'triple',
      starterCode: `function triple(n) {\n}\n`,
      solution: `function triple(n) {\n  return n * 3;\n}`,
      testCases: [
        { inputs: [3], expected: 9, description: 'triple(3) should return 9' }
      ]
    },
    {
      id: 'fun-adv-extra-2',
      number: 6,
      task: 'Write a function `addThree(a,b,c)` that returns the sum of three numbers.',
      hint: 'return a + b + c;',
      functionName: 'addThree',
      starterCode: `function addThree(a, b, c) {\n}\n`,
      solution: `function addThree(a, b, c) {\n  return a + b + c;\n}`,
      testCases: [
        { inputs: [1, 2, 3], expected: 6, description: 'addThree(1,2,3) should return 6' }
      ]
    }
  ],
  'arrays': [
    {
      id: 'arr-extra-1',
      number: 5,
      task: 'Create a function `getThird(arr)` that returns arr[2].',
      hint: 'return arr[2];',
      functionName: 'getThird',
      starterCode: `function getThird(arr) {\n}\n`,
      solution: `function getThird(arr) {\n  return arr[2];\n}`,
      testCases: [
        { inputs: [[1,2,3,4]], expected: 3, description: 'getThird([1,2,3,4]) should be 3' }
      ]
    },
    {
      id: 'arr-extra-2',
      number: 6,
      task: 'Create a function `firstTwo(arr)` that returns a new array with the first two items.',
      hint: 'Use [arr[0], arr[1]]',
      functionName: 'firstTwo',
      starterCode: `function firstTwo(arr) {\n}\n`,
      solution: `function firstTwo(arr) {\n  return [arr[0], arr[1]];\n}`,
      testCases: [
        { inputs: [["a","b","c"]], expected: ["a","b"], description: 'firstTwo(["a","b","c"]) should be ["a","b"]' }
      ]
    }
  ],
  'objects': [
    {
      id: 'obj-extra-1',
      number: 4,
      task: 'Write a function `getIsPremium(user)` that returns the isPremium property.',
      hint: 'return user.isPremium;',
      functionName: 'getIsPremium',
      starterCode: `function getIsPremium(user) {\n}\n`,
      solution: `function getIsPremium(user) {\n  return user.isPremium;\n}`,
      testCases: [
        { inputs: [{ name: 'A', isPremium: true }], expected: true, description: 'getIsPremium should return true' }
      ]
    },
    {
      id: 'obj-extra-2',
      number: 5,
      task: 'Write a function `getKeys(obj)` that returns the keys array of an object.',
      hint: 'Use Object.keys(obj)',
      functionName: 'getKeys',
      starterCode: `function getKeys(obj) {\n}\n`,
      solution: `function getKeys(obj) {\n  return Object.keys(obj);\n}`,
      testCases: [
        { inputs: [{ a:1, b:2 }], expected: ['a','b'], description: 'getKeys({a:1,b:2}) should return ["a","b"]' }
      ]
    }
  ]
};

export default extraExercises;
