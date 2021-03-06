# JavaScript

## Expressions and Statements

Expression — is a line of code, which returns a value.

Statement — is a command, which performs some action.

## Use strict

Use strict statement enables restricted version of JavaScript.

Strict mode isn't just a subset: it intentionally has different semantics from normal code.

Strict mode is supported by all modern browsers. But, it's turned off in Browser console by default.

The mode can be enabled by specifying string "use strict" ('use strict') at the top (**before any line of code**) of an **appropriate** code block.

> Note: strict mode applies to entire scripts or to individual functions. It doesn't apply to block statements enclosed in `{}` braces; attempting to apply it to such contexts does nothing. `eval` code, Function code, event handler attributes, strings passed to `WindowTimers.setTimeout()`, and related functions are entire scripts, and invoking strict mode in them works as expected.

There is 2 blocks where you can declare use strict:

1. For the whole script.
But be careful — it isn't possible to blindly concatenate conflicting scripts.

2. For a function.

Also, it's worth to know that use strict is enabled by default for Classes and ES6 modules (import, export statements).

## Variables

There are two limitations on variable names in JavaScript:
1. The name must contain only letters, digits, or the symbols `$` and `_`.
2. The first character must not be a digit.

Case matters:

Variables named `apple` and `AppLE` are two different variables.

Non-Latin letters are allowed, but not recommended:
```javascript
let имя = '...';
let 我 = '...';
```

There is a [list of reserved words](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords), which cannot be used as variable names because they are used by the language itself.

For example: `let`, `class`, `return`, and `function` are reserved.

The code below gives a syntax error:
```javascript
let let = 5; // can't name a variable "let", error!
let return = 5; // also can't name it "return", error!
```

A variable name should have a clean, obvious meaning, describing the data that it stores.

### Ways to declare a variable and their differences
There are several ways to declare a variable in Javascript:
- Using no statement in non-strict mode,
- Using `var` statement,
- Using `let` statement,
- Using `const` statement.

#### No statement
Declaring a variable without any statement will create a global variable:
```js
name = 'Pete';

console.log('Pete'); // Pete
```

In strict mode you'll get an error:
```js
'use strict';

name = 'Pete'; // Error

console.log('Pete');
```

#### "var" statement
`var` is different from `let` and `const` in a few ways:

1. It's function scoped. `let` and `const` are block scoped on the other hand.
```js
function sayHi() {
  if (true) {
    var phrase = "Hello";
  }

  alert(phrase); // works
}

sayHi();
alert(phrase); // ReferenceError: phrase is not defined
```
2. It tolerates redeclarations.

If we declare the same variable with let twice in the same scope, that’s an error:
```js
let user;
let user; // SyntaxError: 'user' has already been declared
```

With var, we can redeclare a variable any number of times. If we use var with an already-declared variable, it’s just ignored:
```js
var user = "Pete";

var user = "John"; // this "var" does nothing (already declared)
// ...it doesn't trigger an error

alert(user); // John
```

3. `var` variables can be declared below their use.

`var` declarations are processed when the function starts (or script starts for globals).

In other words, `var` variables are defined from the beginning of the function, no matter where the definition is (assuming that the definition is not in the nested function).

So this code works:
```js
function sayHi() {
  phrase = "Hello";

  alert(phrase);

  var phrase;
}
sayHi();
```

…Or even this (remember, code blocks are ignored):
```js
function sayHi() {
  phrase = "Hello"; // (*)

  if (false) {
    var phrase;
  }

  alert(phrase);
}
sayHi();
```
People also call such behavior “hoisting” (raising), because all var are “hoisted” (raised) to the top of the function.

So in the example above, `if (false)` branch never executes, but that doesn’t matter. The var inside it is processed in the beginning of the function, so at the moment of (*) the variable exists.

### Notes
Describe behavior of variables: let, const (scope).

```js
let varName; // set to undefined
const varName; // SyntaxError
```

## Data types
There are 8 basic data types in JavaScript.
- `number` for numbers of any kind: integer or floating-point, integers are limited by `±(2^53 - 1)`.
- `bigint` is for integer numbers of arbitrary length.
- `string` for strings. A string may have zero or more characters, there’s no separate single-character type.
- `boolean` for `true/false`.
- `null` for unknown values – a standalone type that has a single value `null`.
- `undefined` for unassigned values – a standalone type that has a single value `undefined`.
- `object` for more complex data structures.
- `symbol` for unique identifiers.

