/**
 * 1. Named functions.
 * Traditional way.
 */
function myFunction() {
    console.log('This function is called named function.');
}
myFunction(); // This function is called named function.

/**
 * 2. Anonymous functions.
 * Without name, used as function expression or arguments.
 */
let greet = function(name) {
    console.log(`Hello, ${name}!`);
}
greet('Five'); // Hello, Five!

/**
 * 3. Arrow functions.
 * Arrow functions introduced in ES6, shorter syntax & one lined functions.
 */
let greetWithArrow = () => console.log('Hello');
greetWithArrow(); // Hello

/**
 * 4. Immediately Invoked Function Expressions (IIFE).
 * Executed immediately after their creation. Used to create private scopes and avoid polluting the global namespace.
 */
(function () {
    let greeting = 'How are you doing?';
    console.log(greeting);
})();

/**
 * 5. Higher Order Function.
 * Functions that take one or more functions as arguments or return a function.
 * eg: map(), filter(), reduce()
 */
let arr = [10, 20, 30];
let twiced = arr.map((element) => element * 2);
console.log(twiced); // [20, 40, 60]


/**
 * 6. Constructor Function.
 * Used as blueprints for creating objects with similar properties and methods.
 * They are invoked using the new keyword to create instances of objects.
 */
function Person(name, place) {
    this.name = name;
    this.place = place;
}
let user1 = new Person('Five', 'Heaven');
let user2 = new Person('Ten', 'Hell');
console.log(`Hello everyone, this is ${user1.name}, and I am from ${user1.place}.`);
console.log(`Hello everyone, this is ${user2.name}, and I am from ${user2.place}.`);

