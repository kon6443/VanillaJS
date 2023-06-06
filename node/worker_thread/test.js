const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

function getRandomNumber() {
    return Math.floor(Math.random()*10);
}

if(isMainThread) {
    let threads = [];
    for(let i=0;i<10;i++) {
        thread.push(new Worker(__filename, {workerData: {thread: i} }));
    }
} else {
    console.log('thread: ', workerData.thread);
    parentPort.postMessage(getRandomNumber());
}
