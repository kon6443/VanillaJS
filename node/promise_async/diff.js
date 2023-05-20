/**
 * diff.js
 */

function getTimeT() {
    const t = 1000;
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(t);
        }, 1000);
    });
}

async function asyncFunction() {
    try {
        var t = await getTimeT();
        console.log('t value is:', t); // t value is: 1000
    } catch(err) {
        throw new Error(err);
    }
}


async function promiseFunction() {
    getTimeT().then((t) => console.log('promiseFunction t:', t));
}

asyncFunction();
promiseFunction();

