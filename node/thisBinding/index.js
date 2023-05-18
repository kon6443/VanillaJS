function myFunction2() {
    console.log('A new FEC has been created by myFunction2.');
    console.log('FEC2 this:', this);
}

function myFunction1() {
    console.log('A new FEC has been created by myFunction1.');
    console.log('FEC1 this:', this, '\n');
    myFunction2.call(this);
}

console.log('GEC this:', this, '\n');
myFunction1();