The `typeof` operator allows us to see which type is stored in a variable.
- Two forms: `typeof x` or `typeof(x)`.
- Returns a string with the name of the type, like `"string"`.
- For `null` returns `"object"` – this is an error in the language, it’s not actually an object.
- For functions returns `"function"` – this is also an error, there’s no special “function” type in JavaScript. Functions belong to the object type. But typeof treats them differently, returning `"function"`. That also comes from the early days of JavaScript. Technically, such behavior isn’t correct, but can be convenient in practice.

## Type Conversions
The three most widely used type conversions are to string, to number, and to boolean.

**String Conversion** – occurs when we output something. Can be performed with `String(value)`. The conversion to string is usually obvious for primitive values.

**Numeric Conversion** – occurs in math operations. Can be performed with `Number(value)`.

<table>
<thead>
<tr>
<th>Value</th>
<th>Becomes…</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>undefined</code></td>
<td><code>NaN</code></td>
</tr>
<tr>
<td><code>null</code></td>
<td><code>0</code></td>
</tr>
<tr>
<td><code>true&nbsp;/&nbsp;false</code></td>
<td><code>1 / 0</code></td>
</tr>
<tr>
<td><code>string</code></td>
<td>The string is read “as is”, whitespaces from both sides are ignored. An empty string becomes <code>0</code>. An error gives <code>NaN</code>.</td>
</tr>
</tbody>
</table>
<br>

**Boolean Conversion** – occurs in logical operations. Can be performed with `Boolean(value)`.

<table>
<thead>
<tr>
<th>Value</th>
<th>Becomes…</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>0</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code>, <code>""</code></td>
<td><code>false</code></td>
</tr>
<tr>
<td>any other value</td>
<td><code>true</code></td>
</tr>
</tbody>
</table>
<br>

Most of these rules are easy to understand and memorize. The notable exceptions where people usually make mistakes are:
- `undefined` is `NaN` as a number, not `0`.
- `"0"` and space-only strings like `" "` are true as a boolean.

## Object to primitive conversion
The object-to-primitive conversion is called automatically by many built-in functions and operators that expect a primitive as a value.

There are 3 types (hints) of it:
- `"string"` (for alert and other operations that need a string)
- `"number"` (for maths)
- `"default"` (few operators, see below)

The specification describes explicitly which operator uses which hint.

> **No "boolean" hint**
>
> Please note – there are only three hints. It’s that simple.
>
> There is no “boolean” hint (all objects are true in boolean context) or anything else. And if we treat `"default"` and `"number"` the same, like most built-ins do, then there are only two conversions.

The conversion algorithm is:
1. Call `obj[Symbol.toPrimitive](hint)` if the method exists,
2. Otherwise if hint is `"string"`
- try `obj.toString()` and `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
- try `obj.valueOf()` and `obj.toString()`, whatever exists.

By default, a plain object has following `toString` and `valueOf` methods:
- The `toString` method returns a string "[object Object]".
- The `valueOf` method returns the object itself.

Here’s the demo:
```js
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```
So if we try to use an object as a string, like in an alert or so, then by default we see `[object Object]`.

And the default `valueOf` is mentioned here only for the sake of completeness, to avoid any confusion. As you can see, it returns the object itself, and so is ignored. Don’t ask me why, that’s for historical reasons. So we can assume it doesn’t exist.

In practice, it’s often enough to implement only `obj.toString()` as a “catch-all” method for all conversions that return a “human-readable” representation of an object, for logging or debugging purposes.

### The "default" hint
Occurs in rare cases when the operator is “not sure” what type to expect.

For instance, binary plus `+` can work both with strings (concatenates them) and numbers (adds them), so both strings and numbers would do. So if a binary plus gets an object as an argument, it uses the `"default"` hint to convert it.

Also, if an object is compared using == with a string, number or a symbol, it’s also unclear which conversion should be done, so the `"default"` hint is used.
```js
// binary plus uses the "default" hint
let total = obj1 + obj2;

// obj == number uses the "default" hint
if (user == 1) { ... };
```
The greater and less comparison operators, such as `<` `>`, can work with both strings and numbers too. Still, they use the `"number"` hint, not `"default"`. That’s for historical reasons.

In practice though, we don’t need to remember these peculiar details, because all built-in objects except for one case (Date object, we’ll learn it later) implement `"default"` conversion the same way as `"number"`. And we can do the same.

### Notes
Object is converted to the string `'object Object'`. Array is converted to an empty string `''`.

As a result:
```js
console.log({} + {}) // NaN (converted to '', then to NaN)
console.log([] + []) // '' (concatenated 2 empty strings)
```

# Basic operators
Usually, the plus operator `+` sums numbers.

But, if the binary `+` is applied to strings, it merges (concatenates) them:
```js
let s = "my" + "string";
alert(s); // mystring
```

Note that if any of the operands is a string, then the other one is converted to a string too.

For example:
```js
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

