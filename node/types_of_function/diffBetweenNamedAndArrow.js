// diff.js

// non-strict mode.

/**
 * When a named function is called as a standalone function,
 * the `this` value inside the function refers to the global object(`window` in a browser environment).
 * Or `undefined` in certain cases.
 */
function greet() {
    console.log('greet():', this);
    console.log();
}
greet(); // global object

/**
 * When a named function is called as a method of an object,
 * the `this` value inside the function is bound to the object itself.
 */
const person = {
    name: 'John',
    greet: function() {
        // 일반 함수가 메소드 형태로 호출 될 때 `this` 값은 자동으로 해당 객체에 바인딩 됩니다. 따라서 John을 갖습니다.
        console.log('person.greet():', this.name); // John

        // 하지만 아래는 독립적으로 실행되는 함수로 `this`값은 undefined를 갖습니다.
        const namedFunction = function() {
            console.log('namedFunction():', this.name);
        }
        namedFunction(); // undefined

        /**
        * Arrow functions do not have their own `this` binding.
        * Instead, they inherit the `this` value from the surrounding(lexical) scope where they are defined.
        */
        // 화살표 함수는 자체적으로 `this`값을 가지고 있지 않기 때문에
        // 가장 가까운 상위 개체의 `this`값을 상속받습니다. (person 객체).
        const arrowFunction = () => {
            console.log('arrowFunction():', this.name); // John
        }
        arrowFunction();
    }
}
person.greet();

console.log();


// strict-mode.

/**
 * In strict mode, when a named function is called as a standalone function.
 * the `this` value inside the function is set to `undefined`.
 * This prevents the default binding of `this` to the global object.
 */
function strictModeGreet() {
    'use strict';
    console.log('strictModeGreet():', this);
    console.log();
}
strictModeGreet(); // undefined

