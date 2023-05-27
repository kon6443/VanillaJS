const { parentPort, isMainThread } = require('worker_threads');

function getRandomNumber() {
    return Math.floor(Math.random() * 11 - 0);
}

if(!isMainThread) {
    for(let i=0;i<10;i++) {
        parentPort.postMessage(getRandomNumber());
    }
}

