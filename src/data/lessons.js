/**
 * Lessons data for JS Topic Labs (SQLBolt-style format)
 * Each lesson contains educational content followed by exercises
 * Solutions are included for the "Show Solution" feature
 */

export const lessons = [
  // ==================== LESSON 1: BASICS ====================
  {
    id: 'lesson-1',
    lessonNumber: 1,
    title: 'JavaScript Basics: Variables & Data Types',
    slug: 'basics',
    content: `
JavaScript is a versatile programming language that powers the web. Before diving into complex concepts, let's master the fundamentals.

## Variables

Variables are containers for storing data values. In modern JavaScript, we use \`let\` and \`const\` to declare variables:

\`\`\`javascript
let name = "Alice";    // Can be reassigned
const age = 25;        // Cannot be reassigned
\`\`\`

## Data Types

JavaScript has several primitive data types:

- **String**: Text wrapped in quotes (\`"Hello"\` or \`'Hello'\`)
- **Number**: Numeric values (\`42\`, \`3.14\`)
- **Boolean**: \`true\` or \`false\`
- **Undefined**: A variable that hasn't been assigned a value
- **Null**: Intentional absence of value

## Operators

Basic arithmetic operators work as expected:

\`\`\`javascript
let sum = 5 + 3;       // Addition: 8
let diff = 10 - 4;     // Subtraction: 6
let product = 3 * 4;   // Multiplication: 12
let quotient = 20 / 5; // Division: 4
let remainder = 7 % 3; // Modulo: 1
\`\`\`

## Functions

Functions are reusable blocks of code:

\`\`\`javascript
function greet(name) {
  return "Hello, " + name + "!";
}

greet("World"); // Returns "Hello, World!"
\`\`\`
    `,
    exercises: [
      {
        id: 'basics-1',
        number: 1,
        task: 'Write a function `sumTwoNumbers(a, b)` that returns the sum of two numbers.',
        hint: 'Use the + operator to add the two parameters',
        functionName: 'sumTwoNumbers',
        starterCode: `function sumTwoNumbers(a, b) {
  // Return the sum of a and b
  
}`,
        solution: `function sumTwoNumbers(a, b) {
  return a + b;
}`,
        testCases: [
          { inputs: [2, 3], expected: 5, description: 'sumTwoNumbers(2, 3) → 5' },
          { inputs: [0, 0], expected: 0, description: 'sumTwoNumbers(0, 0) → 0' },
          { inputs: [-5, 5], expected: 0, description: 'sumTwoNumbers(-5, 5) → 0' },
          { inputs: [100, 200], expected: 300, description: 'sumTwoNumbers(100, 200) → 300' }
        ]
      },
      {
        id: 'basics-2',
        number: 2,
        task: 'Write a function `multiply(a, b)` that returns the product of two numbers.',
        hint: 'Use the * operator to multiply',
        functionName: 'multiply',
        starterCode: `function multiply(a, b) {
  // Return the product of a and b
  
}`,
        solution: `function multiply(a, b) {
  return a * b;
}`,
        testCases: [
          { inputs: [3, 4], expected: 12, description: 'multiply(3, 4) → 12' },
          { inputs: [0, 100], expected: 0, description: 'multiply(0, 100) → 0' },
          { inputs: [-2, 5], expected: -10, description: 'multiply(-2, 5) → -10' },
          { inputs: [7, 7], expected: 49, description: 'multiply(7, 7) → 49' }
        ]
      },
      {
        id: 'basics-3',
        number: 3,
        task: 'Write a function `isEven(n)` that returns `true` if the number is even, `false` otherwise.',
        hint: 'A number is even if dividing by 2 leaves no remainder. Use the modulo operator %',
        functionName: 'isEven',
        starterCode: `function isEven(n) {
  // Return true if n is even, false otherwise
  
}`,
        solution: `function isEven(n) {
  return n % 2 === 0;
}`,
        testCases: [
          { inputs: [4], expected: true, description: 'isEven(4) → true' },
          { inputs: [7], expected: false, description: 'isEven(7) → false' },
          { inputs: [0], expected: true, description: 'isEven(0) → true' },
          { inputs: [-2], expected: true, description: 'isEven(-2) → true' }
        ]
      },
      {
        id: 'basics-4',
        number: 4,
        task: 'Write a function `greet(name)` that returns "Hello, <name>!" where <name> is the parameter.',
        hint: 'Use string concatenation with + or template literals with backticks',
        functionName: 'greet',
        starterCode: `function greet(name) {
  // Return a greeting string
  
}`,
        solution: `function greet(name) {
  return "Hello, " + name + "!";
}`,
        testCases: [
          { inputs: ['Alice'], expected: 'Hello, Alice!', description: 'greet("Alice") → "Hello, Alice!"' },
          { inputs: ['World'], expected: 'Hello, World!', description: 'greet("World") → "Hello, World!"' },
          { inputs: ['JavaScript'], expected: 'Hello, JavaScript!', description: 'greet("JavaScript") → "Hello, JavaScript!"' }
        ]
      },
      {
        id: 'basics-5',
        number: 5,
        task: 'Write a function `absolute(n)` that returns the absolute value of a number (always positive).',
        hint: 'If the number is negative, multiply by -1 to make it positive',
        functionName: 'absolute',
        starterCode: `function absolute(n) {
  // Return the absolute value of n
  
}`,
        solution: `function absolute(n) {
  return n < 0 ? -n : n;
}`,
        testCases: [
          { inputs: [5], expected: 5, description: 'absolute(5) → 5' },
          { inputs: [-5], expected: 5, description: 'absolute(-5) → 5' },
          { inputs: [0], expected: 0, description: 'absolute(0) → 0' },
          { inputs: [-100], expected: 100, description: 'absolute(-100) → 100' }
        ]
      }
    ]
  },

  // ==================== LESSON 2: STRINGS ====================
  {
    id: 'lesson-2',
    lessonNumber: 2,
    title: 'JavaScript Strings: Manipulation & Methods',
    slug: 'strings',
    content: `
Strings in JavaScript are sequences of characters used to represent text. They come with many built-in methods for manipulation.

## Creating Strings

\`\`\`javascript
let single = 'Hello';
let double = "World";
let template = \`Hello, \${name}!\`;  // Template literal
\`\`\`

## String Properties and Methods

\`\`\`javascript
let str = "JavaScript";

str.length;           // 10 (number of characters)
str.toUpperCase();    // "JAVASCRIPT"
str.toLowerCase();    // "javascript"
str.charAt(0);        // "J" (first character)
str[0];               // "J" (same as above)
\`\`\`

## Useful String Methods

\`\`\`javascript
let text = "Hello World";

text.includes("World");     // true
text.startsWith("Hello");   // true
text.endsWith("World");     // true
text.indexOf("o");          // 4 (first occurrence)
text.slice(0, 5);           // "Hello"
text.split(" ");            // ["Hello", "World"]
text.replace("World", "JS"); // "Hello JS"
\`\`\`

## Converting to Array and Back

\`\`\`javascript
let word = "hello";
let chars = word.split("");     // ["h", "e", "l", "l", "o"]
let reversed = chars.reverse(); // ["o", "l", "l", "e", "h"]
let result = reversed.join(""); // "olleh"
\`\`\`
    `,
    exercises: [
      {
        id: 'strings-1',
        number: 1,
        task: 'Write a function `getLength(str)` that returns the length of a string.',
        hint: 'Use the .length property',
        functionName: 'getLength',
        starterCode: `function getLength(str) {
  // Return the length of the string
  
}`,
        solution: `function getLength(str) {
  return str.length;
}`,
        testCases: [
          { inputs: ['hello'], expected: 5, description: 'getLength("hello") → 5' },
          { inputs: [''], expected: 0, description: 'getLength("") → 0' },
          { inputs: ['JavaScript'], expected: 10, description: 'getLength("JavaScript") → 10' }
        ]
      },
      {
        id: 'strings-2',
        number: 2,
        task: 'Write a function `toUpperCase(str)` that returns the string in all uppercase letters.',
        hint: 'Use the .toUpperCase() method',
        functionName: 'toUpperCase',
        starterCode: `function toUpperCase(str) {
  // Return the string in uppercase
  
}`,
        solution: `function toUpperCase(str) {
  return str.toUpperCase();
}`,
        testCases: [
          { inputs: ['hello'], expected: 'HELLO', description: 'toUpperCase("hello") → "HELLO"' },
          { inputs: ['JavaScript'], expected: 'JAVASCRIPT', description: 'toUpperCase("JavaScript") → "JAVASCRIPT"' },
          { inputs: ['ABC'], expected: 'ABC', description: 'toUpperCase("ABC") → "ABC"' }
        ]
      },
      {
        id: 'strings-3',
        number: 3,
        task: 'Write a function `reverseString(str)` that returns the string reversed.',
        hint: 'Split the string into an array, reverse it, then join back',
        functionName: 'reverseString',
        starterCode: `function reverseString(str) {
  // Return the reversed string
  
}`,
        solution: `function reverseString(str) {
  return str.split("").reverse().join("");
}`,
        testCases: [
          { inputs: ['hello'], expected: 'olleh', description: 'reverseString("hello") → "olleh"' },
          { inputs: ['JavaScript'], expected: 'tpircSavaJ', description: 'reverseString("JavaScript") → "tpircSavaJ"' },
          { inputs: ['a'], expected: 'a', description: 'reverseString("a") → "a"' },
          { inputs: [''], expected: '', description: 'reverseString("") → ""' }
        ]
      },
      {
        id: 'strings-4',
        number: 4,
        task: 'Write a function `countVowels(str)` that returns the number of vowels (a, e, i, o, u) in a string. Case insensitive.',
        hint: 'Convert to lowercase, then check each character against vowels',
        functionName: 'countVowels',
        starterCode: `function countVowels(str) {
  // Count and return the number of vowels
  
}`,
        solution: `function countVowels(str) {
  const vowels = "aeiou";
  let count = 0;
  for (let char of str.toLowerCase()) {
    if (vowels.includes(char)) count++;
  }
  return count;
}`,
        testCases: [
          { inputs: ['hello'], expected: 2, description: 'countVowels("hello") → 2' },
          { inputs: ['AEIOU'], expected: 5, description: 'countVowels("AEIOU") → 5' },
          { inputs: ['xyz'], expected: 0, description: 'countVowels("xyz") → 0' },
          { inputs: ['JavaScript'], expected: 3, description: 'countVowels("JavaScript") → 3' }
        ]
      },
      {
        id: 'strings-5',
        number: 5,
        task: 'Write a function `getFirstWord(str)` that returns the first word of a sentence.',
        hint: 'Split the string by space and return the first element',
        functionName: 'getFirstWord',
        starterCode: `function getFirstWord(str) {
  // Return the first word
  
}`,
        solution: `function getFirstWord(str) {
  return str.split(" ")[0];
}`,
        testCases: [
          { inputs: ['Hello World'], expected: 'Hello', description: 'getFirstWord("Hello World") → "Hello"' },
          { inputs: ['JavaScript is awesome'], expected: 'JavaScript', description: 'getFirstWord("JavaScript is awesome") → "JavaScript"' },
          { inputs: ['SingleWord'], expected: 'SingleWord', description: 'getFirstWord("SingleWord") → "SingleWord"' }
        ]
      }
    ]
  },

  // ==================== LESSON 3: ARRAYS ====================
  {
    id: 'lesson-3',
    lessonNumber: 3,
    title: 'JavaScript Arrays: Lists & Iteration',
    slug: 'arrays',
    content: `
Arrays are ordered lists of values. They're one of the most commonly used data structures in JavaScript.

## Creating Arrays

\`\`\`javascript
let fruits = ["apple", "banana", "orange"];
let numbers = [1, 2, 3, 4, 5];
let mixed = [1, "two", true, null];
\`\`\`

## Accessing Elements

Arrays are zero-indexed, meaning the first element is at index 0:

\`\`\`javascript
let arr = ["a", "b", "c", "d"];
arr[0];        // "a" (first element)
arr[2];        // "c" (third element)
arr.length;    // 4 (number of elements)
arr[arr.length - 1]; // "d" (last element)
\`\`\`

## Common Array Methods

\`\`\`javascript
let nums = [1, 2, 3];

nums.push(4);      // Add to end: [1, 2, 3, 4]
nums.pop();        // Remove from end: [1, 2, 3]
nums.unshift(0);   // Add to start: [0, 1, 2, 3]
nums.shift();      // Remove from start: [1, 2, 3]
\`\`\`

## Iteration Methods

\`\`\`javascript
// forEach - execute function for each element
[1, 2, 3].forEach(num => console.log(num));

// map - transform each element
[1, 2, 3].map(num => num * 2);  // [2, 4, 6]

// filter - keep elements that pass test
[1, 2, 3, 4].filter(num => num > 2);  // [3, 4]

// reduce - accumulate to single value
[1, 2, 3].reduce((sum, num) => sum + num, 0);  // 6
\`\`\`
    `,
    exercises: [
      {
        id: 'arrays-1',
        number: 1,
        task: 'Write a function `getFirst(arr)` that returns the first element of an array.',
        hint: 'Access elements using bracket notation with index 0',
        functionName: 'getFirst',
        starterCode: `function getFirst(arr) {
  // Return the first element
  
}`,
        solution: `function getFirst(arr) {
  return arr[0];
}`,
        testCases: [
          { inputs: [[1, 2, 3]], expected: 1, description: 'getFirst([1, 2, 3]) → 1' },
          { inputs: [['a', 'b']], expected: 'a', description: 'getFirst(["a", "b"]) → "a"' },
          { inputs: [[42]], expected: 42, description: 'getFirst([42]) → 42' }
        ]
      },
      {
        id: 'arrays-2',
        number: 2,
        task: 'Write a function `getLast(arr)` that returns the last element of an array.',
        hint: 'Use arr[arr.length - 1] to get the last element',
        functionName: 'getLast',
        starterCode: `function getLast(arr) {
  // Return the last element
  
}`,
        solution: `function getLast(arr) {
  return arr[arr.length - 1];
}`,
        testCases: [
          { inputs: [[1, 2, 3]], expected: 3, description: 'getLast([1, 2, 3]) → 3' },
          { inputs: [['x', 'y', 'z']], expected: 'z', description: 'getLast(["x", "y", "z"]) → "z"' },
          { inputs: [[99]], expected: 99, description: 'getLast([99]) → 99' }
        ]
      },
      {
        id: 'arrays-3',
        number: 3,
        task: 'Write a function `sumArray(arr)` that returns the sum of all numbers in an array.',
        hint: 'Use reduce() or a for loop to accumulate the sum',
        functionName: 'sumArray',
        starterCode: `function sumArray(arr) {
  // Return the sum of all numbers
  
}`,
        solution: `function sumArray(arr) {
  return arr.reduce((sum, num) => sum + num, 0);
}`,
        testCases: [
          { inputs: [[1, 2, 3]], expected: 6, description: 'sumArray([1, 2, 3]) → 6' },
          { inputs: [[10, -5, 5]], expected: 10, description: 'sumArray([10, -5, 5]) → 10' },
          { inputs: [[]], expected: 0, description: 'sumArray([]) → 0' },
          { inputs: [[100]], expected: 100, description: 'sumArray([100]) → 100' }
        ]
      },
      {
        id: 'arrays-4',
        number: 4,
        task: 'Write a function `doubleAll(arr)` that returns a new array with all numbers doubled.',
        hint: 'Use the map() method to transform each element',
        functionName: 'doubleAll',
        starterCode: `function doubleAll(arr) {
  // Return array with all values doubled
  
}`,
        solution: `function doubleAll(arr) {
  return arr.map(num => num * 2);
}`,
        testCases: [
          { inputs: [[1, 2, 3]], expected: [2, 4, 6], description: 'doubleAll([1, 2, 3]) → [2, 4, 6]' },
          { inputs: [[0, 5]], expected: [0, 10], description: 'doubleAll([0, 5]) → [0, 10]' },
          { inputs: [[]], expected: [], description: 'doubleAll([]) → []' }
        ]
      },
      {
        id: 'arrays-5',
        number: 5,
        task: 'Write a function `filterEvens(arr)` that returns a new array with only even numbers.',
        hint: 'Use filter() with the condition num % 2 === 0',
        functionName: 'filterEvens',
        starterCode: `function filterEvens(arr) {
  // Return array with only even numbers
  
}`,
        solution: `function filterEvens(arr) {
  return arr.filter(num => num % 2 === 0);
}`,
        testCases: [
          { inputs: [[1, 2, 3, 4, 5]], expected: [2, 4], description: 'filterEvens([1, 2, 3, 4, 5]) → [2, 4]' },
          { inputs: [[2, 4, 6]], expected: [2, 4, 6], description: 'filterEvens([2, 4, 6]) → [2, 4, 6]' },
          { inputs: [[1, 3, 5]], expected: [], description: 'filterEvens([1, 3, 5]) → []' }
        ]
      }
    ]
  },

  // ==================== LESSON 4: OBJECTS ====================
  {
    id: 'lesson-4',
    lessonNumber: 4,
    title: 'JavaScript Objects: Properties & Methods',
    slug: 'objects',
    content: `
Objects are collections of key-value pairs. They're used to represent real-world entities with properties and behaviors.

## Creating Objects

\`\`\`javascript
let person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  isStudent: false
};
\`\`\`

## Accessing Properties

\`\`\`javascript
// Dot notation
person.firstName;     // "John"

// Bracket notation (useful for dynamic keys)
person["lastName"];   // "Doe"

let key = "age";
person[key];          // 30
\`\`\`

## Modifying Objects

\`\`\`javascript
person.email = "john@example.com";  // Add property
person.age = 31;                     // Update property
delete person.isStudent;             // Remove property
\`\`\`

## Object Methods

\`\`\`javascript
let obj = { a: 1, b: 2, c: 3 };

Object.keys(obj);     // ["a", "b", "c"]
Object.values(obj);   // [1, 2, 3]
Object.entries(obj);  // [["a", 1], ["b", 2], ["c", 3]]
\`\`\`

## Checking Properties

\`\`\`javascript
"firstName" in person;              // true
person.hasOwnProperty("lastName");  // true
\`\`\`
    `,
    exercises: [
      {
        id: 'objects-1',
        number: 1,
        task: 'Write a function `getFullName(person)` that returns the full name from an object with `firstName` and `lastName` properties.',
        hint: 'Concatenate firstName and lastName with a space between',
        functionName: 'getFullName',
        starterCode: `function getFullName(person) {
  // Return "firstName lastName"
  
}`,
        solution: `function getFullName(person) {
  return person.firstName + " " + person.lastName;
}`,
        testCases: [
          { inputs: [{ firstName: 'John', lastName: 'Doe' }], expected: 'John Doe', description: 'getFullName({firstName: "John", lastName: "Doe"}) → "John Doe"' },
          { inputs: [{ firstName: 'Jane', lastName: 'Smith' }], expected: 'Jane Smith', description: 'getFullName({firstName: "Jane", lastName: "Smith"}) → "Jane Smith"' }
        ]
      },
      {
        id: 'objects-2',
        number: 2,
        task: 'Write a function `countProperties(obj)` that returns the number of properties in an object.',
        hint: 'Use Object.keys() to get an array of keys, then check its length',
        functionName: 'countProperties',
        starterCode: `function countProperties(obj) {
  // Return the count of properties
  
}`,
        solution: `function countProperties(obj) {
  return Object.keys(obj).length;
}`,
        testCases: [
          { inputs: [{ a: 1, b: 2, c: 3 }], expected: 3, description: 'countProperties({a: 1, b: 2, c: 3}) → 3' },
          { inputs: [{}], expected: 0, description: 'countProperties({}) → 0' },
          { inputs: [{ name: 'Test' }], expected: 1, description: 'countProperties({name: "Test"}) → 1' }
        ]
      },
      {
        id: 'objects-3',
        number: 3,
        task: 'Write a function `getProperty(obj, key)` that returns the value of the given property.',
        hint: 'Use bracket notation with the key parameter',
        functionName: 'getProperty',
        starterCode: `function getProperty(obj, key) {
  // Return the value at obj[key]
  
}`,
        solution: `function getProperty(obj, key) {
  return obj[key];
}`,
        testCases: [
          { inputs: [{ name: 'Alice', age: 25 }, 'name'], expected: 'Alice', description: 'getProperty({name: "Alice"}, "name") → "Alice"' },
          { inputs: [{ x: 10, y: 20 }, 'y'], expected: 20, description: 'getProperty({x: 10, y: 20}, "y") → 20' }
        ]
      },
      {
        id: 'objects-4',
        number: 4,
        task: 'Write a function `hasProperty(obj, key)` that returns `true` if the object has the property, `false` otherwise.',
        hint: 'Use the "in" operator or hasOwnProperty method',
        functionName: 'hasProperty',
        starterCode: `function hasProperty(obj, key) {
  // Return true if key exists in obj
  
}`,
        solution: `function hasProperty(obj, key) {
  return key in obj;
}`,
        testCases: [
          { inputs: [{ name: 'Test' }, 'name'], expected: true, description: 'hasProperty({name: "Test"}, "name") → true' },
          { inputs: [{ a: 1 }, 'b'], expected: false, description: 'hasProperty({a: 1}, "b") → false' },
          { inputs: [{}, 'any'], expected: false, description: 'hasProperty({}, "any") → false' }
        ]
      },
      {
        id: 'objects-5',
        number: 5,
        task: 'Write a function `sumValues(obj)` that returns the sum of all numeric values in an object.',
        hint: 'Use Object.values() to get all values, then sum them',
        functionName: 'sumValues',
        starterCode: `function sumValues(obj) {
  // Return sum of all values
  
}`,
        solution: `function sumValues(obj) {
  return Object.values(obj).reduce((sum, val) => sum + val, 0);
}`,
        testCases: [
          { inputs: [{ a: 1, b: 2, c: 3 }], expected: 6, description: 'sumValues({a: 1, b: 2, c: 3}) → 6' },
          { inputs: [{ x: 10 }], expected: 10, description: 'sumValues({x: 10}) → 10' },
          { inputs: [{}], expected: 0, description: 'sumValues({}) → 0' }
        ]
      }
    ]
  },

  // ==================== LESSON 5: FUNCTIONS ====================
  {
    id: 'lesson-5',
    lessonNumber: 5,
    title: 'JavaScript Functions: Closures & Higher-Order',
    slug: 'functions',
    content: `
Functions in JavaScript are first-class citizens, meaning they can be passed around like any other value. This enables powerful patterns.

## Function Expressions

\`\`\`javascript
// Function declaration
function add(a, b) {
  return a + b;
}

// Function expression
const subtract = function(a, b) {
  return a - b;
};

// Arrow function
const multiply = (a, b) => a * b;
\`\`\`

## Higher-Order Functions

Functions that take other functions as arguments or return functions:

\`\`\`javascript
// Taking a function as argument
function applyOperation(a, b, operation) {
  return operation(a, b);
}

applyOperation(5, 3, add);  // 8
\`\`\`

## Closures

A closure is a function that remembers its outer scope even after the outer function returns:

\`\`\`javascript
function createCounter() {
  let count = 0;  // Private variable
  
  return {
    increment() { return ++count; },
    getValue() { return count; }
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.getValue();  // 2
\`\`\`

## Default Parameters

\`\`\`javascript
function greet(name = "Guest") {
  return "Hello, " + name;
}

greet();         // "Hello, Guest"
greet("Alice");  // "Hello, Alice"
\`\`\`
    `,
    exercises: [
      {
        id: 'functions-1',
        number: 1,
        task: 'Write a function `createMultiplier(n)` that returns a function which multiplies its argument by n.',
        hint: 'Return a new function that uses the n from the outer scope',
        functionName: 'createMultiplier',
        starterCode: `function createMultiplier(n) {
  // Return a function that multiplies by n
  
}`,
        solution: `function createMultiplier(n) {
  return function(x) {
    return x * n;
  };
}`,
        testCases: [
          {
            inputs: [],
            expected: 'multiplier_test',
            description: 'createMultiplier(3)(4) should return 12',
            isSpecialTest: true,
            testCode: `
              const triple = createMultiplier(3);
              const result = triple(4);
              return { passed: result === 12, actual: result, expected: 12 };
            `
          },
          {
            inputs: [],
            expected: 'multiplier_test_2',
            description: 'createMultiplier(10)(5) should return 50',
            isSpecialTest: true,
            testCode: `
              const times10 = createMultiplier(10);
              const result = times10(5);
              return { passed: result === 50, actual: result, expected: 50 };
            `
          }
        ]
      },
      {
        id: 'functions-2',
        number: 2,
        task: 'Write a function `applyTwice(fn, value)` that applies a function to a value two times.',
        hint: 'Call fn(fn(value))',
        functionName: 'applyTwice',
        starterCode: `function applyTwice(fn, value) {
  // Apply fn to value twice
  
}`,
        solution: `function applyTwice(fn, value) {
  return fn(fn(value));
}`,
        testCases: [
          {
            inputs: [],
            expected: 'apply_twice_test',
            description: 'applyTwice(x => x * 2, 5) should return 20',
            isSpecialTest: true,
            testCode: `
              const result = applyTwice(x => x * 2, 5);
              return { passed: result === 20, actual: result, expected: 20 };
            `
          },
          {
            inputs: [],
            expected: 'apply_twice_test_2',
            description: 'applyTwice(x => x + 1, 0) should return 2',
            isSpecialTest: true,
            testCode: `
              const result = applyTwice(x => x + 1, 0);
              return { passed: result === 2, actual: result, expected: 2 };
            `
          }
        ]
      },
      {
        id: 'functions-3',
        number: 3,
        task: 'Write a function `createCounter()` that returns an object with `increment()` and `getValue()` methods using closure.',
        hint: 'Store count in the outer function scope, return an object with methods',
        functionName: 'createCounter',
        starterCode: `function createCounter() {
  // Create a counter with increment and getValue
  
}`,
        solution: `function createCounter() {
  let count = 0;
  return {
    increment() { return ++count; },
    getValue() { return count; }
  };
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
              counter.increment();
              counter.increment();
              if (counter.getValue() !== 2) return { passed: false, actual: counter.getValue(), expected: 2 };
              return { passed: true };
            `
          }
        ]
      },
      {
        id: 'functions-4',
        number: 4,
        task: 'Write a function `once(fn)` that returns a function that can only be called once. Subsequent calls return the first result.',
        hint: 'Use a flag to track if function has been called, store the result',
        functionName: 'once',
        starterCode: `function once(fn) {
  // Return a function that only runs fn once
  
}`,
        solution: `function once(fn) {
  let called = false;
  let result;
  return function(...args) {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}`,
        testCases: [
          {
            inputs: [],
            expected: 'once_test',
            description: 'once(fn) should only call fn once',
            isSpecialTest: true,
            testCode: `
              let callCount = 0;
              const fn = () => { callCount++; return 42; };
              const onceFn = once(fn);
              const r1 = onceFn();
              const r2 = onceFn();
              const r3 = onceFn();
              if (callCount !== 1) return { passed: false, actual: 'Called ' + callCount + ' times', expected: 'Called once' };
              if (r1 !== 42 || r2 !== 42 || r3 !== 42) return { passed: false, actual: [r1, r2, r3], expected: [42, 42, 42] };
              return { passed: true };
            `
          }
        ]
      },
      {
        id: 'functions-5',
        number: 5,
        task: 'Write a function `compose(f, g)` that returns a new function that computes f(g(x)).',
        hint: 'Return a function that takes x and returns f(g(x))',
        functionName: 'compose',
        starterCode: `function compose(f, g) {
  // Return function that does f(g(x))
  
}`,
        solution: `function compose(f, g) {
  return function(x) {
    return f(g(x));
  };
}`,
        testCases: [
          {
            inputs: [],
            expected: 'compose_test',
            description: 'compose(x => x + 1, x => x * 2)(5) should return 11',
            isSpecialTest: true,
            testCode: `
              const composed = compose(x => x + 1, x => x * 2);
              const result = composed(5);
              return { passed: result === 11, actual: result, expected: 11 };
            `
          }
        ]
      }
    ]
  },

  // ==================== LESSON 6: DOM ====================
  {
    id: 'lesson-6',
    lessonNumber: 6,
    title: 'DOM Basics: Selecting & Modifying Elements',
    slug: 'dom',
    content: `
The Document Object Model (DOM) is a programming interface for web documents. It represents the page as a tree of objects that JavaScript can manipulate.

## Selecting Elements

\`\`\`javascript
// By ID (returns single element)
document.getElementById("myId");

// By class (returns collection)
document.getElementsByClassName("myClass");

// By CSS selector (returns first match)
document.querySelector(".myClass");

// By CSS selector (returns all matches)
document.querySelectorAll("p.intro");
\`\`\`

## Modifying Content

\`\`\`javascript
let element = document.getElementById("demo");

element.textContent = "New text";     // Plain text
element.innerHTML = "<b>Bold text</b>"; // HTML content
\`\`\`

## Modifying Styles

\`\`\`javascript
element.style.color = "red";
element.style.backgroundColor = "yellow";
element.style.display = "none";  // Hide element
\`\`\`

## Working with Classes

\`\`\`javascript
element.classList.add("active");
element.classList.remove("hidden");
element.classList.toggle("visible");
element.classList.contains("active"); // true/false
\`\`\`

## Creating Elements

\`\`\`javascript
let div = document.createElement("div");
div.textContent = "Hello!";
document.body.appendChild(div);
\`\`\`
    `,
    exercises: [
      {
        id: 'dom-1',
        number: 1,
        task: 'Write a function `getTextContent(element)` that returns the text content of an element.',
        hint: 'Use the textContent property',
        functionName: 'getTextContent',
        starterCode: `function getTextContent(element) {
  // Return the element's text content
  
}`,
        solution: `function getTextContent(element) {
  return element.textContent;
}`,
        testCases: [
          {
            inputs: [],
            expected: 'dom_test_1',
            description: 'Should return text content of element',
            isSpecialTest: true,
            isDOMTest: true,
            testCode: `
              const el = { textContent: 'Hello World' };
              const result = getTextContent(el);
              return { passed: result === 'Hello World', actual: result, expected: 'Hello World' };
            `
          }
        ]
      },
      {
        id: 'dom-2',
        number: 2,
        task: 'Write a function `setTextContent(element, text)` that sets the text content of an element.',
        hint: 'Assign to the textContent property',
        functionName: 'setTextContent',
        starterCode: `function setTextContent(element, text) {
  // Set the element's text content
  
}`,
        solution: `function setTextContent(element, text) {
  element.textContent = text;
}`,
        testCases: [
          {
            inputs: [],
            expected: 'dom_test_2',
            description: 'Should set text content of element',
            isSpecialTest: true,
            isDOMTest: true,
            testCode: `
              const el = { textContent: '' };
              setTextContent(el, 'New Text');
              return { passed: el.textContent === 'New Text', actual: el.textContent, expected: 'New Text' };
            `
          }
        ]
      },
      {
        id: 'dom-3',
        number: 3,
        task: 'Write a function `addClass(element, className)` that adds a class to an element.',
        hint: 'Use element.classList.add()',
        functionName: 'addClass',
        starterCode: `function addClass(element, className) {
  // Add the class to the element
  
}`,
        solution: `function addClass(element, className) {
  element.classList.add(className);
}`,
        testCases: [
          {
            inputs: [],
            expected: 'dom_test_3',
            description: 'Should add class to element',
            isSpecialTest: true,
            isDOMTest: true,
            testCode: `
              const classes = new Set();
              const el = { classList: { add(c) { classes.add(c); }, contains(c) { return classes.has(c); } } };
              addClass(el, 'active');
              return { passed: classes.has('active'), actual: classes.has('active'), expected: true };
            `
          }
        ]
      },
      {
        id: 'dom-4',
        number: 4,
        task: 'Write a function `toggleClass(element, className)` that toggles a class on an element.',
        hint: 'Use element.classList.toggle()',
        functionName: 'toggleClass',
        starterCode: `function toggleClass(element, className) {
  // Toggle the class on the element
  
}`,
        solution: `function toggleClass(element, className) {
  element.classList.toggle(className);
}`,
        testCases: [
          {
            inputs: [],
            expected: 'dom_test_4',
            description: 'Should toggle class on element',
            isSpecialTest: true,
            isDOMTest: true,
            testCode: `
              const classes = new Set();
              const el = { classList: { toggle(c) { classes.has(c) ? classes.delete(c) : classes.add(c); }, contains(c) { return classes.has(c); } } };
              toggleClass(el, 'visible');
              const afterAdd = classes.has('visible');
              toggleClass(el, 'visible');
              const afterRemove = classes.has('visible');
              return { passed: afterAdd && !afterRemove, actual: { afterAdd, afterRemove }, expected: { afterAdd: true, afterRemove: false } };
            `
          }
        ]
      },
      {
        id: 'dom-5',
        number: 5,
        task: 'Write a function `setStyle(element, property, value)` that sets a CSS style on an element.',
        hint: 'Assign to element.style[property]',
        functionName: 'setStyle',
        starterCode: `function setStyle(element, property, value) {
  // Set the style property to value
  
}`,
        solution: `function setStyle(element, property, value) {
  element.style[property] = value;
}`,
        testCases: [
          {
            inputs: [],
            expected: 'dom_test_5',
            description: 'Should set style on element',
            isSpecialTest: true,
            isDOMTest: true,
            testCode: `
              const el = { style: {} };
              setStyle(el, 'color', 'red');
              return { passed: el.style.color === 'red', actual: el.style.color, expected: 'red' };
            `
          }
        ]
      }
    ]
  }
];

export default lessons;