See, it doesn’t matter whether the first operand is a string or the second one.

## Comparisons
### Boolean is the result
All comparison operators return a boolean value.

### String comparison
To see whether a string is greater than another, JavaScript uses the so-called “dictionary” or “lexicographical” order.

In other words, strings are compared letter-by-letter.

For example:
```js
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true
```

Equality operator (`==`) and other comparisons (`<` `>`, `<=` `>=`) convert **different types** to a number type.

For example:
```js
alert( '2' > 1 ); // true, string '2' becomes a number 2
alert( '01' == 1 ); // true, string '01' becomes a number 1
```

Strict equality operator (`===`) compares operands without conversion.

Objects are compared by a reference for both comparison operators.

There is a special case for a non-strict equality (and only for it) check with `null` and `undefined`: They are equal to each other, but not any other value.

For example:
```js
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) true
```

Mathematically, that’s strange. The last result states that "`null` is greater than or equal to zero", so in one of the comparisons above it must be `true`, but they are both `false`.

The reason is that an equality check `==` and comparisons `>` `<` `>=` `<=` work differently. Comparisons convert `null` to a number, treating it as `0`. That’s why (3) `null >= 0` is `true` and (1) `null > 0` is `false`.

On the other hand, the equality check `==` for `undefined` and `null` is defined such that, without any conversions, they equal each other and don’t equal anything else. That’s why (2) `null == 0` is `false`.

## Preface
The purpose of this article is to describe the essence of how JS works in an actual environment (mostly in a browser).

I will only touch the high level abstraction of the field (from the JavaScript code level, not diving into machine code level details), which will help you detect errors and understand them, if they already occurred.

## How does it work?
!!!NOT READY

Computers don't understand JS, browsers do.

They do it by using JS engines — program, which translates JS into the machine code.

JS engines acts like interpreter (translate JS into machine code on the go, line by line) approach, because of usage specifics — browsers are the main environment for the JS, and they don't have the ability to wait until JS will be fully compiled, they need to act right away.

Actually JS engines today acts like a combination of interpreter and compiler (JIT-compilation).

And many other underlying processes depend on and exist because of that feature of JS — Execution context, Execution stack, Execution process phases, Lexical Environment, etc.

To analyze Scope and correlated, it's easier to treat program processing by JS, as Compiler.

Take, for example:

### Syntax Errors from the Start
Consider this program:
```javascript
var greeting = "Hello";

console.log(greeting);

greeting = ."Hi";
// SyntaxError: unexpected token .
```

In fact, the only way the JS engine could know about the syntax error on the third line, before executing the first and second lines, is by the JS engine first parsing the entire program before any of it is executed.

### Early Errors
Next, consider:
```javascript
console.log("Howdy");

saySomething("Hello","Hi");
// Uncaught SyntaxError: Duplicate parameter name not
// allowed in this context

function saySomething(greeting,greeting) {
    "use strict";
    console.log(greeting);
}
```

## Execution context
An *Execution context* is a specification device that is used to track the runtime evaluation of code by an ECMAScript implementation.

An Execution context can be represented as an object with the next fields:
- Code evaluation state: contains information (state) required to perform, suspend and resume evaluation of the code (for example, current line of the code);
- Function: equals to null or to a function object;
- Realm;
- LexicalEnvironment;
- VariableEnvironment;

LexicalEnvironment and VariableEnvironment are equal at the start of the execution.

A new execution context is created whenever control is transferred from the executable code associated with the currently running execution context to executable code that is not associated with that execution context. The newly created execution context is pushed onto an Execution stack and becomes the running execution context.

