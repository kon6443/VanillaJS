const { Worker, isMainThread } = require('worker_threads');

const receiver = new Worker('./sender.js');

receiver.on('message', (data) => {
    console.log('Received message:', data);
});

receiver.on('error', (err) => {
    console.error(err);
});

receiver.on('exit', () => {
    console.log('Done.');
});
