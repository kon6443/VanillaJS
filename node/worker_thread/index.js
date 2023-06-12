const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

let max = 10_000_000;

function sieveOfEratosthenes(start, range) {
    let numbers = Array(range+1).fill(true);
    const end = start + range;
    for(let i=start;i*i<=end;i++) {
        if(numbers[i]) {
            for(let j=i*i;j<=end;j+=i) {
                numbers[j] = false;
            }
        }
    }

    let primes = [];
    for(let i=2;i<=range;i++) {
        if(numbers[i]) {
            primes.push(i);
        }
    }
    return primes;
}

function measureSingleThread() {
    console.time('single');
    let singleThreadPrimes = sieveOfEratosthenes(2, max);
    console.timeEnd('single');
    console.log('Sieve of Eratosthenes: ', singleThreadPrimes);
    console.log('Number of prime numbers:', singleThreadPrimes.length);
}

if(isMainThread) {
    measureSingleThread();

    console.time('multi');
    let begin = 2;
    const number_of_threads = 8;
    let threads = [];
    let range = Math.ceil((max-begin)/number_of_threads);
    for(let i=0;i<number_of_threads-1;i++) {
        console.log('range: ', range);
        threads.push(new Worker(__filename, {workerData: {start: begin, range: range} }));
        begin += range;
    }

    // last thread.
    threads.push(new Worker(__filename, {workerData: { start: begin, range: max-begin+1 }}));

    let multiThreadPrimes = [];
    for(let i=0;i<number_of_threads;i++) {
        const thread = threads[i];

        thread.on('error', err => {
            console.error(err);
        });

        thread.on('exit', () => {
            threads.splice(i, 1);
            if(threads.size===0) {
                console.log('done.');
                console.log('multi: ', multiThreadPrimes);
                console.timeEnd('multi');
            }
        });

        thread.on('message', msg => {
            multiThreadPrimes = multiThreadPrimes.concat(msg);
        });
    }
} else {
    console.log('start:', workerData.start, ', range: ', workerData.rage);
    let primes = sieveOfEratosthenes(workerData.start, workerData.range);
    parentPort.postMessage(primes);
}
