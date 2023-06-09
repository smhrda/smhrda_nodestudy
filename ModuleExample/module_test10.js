/* 모듈을 분리할 때 사용하는 코드 패턴 3
    : 프로토타입 객체를 할당하는 패턴
    - 인스턴스를 객체를 만든 후 할당하는 것이 아니라, 객체 자체를 할당
    -> 필요시 직접 인스턴스 객체를 만들어 사용할 수 있다는 장점
*/

var User = require("./user10");
// 사용 패턴 : new 연산자로 인스턴스 객체 만든 후 함수 호출
var user = new User("test01", "콜라");

user.printUser();
