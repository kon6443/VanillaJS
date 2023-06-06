const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

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

let range = 10_000_000;

console.time('single');
let primes = sieveOfEratosthenes(range);
console.timeEnd('single');
console.log('Sieve of Eratosthenes: ', primes);
console.log('Number of prime numbers:', primes.length);

console.time('multi');
if(isMainThread) {
    const number_of_threads = 8;
    let divided_task = Math.ceil(range/number_of_threads);
    for(let i=0;i<number_of_threads-1;i++) {
        const wStart = start;
        threads.add(new Worker(__filename, {workerData: {start: wStart, range: range} }));
        start += range;
    }

    // last thread.
    threads.add(__filename, {workerData: {start: start, range: range + ((max-min+1)%number_of_threads)}} );

    for(let thread of threads) {
        thread.on('error', err => {
            console.error(err);
        });

        thread.on('exit', () => {
            threads.delete(thread);
            if(threads.size===0) {
                console.timeEnd('multi');
            }
        });

        thread.on('message', msg => {
            primes = primes.concat(msg);
        });
    }
} else {
    sieveOfEratosthenes(workerData.start, workerData.range);
    parentPort.postMessage(primes);
}
