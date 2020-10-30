// source: ????

/* PRECEDENCE */

/*
 ! Steps (isn't right, look below):
 !
 !  1) Parse variable (where var is encountered)
 !     and assign it to undifined.
 !  2) Parse functions (where function is encountered)
 !     and assign its content to according name (variable).
 !  3) Execute code.
 !
 */

/*
 *
 *  — Function declarations take precedence over variable declarations
 *
 */

// [PRECEDENCE Example]
console.log(typeof double); // Output: function

var double = 22;

console.log(typeof double); // Output: number

function double(num) {
  return (num*2);
}




/* VARIABLES */

// VAR

// (1) declaration (var example) — hoist variable in scope and assign it to undefined.
// (2) assignment (example = 10) — assign value to variable instead of undefined,
//                                 or, if it wasn't declared, make first (making
//                                 global variable) and this steps,
// (3) usage ( console.log(example) ) — access a variable,
//                                      or, if it wasn't declared, make first step,
//                                      and throw a ReferenceError, if it's accessed.

// [VAR Sample 1]
console.log(typeof variable); // (3): undefined;
console.log(variable); // (3): ReferenceError: variable is not defined;

// [VAR Sample 2]
function hoist() {
  a = 20; // (2)
  var b = 100;
}

hoist();

console.log(a); // (2): 20;
/*
Accessible as a global variable outside hoist() function
Output: 20
*/

console.log(b);
/*
Since it was declared, it is confined to the hoist() function scope.
We can't print it out outside the confines of the hoist() function.
Output: ReferenceError: b is not defined
*/

// [VAR Sample 3]
console.log(hoist); // (1): undefined;
var hoist = 10;

// [VAR Sample 4]
function hoist() {
  console.log(message);
  var message='Hoisting is all the rage!';
}

hoist(); // (1): undefined;

// [VAR Sample 5]
'use strict';

hoist = 'Hoisted';
console.log(hoist); // Output: ReferenceError: hoist is not defined;


// LET

// [LET Sample 1]
console.log(hoist); // Output: ReferenceError: hoist is not defined ...;
let hoist = 'The variable has been hoisted.';

// [LET Sample 2]
let hoist;

console.log(hoist); // Output: undefined;
hoist = 'Hoisted';


// CONST

// [CONST Sample 1]
console.log(hoist); // Output: ReferenceError: hoist is not defined;
const hoist = 'The variable has been hoisted.';

// [CONST Sample 2]
function getCircumference(radius) {
  console.log(circumference)
  circumference = PI*radius*2;
  const PI = 22/7;
}

getCircumference(2) // ReferenceError: circumference is not defined;

// [CONST Sample 3]
const PI;
console.log(PI); // Ouput: SyntaxError: Missing initializer in const declaration
PI=3.142;

/* [Summary to Variables]
 *
 * As a prologue to this section, it's important to note that indeed,
 * JavaScript hoists variables declared with es6 let and const.
 * The difference in this case is how it initialises them.
 * Variables declared with let and const remain uninitialised at the beginning
 * of execution whilst variables declared with var are initialised with a value
 * of undefined.
 *
 */




/* FUNCTIONS */

// FUNCTION DECLARATION

hoisted(); // Output: "This function has been hoisted."

function hoisted() {
  console.log('This function has been hoisted.');
};


// FUNCTION EXPRESSION

expression(); //Output: "TypeError: expression is not a function

var expression = function() {
  console.log('Will this work?');
};

/*
 *
 * As we can see above, the variable declaration var expression is hoisted
 * but it's assignment to a function is not. Therefore, the intepreter throws
 * a TypeError since it sees expression as a variable and not a function.
 *
 */