**TODO**:
- Clarify [Specification](http://www.ecma-international.org/ecma-262/6.0/#sec-execution-contexts):
What the difference between LexicalEnvironment and VariableEnvironment components of execution context?

## Execution stack
*Execution stack* is used to track Execution contexts.

The running Execution context is always the top element of this stack.

Transition of the running Execution context status among Execution contexts usually occurs in stack-like last-in/first-out manner.

## Concurrency model (Event Loop)
JavaScript is a single-threaded programming language — this correlates to the presence of only one Execution Stack (in order to avoid racing conditions for environment resources) — that means it can only perform one instruction at a time.

But there are time-consuming operations. such as a network request or some heavy animation calculations and etc., which can block the thread easily, preventing other code from executing.

It may not be such a huge problem elsewhere, but for the browser this means that it won't be able to update elements on a web-page or to react to user events, 'cause it all depend on JavaScript.

> Note: the browser calls Rendering functions each 60ms.

In order to avoid this, browsers use *Concurrency Model*.

JavaScript has the Concurrency model based on an Event loop, that is responsible for executing code, collecting and processing events, and executing queued sub-tasks. This model is quite different from models in other languages like C and Java.

A browser, in order to avoid blocking of the stack, handles all time-consuming requests through Web API services. the *Web API services* are programs, written in some programming language, like C++.

The Web API services on their hand, perform required actions — request data through the network, for example (it works as a separated thread) — and then delegate the resulting message (the request's resulting data and a callback function) to a Message Queue.

The *Message Queue* is a list of messages to be processed. Each message has an associated function which gets called in order to handle the message.

When Execution Stack becomes empty, an Event Loop starts to process Messages from a Message queue, starting from the oldest one: it removes the Message from the Queue and calls its corresponding function with the Message as an input parameter. As always, calling a function creates a new Execution Context for that function's use.

The processing of functions continues until the Execution stack is once again empty. Then, the Event loop will process the next Message in the Queue (if there is one).

Which gives us an Asynchronous-like code.

### requestAnimationFrame
Queues the callback in connection with page rendering (actually, before the render), usually 60 frames a second (normal frequency of a display). `setTimeout` tasks in comparison, run every time the execution stack becomes empty, so doing things, that a user can't see.

## Microtasks
### Message queue tasks
An Event loop executes only one task, if it queues a new task, the Event loop places it at the end of a Stack and proceeds its way until the next lap.

### Animation callbacks (requestAnimationFrame)
An Event loop executes each of queued tasks, places new tasks at the end of a Stack and proceeds its way until the next lap.

### Microtasks
An Event loop executes all of queued tasks, including every new task, until the job is done. Then it proceeds its way.

### Notes:
User click and manual click events are handled differently.

This, will set only the last transform value:
```js
button.addEventListener('click', () => {
  box.style.transform = 'translateX(1000px)';
  box.style.transition = 'transform 1s ease-in-out';
  box.style.transform = 'translateX(500px)';
})
```

A setTimeout function correlates to Web API and hence is executed asynchronously. And because of that, it's time (used as a second parameter) means the minimum delay after which the message will actually be pushed into the queue.

> Note: Worth thing to notice, that each message is processed completely before any other message is processed.
So, it's a good practice to split your messages into small pieces of code.

> Note: The event loop got its name because of how it's usually implemented, which usually resembles:
>
> ```javascript
> while (queue.waitForMessage()) {
>   queue.processNextMessage()
> }
> ```
>
> queue.waitForMessage() waits synchronously for a message to arrive (if one is not already available and waiting to be handled).

> Note: A code, which is ran through an Execution Stack directly, is called *Synchronous*. And that, which makes a path through Message queue — *Asynchronous*. Because, it's actually handled by some other thread (like Web API) and is performed at the same time, as operations in the Stack is performed.

## Lexical Environment
A *Lexical Environment* is a specification type used to define the association of identifiers to specific variables and functions based upon the lexical nesting structure of ECMAScript code.

A Lexical Environment is associated with some specific syntactic structure of ECMAScript code such as a FunctionDeclaration, a BlockStatement, or a Catch clause of a TryStatement and a new Lexical Environment is created each time such code is evaluated.

A Lexical Environment can be represented as an object with two parts:
1. *Environment Record* – an object that stores all local variables as its properties (and some other information like the value of `this`).
2. A reference to the outer Lexical Environment, the one associated with the outer code.

A “variable” is just a property of the special internal object, Environment Record. “To get or change a variable” means “to get or change a property of that object”.

A Lexical Environment, as a usual object, stays in memory until there are references to it.

> Note: But this is different during debugging in V8 engine. Be careful.

### Types of environment
There are some a little bit different "types" of Lexical Environment: global environment, function environment and module environment.

#### Global environment
*global environment* is a Lexical Environment, associated with the whole script.

It has next differences with the "usual" Lexical Environment:
1. Its Environment Record stores reference to global object, as a value of `this` identifier. All variables declared inside the script are assigned to the global object.
2. And its Outer Lexical Environment reference points to `null`.

#### Function environment
A *function environment* is a Lexical Environment, which corresponds to the invocation of an ECMAScript function object.

The differences with the "usual" Lexical Environment are:
1. A function environment may establish a new `this` binding. It also captures the state necessary to support `super` method invocations.
2. A function environment takes reference to the outer Lexical Environment from a function object hidden property `[[Environment]]`.

All functions remember the Lexical Environment in which they were **created** (declared and initialized). They keeps the reference to the Lexical Environment in the hidden property named `[[Environment]]`.

That’s how a function remembers where it was created, no matter where it’s called. The `[[Environment]]` reference is set once and forever at a function creation time.

**Notes**:

Lexical Environment — object associated with current running part of the program and contains local variables and value of this as its properties, and reference to the outer lexical Environment (which it takes from hidden Environment property).

Environment always depends on where this code block was created.

A module environment is a Lexical Environment that contains the bindings for the top level declarations of a Module. It also contains the bindings that are explicitly imported by the Module. The outer environment of a module environment is a global environment.

**Object property access example**:
```javascript
'use strict';

function makeUser() {
  return {
    name: "John",
    ref: this
  };
};

let user = makeUser();

console.log(user.ref); // undefined (taken from function LE)
```

```javascript
'use strict';

function makeUser() {
  return {
    name: "John",
    ref: this
  };
};

let user = new makeUser(); // !!!

console.log(user.ref); // [object Object]
```

## Closure
A *Closure* is a function, which has access to the outer variables. In JavaScript every function is a closure.

Closures are frequently used in JavaScript for object data privacy, in event handlers and callback functions, and in partial applications, currying, and other functional programming patterns.

### How to use a closure
To use a closure, define a function inside another function and expose it. To expose a function, return it or pass it to another function.

The inner function will have access to the variables in the outer function scope, even after the outer function has been returned (it'll have a reference to the outer function's LE).

```js
const createObjectWithSecret = (secret) => {
  return {
    getSecret: () => secret
  };
};

test('Closure for object privacy.', assert => {
  const msg = '.getSecret() should have access to the closure.';
  const expected = 1;
  const objWithSecret = createObjectWithSecret(1);

  const actual = objWithSecret.getSecret();

  try {
    assert.ok(secret, 'This throws an error.');
  } catch (e) {
    assert.ok(true, `The secret var is only available
      to privileged methods.`);
  }

  assert.equal(actual, expected, msg);
  assert.end();
});
```

## Program execution
It's an important thing to understand how program is executed in JavaScript, this will help you to grasp *Hoisting* and detect errors in the code, correlated to variables.

In the essence, the section will show you how JS engines use a Lexical Environment, an Execution Context and Execution Stack during evaluation of a program.

There are 2 phases of a program execution: the Creation phase and the Execution phase.

### Creation phase
During that phase, an Execution Context with a Lexical Environment are created and the Environment Record is pre-populated with all identifiers (variables, functions, etc.) of the context. Then the Execution Context is put into Execution Stack.

Variables are initialized first, then functions (so that a function would rewrite the variable with the same name). Function declarations are declared and initialized (function name and body are stored in the memory). Variables (including function expressions, classes expressions, etc.) too, but: `var` variables are assigned with `undefined` value, `let` and `const` variables with `uninitialized` state.

The process is called the **Hoisting**. 'Cause, so-called action can help you visualize what is happening.

**Notes**:

[Additional examples are here](./hoisting_summary.js)

Describe the behavior of typeof operator.

### Execution phase
During this phase, execution of the code happens. Code is evaluated line by line. And every necessary execution information is stored in the Execution Context (current line of the code, for example).

Identifiers are initialized (with actual values), re-assigned and accessed only when according statements are reached.

When assignment of undeclared variable is encountered in non-strict mode — a new global variable is created; in strict mode — Reference Error is thrown.

The next example verifies the assignment happens during that stage:
```javascript
console.log(d);
// > Uncaught ReferenceError: d is not defined

d = 'd';
```

```javascript
d = 'd';

console.log(d);
// > d
```

When a code block is encountered, a something more interesting happens — current evaluation of the code is paused, and the whole process, described here, repeats for that code block:
- During the compilation phase, an Execution Context and everything correlated are created and put on top of the Execution Stack.
- On the execution phase — the code is executed, an information of the evaluation is stored again and if another code block is encountered — the process repeats for it too.

> Note: By the code block I mean each syntactic structure of ECMAScript code, each evaluation of which creates a new Execution Context (and a Lexical Environment), such as: a FunctionDeclaration, a BlockStatement, or a Catch clause of a TryStatement.

The example should help:
```javascript
function saySomething() {
  let greeting = "Hello";

  {
    greeting = "Howdy";  // error comes from here

    let greeting = "Hi";

    console.log(greeting);
  }
}

saySomething();
// ReferenceError: Cannot access 'greeting' before
// initialization
```

### Examples:

#### Global variable declaration:
```javascript
console.log(d);
// > Uncaught ReferenceError: d is not defined

function c(){
  d = 'd';
}
```

```javascript
console.log(c());
// > called from c
console.log(d);
// > d

function c(){
  d = 'd';
  return 'called from c';
}
```

## Immediate Syntax Errors
Before we end with the program execution topic, there something needs to be said about immediate Syntax Errors.

They occur, before any execution of code, and it seems, that it dramatically contradicts to everything that was said before.

For example, here, the SyntaxError will occur before execution of 1st and 2nd lines:
```javascript
var greeting = "Hello";

console.log(greeting);

greeting = ."Hi";
// SyntaxError: unexpected token .
```

The thing is I've described program execution process from a high level abstraction. Using the abstraction you can look at your JavaScript code and detect values of variables at each line of the code, without the need to dive deeper.

And what actually happens with your code is much more complicated. The process includes compilation stage and then execution stage, and everything that was said above just describes how a machine code structure would look like, after compilation.

But to understand this particular case, you can just remember, the Syntax Error detection happens at the compilation stage of the code — before the process that was described in the previous section.

### Examples:
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
// > Uncaught SyntaxError: Unexpected token '.'
```

```javascript
function saySomething() {
  let greeting = "Hello";

  console.log(greeting);

  {
    console.log("Param");

    greeting = "Howdy";  // error comes from here

    let greeting = "Hi";

    console.log(greeting);
  }

  console.log("Yok");
}

saySomething();
// > Hello
// > Param
// > Uncaught ReferenceError
```

## A value of this identifier
There are only 2 types of the Lexical Environment, which specify a value of `this` identifier:
- the global environment
- the function environment (except an arrow function's)

In the global environment, `this` identifier refers to the global object, no matter what mode (strict/non-strict) you use. It's the `window` object inside a browser.

The value of `this` identifier inside the function environment depends on how the corresponding function object was called (invoked).

There are 4 types of the invocation:
- Simple invocation: `myFunction()`
- Object method invocation: `myObject.myFunction()`
- Constructor invocation: `new myFunction()`
- DOM event handler invocation: `document.addEventListener('click', myFunction)` or `<button onclick="myFunction()"></button>`

Or, it can be bound manually, using `bind()`, `call()` or `apply()` methods.

### Simple invocation
In the case of a simple function invocation, `this` will point out to the global object:
```javascript
function myFunction() {
  return this === window;
}

console.log(myFunction()); // true
```

But, the result is different, if we use a `strict mode` statement.

In this case, `this` will be equal to `undefined`:
```javascript
function myFunction() {
  "use strict";

  return this === undefined;
}

console.log(myFunction()); // true
```

### Object method invocation
If you call a function as a method of an object, `this` will refer to the object:
```javascript
const myObject = {
  myMethod() {
    return this === myObject;
  }
};

console.log(myObject.myMethod()); // true
```
#### Internals: Reference Type
To understand certain edge-cases of working with objects, we need to acquaint ourselves with a Reference Type.

In order to pass the object before the dot to the function `myObject.myMethod()`, dot `'.'` returns not the function, but a value of the special Reference Type.

The value of a Reference Type is a three-value combination `(base, name, strict)`, where:
- `base` is an object.
- `name` is a property name.
- `strict` is true if use strict is in effect.

When parentheses `()` are called on the Reference Type, they receive the full information about the object and its method, and can set the right `this`.

As the result, the value of `this` is only passed the right way, if the function is called in a chain of actions — to access an object property => to call the property — using a dot `obj.method()` or square brackets `obj['method']()` syntax.

#### Examples
##### Calling a method conditionally:
Reference type is lost — the chain was violated:
```javascript
const user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); },
};

