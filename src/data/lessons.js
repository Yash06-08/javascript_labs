/**
 * Lessons data for JS Topic Labs
 * beginner-first curriculum starting from Hello World
 */

export const lessons = [
  // ==================== LESSON 1: HELLO WORLD ====================
  {
    id: 'lesson-1',
    lessonNumber: 1,
    title: 'Hello World: Your First Program',
    slug: 'hello-world',
    content: `
Welcome to the world of programming! The very first thing almost every programmer learns is how to make the computer "talk" back to them.

## The Console
In web development, we use something called the **Console** to see messages from our code. It's like a secret notepad where the computer writes down what's happening.

## console.log()
To print a message to the console, we use the command \`console.log()\`. Whatever you put inside the parentheses \`()\` will be printed.

\`\`\`javascript
console.log("Hello World!");
\`\`\`

> [!NOTE]
> Text must be wrapped in quotes like \`"Hello"\` or \`'Hello'\`. These are called **Strings**.

## Try It
Edit the code below and click **Run** to see it appear in the Output panel!
    `,
    exercises: [
      {
        id: 'hw-1',
        number: 1,
        task: 'Print the message "Hello JavaScript" to the console.',
        hint: 'Use console.log("Hello JavaScript");',
        isProgramMode: true,
        starterCode: `// Write your code below
`,
        solution: `console.log("Hello JavaScript");`,
        testCases: [
          {
            isConsoleTest: true,
            expectedOutput: "Hello JavaScript",
            description: 'Should print "Hello JavaScript"'
          }
        ]
      },
      {
        id: 'hw-2',
        number: 2,
        task: 'Print your own name to the console.',
        hint: 'Replace "Name" with your actual name in console.log("Name");',
        isProgramMode: true,
        starterCode: `// Print your name
`,
        solution: `console.log("Developer");`,
        testCases: [
          {
            isConsoleTest: true,
            validate: (logs) => logs.length > 0 && logs[0].content.length > 0,
            description: 'Should print something to the console'
          }
        ]
      },
      {
        id: 'hw-3',
        number: 3,
        task: 'Print two separate messages on two lines.',
        hint: 'Use console.log() twice!',
        isProgramMode: true,
        starterCode: `// First message\n// Second message\n`,
        solution: `console.log("Line 1");\nconsole.log("Line 2");`,
        testCases: [
          {
            isConsoleTest: true,
            validate: (logs) => logs.length >= 2,
            description: 'Should print at least two lines'
          }
        ]
      },
      {
        id: 'hw-4',
        number: 4,
        task: 'Print the result of 5 + 5.',
        hint: 'You can put math inside console.log!',
        isProgramMode: true,
        starterCode: ``,
        solution: `console.log(5 + 5);`,
        testCases: [
          { isConsoleTest: true, expectedOutput: "10", description: 'Should print 10' }
        ]
      },
      {
        id: 'hw-5',
        number: 5,
        task: 'Print "3... 2... 1... Go!" using three separate console.log statements.',
        hint: 'Log each part on a new line',
        isProgramMode: true,
        starterCode: ``,
        solution: `console.log("3...");\nconsole.log("2...");\nconsole.log("1... Go!");`,
        testCases: [
          {
            isConsoleTest: true,
            validate: (logs) => logs.length === 3 && logs[0].content === "3...",
            description: 'Should print the countdown in 3 lines'
          }
        ]
      },
      {
        id: 'hw-6',
        number: 6,
        task: 'Print two lines: first "Hello," and on the next line your name.',
        hint: 'Use console.log("Hello,") then console.log("Your Name")',
        isProgramMode: true,
        starterCode: `// Print a greeting on two separate lines\n`,
        solution: `console.log("Hello,");\nconsole.log("Developer");`,
        testCases: [
          {
            isConsoleTest: true,
            validate: (logs) => logs.length >= 2 && logs[0].content.includes('Hello'),
            description: 'Should print greeting then a name on the next line'
          }
        ]
      },
      {
        id: 'hw-7',
        number: 7,
        task: 'Create a variable name and print "Hello, Coder!" exactly using it.',
        hint: 'const name = "Coder"; console.log("Hello, " + name + "!")',
        isProgramMode: true,
        starterCode: `// 1) create a variable\n// 2) log the greeting using the variable\n`,
        solution: `const name = "Coder";\nconsole.log("Hello, " + name + "!");`,
        testCases: [
          {
            isConsoleTest: true,
            expectedOutput: 'Hello, Coder!',
            description: 'Should print "Hello, Coder!"'
          }
        ]
      }
    ]
  },
  // ==================== LESSON 2: VARIABLES ====================
  {
    id: 'lesson-2',
    lessonNumber: 2,
    title: 'Variables: Storing Information',
    slug: 'variables',
    content: `
A program often needs to remember things—like a player's score or a user's name. We use **Variables** for this.

## Creating a Variable
Think of a variable as a labeled box. You put a value inside, and give the box a name.

In modern JavaScript, we use \`const\` for values that don't change, and \`let\` for values that might change.

\`\`\`javascript
const city = "New York";
let score = 0;
\`\`\`

## Using Variables
Once you save a value in a variable, you can use that name instead of the value.

\`\`\`javascript
const name = "Alice";
console.log(name); // Prints "Alice"
\`\`\`

## Updating Variables
If you used \`let\`, you can change the value later:

\`\`\`javascript
let age = 20;
age = 21; // age is now 21
\`\`\`
    `,
    exercises: [
      {
        id: 'var-1',
        number: 1,
        task: 'Create a constant named `fruit` and set it to the value "Apple". Then print it.',
        hint: 'const fruit = "Apple"; console.log(fruit);',
        isProgramMode: true,
        starterCode: `// Create variable then print it
`,
        solution: `const fruit = "Apple";\nconsole.log(fruit);`,
        testCases: [
          {
            isConsoleTest: true,
            expectedOutput: "Apple",
            description: 'Should print "Apple"'
          }
        ]
      },
      {
        id: 'var-2',
        number: 2,
        task: 'Create a variable `count` using `let`, set it to 10, then change it to 20 on the next line. Finally, print `count`.',
        hint: 'let count = 10; count = 20; console.log(count);',
        isProgramMode: true,
        starterCode: `// Use let to allow changing the value
`,
        solution: `let count = 10;\ncount = 20;\nconsole.log(count);`,
        testCases: [
          {
            isConsoleTest: true,
            expectedOutput: "20",
            description: 'Should print "20"'
          }
        ]
      },
      {
        id: 'var-3',
        number: 3,
        task: 'Create a constant `BIRTH_YEAR` and set it to your birth year (e.g. 2000). Print it.',
        hint: 'const BIRTH_YEAR = 2000;',
        isProgramMode: true,
        starterCode: ``,
        solution: `const BIRTH_YEAR = 2000;\nconsole.log(BIRTH_YEAR);`,
        testCases: [
          { isConsoleTest: true, validate: (logs) => logs.length > 0 && !isNaN(logs[0].content), description: 'Should print a number' }
        ]
      },
      {
        id: 'var-4',
        number: 4,
        task: 'Create a variable `counter` starting at 0. Increase it three times, then print it.',
        hint: 'let counter = 0; counter = counter + 1; (repeat) console.log(counter);',
        isProgramMode: true,
        starterCode: `// Start at 0 and increment three times\n`,
        solution: `let counter = 0;\ncounter = counter + 1;\ncounter = counter + 1;\ncounter = counter + 1;\nconsole.log(counter);`,
        testCases: [
          { isConsoleTest: true, expectedOutput: '3', description: 'Should print 3' }
        ]
      },
      {
        id: 'var-5',
        number: 5,
        task: 'Create constants `first` and `last` and print their full name in one line.',
        hint: 'const first = "Ada"; const last = "Lovelace"; console.log(first + " " + last);',
        isProgramMode: true,
        starterCode: `// Define first and last, then print the full name\n`,
        solution: `const first = "Ada";\nconst last = "Lovelace";\nconsole.log(first + " " + last);`,
        testCases: [
          { isConsoleTest: true, expectedOutput: 'Ada Lovelace', description: 'Should print "Ada Lovelace"' }
        ]
      }
    ]
  },
  // ==================== LESSON 3: DATA TYPES ====================
  {
    id: 'lesson-3',
    lessonNumber: 3,
    title: 'Data Types: Strings, Numbers & More',
    slug: 'data-types',
    content: `
JavaScript needs to know what *kind* of data it's looking at. The three most basic types are:

## 1. Strings (Text)
Anything inside quotes.
\`\`\`javascript
"Hello"
'Coding is fun'
\`\`\`

## 2. Numbers
Regular numbers, no quotes needed.
\`\`\`javascript
42
3.14
\`\`\`

## 3. Booleans (Yes/No)
Only two possible values: \`true\` or \`false\`. Think of them like a light switch.
\`\`\`javascript
const isCoding = true;
const isTired = false;
\`\`\`
    `,
    exercises: [
      {
        id: 'dt-1',
        number: 1,
        task: 'Create a variable `pi` and set it to the number 3.14. Print it.',
        hint: 'const pi = 3.14;',
        isProgramMode: true,
        starterCode: ``,
        solution: `const pi = 3.14;\nconsole.log(pi);`,
        testCases: [
          { isConsoleTest: true, expectedOutput: "3.14", description: 'Prints the number 3.14' }
        ]
      },
      {
        id: 'dt-2',
        number: 2,
        task: 'Create a boolean variable `isJavaScriptFun` and set it to `true`. Print it.',
        hint: 'const isJavaScriptFun = true;',
        isProgramMode: true,
        starterCode: ``,
        solution: `const isJavaScriptFun = true;\nconsole.log(isJavaScriptFun);`,
        testCases: [
          { isConsoleTest: true, expectedOutput: "true", description: 'Prints true' }
        ]
      },
      {
        id: 'dt-3',
        number: 3,
        task: 'Create a variable `message` with a string and a variable `num` with a number. Print them both on separate lines.',
        hint: 'console.log(message); console.log(num);',
        isProgramMode: true,
        starterCode: ``,
        solution: `const message = "Hi";\nconst num = 10;\nconsole.log(message);\nconsole.log(num);`,
        testCases: [
          { isConsoleTest: true, validate: (logs) => logs.length === 2, description: 'Prints two variables' }
        ]
      },
      {
        id: 'dt-4',
        number: 4,
        task: 'Print the type of the value "Hello" using typeof.',
        hint: 'console.log(typeof "Hello");',
        isProgramMode: true,
        starterCode: `// Use typeof to print the data type\n`,
        solution: `console.log(typeof "Hello");`,
        testCases: [
          { isConsoleTest: true, expectedOutput: "string", description: 'Should print "string"' }
        ]
      },
      {
        id: 'dt-5',
        number: 5,
        task: 'Create a number and a boolean, then print them on separate lines.',
        hint: 'const n = 7; const ok = false; console.log(n); console.log(ok);',
        isProgramMode: true,
        starterCode: `// Print a number, then a boolean\n`,
        solution: `const n = 7;\nconst ok = false;\nconsole.log(n);\nconsole.log(ok);`,
        testCases: [
          {
            isConsoleTest: true,
            validate: (logs) => logs.length >= 2 && logs[0].content === '7' && logs[1].content === 'false',
            description: 'Should print 7 then false'
          }
        ]
      }
    ]
  },
  // ==================== LESSON 4: OPERATORS ====================
  {
    id: 'lesson-4',
    lessonNumber: 4,
    title: 'Operators: Math & Logic',
    slug: 'operators',
    content: `
Now that we have variables, let's do something with them! Operators are symbols that perform operations on values.

## Arithmetic Operators
You know these from math class:
- \`+\` (Addition)
- \`-\` (Subtraction)
- \`*\` (Multiplication)
- \`/\` (Division)

\`\`\`javascript
let sum = 5 + 10; // 15
let name = "Hello" + " World"; // "Hello World"
\`\`\`

## Comparison Operators
These compare two values and return a **Boolean** (\`true\` or \`false\`).
- \`===\` (Equal to)
- \`!==\` (Not equal to)
- \`>\` (Greater than)
- \`<\` (Less than)

\`\`\`javascript
console.log(10 > 5); // true
console.log(10 === 5); // false
\`\`\`
    `,
    exercises: [
      {
        id: 'op-1',
        number: 1,
        task: 'Add 15 and 27 together and print the result.',
        hint: 'console.log(15 + 27);',
        isProgramMode: true,
        starterCode: ``,
        solution: `console.log(15 + 27);`,
        testCases: [
          { isConsoleTest: true, expectedOutput: "42", description: 'Should print 42' }
        ]
      },
      {
        id: 'op-2',
        number: 2,
        task: 'Multiply 6 by 7 and print the result.',
        hint: 'Use the * symbol',
        isProgramMode: true,
        starterCode: ``,
        solution: `console.log(6 * 7);`,
        testCases: [
          { isConsoleTest: true, expectedOutput: "42", description: 'Should print 42' }
        ]
      },
      {
        id: 'op-3',
        number: 3,
        task: 'Compare if 100 is greater than 50 and print the result.',
        hint: 'console.log(100 > 50);',
        isProgramMode: true,
        starterCode: ``,
        solution: `console.log(100 > 50);`,
        testCases: [
          { isConsoleTest: true, expectedOutput: "true", description: 'Should print true' }
        ]
      },
      {
        id: 'op-4',
        number: 4,
        task: 'Subtract 10 from 50 and multiply the result by 2. Print it.',
        hint: 'console.log((50 - 10) * 2);',
        isProgramMode: true,
        starterCode: ``,
        solution: `console.log((50 - 10) * 2);`,
        testCases: [
          { isConsoleTest: true, expectedOutput: "80", description: 'Should print 80' }
        ]
      },
      {
        id: 'op-5',
        number: 5,
        task: 'Print the remainder when 7 is divided by 3.',
        hint: 'Use the % operator',
        isProgramMode: true,
        starterCode: `// Print 7 % 3\n`,
        solution: `console.log(7 % 3);`,
        testCases: [
          { isConsoleTest: true, expectedOutput: "1", description: 'Should print 1' }
        ]
      },
      {
        id: 'op-6',
        number: 6,
        task: 'Concatenate and print the string "Code" + " " + "Labs".',
        hint: 'console.log("Code" + " " + "Labs");',
        isProgramMode: true,
        starterCode: `// Print Code Labs with a space between\n`,
        solution: `console.log("Code" + " " + "Labs");`,
        testCases: [
          { isConsoleTest: true, expectedOutput: "Code Labs", description: 'Should print Code Labs' }
        ]
      }
    ]
  },
  // ==================== LESSON 5: CONDITIONALS ====================
  {
    id: 'lesson-5',
    lessonNumber: 5,
    title: 'Conditionals: Making Decisions',
    slug: 'conditionals',
    content: `
Sometimes we want our code to do different things depending on a condition. For this, we use \`if\` statements.

## The If-Else Statement
It works like a fork in the road.

\`\`\`javascript
const temperature = 30;

if (temperature > 25) {
  console.log("It's a hot day!");
} else {
  console.log("It's not that hot.");
}
\`\`\`

## How it works:
1. JavaScript checks the condition inside the parentheses \`()\`.
2. If it's \`true\`, the code inside the first set of curly braces \`{}\` runs.
3. If it's \`false\`, the code inside the \`else\` block runs.
    `,
    exercises: [
      {
        id: 'cond-1',
        number: 1,
        task: 'Create a variable `score` and set it to 85. Use an `if` statement to print "Passed" if score is greater than 50.',
        hint: 'if (score > 50) { console.log("Passed"); }',
        isProgramMode: true,
        starterCode: `let score = 85;\n// Write if statement below\n`,
        solution: `let score = 85;\nif (score > 50) {\n  console.log("Passed");\n}`,
        testCases: [
          { isConsoleTest: true, expectedOutput: "Passed", description: 'Should print "Passed"' }
        ]
      },
      {
        id: 'cond-2',
        number: 2,
        task: 'Change the `isRaining` variable to `true`. Use an if/else statement to print "Take an umbrella" if it is raining, otherwise print "Enjoy the sun".',
        hint: 'if (isRaining) { ... } else { ... }',
        isProgramMode: true,
        starterCode: `let isRaining = false;\n// 1. Set isRaining to true\n// 2. Add if/else statement\n`,
        solution: `let isRaining = true;\nif (isRaining) {\n  console.log("Take an umbrella");\n} else {\n  console.log("Enjoy the sun");\n}`,
        testCases: [
          { isConsoleTest: true, expectedOutput: "Take an umbrella", description: 'Should print "Take an umbrella"' }
        ]
      },
      {
        id: 'cond-3',
        number: 3,
        task: 'Create a variable `age = 20`. Print "Adult" if age is 18 or older, otherwise print "Minor".',
        hint: 'age >= 18',
        isProgramMode: true,
        starterCode: `let age = 20;`,
        solution: `let age = 20;\nif (age >= 18) {\n  console.log("Adult");\n} else {\n  console.log("Minor");\n}`,
        testCases: [
          { isConsoleTest: true, expectedOutput: "Adult", description: 'Should print "Adult"' }
        ]
      },
      {
        id: 'cond-4',
        number: 4,
        task: 'Given `temperature = 15`, print "Cold" if temperature is less than 20, otherwise print "Warm".',
        hint: 'if (temperature < 20) { ... } else { ... }',
        isProgramMode: true,
        starterCode: `let temperature = 15;\n// Write if/else here\n`,
        solution: `let temperature = 15;\nif (temperature < 20) {\n  console.log("Cold");\n} else {\n  console.log("Warm");\n}`,
        testCases: [
          { isConsoleTest: true, expectedOutput: "Cold", description: 'Should print "Cold"' }
        ]
      },
      {
        id: 'cond-5',
        number: 5,
        task: 'Use `isLoggedIn = true`. If true, print "Welcome" otherwise print "Please log in".',
        hint: 'if (isLoggedIn) { console.log("Welcome") } else { console.log("Please log in") }',
        isProgramMode: true,
        starterCode: `let isLoggedIn = true;\n// Add conditional below\n`,
        solution: `let isLoggedIn = true;\nif (isLoggedIn) {\n  console.log("Welcome");\n} else {\n  console.log("Please log in");\n}`,
        testCases: [
          { isConsoleTest: true, expectedOutput: "Welcome", description: 'Should print "Welcome"' }
        ]
      }
    ]
  },

  // ==================== LESSON 6: LOOPS ====================
  {
    id: 'lesson-6',
    lessonNumber: 6,
    title: 'Loops: Doing Things Over and Over',
    slug: 'loops',
    content: `
Computers are great at doing repetitive tasks. **Loops** allow us to run the same block of code multiple times.

## The For Loop
The most common loop is the \`for\` loop. It has three parts:
1. **The start**: \`let i = 0\`
2. **The condition**: \`i < 5\` (keep going as long as this is true)
3. **The step**: \`i++\` (add 1 to i after each loop)

\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log(i); // Prints 0, 1, 2, 3, 4
}
\`\`\`

## Why Use Loops?
Instead of writing \`console.log\` 100 times, you can just write it once inside a loop!
    `,
    exercises: [
      {
        id: 'loop-1',
        number: 1,
        task: 'Write a `for` loop that prints the numbers from 1 to 5.',
        hint: 'for (let i = 1; i <= 5; i++) { console.log(i); }',
        isProgramMode: true,
        starterCode: `// Write your for loop here\n`,
        solution: `for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}`,
        testCases: [
          {
            isConsoleTest: true,
            validate: (logs) => logs.map(l => l.content).join(',') === '1,2,3,4,5',
            description: 'Should print 1, 2, 3, 4, 5 in order'
          }
        ]
      },
      {
        id: 'loop-2',
        number: 2,
        task: 'Print "Hello" 3 times using a loop.',
        hint: 'Loop 3 times and console.log("Hello")',
        isProgramMode: true,
        starterCode: ``,
        solution: `for (let i = 0; i < 3; i++) {\n  console.log("Hello");\n}`,
        testCases: [
          {
            isConsoleTest: true,
            validate: (logs) => logs.filter(l => l.content === 'Hello').length === 3,
            description: 'Should print "Hello" exactly 3 times'
          }
        ]
      },
      {
        id: 'loop-3',
        number: 3,
        task: 'Print the numbers 10, 20, 30 using a loop.',
        hint: 'Multiply loop index by 10',
        isProgramMode: true,
        starterCode: ``,
        solution: `for (let i = 1; i <= 3; i++) {\n  console.log(i * 10);\n}`,
        testCases: [
          {
            isConsoleTest: true,
            validate: (logs) => logs.map(l => l.content).join(',') === '10,20,30',
            description: 'Should print 10, 20, 30'
          }
        ]
      },
      {
        id: 'loop-4',
        number: 4,
        task: 'Print "Counting: 0", "Counting: 1", "Counting: 2" using a loop.',
        hint: 'Use "Counting: " + i',
        isProgramMode: true,
        starterCode: ``,
        solution: `for (let i = 0; i < 3; i++) {\n  console.log("Counting: " + i);\n}`,
        testCases: [
          {
            isConsoleTest: true,
            validate: (logs) => logs.length === 3 && logs[0].content === "Counting: 0",
            description: 'Should print Counting with index'
          }
        ]
      }
    ]
  },

  // ==================== LESSON 7: FUNCTIONS BASICS ====================
  {
    id: 'lesson-7',
    lessonNumber: 7,
    title: 'Functions: Reusable Blocks of Code',
    slug: 'functions-basics',
    content: `
A **Function** is like a recipe. You define it once, and then you can "call" it whenever you need it.

## Defining a Function
\`\`\`javascript
function sayHello() {
  console.log("Hello!");
}
\`\`\`

## Calling a Function
To actually run the code inside, you must "call" it by adding parentheses:
\`\`\`javascript
sayHello(); // This runs the code!
\`\`\`

## Returning Values
Functions can "send back" a value using the \`return\` keyword. This is the most professional way to get data out of a function.

\`\`\`javascript
function getFive() {
  return 5;
}

let num = getFive(); // num is now 5
\`\`\`
    `,
    exercises: [
      {
        id: 'fun-1',
        number: 1,
        task: 'Create a function named `myFirstFunction` that returns the number 10.',
        hint: 'function myFirstFunction() { return 10; }',
        functionName: 'myFirstFunction',
        starterCode: `function myFirstFunction() {\n  // return 10 here\n}\n`,
        solution: `function myFirstFunction() {\n  return 10;\n}`,
        testCases: [
          { inputs: [], expected: 10, description: 'myFirstFunction() should return 10' }
        ]
      },
      {
        id: 'fun-2',
        number: 2,
        task: 'Create a function named `isSunny` that returns `true`.',
        hint: 'return true;',
        functionName: 'isSunny',
        starterCode: `function isSunny() {\n  \n}\n`,
        solution: `function isSunny() {\n  return true;\n}`,
        testCases: [
          { inputs: [], expected: true, description: 'isSunny() should return true' }
        ]
      },
      {
        id: 'fun-3',
        number: 3,
        task: 'Create a function `getWebsiteName` that returns the string "JavaScript Labs".',
        hint: 'return "JavaScript Labs";',
        functionName: 'getWebsiteName',
        starterCode: `function getWebsiteName() {\n  \n}`,
        solution: `function getWebsiteName() {\n  return "JavaScript Labs";\n}`,
        testCases: [
          { inputs: [], expected: "JavaScript Labs", description: 'Should return "JavaScript Labs"' }
        ]
      },
      {
        id: 'fun-4',
        number: 4,
        task: 'Create a function `isEven` that returns the boolean `true` if called.',
        hint: 'Just return true for now, we will add logic later!',
        functionName: 'isEven',
        starterCode: `function isEven() {\n  \n}`,
        solution: `function isEven() {\n  return true;\n}`,
        testCases: [
          { inputs: [], expected: true, description: 'Should return true' }
        ]
      }
    ]
  },

  // ==================== LESSON 8: ADVANCED FUNCTIONS ====================
  {
    id: 'lesson-8',
    lessonNumber: 8,
    title: 'Advanced Functions: Parameters',
    slug: 'functions-advanced',
    content: `
Functions are even more powerful when you give them information to work with. These are called **Parameters**.

## Using Parameters
Think of parameters as placeholders for values you'll provide later.

\`\`\`javascript
function greet(name) {
  return "Hello " + name;
}

console.log(greet("Alice")); // "Hello Alice"
console.log(greet("Bob"));   // "Hello Bob"
\`\`\`

## Multiple Parameters
You can separate parameters with commas:

\`\`\`javascript
function add(a, b) {
  return a + b;
}
\`\`\`
    `,
    exercises: [
      {
        id: 'fun-adv-1',
        number: 1,
        task: 'Write a function `doubleNumber(n)` that takes a number and returns it multiplied by 2.',
        hint: 'return n * 2;',
        functionName: 'doubleNumber',
        starterCode: `function doubleNumber(n) {\n  \n}\n`,
        solution: `function doubleNumber(n) {\n  return n * 2;\n}`,
        testCases: [
          { inputs: [5], expected: 10, description: 'doubleNumber(5) should return 10' },
          { inputs: [10], expected: 20, description: 'doubleNumber(10) should return 20' }
        ]
      },
      {
        id: 'fun-adv-2',
        number: 2,
        task: 'Write a function `sumTwo(a, b)` that returns the sum of two parameters.',
        hint: 'return a + b;',
        functionName: 'sumTwo',
        starterCode: `function sumTwo(a, b) {\n  \n}\n`,
        solution: `function sumTwo(a, b) {\n  return a + b;\n}`,
        testCases: [
          { inputs: [10, 20], expected: 30, description: 'sumTwo(10, 20) should return 30' }
        ]
      },
      {
        id: 'fun-adv-3',
        number: 3,
        task: 'Write a function `square(n)` that returns the square of a number (n * n).',
        hint: 'return n * n;',
        functionName: 'square',
        starterCode: `function square(n) {\n  \n}`,
        solution: `function square(n) {\n  return n * n;\n}`,
        testCases: [
          { inputs: [4], expected: 16, description: 'square(4) should be 16' },
          { inputs: [9], expected: 81, description: 'square(9) should be 81' }
        ]
      },
      {
        id: 'fun-adv-4',
        number: 4,
        task: 'Write a function `getFullName(first, last)` that returns the full name separated by a space.',
        hint: 'return first + " " + last;',
        functionName: 'getFullName',
        starterCode: `function getFullName(first, last) {\n  \n}`,
        solution: `function getFullName(first, last) {\n  return first + " " + last;\n}`,
        testCases: [
          { inputs: ["John", "Doe"], expected: "John Doe", description: 'getFullName("John", "Doe") should be "John Doe"' }
        ]
      }
    ]
  },

  // ==================== LESSON 9: ARRAYS ====================
  {
    id: 'lesson-9',
    lessonNumber: 9,
    title: 'Arrays: Lists of Items',
    slug: 'arrays',
    content: `
An **Array** is a list of values. It's like a shopping list for your code.

## Creation
\`\`\`javascript
const fruits = ["Apple", "Banana", "Cherry"];
\`\`\`

## Accessing items
Items are numbered starting from **0**.
- \`fruits[0]\` is "Apple"
- \`fruits[1]\` is "Banana"

## Length
You can see how many items are in a list with \`.length\`.
\`\`\`javascript
console.log(fruits.length); // 3
\`\`\`
    `,
    exercises: [
      {
        id: 'arr-1',
        number: 1,
        task: 'Create a function `getFirst(arr)` that returns the first item (index 0) of an array.',
        hint: 'return arr[0];',
        functionName: 'getFirst',
        starterCode: `function getFirst(arr) {\n  \n}\n`,
        solution: `function getFirst(arr) {\n  return arr[0];\n}`,
        testCases: [
          { inputs: [[10, 20, 30]], expected: 10, description: 'getFirst([10, 20, 30]) should return 10' }
        ]
      },
      {
        id: 'arr-2',
        number: 2,
        task: 'Create a function `getSecond(arr)` that returns the second item (index 1).',
        hint: 'return arr[1];',
        functionName: 'getSecond',
        starterCode: `function getSecond(arr) {\n  \n}\n`,
        solution: `function getSecond(arr) {\n  return arr[1];\n}`,
        testCases: [
          { inputs: [["a", "b", "c"]], expected: "b", description: 'getSecond(["a", "b", "c"]) should return "b"' }
        ]
      },
      {
        id: 'arr-3',
        number: 3,
        task: 'Create a function `getArrayLength(arr)` that returns the number of items in the array.',
        hint: 'return arr.length;',
        functionName: 'getArrayLength',
        starterCode: `function getArrayLength(arr) {\n  \n}`,
        solution: `function getArrayLength(arr) {\n  return arr.length;\n}`,
        testCases: [
          { inputs: [[1, 2, 3, 4, 5]], expected: 5, description: 'getArrayLength([1,2,3,4,5]) should be 5' }
        ]
      },
      {
        id: 'arr-4',
        number: 4,
        task: 'Create a function `getLast(arr)` that returns the last item of an array.',
        hint: 'return arr[arr.length - 1];',
        functionName: 'getLast',
        starterCode: `function getLast(arr) {\n  \n}`,
        solution: `function getLast(arr) {\n  return arr[arr.length - 1];\n}`,
        testCases: [
          { inputs: [[100, 200, 300]], expected: 300, description: 'getLast([100, 200, 300]) should be 300' }
        ]
      }
    ]
  },

  // ==================== LESSON 10: OBJECTS ====================
  {
    id: 'lesson-10',
    lessonNumber: 10,
    title: 'Objects: Groups of Data',
    slug: 'objects',
    content: `
**Objects** allow us to group related information together using key-value pairs.

## Creation
\`\`\`javascript
const user = {
  name: "Alice",
  age: 25,
  isPremium: true
};
\`\`\`

## Accessing Data
You use the "dot" notation to get values out:
\`\`\`javascript
console.log(user.name); // "Alice"
console.log(user.age);  // 25
\`\`\`
    `,
    exercises: [
      {
        id: 'obj-1',
        number: 1,
        task: 'Write a function `getName(person)` that returns the `name` property from the person object.',
        hint: 'return person.name;',
        functionName: 'getName',
        starterCode: `function getName(person) {\n  \n}\n`,
        solution: `function getName(person) {\n  return person.name;\n}`,
        testCases: [
          { inputs: [{ name: "Charlie" }], expected: "Charlie", description: 'getName({name: "Charlie"}) should return "Charlie"' }
        ]
      },
      {
        id: 'obj-2',
        number: 2,
        task: 'Write a function `getAge(person)` that returns the `age` property.',
        hint: 'return person.age;',
        functionName: 'getAge',
        starterCode: `function getAge(person) {\n  \n}`,
        solution: `function getAge(person) {\n  return person.age;\n}`,
        testCases: [
          { inputs: [{ age: 30 }], expected: 30, description: 'getAge({age: 30}) should be 30' }
        ]
      },
      {
        id: 'obj-3',
        number: 3,
        task: 'Write a function `isAdult(person)` that returns `true` if the person is 18 or older.',
        hint: 'return person.age >= 18;',
        functionName: 'isAdult',
        starterCode: `function isAdult(person) {\n  \n}`,
        solution: `function isAdult(person) {\n  return person.age >= 18;\n}`,
        testCases: [
          { inputs: [{ age: 20 }], expected: true, description: 'isAdult({age: 20}) should be true' },
          { inputs: [{ age: 16 }], expected: false, description: 'isAdult({age: 16}) should be false' }
        ]
      }
    ]
  },


  // ==================== LESSON 11: CLASSES ====================
  {
    id: 'lesson-11',
    lessonNumber: 11,
    title: 'Classes: Constructors, Methods, and Static',
    slug: 'classes',
    content: `
**Classes** let you create reusable blueprints for objects.

\`\`\`javascript
class Person {
  constructor(first, last) {
    this.first = first;
    this.last = last;
  }

  getFullName() {
    return this.first + " " + this.last;
  }
}
\`\`\`

In this lesson, you'll use constructors, instance methods, getters, and static methods.
    `,
    exercises: [
      {
        id: 'class-1',
        number: 1,
        task: 'Create a class `Person` with a constructor `(firstName, lastName)` and a method `getFullName()` that returns "First Last". Then write a function `createPerson(first, last)` that returns a new `Person` instance.',
        hint: 'Define class Person, then `return new Person(first, last);`',
        functionName: 'createPerson',
        starterCode: `class Person {
  constructor(firstName, lastName) {
    
  }

  getFullName() {
    
  }
}

function createPerson(first, last) {
  
}
`,
        solution: `class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getFullName() {
    return this.firstName + " " + this.lastName;
  }
}

function createPerson(first, last) {
  return new Person(first, last);
}`,
        testCases: [
          {
            inputs: [],
            expected: 'person_instance',
            description: 'Should return a Person instance with getFullName()',
            isSpecialTest: true,
            testCode: `
              const p = createPerson('Ada', 'Lovelace');
              const hasMethod = p && typeof p.getFullName === 'function';
              const full = hasMethod ? p.getFullName() : null;
              return { passed: full === 'Ada Lovelace', actual: full, expected: 'Ada Lovelace' };
            `
          }
        ]
      },
      {
        id: 'class-2',
        number: 2,
        task: 'Create a class `Rectangle` with a constructor `(width, height)` and a getter `area` that returns `width * height`. Then write a function `createRectangle(width, height)` that returns a new Rectangle.',
        hint: 'Use `get area() { return this.width * this.height; }`',
        functionName: 'createRectangle',
        starterCode: `class Rectangle {
  constructor(width, height) {
    
  }

  get area() {
    
  }
}

function createRectangle(width, height) {
  
}
`,
        solution: `class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.width * this.height;
  }
}

function createRectangle(width, height) {
  return new Rectangle(width, height);
}`,
        testCases: [
          {
            inputs: [],
            expected: 'rectangle_area',
            description: 'Rectangle.area should return width * height',
            isSpecialTest: true,
            testCode: `
              const r = createRectangle(3, 4);
              const ok = r && r.area === 12;
              return { passed: ok, actual: r ? r.area : null, expected: 12 };
            `
          }
        ]
      },
      {
        id: 'class-3',
        number: 3,
        task: 'Write a function `createIdGeneratorClass()` that returns a class `IdGenerator` with a static method `next()` that returns an increasing number each time it is called.',
        hint: 'Use a counter in the outer function, then a class with `static next()` that increments and returns it.',
        functionName: 'createIdGeneratorClass',
        starterCode: `function createIdGeneratorClass() {
  // return a class IdGenerator
  
}
`,
        solution: `function createIdGeneratorClass() {
  let current = 0;
  return class IdGenerator {
    static next() {
      current += 1;
      return current;
    }
  };
}`,
        testCases: [
          {
            inputs: [],
            expected: 'id_generator',
            description: 'Static next() should return consecutive numbers',
            isSpecialTest: true,
            testCode: `
              const IdGenerator = createIdGeneratorClass();
              if (typeof IdGenerator !== 'function') {
                return { passed: false, actual: typeof IdGenerator, expected: 'class/function' };
              }
              if (typeof IdGenerator.next !== 'function') {
                return { passed: false, actual: typeof IdGenerator.next, expected: 'function' };
              }
              const a = IdGenerator.next();
              const b = IdGenerator.next();
              return { passed: typeof a === 'number' && b === a + 1, actual: [a, b], expected: 'two consecutive numbers' };
            `
          }
        ]
      }
    ]
  },


  // ==================== LESSON 12: DOM ====================
  {
    id: 'lesson-12',
    lessonNumber: 12,
    title: 'DOM: Working with Elements',
    slug: 'dom',
    content: `
The **DOM** (Document Object Model) is how JavaScript interacts with a web page.

In real websites you might do things like:

\`\`\`javascript
const title = document.querySelector('h1');
title.textContent = "New Title";
title.classList.toggle('active');
\`\`\`

In this lesson, we will practice DOM-style operations using **simulated element objects** (so it still runs inside this app).
    `,
    exercises: [
      {
        id: 'dom-1',
        number: 1,
        task: 'Write a function `setText(element, text)` that sets `element.textContent` to `text` and returns the new textContent.',
        hint: 'Set element.textContent = text; then return element.textContent;',
        functionName: 'setText',
        starterCode: `function setText(element, text) {
  
}
`,
        solution: `function setText(element, text) {
  element.textContent = text;
  return element.textContent;
}`,
        testCases: [
          { inputs: [{ textContent: '' }, 'Hello'], expected: 'Hello', description: 'Should set and return textContent' },
          { inputs: [{ textContent: 'Old' }, 'New'], expected: 'New', description: 'Should overwrite existing textContent' }
        ]
      },
      {
        id: 'dom-2',
        number: 2,
        task: 'Write a function `toggleClass(element, className)` that toggles a class using `element.classList.toggle(className)`.',
        hint: 'Use element.classList.toggle(className);',
        functionName: 'toggleClass',
        starterCode: `function toggleClass(element, className) {
  
}
`,
        solution: `function toggleClass(element, className) {
  element.classList.toggle(className);
}`,
        testCases: [
          {
            inputs: [],
            expected: 'toggle_add',
            description: 'Should add class when it does not exist',
            isSpecialTest: true,
            testCode: `
              const element = {
                classList: {
                  _classes: [],
                  contains(c) { return this._classes.includes(c); },
                  toggle(c) {
                    if (this.contains(c)) this._classes = this._classes.filter(x => x !== c);
                    else this._classes.push(c);
                  }
                }
              };
              toggleClass(element, 'active');
              return { passed: element.classList.contains('active'), actual: element.classList._classes, expected: ['active'] };
            `
          },
          {
            inputs: [],
            expected: 'toggle_remove',
            description: 'Should remove class when it exists',
            isSpecialTest: true,
            testCode: `
              const element = {
                classList: {
                  _classes: ['active'],
                  contains(c) { return this._classes.includes(c); },
                  toggle(c) {
                    if (this.contains(c)) this._classes = this._classes.filter(x => x !== c);
                    else this._classes.push(c);
                  }
                }
              };
              toggleClass(element, 'active');
              return { passed: !element.classList.contains('active'), actual: element.classList._classes, expected: [] };
            `
          }
        ]
      },
      {
        id: 'dom-3',
        number: 3,
        task: 'Write a function `setDataAttribute(element, key, value)` that sets `element.dataset[key] = value` and returns the dataset object.',
        hint: 'element.dataset[key] = value; return element.dataset;',
        functionName: 'setDataAttribute',
        starterCode: `function setDataAttribute(element, key, value) {
  
}
`,
        solution: `function setDataAttribute(element, key, value) {
  element.dataset[key] = value;
  return element.dataset;
}`,
        testCases: [
          { inputs: [{ dataset: {} }, 'userId', '42'], expected: { userId: '42' }, description: 'Should add dataset key/value' },
          { inputs: [{ dataset: { role: 'admin' } }, 'role', 'user'], expected: { role: 'user' }, description: 'Should overwrite existing dataset value' }
        ]
      },
      {
        id: 'dom-4',
        number: 4,
        task: 'Write a function `appendChild(parent, child)` that pushes the child into `parent.children` and returns the new number of children.',
        hint: 'parent.children.push(child); return parent.children.length;',
        functionName: 'appendChild',
        starterCode: `function appendChild(parent, child) {
  
}
`,
        solution: `function appendChild(parent, child) {
  parent.children.push(child);
  return parent.children.length;
}`,
        testCases: [
          { inputs: [{ children: [] }, { tag: 'span' }], expected: 1, description: 'Should add one child' },
          { inputs: [{ children: [{ tag: 'p' }] }, { tag: 'span' }], expected: 2, description: 'Should add to existing children' }
        ]
      }
    ]
  }
];
    