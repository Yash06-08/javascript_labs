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
  ],
  'dom': [
    {
      title: 'DOM-style example',
      description: 'Simulate updating an element object like you would in the DOM.',
      code: 'const el = { textContent: "", classList: { _classes: [], toggle(c) { if (this._classes.includes(c)) this._classes = this._classes.filter(x => x !== c); else this._classes.push(c); } } };\nel.textContent = "Hello DOM";\nel.classList.toggle("active");\nconsole.log(el.textContent);\nconsole.log(el.classList._classes.join(","));\n'
    }
  ],
  'classes': [
    {
      title: 'Classes example',
      description: 'Create an instance and call a method.',
      code: 'class Person {\n  constructor(first, last) { this.first = first; this.last = last; }\n  getFullName() { return this.first + " " + this.last; }\n}\nconst p = new Person("Ada", "Lovelace");\nconsole.log(p.getFullName());\n'
    }
  ]
};

export default examples;
