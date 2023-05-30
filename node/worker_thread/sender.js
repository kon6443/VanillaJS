const { parentPort, isMainThread } = require('worker_threads');

function getRandomNumber() {
    /**
     * Math.random() returns a decimal number between 0 to 1.
     * Math.random()*
     */
    return Math.floor(Math.random()*10);
}

console.log('thrad has been called.');

if(!isMainThread) {
    for(let i=0;i<10;i++) {
        parentPort.postMessage(getRandomNumber());
    }
}

