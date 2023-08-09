
let lamp = false;
goTo2F();
// const covid = 'covid';
function goTo2F() {
    /** Variable shadowing (변수 섀도잉)
     *  동일한 식별자로 인해 상위 스코프에서 선언된 식별자의 값이 가려지는 현상.
     */
    let lamp = true;

    goTo3F();
    function goTo3F() {
        /**
         * 현재 제어권을 가진 EC(실행 문맥)는 콜스택의 제일 상단에 위치한 EC 하나이지만,
         * 이전 렉시컬 환경을 가리키는 outer로 외부 EC를 참조할 수 있습니다.
         * 이때 사용되는 스코프들의 연결리스트를 스코프 체인 이라고 하며,
         * 해당 과정을 스코프 체이닝 이라고 합니다.
         */
        console.log(lamp);
        // console.log(covid);
    }
}


