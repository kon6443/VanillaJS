const { Worker, isMainThread, workerData } = require('worker_threads');


if (isMainThread) {
    // Main thread
    for (let i=1;i<=4; i++) {
        // Create a new worker thread and pass the value of i as workerData
        const worker = new Worker(__filename, { workerData: i });

        // Listen for messages from the worker threads
        worker.on('message', message => {
            console.log(message);
        });
    }
} else {
    // Worker thread
    const number = workerData; // Get the value passed from the main thread
    process.stdout.write(number+' '); // Print the number received from the main thread
}

