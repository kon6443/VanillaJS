// 안내
// 주석 아래에 요구사항에 맞는 코드를 작성해주세요.
/** 
 * 요구사항
 * 1. 1부터 10까지 순회하면서 숫자를 출력하세요.
 * 2. 3, 4, 7 에서는 숫자와 함께 "Hello, world!"를 출력하세요.
 * 3. 7에서는 "Hello, world!" 대신 "Bye, world!"가 출력되도록 수정하세요.
 * 4. 4에서는 숫자가 출력되지 않게 수정하세요
*/
// 코드 작성

const caseMap = {
    3: "Hello World, 3!",
    4: "Hello World!",
    7: "Bye, World!",
}

function printGreetingMessage(caseNumber) {
    if(caseMap[caseNumber]===undefined) {
        console.log(caseNumber);
    } else {
        console.log(caseMap[caseNumber]);
    }
}

for(let i=1;i<11;i++) {
    printGreetingMessage(i);
}
