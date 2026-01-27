// Runnable examples per lesson slug
// These are merged in Lesson.jsx if a lesson does not define its own examples
const examples = {
  'hello-world': [
    {
      title: 'Hello World example',
      description: 'A single line program that prints a message.',
      code: 'console.log("Hello World!");\n'
    }
  ],
  'variables': [
    {
      title: 'Variables example',
      description: 'Show a const that stays the same and a let that changes.',
      code: 'const language = "JavaScript";\nlet users = 1;\nusers = users + 1;\nconsole.log(language);\nconsole.log(users);\n'
    }
  ],
  'data-types': [
    {
      title: 'Data types example',
      description: 'Print a string, a number, and a boolean.',
      code: 'const msg = "I am learning";\nconst level = 1;\nconst isBeginner = true;\nconsole.log(msg);\nconsole.log(level);\nconsole.log(isBeginner);\n'
    }
  ]
};

export default examples;
