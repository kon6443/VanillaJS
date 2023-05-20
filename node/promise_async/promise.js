/**
 * promise.js
 */

function myPromise() {
  return new Promise((resolve, reject) => {
    const data = fetch('URL');
    if(data) {
      resolve(data);
    } else {
      reject('Error');
    }
  });
}
// End of myPromise() function.

function nestedCallbacks() {
    // Read file asynchronously
    fs.readFile('file.txt', 'utf8', function(err, data) {
        if(err) {
            console.error('Error reading file:', err);
        } else {
            // Perform some operation with the file data
            processData(data, function(err, result) {
                if(err) {
                    console.error('Error processing data:', err);
                } else {
                    // Write the result to another file
                    fs.writeFile('output.txt', result, function(err) {
                        if(err) {
                            console.error('Error writing file:', err);
                        } else {
                            console.log('File write successful!');
                        }
                    });
                }
            });
        }
    });
}
// End of nestedCallbacks() function.

function exampleOfPromise() {
    // Read file asynchronously
    const readFile = (path) => {
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    };

    // Process data
    const processData = (data) => {
        return new Promise((resolve, reject) => {
            // Perform some operation with the data
            // ...

            // Simulating asynchronous operation
            setTimeout(() => {
                resolve('Processed data');
            }, 1000);
        });
    };

    // Write file asynchronously
    const writeFile = (path, data) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, data, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    };

    // Usage
    readFile('file.txt')
        .then((data) => processData(data))
        .then((result) => writeFile('output.txt', result))
        .then(() => {
            console.log('File write successful!');
        })
        .catch((err) => {
            console.error('Error:', err);
        });

}
// End of exampleOfPromise() function.

async function exampleOfasync() {
    // Read file asynchronously
    const readFileAsync = async (path) => {
	    try {
		    const data = await readFile(path, 'utf8');
		    return data;
	    } catch(err) {
		    throw new Error(err);
	    }
    }

    // Process data
    const processDataAsync = async (data) => {
	    // Perform some operations with the data..

	    // Simulating asynchronous operations..
	    await delay(1000);
	    return 'processed data';
    };

    // Write file asynchronously
    const writeFileAsync = async (path, data) => {
	    try {
    	    await writeFile(path, data);
	        console.log('File write successful!');
	    } catch (err) {
		    console.error('Error:', err);
	    }
    };

    // Usage with async/await
    const main = async () => {
        try {
            const data = await readFileAsync('file.txt');
            const processedData = await processDataAsync(data);
            await writeFileAsync('output.txt', processedData);
        } catch (err) {
            console.error('Error:', err);
        }
    };

    main();
}
// End of exampleOfasync() function.

function practicePromiseAll() {
    const promise1 = new Promise(resolve => setTimeout(() => resolve('Result 1'), 1000));
    const promise2 = new Promise(resolve => setTimeout(() => resolve('Result 2'), 2000));
    const promise3 = new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error occurred')), 1500));
    const promise4 = new Promise(resolve => setTimeout(() => resolve('Result 4', 4000)));

    Promise.all([promise1, promise2, promise3])
        .then(results => {
            console.log('Resolved:', results);
        })
        .catch(error => {
            console.log('Error:', error);
        });

    Promise.all([promise1, promise2, promise4])
        .then(results => {
             console.log('Resolved:', results);
        })
        .catch(error => {
            console.log('Error:', error);
        });
}
// End of practicePromiseAll() function.

practicePromiseAll();

function pracPromise() {
    return new Promise(resolve => resolve(100));
}

const prac = pracPromise();
console.log('prac:', prac);