(user.name == "John" ? user.hi : user.bye)(); // Uncaught TypeError: Cannot read property 'name' of undefined
```

##### Calling a method wrapped in parentheses:
Simple parentheses just set an order of a code execution and don't influence Reference Type — the chain was honored:
```javascript
const user = {
  name: "John",
  go: function() { alert(this.name); }
};

(user.go)() // John
```

##### Calling a method of an objects chain:
```javascript
const obj = {prop: 37};

function myFunction() {
  return this.prop;
}

obj.subObj = {myMethod: myFunction, prop: 42};

console.log(obj.subObj.myMethod()); // 42 ('this' equals to the object before the dot)
```

##### Calling a method of a prototype:
```javascript
const o = {f: function() { return this.a + this.b; }};
const p = Object.create(o);

p.a = 1;
p.b = 4;

console.log(p.f()); // 5
```
The same is true for `getter/setter` accessor properties.

### Constructor invocation
When a function is called with the `new` operator, its `this` identifier will be set to an object, created during that call:
```javascript
function User(name) {
  // this = {}; (implicitly)

  this.name = name;

  // return this; (implicitly)
}

const user = new User("Greg"); // a new object is created

console.log(user.name); // Greg
```

> Note: Arrow functions cannot be used as constructors.

### DOM event handler invocation
When invoked as a DOM event handler, a value of `this` inside the function will be the DOM element on which the event was placed:
```javascript
document.addEventListener('click', DOMElementHandler);

