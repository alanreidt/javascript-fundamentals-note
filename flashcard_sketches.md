# Flashcard sketches

## Execution context/stack
1. Execution stack purpose
A *Execution stack* is used to track Execution contexts.
The running execution context is always the top element of this stack.

2. Execution context and stack in action (-)
A new execution context is created whenever control is transferred from the executable code associated with the currently running execution context to executable code that is not associated with that execution context. The newly created execution context is pushed onto an Execution stack and becomes the running execution context.

Transition of the running execution context status among execution contexts usually occurs in stack-like last-in/first-out manner.

## Browser Concurrency Model
1. Blocking of the Stack
As JavaScript has only one Stack (it's single threaded), it's easy to block program execution with a long processing operation. It would be a problem browsers, 'cause they use the main thread too.

```javascript
// As JavaScript has only one Stack (it's single threaded),
// it's easy to block program execution with a long processing operation.
// It would be a problem browsers, 'cause they use the main thread too.
```

```javascript
button.addEventListener("click", (event) =>{
  while (true);
});
```

2. Concurrency Model Purpose
The purpose of the Concurrency Model is to avoid blocking of the Stack.

```javascript
// The purpose of the Concurrency Model is to avoid blocking of the Stack.
```

```javascript
function loop() {
  setTimeout(loop, 0);
}

button.addEventListener("click", (event) =>{
  loop();
});
```

3. Browser Concurrency Model
Browser Concurrency Model in JavaScript is based on event loop, message queue and Web API services.

```javascript
// Concurrency Model in JavaScript is based on event loop, message queue and Web API services.
```

4. Concurrency in browsers
Browsers delegate performance of time-consuming operations to the Web APIs. The result is then transferred to the Message queue. When Execution Stack becomes empty, the event loop invokes the correlated callback and operation achieves its end.

```javascript
// Browsers delegate performance of time-consuming operations to the Web APIs.
// The result is then transferred to the Message queue.
// When Execution Stack becomes empty, the event loop invokes the correlated callback
// and operation achieves its end.
```

## Lexical Environment
1. LE representation
- *Environment Record* – an object that stores all local variables as its properties (and some other information like the value of `this`).
- A reference to the outer Lexical Environment, the one associated with the outer code.

2. LE purpose
A Lexical Environment is used to define the association of identifiers to specific variables and functions based upon the lexical nesting structure of code.

```javascript
// A Lexical Environment is used to define
// the association of identifiers to specific variables
// and functions based upon the lexical nesting structure of code.
```

3. LE in general
A Lexical Environment is a mechanism, which allows to define the association of identifiers to variables based on the lexical nesting structure of code.

```javascript
// A Lexical Environment is a mechanism,
// which allows to define the association of identifiers to variables
// based on the lexical nesting structure of code.
```

## Program Execution
1. Lexical Environment and Execution Context creation
A new Execution Context and, hence, a new Lexical Environment are created at the start of each code block (function, loop, raw block, etc.) execution.

```javascript
// A new Execution Context and, hence, a new Lexical Environment are created
// at the start of each code block (function, loop, raw block, etc.) execution.
```

```javascript
if (condition) {
  // some code
}

say();

function say() {
  // some code
}
```

2. Identifiers association phases
- Pre-population phase: at the beginning of execution, all `var`s' identifiers are associated with `undefined`; `let`s and `const`s — with `<uninitialized>` state; function declarations — with their body;
- Assignment phase: during the execution, the variables are assigned with actual values;

```javascript
// - Pre-population phase: at the beginning of a code block execution,
// all `var`s' identifiers are associated with `undefined`;
// `let`s and `const`s — with `<uninitialized>` state;
// function declarations — with their body;
//
// - Assignment phase: during the execution,
// the variables are assigned with actual values;
```

```javascript
var name = "Elizabeth";
let surname = "Clark";

const fullName = composeFullName(name, surname);

function composeFullName(name, surname) {
  return `${name} ${surname}`;
}
```

Program execution example:
```javascript
console.log(d);

function c(){
  d = "d";
}

c();

// > ReferenceError
```

3. Variable without declaration
The variable without declaration would be assigned to the global object in non-strict code block.

```javascript
// A variable without declaration would be assigned to the global object
// in the non-strict code block.
```

```javascript
console.log(c());
console.log(d);

function c(){
  d = "d";

  return "called from c";
}

// > called from c
// > d
```

An assignment to the undeclared variable would throw a Reference Error in the strict code block.

```javascript
// An assignment to the undeclared variable
// would throw a Reference Error in the strict code block.
```

```javascript
console.log(c());
console.log(d);

function c(){
  "use strict";

  d = "d";

  return "called from c";
}

// > ReferenceError
```

4. Immediate Syntax Errors
Syntax errors are caught at the compilation phase.

```javascript
// Syntax errors are caught at the compilation phase.
```

```javascript
function saySomething() {
  let greeting = "Hello";

  console.log(greeting);

  {
    console.log("Param");

    let greeting = "Hi";

    console.log(greeting);

    greeting = ."Howdy";
  }

  console.log("Yok");
}

saySomething();

// > SyntaxError
```

## A value of this identifier
