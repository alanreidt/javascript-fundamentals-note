The problem with absence of Lexical env: Scope mess (in general and in preservation of outer scope, after context destruction)

Stack helps with understanding of: recursions, event loop.

LE helps with understanding of: scope, closure, this in arrow function

Phases of execution helps with understanding of: Hoisting and detection of variables value


Messages get into event queue, not handlers.

Not execution context steps, but code block evaluation steps.

A code, which is ran through an Execution Stack directly, is called *Synchronous*. And that, which makes a path through Messages queue — *Asynchronous*. Because, it's actually handled by some other thread (like Web API) and is performed at the same time, as operation in the Stack is performed.

Function object hidden props:
  \[\[Environment]] — how closure works,
  \[\[Home Object]] — how super works,

"This" traits are independent

Reference Type (which is returned when a pair of accessor property (dot or square brackets) and call (curly brackets) happens): "this" in a method
