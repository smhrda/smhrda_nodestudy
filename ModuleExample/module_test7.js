/* 모듈을 분리할 때 사용하는 코드 패턴 1 
    : 함수를 할당하는 경우
        - 모듈을 불러온 후 소괄호를 붙여 모듈 실행
*/

// 사용 패턴 : exports에 속성으로 추가된 함수 객체를 그대로 참조한 후 호출함
var printUser = require("./user7").printUser; // printUser 속성을 바로 참조

printUser(); // 소괄호를 붙여 함수 실행