function DOMElementHandler() {
  console.log(this === document);
}

// pseudo-code to demonstrate output
simulateClickEvent(document); // true
```
?????
Because, it will be translated into something like this:
```javascript
document.onclick = DOMElementHandler;
```

And then called:
```javascript
document.onclick();
```

But, when the code is called from an inline on-event handler, it'll be a little bit different:
```javascript
<input type="button" id="button" onclick="sayThanks()">
```
Will be translated to this:
```javascript
button.onclick = function() {
  sayThanks(); // a usual function: 'this' refers to global object
};
```

A way to handle it:
```javascript
<input type="button" id="button" onclick="sayThanks.call(this)">
```

### Invocation with custom this
You can set `this` inside a function to some certain object using `Function.prototype` methods `call()`, `apply()` or `bind()`:
```javascript
const obj = {};

function a(param1, param2) {
  return [this === window, this === obj, param1, param2];
}

a.call(obj, 1, 2); // [false, true, 1, 2]
a.apply(obj, [3, 4]); // [false, true, 3, 4]
a.bind(obj)(5, 6);  // [false, true, 5, 6]
a(7, 8);   // [true, false, 7, 8]
```

In the case of `bind()`, the value of `this` inside the returned function is permanently bound to whatever you pass as the `thisArg` value (hence the name bind).

No matter which type of invocation is used, the value of `this` inside the returned function will always be the one that was provided as an argument:
```javascript
function a() {
  console.log(`type: ${this.type}`);
}
​
const customThisOne = { type: 'one' };
const customThisTwo = { type: 'two' };
​
const bound = a.bind(customThisOne);

