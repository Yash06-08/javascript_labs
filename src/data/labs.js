/**
 * Labs data for JS Topic Labs
 * Each lab contains coding exercises with tests
 */

export const labs = [
  // ==================== BASICS ====================
  {
    id: 'sum-two-numbers',
    topicId: 'basics',
    title: 'Sum Two Numbers',
    difficulty: 'Beginner',
    description: `Write a function that takes two numbers and returns their sum.

**Example:**
\`\`\`javascript
sumTwoNumbers(2, 3) // returns 5
sumTwoNumbers(-1, 1) // returns 0
sumTwoNumbers(0, 0) // returns 0
\`\`\``,
    functionName: 'sumTwoNumbers',
    starterCode: `function sumTwoNumbers(a, b) {
  // Your code here
  
}`,
    testCases: [
      { inputs: [2, 3], expected: 5, description: 'sumTwoNumbers(2, 3) should return 5' },
      { inputs: [-1, 1], expected: 0, description: 'sumTwoNumbers(-1, 1) should return 0' },
      { inputs: [0, 0], expected: 0, description: 'sumTwoNumbers(0, 0) should return 0' },
      { inputs: [100, 200], expected: 300, description: 'sumTwoNumbers(100, 200) should return 300' }
    ]
  },
  {
    id: 'is-even',
    topicId: 'basics',
    title: 'Is Even',
    difficulty: 'Beginner',
    description: `Write a function that checks if a number is even.
Return \`true\` if the number is even, \`false\` otherwise.

**Example:**
\`\`\`javascript
isEven(4) // returns true
isEven(7) // returns false
isEven(0) // returns true
\`\`\``,
    functionName: 'isEven',
    starterCode: `function isEven(n) {
  // Your code here
  
}`,
    testCases: [
      { inputs: [4], expected: true, description: 'isEven(4) should return true' },
      { inputs: [7], expected: false, description: 'isEven(7) should return false' },
      { inputs: [0], expected: true, description: 'isEven(0) should return true' },
      { inputs: [-2], expected: true, description: 'isEven(-2) should return true' },
      { inputs: [-3], expected: false, description: 'isEven(-3) should return false' }
    ]
  },
  {
    id: 'greet',
    topicId: 'basics',
    title: 'Greet User',
    difficulty: 'Beginner',
    description: `Write a function that returns a greeting message.
Given a name, return "Hello, <name>!".

**Example:**
\`\`\`javascript
greet("Alice") // returns "Hello, Alice!"
greet("Bob") // returns "Hello, Bob!"
\`\`\``,
    functionName: 'greet',
    starterCode: `function greet(name) {
  // Your code here
  
}`,
    testCases: [
      { inputs: ['Alice'], expected: 'Hello, Alice!', description: 'greet("Alice") should return "Hello, Alice!"' },
      { inputs: ['Bob'], expected: 'Hello, Bob!', description: 'greet("Bob") should return "Hello, Bob!"' },
      { inputs: ['World'], expected: 'Hello, World!', description: 'greet("World") should return "Hello, World!"' }
    ]
  },

  // ==================== ARRAYS ====================
  {
    id: 'get-first-element',
    topicId: 'arrays',
    title: 'Get First Element',
    difficulty: 'Beginner',
    description: `Write a function that returns the first element of an array.
If the array is empty, return \`undefined\`.

**Example:**
\`\`\`javascript
getFirstElement([1, 2, 3]) // returns 1
getFirstElement(['a', 'b']) // returns 'a'
getFirstElement([]) // returns undefined
\`\`\``,
    functionName: 'getFirstElement',
    starterCode: `function getFirstElement(arr) {
  // Your code here
  
}`,
    testCases: [
      { inputs: [[1, 2, 3]], expected: 1, description: 'getFirstElement([1, 2, 3]) should return 1' },
      { inputs: [['a', 'b']], expected: 'a', description: 'getFirstElement(["a", "b"]) should return "a"' },
      { inputs: [[]], expected: undefined, description: 'getFirstElement([]) should return undefined' },
      { inputs: [[42]], expected: 42, description: 'getFirstElement([42]) should return 42' }
    ]
  },
  {
    id: 'sum-array',
    topicId: 'arrays',
    title: 'Sum Array',
    difficulty: 'Beginner',
    description: `Write a function that returns the sum of all numbers in an array.
If the array is empty, return 0.

**Example:**
\`\`\`javascript
sumArray([1, 2, 3]) // returns 6
sumArray([10, -5, 5]) // returns 10
sumArray([]) // returns 0
\`\`\``,
    functionName: 'sumArray',
    starterCode: `function sumArray(arr) {
  // Your code here
  
}`,
    testCases: [
      { inputs: [[1, 2, 3]], expected: 6, description: 'sumArray([1, 2, 3]) should return 6' },
      { inputs: [[10, -5, 5]], expected: 10, description: 'sumArray([10, -5, 5]) should return 10' },
      { inputs: [[]], expected: 0, description: 'sumArray([]) should return 0' },
      { inputs: [[100]], expected: 100, description: 'sumArray([100]) should return 100' }
    ]
  },
  {
    id: 'filter-even-numbers',
    topicId: 'arrays',
    title: 'Filter Even Numbers',
    difficulty: 'Intermediate',
    description: `Write a function that returns a new array containing only the even numbers from the input array.

**Example:**
\`\`\`javascript
filterEvenNumbers([1, 2, 3, 4, 5]) // returns [2, 4]
filterEvenNumbers([2, 4, 6]) // returns [2, 4, 6]
filterEvenNumbers([1, 3, 5]) // returns []
\`\`\``,
    functionName: 'filterEvenNumbers',
    starterCode: `function filterEvenNumbers(arr) {
  // Your code here
  
}`,
    testCases: [
      { inputs: [[1, 2, 3, 4, 5]], expected: [2, 4], description: 'filterEvenNumbers([1, 2, 3, 4, 5]) should return [2, 4]' },
      { inputs: [[2, 4, 6]], expected: [2, 4, 6], description: 'filterEvenNumbers([2, 4, 6]) should return [2, 4, 6]' },
      { inputs: [[1, 3, 5]], expected: [], description: 'filterEvenNumbers([1, 3, 5]) should return []' },
      { inputs: [[]], expected: [], description: 'filterEvenNumbers([]) should return []' }
    ]
  },

  // ==================== STRINGS ====================
  {
    id: 'reverse-string',
    topicId: 'strings',
    title: 'Reverse String',
    difficulty: 'Beginner',
    description: `Write a function that reverses a string.

**Example:**
\`\`\`javascript
reverseString("hello") // returns "olleh"
reverseString("JavaScript") // returns "tpircSavaJ"
reverseString("") // returns ""
\`\`\``,
    functionName: 'reverseString',
    starterCode: `function reverseString(str) {
  // Your code here
  
}`,
    testCases: [
      { inputs: ['hello'], expected: 'olleh', description: 'reverseString("hello") should return "olleh"' },
      { inputs: ['JavaScript'], expected: 'tpircSavaJ', description: 'reverseString("JavaScript") should return "tpircSavaJ"' },
      { inputs: [''], expected: '', description: 'reverseString("") should return ""' },
      { inputs: ['a'], expected: 'a', description: 'reverseString("a") should return "a"' }
    ]
  },
  {
    id: 'count-vowels',
    topicId: 'strings',
    title: 'Count Vowels',
    difficulty: 'Intermediate',
    description: `Write a function that counts the number of vowels (a, e, i, o, u) in a string.
The function should be case-insensitive.

**Example:**
\`\`\`javascript
countVowels("hello") // returns 2
countVowels("JAVASCRIPT") // returns 3
countVowels("xyz") // returns 0
\`\`\``,
    functionName: 'countVowels',
    starterCode: `function countVowels(str) {
  // Your code here
  
}`,
    testCases: [
      { inputs: ['hello'], expected: 2, description: 'countVowels("hello") should return 2' },
      { inputs: ['JAVASCRIPT'], expected: 3, description: 'countVowels("JAVASCRIPT") should return 3' },
      { inputs: ['xyz'], expected: 0, description: 'countVowels("xyz") should return 0' },
      { inputs: ['aeiou'], expected: 5, description: 'countVowels("aeiou") should return 5' },
      { inputs: [''], expected: 0, description: 'countVowels("") should return 0' }
    ]
  },

  // ==================== OBJECTS ====================
  {
    id: 'get-full-name',
    topicId: 'objects',
    title: 'Get Full Name',
    difficulty: 'Beginner',
    description: `Write a function that takes a user object with \`firstName\` and \`lastName\` properties and returns the full name.

**Example:**
\`\`\`javascript
getFullName({ firstName: 'John', lastName: 'Doe' }) // returns "John Doe"
getFullName({ firstName: 'Jane', lastName: 'Smith' }) // returns "Jane Smith"
\`\`\``,
    functionName: 'getFullName',
    starterCode: `function getFullName(user) {
  // Your code here
  
}`,
    testCases: [
      { inputs: [{ firstName: 'John', lastName: 'Doe' }], expected: 'John Doe', description: 'getFullName({ firstName: "John", lastName: "Doe" }) should return "John Doe"' },
      { inputs: [{ firstName: 'Jane', lastName: 'Smith' }], expected: 'Jane Smith', description: 'getFullName({ firstName: "Jane", lastName: "Smith" }) should return "Jane Smith"' },
      { inputs: [{ firstName: 'Alice', lastName: 'Wonder' }], expected: 'Alice Wonder', description: 'getFullName({ firstName: "Alice", lastName: "Wonder" }) should return "Alice Wonder"' }
    ]
  },
  {
    id: 'count-properties',
    topicId: 'objects',
    title: 'Count Properties',
    difficulty: 'Beginner',
    description: `Write a function that counts the number of properties in an object.

**Example:**
\`\`\`javascript
countProperties({ a: 1, b: 2, c: 3 }) // returns 3
countProperties({}) // returns 0
countProperties({ name: 'John' }) // returns 1
\`\`\``,
    functionName: 'countProperties',
    starterCode: `function countProperties(obj) {
  // Your code here
  
}`,
    testCases: [
      { inputs: [{ a: 1, b: 2, c: 3 }], expected: 3, description: 'countProperties({ a: 1, b: 2, c: 3 }) should return 3' },
      { inputs: [{}], expected: 0, description: 'countProperties({}) should return 0' },
      { inputs: [{ name: 'John' }], expected: 1, description: 'countProperties({ name: "John" }) should return 1' },
      { inputs: [{ x: 1, y: 2 }], expected: 2, description: 'countProperties({ x: 1, y: 2 }) should return 2' }
    ]
  },

  // ==================== FUNCTIONS & SCOPE ====================
  {
    id: 'create-counter',
    topicId: 'functions',
    title: 'Create Counter',
    difficulty: 'Intermediate',
    description: `Write a function that creates a counter using closure.
The function should return an object with two methods:
- \`increment()\`: increases the count by 1 and returns the new count
- \`getValue()\`: returns the current count

**Example:**
\`\`\`javascript
const counter = createCounter();
counter.getValue() // returns 0
counter.increment() // returns 1
counter.increment() // returns 2
counter.getValue() // returns 2
\`\`\``,
    functionName: 'createCounter',
    starterCode: `function createCounter() {
  // Your code here
  // Return an object with increment() and getValue() methods
  
}`,
    testCases: [
      {
        inputs: [],
        expected: 'counter_test',
        description: 'Counter should start at 0 and increment correctly',
        isSpecialTest: true,
        testCode: `
          const counter = createCounter();
          if (counter.getValue() !== 0) return { passed: false, actual: counter.getValue(), expected: 0 };
          if (counter.increment() !== 1) return { passed: false, actual: 'increment() did not return 1', expected: 1 };
          if (counter.increment() !== 2) return { passed: false, actual: 'increment() did not return 2', expected: 2 };
          if (counter.getValue() !== 2) return { passed: false, actual: counter.getValue(), expected: 2 };
          return { passed: true };
        `
      },
      {
        inputs: [],
        expected: 'independent_counters',
        description: 'Multiple counters should be independent',
        isSpecialTest: true,
        testCode: `
          const counter1 = createCounter();
          const counter2 = createCounter();
          counter1.increment();
          counter1.increment();
          counter2.increment();
          if (counter1.getValue() !== 2) return { passed: false, actual: counter1.getValue(), expected: 2 };
          if (counter2.getValue() !== 1) return { passed: false, actual: counter2.getValue(), expected: 1 };
          return { passed: true };
        `
      }
    ]
  },

  // ==================== DOM ====================
  {
    id: 'toggle-class',
    topicId: 'dom',
    title: 'Toggle Class',
    difficulty: 'Intermediate',
    description: `Write a function that toggles a CSS class on an element.
Given an element and a class name, add the class if it doesn't exist, or remove it if it does.

**Example:**
\`\`\`javascript
// If element has class "active"
toggleClass(element, 'active') // removes "active"

// If element doesn't have class "hidden"  
toggleClass(element, 'hidden') // adds "hidden"
\`\`\`

Note: This lab uses a simulated DOM environment for testing.`,
    functionName: 'toggleClass',
    starterCode: `function toggleClass(element, className) {
  // Your code here
  // Toggle the className on the element
  
}`,
    testCases: [
      {
        inputs: [],
        expected: 'toggle_add',
        description: 'Should add class when it does not exist',
        isSpecialTest: true,
        isDOMTest: true,
        testCode: `
          const element = { classList: { classes: new Set(), toggle(c) { if (this.classes.has(c)) { this.classes.delete(c); } else { this.classes.add(c); } }, contains(c) { return this.classes.has(c); } } };
          toggleClass(element, 'active');
          return { passed: element.classList.contains('active'), actual: element.classList.contains('active'), expected: true };
        `
      },
      {
        inputs: [],
        expected: 'toggle_remove',
        description: 'Should remove class when it exists',
        isSpecialTest: true,
        isDOMTest: true,
        testCode: `
          const element = { classList: { classes: new Set(['active']), toggle(c) { if (this.classes.has(c)) { this.classes.delete(c); } else { this.classes.add(c); } }, contains(c) { return this.classes.has(c); } } };
          toggleClass(element, 'active');
          return { passed: !element.classList.contains('active'), actual: element.classList.contains('active'), expected: false };
        `
      }
    ]
  }
];

export default labs;
