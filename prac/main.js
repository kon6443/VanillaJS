// 안내
// 주석 아래에 요구사항에 맞는 코드를 작성해주세요.

// 요구사항
// 1부터 10까지 순회하면서 숫자를 출력하세요.
// 3, 4, 7 에서는 숫자와 함께 "Hello, world!"를 출력하세요.
// 7에서는 "Hello, world!" 대신 "Bye, world!"가 출력되도록 수정하세요.
// 4에서는 숫자가 출력되지 않게 수정하세요

// 코드 작성

const caseMap = {
    3: "Hello World, 3!",
    4: "Hello World!",
    7: "Bye, World!",
}

function getGreetingMessage(caseNumber) {
    return caseMap[caseNumber];
}

for(let i=1;i<11;i++) {
    if(getGreetingMessage(i)===undefined) {
        console.log(i);
    } else {
        console.log(getGreetingMessage(i));
    }
}

console.log("The end..");