bound(); // type: one

bound.call(customThisTwo); // type: one
bound.apply(customThisTwo); // type: one

const boundAgain = bound.bind(customThisTwo);

boundAgain(); // type: one
```

There is one exception though, calling the function as Constructor will redefine `this`:
```javascript
// continuing previous example

new bound(); // type: undefined
```

> Note: `bind()`, `call()`, and `apply()` cannot be used to pass a custom this value to arrow functions.

**Notes:**

`apply()` is faster, than `call()`.

Use wrapper as one of the possibilities to preserve this of the method.

## Arrow Functions
The arrow function doesn't have `this` identifier. It takes it from an outer Lexical Environment. So, it depends on where it was declared.

In other words:
- `this` will refer to the global object, if an arrow function was declared inside the global context;
- the same is true, if an arrow function was declared as an object's method — objects don't specify `this` inside their LE;
- `this` will refer to an object, if an arrow function was declared inside one of its methods (or inside the Class constructor).

Also, arrow functions are anonymous functions, it's a good practice to use them sparingly.

**Notes**:

Don't have `this` in LE.
Don't have `arguments` in LE.
Arrow functions can't be named like NFE.
Can't be called as a Constructor (using new).
`bind()`, `call()`, and `apply()` cannot be used to pass a custom this value to arrow functions.

## Promises
The syntax is:
```js
const promise = new Promise((resolve, reject) => {
  // executor (the producing code, "singer")
});
```

The executor code is usually asynchronous and calls either the resolve or the reject callback, after its finish. The first one is called in the case of success, the second one — in the case of error.

The resolve and the reject callbacks accept only 1 argument: value or error (preferably, Error object), respectively.

For example:
```js
const promise = new Promise((resolve, reject) => {
  // the function is executed automatically when the promise is constructed

  // after 1 second signal that the job is done with the result "done"
  setTimeout(() => resolve("done"), 1000);
});
```

### Consumers: then, catch, finally
Promise object serves as a link between the executor function and consumer functions. The consumer functions can be subscribed via `.then`, `.catch` and `.finally` methods.

#### then
The first argument of `.then` method is a callback function, which is executed, if the promise was resolved (completed with `fulfilled` state) and receives the result.

The seconds one — if the promise was rejected (completed with `rejected` state) and receives the error.

For instance, here’s a reaction to a successfully resolved promise:
```js
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// resolve runs the first function in .then
promise.then(
  (result) => alert(result), // shows "done!" after 1 second
  (error) => alert(error) // doesn't run
);
```

#### catch
If we’re interested only in errors, then we can use `null` as the first argument: `.then(null, errorHandlingFunction)`. Or we can use `.catch(errorHandlingFunction)`, which is exactly the same.

### finally
The method runs, when the promise is settled: be it resolve or reject.

`.finally` is a good handler for performing clean up, e.g. stopping our loading indicators, as they're not needed anymore, no matter what the outcome.

For example:
```js
new Promise((resolve, reject) => {
  /* do something that takes time, and then call resolve/reject */
})
  // runs when the promise is settled, doesn't matter successfully or not
  .finally(() => stop loading indicator)
  // so the loading indicator is always stopped before we process the result/error
  .then(result => show result, err => show error)
