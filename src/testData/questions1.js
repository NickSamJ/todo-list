export const questions1 = [
  {
    id: 1,
    title: 'What result will be shown in the console?',
    question: ` function sayHi() {
            console.log(name);
            console.log(age);
            var name = "Lydia";
            let age = 21;
        }
  sayHi();`,
    answers: {
      a: 'Lydia and undefined',
      b: 'Lydia and ReferenceError',
      c: 'ReferenceError and 21',
      d: 'undefined and ReferenceError',
    },
    correctAnswers: ['d'],
  },
  {
    id: 2,
    title: 'What result will be shown in the console?',
    question: `for (var i = 0; i < 3; i++) {
            setTimeout(() => console.log(i), 1);
        }
        
for (let i = 0; i < 3; i++) {
        setTimeout(() => console.log(i), 1);
    }`,
    answers: {
      a: '0 1 2 and 0 1 2',
      b: '0 1 2 and 3 3 3',
      c: 'C: 3 3 3 and 0 1 2',
    },
    correctAnswers: ['c'],
  },
  {
    id: 3,
    title: 'Check correct result',
    question: `+true;
!"Lydia";`,
    answers: {
      a: '1 and false',
      b: 'false and NaN',
      c: 'false and false',
    },
    correctAnswers: ['a'],
  },
  {
    id: 4,
    title: 'What result will be shown in the console?',
    question: `const shape = {
            radius: 10,
            diameter() {
        return this.radius * 2; 
    },
perimeter: () => 2 * Math.PI * this.radius };
console.log(shape.diameter()); 
console.log(shape.perimeter());`,
    answers: {
      a: '20 and 62.83185307179586',
      b: '20 and NaN',
      c: '20 and 63',
      d: 'NaN and 63',
    },
    correctAnswers: ['b'],
  },
  {
    id: 5,
    title: 'Check correct statement',
    question: `const bird = {
            size: "small"
        };
const mouse = {
    name: "Mickey",
    small: true
};`,
    answers: {
      a: ' mouse.bird.size is not valid',
      b: 'mouse[bird.size] is not valid',
      c: 'mouse[bird["size"]] is not valid',
      d: 'All of them are valid',
    },
    correctAnswers: ['a'],
  },
  {
    id: 6,
    title: 'What result will be shown in the console?',
    question: `let c = { greeting: "Hey!" };
let d;
d = c;
c.greeting = "Hello"; console.log(d.greeting);`,
    answers: {
      a: 'Hello',
      b: 'Hey!',
      c: 'undefined',
      d: 'ReferenceError',
      e: 'TypeError',
    },
    correctAnswers: ['a'],
  },
  {
    id: 7,
    title: 'What result will be shown in the console?',
    question: `let a = 3;
let b = new Number(3);
let c = 3;

console.log(a == b); 
console.log(a === b); 
console.log(b === c);`,
    answers: {
      a: 'true false true',
      b: 'false false true',
      c: 'true false false',
      d: 'false true true',
    },
    correctAnswers: ['c'],
  },
  {
    id: 8,
    title: 'What result will be shown in the console?',
    question: `function bark() {
            console.log("Woof!"); 
        }
bark.animal = "dog";`,
    answers: {
      a: 'Nothing, this is totally fine!',
      b: 'SyntaxError. You cannot add properties to a function this way.',
      c: '"Woof" gets logged',
    },
    correctAnswers: ['a'],
  },
  {
    id: 9,
    title: 'What result will be shown in the console?',
    question: `function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName; 
}
const lydia = new Person("Lydia", "Hallie");
const sarah = Person("Sarah", "Smith");
console.log(lydia);
console.log(sarah);`,
    answers: {
      a: 'Person {firstName: "Lydia", lastName: "Hallie"} and undefined',
      b:
        'Person {firstName: "Lydia", lastName: "Hallie"} and Person {firstName: "Sarah", lastName: "Smith"}',
      c: 'Person {firstName: "Lydia", lastName: "Hallie"} and {}',
      d: 'Person {firstName: "Lydia", lastName: "Hallie"} and ReferenceError',
    },
    correctAnswers: ['a'],
  },
  {
    id: 10,
    title: 'What result will be?',
    question: `function sum(a, b) {
            return a + b; 
        }
sum(1, "2");`,
    answers: {
      a: 'NaN',
      b: 'TypeError',
      c: '"12"',
      d: '3',
    },
    correctAnswers: ['c'],
  },
  {
    id: 11,
    title: 'What result will be shown in the console?',
    question: `let number = 0;
console.log(number++);
console.log(++number); console.log(number);`,
    answers: {
      a: '1 1 2',
      b: '1 2 2',
      c: '0 2 2',
      d: '0 1 2',
    },
    correctAnswers: ['a'],
  },
  {
    id: 12,
    title: 'What result will be shown in the console?',
    question: `function checkAge(data) {
    if (data === { age: 18 }) {
            console.log("You are an adult!");
    } else if (data == { age: 18 }) { 
            console.log("You are still an adult.");
    } else {       
        console.log(\`Hmm.. You don't have an age I guess\`); 
    }
}`,
    answers: {
      a: 'You are an adult!',
      b: 'You are still an adult.',
      c: "Hmm.. You don't have an age I guess",
    },
    correctAnswers: ['c'],
  },
  {
    id: 13,
    title: 'What result will be shown in the console?',
    question: `function getAge(...args) {
    console.log(typeof args); 
}
getAge(21);`,
    answers: {
      a: '"number"',
      b: '"array"',
      c: '"object"',
      d: '"NaN"',
    },
    correctAnswers: ['c'],
  },
  {
    id: 14,
    title: 'What result will be shown in the console?',
    question: `function getAge() {
    "use strict";
    age = 21; console.log(age);
} 
getAge();`,
    answers: {
      a: '21',
      b: 'undefined',
      c: 'ReferenceError',
      d: 'TypeError',
    },
    correctAnswers: ['c'],
  },
  {
    id: 15,
    title: 'What result will be shown in the console?',
    question: `const sum = eval("10*10+5");`,
    answers: {
      a: '105',
      b: '"105"',
      c: 'TypeError',
      d: '"10*10+5"',
    },
    correctAnswers: ['a'],
  },
  {
    id: 16,
    title: 'What result will be shown in the console?',
    question: `var num = 8;
var num = 10;
console.log(num);`,
    answers: {
      a: '8',
      b: '10',
      c: 'SyntaxError',
      d: 'ReferenceError',
    },
    correctAnswers: ['b'],
  },
  {
    id: 17,
    title: 'What result will be shown in the console?',
    question: `const obj = { a: "one", b: "two", a: "three" }; 
console.log(obj);`,
    answers: {
      a: '{ a: "one", b: "two" }',
      b: '{ b: "two", a: "three" }',
      c: '{ a: "three", b: "two" }',
      d: 'SyntaxError',
    },
    correctAnswers: ['c'],
  },
  {
    id: 18,
    title: 'What result will be shown in the console?',
    question: `const foo = () => console.log("First");
const bar = () => setTimeout(() => console.log("Second")); 
const baz = () => console.log("Third");
bar();
foo();
baz();`,
    answers: {
      a: 'First Second Third',
      b: 'First Third Second',
      c: 'Second First Third',
      d: 'Second Third First',
    },
    correctAnswers: ['b'],
  },
  {
    id: 20,
    title: 'What result will be shown in the console?',
    question: `<div onclick="console.log('first div')">
    <div onclick="console.log('second div')"> 
        <button onclick="console.log('button')"> Click!
        </button>
    </div>
</div>`,
    answers: {
      a: 'first div, second div, button',
      b: 'button',
      c: 'second div, first div',
    },
    correctAnswers: ['c'],
  },
  {
    id: 21,
    title: 'What result will be shown in the console?',
    question: `<div onclick="console.log('first div')">
    <div>
        <button >Click!</button>
    </div>
</div>`,
    answers: {
      a: 'first div',
      b: 'nothing',
      c: "Error: HTML element div doesn't have property onclick",
    },
    correctAnswers: ['a'],
  },
  {
    id: 22,
    title: 'What result will be shown in the console?',
    question: `const person = { name: "Lydia" };
function sayHi(age) {
    return \`\${this.name} is \${age}\`;
}

console.log(sayHi.bind(person, 21)()); 
console.log(sayHi.bind(person, 21));`,
    answers: {
      a: 'undefined is 21 Lydia is 21',
      b: 'function function',
      c: 'Lydia is 21 Lydia is 21',
      d: 'Lydia is 21 function',
    },
    correctAnswers: ['d'],
  },
  {
    id: 23,
    title: 'What result will be shown in the console?',
    question: `function sayHi() {
    return (() => 0)();
}
console.log(typeof sayHi());`,
    answers: {
      a: '"object"',
      b: '"number"',
      c: '"function"',
      d: '"undefined"',
    },
    correctAnswers: ['b'],
  },
  {
    id: 24,
    title: 'Falsy answers are:',
    question: `0;
new Number(0);
("");
(" ");
new Boolean(false);
undefined;
{}`,
    answers: {
      a: "0, '', undefined",
      b: "0, new Number(0), '', new Boolean(false), undefined",
      c: "0, '', new Boolean(false), undefined",
      d: "0, '', undefined, {}",
      e: 'All of them are falsy',
    },
    correctAnswers: ['a'],
  },
  {
    id: 25,
    title: 'What result will be shown in the console?',
    question: `(() => {
    let x, y; 
    try {
            throw new Error();
    } catch (x) {
        x = 1;
        y = 2; console.log(x);
    } 
    console.log(x); console.log(y);
})();`,
    answers: {
      a: '1 undefined 2',
      b: 'undefined undefined undefined',
      c: '1 1 2',
      d: '1 undefined undefined',
    },
    correctAnswers: ['a'],
  },
  {
    id: 26,
    title: 'What will function return?',
    question: `[[0, 1], [2, 3]].reduce((acc, cur) => {
    return acc.concat(cur);
}, [1, 2]);`,
    answers: {
      a: '[0, 1, 2, 3, 1, 2]',
      b: '[6, 1, 2]',
      c: '[1, 2, 0, 1, 2, 3]',
      d: '[1, 2, 6]',
    },
    correctAnswers: ['c'],
  },
];