```

The main traits of the method are:
- It accepts no arguments, as they're not needed for its functionality,
- It passes the result and the error to the next handler.

## Promises API
There are several useful static methods on Promise class, that allows you to handle multiple promises in the single consumer functions chain.

Each of the static methods accepts an array of promises and:

Promise.all will wait until every promise isn't settled and then will pass an array of results or errors to the consuming function.

Promise.race, on the other hand, runs as soon as any of the promises is settled and will pass that promise's result or error, accordingly.

## Draft
Think from the JS engine perspective in order to understand program execution phases.

Think from the JS creator perspective in order to understand types handling.

The function declaration becoming block scoped, if used in strict mode.

Рекурсия — это функция вызывающая сама себя.

Рекурсия является удобным способом обработки рекурсивных структура данных (DOM, etc.), либо для решения задач элегантным путем.

list структуру данных можно использовать при необходимости быстрого взаимодействия с элементами массива по всей длине (добавлять, удалять, изменять данные в середине, конце, начале массива);


Currying — это методика, позволяющая передавать аргументы функции между вызовами. Находит прямое применение в функциональном программировании. Позволяет создавать функции частичного применения.

Partials — это функция, которая является частичной реализацией другой функции, с разницей в том, что у нее уменьшено количество аргументов, путем их предварительной блокировки (объявления). Методы bind, call, apply могут быть полезны для ее реализации.

Memoization (cashing) — это подход, применяемых в тяжелых функциях и позволяющий сделать их быстрее. Производится путем кэширования повторяющихся данных в памяти программы.

Декоратор — это функция, которая оборачивает другую функцию, изменяя ее поведение без оказания прямого воздействия.

Forwarding — это передача аргументов High-order функции к callback функции.

### Prototypes
Прототипы относятся к объектам.

Существует скрытое свойство `[[Prototype]]` объекта и свойство `prototype` для функции.

Прототип — это объект или `null`, который хранится в скрытом свойстве `[[Prototype]]` другого объекта.

Функции содержат свойство `prototype`. И присваивают его к скрытому свойству экземпляра `[[Prototype]]`.

Объекты содержат скрытое свойство `[[Prototype]]`.

Прототипы позволяют реализовать наследование, то есть создать экземпляр, который на основе какого-то общего объекта.

Каждый объект имеет прототип (built-in или `null`).

Прототип по умолчанию хранит свойство `constructor`.

Write/delete применяются напрямую к объекту (не смотрят в прототип).

for...in loop выводит как свойства объекта, так и свойства прототипа. Object.value/key/properties только над объектом.

`Object.create(obj)` для создания объекта с определенным прототипом;
`Object.create(null` для создания объекта без прототипа;

The quirk with prototypes in Javascript is that as `[[Prototype]]` stores a reference to an object, the object can be mutated and this would affect the inheritance chain.

### Map and Set
Cannot use iterable from a Map (probably and from a Set too) in an array's method borrowing technique.

For example:
```js
const costByFruit = new Map([
  ['banana', 3],
  ['apple', 4],
  ['orange', 5],
]);

const fruits = Array.prototype.map.call(
  costByFruit,
  ([fruit, cost]) => fruit,
);

console.log(fruits); // [] — not what is expected
```

Use `Array.from` or spread your map (`[...map]`) to solve this:
```js
const costByFruit = new Map([
  ['banana', 3],
  ['apple', 4],
  ['orange', 5],
]);

const fruits = [...costByFruit].map(([fruit, cost]) => fruit);

console.log(fruits); // ['banana', 'apple', 'orange']
```
#### Notes
`Object.keys()/.values()/.entries()` methods return “real” array objects, not just an iterable. That’s mainly for historical reasons.

## Sources
- [JavaScript Info Tutorial](https://javascript.info/)
- [How JavaScript Works](https://medium.com/better-programming/how-javascript-works-1706b9b66c4d) article on Medium.
- [MDN](https://developer.mozilla.org/en-US/)
- [ECMAScript 2015 specification](http://www.ecma-international.org/ecma-262/6.0/)
- [Master the JavaScript Interview: What is a Closure?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36) Eric Elliott's article on Medium
- [What the heck is the event loop anyway?](youtube.com/watch?v=8aGhZQkoFbQ) Philip Roberts explains in the video from JSConf EU

## Dive deeper
### Event loop
- [Jake Archibald: In The Loop - JSConf.Asia (extended)](https://vimeo.com/254947206)

### Program execution
- [You Don't Know JS Yet: Scope & Closures](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/scope-closures)
